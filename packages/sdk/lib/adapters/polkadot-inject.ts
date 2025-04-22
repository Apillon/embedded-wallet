import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';
import pkg from '../../package.json' assert { type: 'json' };
import { abort, getEmbeddedWallet } from '../utils';
import { WalletType } from '../constants';

class EmbeddedPolkadotInject {
  constructor() {
    injectExtension(this.enableFn, { name: 'apillon-embedded-wallet', version: pkg.version });
  }

  // originName is used for extension messaging (window.postMessage)
  async enableFn(_originName: string): Promise<Injected> {
    const w = getEmbeddedWallet();
    let requestId = 0;

    if (!w) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      throw 0;
    }

    if (!w.ss.networks.length) {
      abort('NO_POLKADOT_NETWORKS');
      throw 0;
    }

    return {
      signer: {
        signPayload: async payload => {
          const id = ++requestId;

          if (!w) {
            abort('OASIS_WALLET_NOT_INITIALIZED');
            return {
              id,
              signature: '0x',
            };
          }

          const res = await w.ss.signTransaction({
            tx: undefined as any,
            /**
             * @TODO add back once done testing in sdk
             */
            // mustConfirm: true,
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
          const id = ++requestId;

          if (!w) {
            abort('OASIS_WALLET_NOT_INITIALIZED');
            return {
              id,
              signature: '0x',
            };
          }

          const signature = await w.signMessage({
            message: payload.address,
            authData: { walletType: WalletType.SUBSTRATE, username: w?.user.username },
            /**
             * @TODO add back once done testing in sdk
             */
            // mustConfirm: true,
          });

          return {
            id,
            signature,
            // signedTransaction: '',
          };
        },
      },

      /**
       * Ref:
       * - polkadot/extension: extension-base/src/page/Accounts.ts
       * - polkadot/extension: extension-base/src/background/handlers/Extension.ts
       */
      accounts: {
        get: async () => {
          let n = 1;
          // retry for max 2.5s
          while (!w?.ss.userWallets.length && n < 50) {
            await new Promise(resolve => setTimeout(resolve, 50));
            n++;
          }
          return w?.ss?.userWallets || [];
        },
        // polkadot extension event stuff? ignore
        subscribe: _cb => {
          console.info('accounts subscribe');
          return () => {
            console.info('accounts unsubscribe');
          };
        },
      },
    };
  }
}

export { EmbeddedPolkadotInject };
export default EmbeddedPolkadotInject;
