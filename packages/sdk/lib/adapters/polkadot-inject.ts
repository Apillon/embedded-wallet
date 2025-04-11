import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';
import pkg from '../../package.json' assert { type: 'json' };
import EmbeddedWallet from '..';
import { abort, getEmbeddedWallet } from '../utils';

class EmbeddedPolkadotInject {
  requestId = 0;
  wallet: EmbeddedWallet | undefined = undefined;

  constructor() {
    const w = getEmbeddedWallet();

    if (!w) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    if (!w.ss.networks.length) {
      abort('NO_POLKADOT_NETWORKS');
      return;
    }

    this.wallet = w;
    injectExtension(this.enableFn, { name: 'Apillon Embedded Wallet', version: pkg.version });
  }

  // originName is used for extension messaging (window.postMessage)
  async enableFn(_originName: string): Promise<Injected> {
    return {
      signer: {
        signPayload: async payload => {
          const id = ++this.requestId;

          if (!this.wallet) {
            abort('OASIS_WALLET_NOT_INITIALIZED');
            return {
              id,
              signature: '0x',
            };
          }

          const res = await this.wallet.ss.signTransaction({
            tx: undefined as any,
            mustConfirm: true,
            payload,
          });

          if (res) {
            return {
              id,
              signature: res.signature,
              signedTransaction:
                typeof res.signedTxData === 'string'
                  ? (res.signedTxData as `0x${string}`)
                  : res.signedTxData.toHex(),
            };
          }

          return {
            id,
            signature: '0x',
          };
        },

        signRaw: async payload => {
          const id = ++this.requestId;

          if (!this.wallet) {
            abort('OASIS_WALLET_NOT_INITIALIZED');
            return {
              id,
              signature: '0x',
            };
          }

          const signature = await this.wallet.signMessage({
            message: payload.address,
            mustConfirm: true,
          });

          return {
            id,
            signature,
            // signedTransaction: '',
          };
        },
      },

      /**
       * polkadot extension event stuff? ignore
       *
       * Ref:
       * - polkadot/extension: extension-base/src/page/Accounts.ts
       * - polkadot/extension: extension-base/src/background/handlers/Extension.ts
       */
      accounts: {
        get: async () => this.wallet?.ss.userWallets || [],
        subscribe: _cb => {
          console.log('accounts subscribe');
          return () => {
            console.log('accounts unsubscribe');
          };
        },
      },
    };
  }
}

export { EmbeddedPolkadotInject };
export default EmbeddedPolkadotInject;
