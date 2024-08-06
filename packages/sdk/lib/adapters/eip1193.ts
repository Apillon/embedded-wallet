import mitt from 'mitt';
import { EIP1193Provider, hashMessage, LocalAccount, ProviderRpcError } from 'viem';
import { getEmbeddedWallet, getEmbeddedWalletRetry } from '../utils';
import { ErrorMessages, Errors } from '../constants';
import OasisEthersSigner from './ethers';
import OasisViemAdapter from './viem';

class WalletDisconnectedError extends ProviderRpcError {
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

async function initEvents(eventEmitter: ReturnType<typeof mitt>) {
  const w = await getEmbeddedWalletRetry();
  if (w) {
    w.events.on('connect', p => eventEmitter.emit('connect', p));
    w.events.on('disconnect', p => eventEmitter.emit('disconnect', p));
    w.events.on('chainChanged', p => eventEmitter.emit('chainChanged', p));
    w.events.on('accountsChanged', p => eventEmitter.emit('accountsChanged', p));
  }
}

function getProvider(): EIP1193Provider & {
  getSigner: () => OasisEthersSigner;
  getAccount: () => LocalAccount;
} {
  const events = mitt();

  initEvents(events);

  const onRequest: any = async ({ method, params }: { method: string; params: any }) => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnectedError();
    }

    console.log([method, params]);

    let finalRes = null;

    switch (method) {
      /**
       * Return an address to be identified by.
       * If not logged in, trigger login SDK event (open modal, wait for auth...)
       */
      case 'eth_requestAccounts':
      case 'eth_accounts': {
        if (w.lastAccount.address) {
          finalRes = [w.lastAccount.address];
          break;
        }
        const a = await w.waitForAccount();

        if (!a) {
          throw new UserRejectedRequestError();
        }

        finalRes = [a];
        break;
      }

      /**
       * Sign string message
       */
      case 'personal_sign': {
        const res = await w.signMessage({
          mustConfirm: true,
          strategy: 'passkey',
          message: hashMessage(params[0]),
        });

        finalRes = res;
        break;
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

        finalRes = res;
        break;
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

        finalRes = res?.signedTxData || '';
        break;
      }

      /**
       * Change chain, emit 'chainChanged' on success
       */
      case 'wallet_switchEthereumChain': {
        w.setDefaultNetworkId(Number(params[0].chainId));

        finalRes = null;
        break;
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

          finalRes = res2.txHash;
          break;
        }

        finalRes = null;
        break;
      }

      case 'eth_sendRawTransaction': {
        const res = await w.broadcastTransaction(params[0]);

        finalRes = res.txHash;
        break;
      }

      /**
       * Pass through to JsonRpcProvider ?
       */
      default: {
        finalRes = await w.getRpcProviderForChainId(w.defaultNetworkId).send(method, params);
        break;
      }
    }

    console.log('====', method);
    console.log(finalRes);

    return finalRes;
  };

  /**
   * Get ethers Signer
   */
  const getSigner = () => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnectedError();
    }

    return new OasisEthersSigner(w.getRpcProviderForChainId(w.defaultNetworkId));
  };

  /**
   * Get viem Account
   */
  const getAccount = () => {
    const w = getEmbeddedWallet();

    if (!w) {
      throw new WalletDisconnectedError();
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

export { getProvider, WalletDisconnectedError };
export default getProvider;
