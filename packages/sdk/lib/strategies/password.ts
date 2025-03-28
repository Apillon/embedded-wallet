import { AuthData, AuthProxyWriteFns, AuthStrategy } from '../types';
import { secp256r1 } from '@noble/curves/p256';
import { bytesToHex } from '@noble/curves/abstract/utils';
import { ethers } from 'ethers6';
import { abort, getHashedUsername } from '../utils';
import { SapphireMainnet, SapphireTestnet, WalletType } from '../constants';
import EmbeddedWallet from '..';
import { AccountManagerAbi } from '../abi';

class PasswordStrategy implements AuthStrategy {
  abiCoder = ethers.AbiCoder.defaultAbiCoder();

  constructor(public wallet: EmbeddedWallet) {}

  async getRegisterData(authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
    }

    if (!authData.password) {
      abort('NO_PASSWORD');
    }

    const hashedUsername = await getHashedUsername(authData.username);

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const keyPair = this.generateNewKeypair();

    return {
      hashedUsername,
      credentialId: keyPair.credentialId,
      pubkey: {
        kty: 2, // Elliptic Curve format
        alg: -7, // ES256 algorithm
        crv: 1, // P-256 curve
        x: keyPair.decoded_x,
        y: keyPair.decoded_y,
      },
      optionalPassword: ethers.encodeBytes32String(authData.password!),
      wallet: {
        walletType: authData.walletType || WalletType.EVM,
        keypairSecret: authData.privateKey || ethers.ZeroHash,
      },
    };
  }

  async getProxyResponse(data: string, authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    if (!authData.password) {
      abort('NO_PASSWORD');
      return;
    }

    const hashedUsername = await getHashedUsername(authData.username);

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const digest = ethers.solidityPackedKeccak256(
      ['bytes32', 'bytes'],
      [ethers.encodeBytes32String(authData.password!), data]
    );

    return await this.wallet.accountManagerContract.proxyViewPassword(
      hashedUsername as any,
      BigInt(authData.walletType || WalletType.EVM),
      digest,
      data
    );
  }

  async proxyWrite(
    functionName: AuthProxyWriteFns,
    data: string,
    authData: AuthData,
    txLabel?: string,
    dontWait = false
  ) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    if (!authData.password) {
      abort('NO_PASSWORD');
      return;
    }

    const hashedUsername = await getHashedUsername(authData.username);

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const digest = ethers.solidityPackedKeccak256(
      ['bytes32', 'bytes'],
      [ethers.encodeBytes32String(authData.password!), data]
    );

    const res = await this.wallet.signContractWrite({
      authData,
      strategy: 'password',
      label: txLabel,
      contractAddress: this.wallet.accountManagerAddress,
      contractAbi: AccountManagerAbi,
      contractFunctionName: functionName,
      contractFunctionValues: [
        {
          hashedUsername,
          digest,
          data,
        },
      ],
      chainId: (import.meta.env.VITE_SAPPHIRE_URL ?? '').includes('testnet')
        ? SapphireTestnet
        : SapphireMainnet,
    });

    if (res) {
      const { txHash } = await this.wallet.broadcastTransaction(
        res?.signedTxData,
        res?.chainId,
        txLabel,
        `proxyWrite_${functionName}`
      );

      if (dontWait) {
        return txHash;
      }

      if (await this.wallet.waitForTxReceipt(txHash)) {
        return txHash;
      }
    }
  }

  async getCredentials(data: any, authData: AuthData) {
    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const digest = ethers.solidityPackedKeccak256(
      ['bytes32', 'bytes'],
      [ethers.encodeBytes32String(authData.password!), data]
    );

    return digest;
  }

  generateNewKeypair() {
    const privateKey = secp256r1.utils.randomPrivateKey();
    const pubKey = secp256r1.getPublicKey(privateKey, false);
    const pubKeyString = '0x' + bytesToHex(pubKey);
    const credentialId = this.abiCoder.encode(['string'], [pubKeyString]);

    const coordsString = pubKeyString.slice(4, pubKeyString.length); // removes 0x04
    const decoded_x = BigInt('0x' + coordsString.slice(0, 64)); // x is the first half
    const decoded_y = BigInt('0x' + coordsString.slice(64, coordsString.length)); // y is the second half

    return {
      credentialId,
      privateKey,
      decoded_x,
      decoded_y,
    };
  }
}

export default PasswordStrategy;
