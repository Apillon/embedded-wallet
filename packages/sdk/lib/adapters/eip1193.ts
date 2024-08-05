import mitt from 'mitt';
import { EIP1193Provider, LocalAccount, ProviderRpcError } from 'viem';
import { getEmbeddedWallet } from '../utils';
import { ErrorMessages, Errors } from '../constants';
import OasisEthersSigner from './ethers';
import OasisViemAdapter from './viem';

class WalletDisconnecteError extends ProviderRpcError {
  constructor() {
    super(new Error(ErrorMessages[Errors.OASIS_WALLET_NOT_INITIALIZED]), {
      code: 4900,
      shortMessage: 'Disconnected',
    });
  }
}

class UserRejectedRequestError extends ProviderRpcError {
  constructor() {
    super(new Error('Request rejected by user'), {
      code: 4001,
      shortMessage: 'User Rejected Request',
    });
  }
}

function getProvider(): EIP1193Provider & {
  getSigner: () => OasisEthersSigner;
  getAccount: () => LocalAccount;
} {
  const events = mitt();

  const onRequest: any = async ({ method, params }: { method: string; params: any }) => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnecteError();
    }

    switch (method) {
      /**
       * Return an address to be identified by.
       * If not logged in, trigger login SDK event (open modal, wait for auth...)
       */
      case 'eth_requestAccounts':
      case 'eth_accounts': {
        if (w.lastAccount.address) {
          return [w.lastAccount.address];
        }
        const a = await w.waitForAccount();

        if (!a) {
          throw new UserRejectedRequestError();
        }

        return [a];
      }

      /**
       * Sign string message
       */
      case 'personal_sign': {
        const res = await w.signMessage({
          mustConfirm: true,
          strategy: 'passkey',
          message: params[0],
        });

        return res;
      }

      /**
       * Sign string message (reversed params)
       */
      case 'eth_sign': {
        const res = await w.signMessage({
          mustConfirm: true,
          strategy: 'passkey',
          message: params[1],
        });

        return res;
      }

      /**
       * Return signed tx
       */
      case 'eth_signTransaction': {
        const res = await w.signPlainTransaction({
          mustConfirm: true,
          strategy: w.lastAccount.authStrategy,
          authData: {
            username: w.lastAccount.username,
          },
          tx: params[0],
        });

        return res?.signedTxData || '';
      }

      /**
       * Change chain, emit 'chainChanged' on success
       */
      case 'wallet_switchEthereumChain': {
        if (w.setDefaultNetworkId(Number(params[0].chainId))) {
          events.emit('chainChanged', { chainId: params[0].chainId });
        }

        return null;
      }

      case 'eth_sendTransaction': {
        const res = await w.signPlainTransaction({
          mustConfirm: true,
          strategy: w.lastAccount.authStrategy,
          authData: {
            username: w.lastAccount.username,
          },
          tx: params[0],
        });

        if (res?.signedTxData) {
          const res2 = await w.broadcastTransaction(res.signedTxData);

          return res2.txHash;
        }

        return null;
      }

      case 'eth_sendRawTransaction': {
        const res = await w.broadcastTransaction(params[0]);

        return res.txHash;
      }

      /**
       * Pass through to JsonRpcProvider ?
       */
      default: {
        console.log(method, params);
        return w.getRpcProviderForChainId(w.defaultNetworkId).send(method, params);
      }
    }
  };

  /**
   * Get ethers Signer
   */
  const getSigner = () => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnecteError();
    }

    return new OasisEthersSigner(w.getRpcProviderForChainId(w.defaultNetworkId));
  };

  /**
   * Get viem Account
   */
  const getAccount = () => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnecteError();
    }

    const adapter = new OasisViemAdapter();

    return adapter.getAccount();
  };

  return {
    on: events.on,
    removeListener: events.off,
    request: onRequest,
    getSigner,
    getAccount,
  };
}

export { getProvider };
export default getProvider;
