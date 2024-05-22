import { ethers } from 'ethers';
import { AuthData, AuthStrategyName, RegisterData, UserInfo, WebauthnContract } from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountAbi, AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { getHashedUsername } from './utils';

class OasisAppWallet {
  sapphireProvider = undefined as ethers.JsonRpcProvider | undefined;
  webauthnContract = undefined as WebauthnContract | undefined;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  user = undefined as UserInfo | undefined;

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

  async register(strategy: AuthStrategyName, authData: AuthData) {
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

      console.log('TX sent');

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const tr = await this.sapphireProvider.getTransactionReceipt(tx);

        if (tr) {
          return await this.saveUser(authData.username, strategy);
        }
        await new Promise(f => setTimeout(f, 1000));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async login(strategy: AuthStrategyName, authData: AuthData) {
    if (!this.sapphireProvider || !this.webauthnContract || !authData.username) {
      return;
    }

    const RANDOM_STRING = '0x000000000000000000000000000000000000000000000000000000000000DEAD';

    try {
      const hashedUsername = await getHashedUsername(authData.username);

      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('sign', [RANDOM_STRING]);

      let loginData = undefined as string | undefined;

      if (strategy === 'password') {
        loginData = await new PasswordStrategy().getProxyResponse(this.webauthnContract, data, {
          ...authData,
          hashedUsername,
        });
      } else if (strategy === 'passkey') {
        loginData = await new PasskeyStrategy().getProxyResponse(this.webauthnContract, data, {
          ...authData,
          hashedUsername,
        });
      }

      if (!loginData) {
        throw new Error('Login: no proxy data');
      }

      const [[r, s, v]] = AC.decodeFunctionResult('sign', loginData).toArray();

      const recoveredPublicKey = ethers.recoverAddress(RANDOM_STRING, {
        r,
        s,
        v,
      });

      /**
       * Get public key for username from account manager contract
       */
      const contractRes = await this.webauthnContract.getAccount(hashedUsername as any);

      /**
       * Login success return account address
       */
      if (contractRes.length > 1 && recoveredPublicKey === contractRes[1]) {
        return await this.saveUser(authData.username, strategy);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async saveUser(username: string, strategy: AuthStrategyName = 'passkey') {
    const addresses = await this.getAccountAddress(username);

    if (addresses) {
      this.user = {
        username,
        strategy,
        ...addresses,
      };

      /**
       * @TODO Save to localStorage e.g.
       */

      return this.user;
    }
  }

  async getAccountAddress(username: string) {
    if (!this.sapphireProvider || !this.webauthnContract || !username) {
      return;
    }

    try {
      const hashedUsername = await getHashedUsername(username);

      const userData = await this.webauthnContract.getAccount(hashedUsername as any);

      if (Array.isArray(userData) && userData.length > 1) {
        return {
          publicAddress: userData[1],
          accountContractAddress: userData[0],
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default OasisAppWallet;
