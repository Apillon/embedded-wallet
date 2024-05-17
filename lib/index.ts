import { ethers } from 'ethers';
import { AuthData, RegisterData, WebauthnContract } from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';

class OasisAppWallet {
  sapphireProvider = undefined as ethers.JsonRpcProvider | undefined;
  webauthnContract = undefined as WebauthnContract | undefined;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();

  constructor() {
    this.initialize();
  }

  initialize() {
    const ethSaphProvider = new ethers.JsonRpcProvider('https://testnet.sapphire.oasis.dev');

    this.sapphireProvider = sapphire.wrap(ethSaphProvider);

    this.webauthnContract = new ethers.Contract(
      // 0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC,
      '0x921E78602E8584389FacEF9cF578Ba8790bb060f',
      // "0xa4a2472F3fe6ad4e04C89C11Af6A42c27335B8a6",
      AccountManagerAbi,
      new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
    ) as unknown as WebauthnContract;
  }

  async register(strategy: 'password' | 'passkey', authData: AuthData) {
    if (!this.sapphireProvider || !this.webauthnContract) {
      return;
    }

    try {
      let registerData = undefined as RegisterData | undefined;

      if (strategy === 'password') {
        registerData = await new PasswordStrategy().getRegisterData(authData);
      } else if (strategy === 'passkey') {
        registerData = await new PasskeyStrategy().getRegisterData(authData);
      }

      const gaslessData = this.abiCoder.encode(
        ['tuple(bytes funcData, uint8 txType)'],
        [
          {
            funcData: this.abiCoder.encode(
              [
                'tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword)',
              ],
              [registerData]
            ),
            txType: 0,
          },
        ]
      );

      const gasPrice = (await this.sapphireProvider.getFeeData()).gasPrice;
      const nonce = await this.sapphireProvider.getTransactionCount(
        await this.webauthnContract.gaspayingAddress()
      );

      const signedTx = await this.webauthnContract.generateGaslessTx(
        gaslessData,
        nonce as any,
        gasPrice as any
      );
      const tx = await this.sapphireProvider.send('eth_sendRawTransaction', [signedTx]);

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const tr = await this.sapphireProvider.getTransactionReceipt(tx);
        if (tr) {
          console.log(tr);
          break;
        }
        await new Promise(f => setTimeout(f, 500));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default OasisAppWallet;
