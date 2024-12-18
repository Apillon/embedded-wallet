import { ethers } from 'ethers';
import { AuthData, AuthPasskeyMode, AuthProxyWriteFns, AuthStrategy } from '../types';
import { abort, getHashedUsername, getPasskeyOrigin } from '../utils';
import { credentialCreate, credentialGet } from '../browser-webauthn';
import { SapphireMainnet, SapphireTestnet, WalletType } from '../constants';
import EmbeddedWallet from '..';
import { AccountManagerAbi } from '../abi';

class PasskeyStrategy implements AuthStrategy {
  constructor(public wallet: EmbeddedWallet) {}

  async getRegisterData(authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    if (!authData.hashedUsername) {
      authData.hashedUsername = await getHashedUsername(authData.username);
    }

    if (!authData.hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const newWallet = {
      walletType: WalletType.EVM,
      keypairSecret: ethers.ZeroHash,
      title: authData.username,
    };

    if (this.wallet.xdomain?.mode === 'popup' || this.wallet.xdomain?.mode === 'tab_process') {
      const cred = await this.wallet.xdomain?.create(authData.hashedUsername, authData.username);

      if (!cred) {
        abort('XDOMAIN_NOT_INIT');
        return;
      }

      return {
        hashedUsername: authData.hashedUsername,
        credentialId: cred.credentialId,
        pubkey: cred.pubkey,
        optionalPassword: ethers.ZeroHash,
        wallet: newWallet,
      };
    } else {
      const cred = await credentialCreate(
        {
          name: 'Embedded Wallet Account',
          id: getPasskeyOrigin(),
        },
        {
          id: authData.hashedUsername,
          name: authData.username,
          displayName: authData.username,
        },
        crypto.getRandomValues(new Uint8Array(32))
      );

      return {
        hashedUsername: authData.hashedUsername,
        credentialId: cred.id,
        pubkey: cred.ad.attestedCredentialData!.credentialPublicKey!,
        optionalPassword: ethers.ZeroHash,
        wallet: newWallet,
      };
    }
  }

  async getProxyResponse(data: string, authData: AuthData) {
    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const cred = await this.getPasskeyForMode(
      this.wallet?.xdomain?.mode || 'standalone',
      hashedUsername,
      data
    );

    if (!cred) {
      abort('XDOMAIN_NOT_INIT');
      return;
    }

    return await this.wallet.accountManagerContract.proxyView(
      cred.credentialIdHashed,
      // @ts-expect-error AbiTypes
      cred.resp,
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

    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (!hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    const cred = await this.getPasskeyForMode(
      this.wallet?.xdomain?.mode || 'standalone',
      hashedUsername,
      data
    );

    if (!cred) {
      abort('XDOMAIN_NOT_INIT');
      return;
    }

    const res = await this.wallet.signContractWrite({
      authData,
      strategy: 'passkey',
      label: txLabel,
      contractAddress: this.wallet.accountManagerAddress,
      contractAbi: AccountManagerAbi,
      contractFunctionName: functionName,
      contractFunctionValues: [
        {
          credentialIdHashed: cred.credentialIdHashed,
          resp: cred.resp,
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

  async getPasskeyForMode(mode: AuthPasskeyMode, hashedUsername: Buffer, data: any) {
    const personalization = await this.wallet.accountManagerContract.personalization();
    const credentialIds = await this.wallet.accountManagerContract.credentialIdsByUsername(
      hashedUsername as any
    );

    const credentials = credentialIds.map((c: any) => ethers.toBeArray(c));
    const challenge = ethers.toBeArray(
      ethers.sha256(personalization + ethers.sha256(data).slice(2))
    );

    if (['popup', 'redirect', 'iframe', 'tab_process', 'tab_form'].includes(mode)) {
      const res = await this.wallet.xdomain?.get(credentials, challenge);

      if (!res) {
        return;
      }

      return {
        credentialIdHashed: res.credentials.credentialIdHashed,
        resp: res.credentials.resp,
      };
    } else {
      const res = await credentialGet(credentials, challenge, getPasskeyOrigin());

      return {
        credentialIdHashed: res.credentialIdHashed,
        resp: res.resp,
      };
    }
  }
}

export default PasskeyStrategy;
