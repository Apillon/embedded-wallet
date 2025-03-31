import mitt from 'mitt';
import { EIP1193Provider, hashMessage, hexToString, LocalAccount, ProviderRpcError } from 'viem';
import { getEmbeddedWalletRetry } from '../utils';
import { ErrorMessages, Errors } from '../constants';
import EmbeddedEthersSigner from './ethers';
import EmbeddedViemAdapter from './viem';

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
  getSigner: () => Promise<EmbeddedEthersSigner>;
  getAccount: () => Promise<LocalAccount>;
} {
  const events = mitt();

  initEvents(events);

  const onRequest: any = async ({ method, params }: { method: string; params: any }) => {
    const w = await getEmbeddedWalletRetry();

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
      case 'eth_requestAccounts': {
        if (w.evm.userWallets?.[w.user.walletIndex]?.address) {
          finalRes = [w.evm.userWallets[w.user.walletIndex].address];
          break;
        }

        const a = await w.waitForAccount();

        if (!a) {
          throw new UserRejectedRequestError();
        }

        finalRes = [a];
        break;
      }

      case 'eth_accounts': {
        if (w.evm.userWallets?.[w.user.walletIndex]?.address) {
          finalRes = [w.evm.userWallets[w.user.walletIndex].address];
          break;
        }

        finalRes = [];
        break;
      }

      /**
       * Sign string message
       */
      case 'personal_sign': {
        const res = await w.signMessage({
          mustConfirm: true,
          strategy: 'passkey',
          message: hashMessage(hexToString(params[0])),
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
        const res = await w.evm.signPlainTransaction({
          mustConfirm: true,
          strategy: w.user.authStrategy,
          authData: {
            username: w.user.username,
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
        const res = await w.evm.signPlainTransaction({
          mustConfirm: true,
          strategy: w.user.authStrategy,
          authData: {
            username: w.user.username,
          },
          tx: params[0],
        });

        if (res?.signedTxData) {
          const res2 = await w.evm.broadcastTransaction(res.signedTxData, params[0]?.chainId);

          if (res2) {
            finalRes = res2.txHash;
            break;
          }
        }

        finalRes = null;
        break;
      }

      case 'eth_sendRawTransaction': {
        const res = await w.evm.broadcastTransaction(params[0], params[0]?.chainId);

        if (res) {
          finalRes = res.txHash;
        }

        break;
      }

      /**
       * Pass through to JsonRpcProvider ?
       */
      default: {
        finalRes = await w.evm
          .getRpcProviderForNetworkId(w.defaultNetworkId as number)!
          .send(method, params);
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
  const getSigner = async () => {
    const w = await getEmbeddedWalletRetry();

    if (!w) {
      throw new WalletDisconnectedError();
    }

    return new EmbeddedEthersSigner(
      w.evm.getRpcProviderForNetworkId(w.defaultNetworkId as number)!
    );
  };

  /**
   * Get viem Account
   */
  const getAccount = async () => {
    const w = getEmbeddedWalletRetry();

    if (!w) {
      throw new WalletDisconnectedError();
    }

    const adapter = new EmbeddedViemAdapter();

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

export { getProvider, WalletDisconnectedError, UserRejectedRequestError };
export default getProvider;
