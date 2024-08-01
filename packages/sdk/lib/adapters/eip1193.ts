import mitt from 'mitt';
import { EIP1193Provider, ProviderRpcError } from 'viem';
import { getEmbeddedWallet } from '../utils';
import { ErrorMessages, Errors } from '../constants';

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

function getProvider(): EIP1193Provider {
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
      case 'personal_sign':
      case 'eth_sign': {
        return '0x';
      }

      /**
       * Return signed tx
       */
      case 'eth_signTransaction': {
        return `0x`;
      }

      /**
       * Change chain, emit 'chainChanged' on success
       */
      case 'wallet_switchEthereumChain': {
        events.emit('chainChanged', { chainId: 1234 });
        return null;
      }

      case 'eth_sendTransaction': {
        return ``;
      }

      case 'eth_sendRawTransaction': {
        return ``;
      }

      /**
       * Pass through to JsonRpcProvider ?
       */
      default: {
        console.log(method, params);
      }
    }
  };

  return {
    on: events.on,
    removeListener: events.off,
    request: onRequest,
  };
}

export { getProvider };
export default getProvider;
