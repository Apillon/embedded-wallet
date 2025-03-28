import { ApiPromise, WsProvider } from '@polkadot/api';
import type { SignerPayloadJSON } from '@polkadot/types/types';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { injectExtension } from '@polkadot/extension-inject';
import { Injected, InjectedAccount } from '@polkadot/extension-inject/types';
import pkg from '../../package.json' assert { type: 'json' };
import EmbeddedWallet from '..';
import { abort, getEmbeddedWallet } from '../utils';

class EmbeddedPolkadotAdapter {
  provider!: WsProvider;
  api!: ApiPromise;
  keyring = new Keyring({ type: 'sr25519' });
  accounts: InjectedAccount[] = [];
  requestId = 0;
  wallet: EmbeddedWallet;

  constructor() {
    const w = getEmbeddedWallet();

    if (!w) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
    }

    this.wallet = w!;

    this.initApi();
    injectExtension(this.enableFn, { name: 'Apillon Embedded Wallet', version: pkg.version });
  }

  async initApi() {
    try {
      this.provider = new WsProvider('wss://westend-rpc.polkadot.io');
      this.api = await ApiPromise.create({ provider: this.provider });
    } catch (e) {
      console.error('Could not initialize polkadot api', e);
    }
  }

  // originName is used for extension messaging (window.postMessage)
  async enableFn(_originName: string): Promise<Injected> {
    return {
      signer: {
        signPayload: async payload => {
          const id = ++this.requestId;

          await cryptoWaitReady();

          const mnemonic = mnemonicGenerate();

          const pair = this.keyring.addFromUri(mnemonic, { name: `acc ${id}`, type: 'ed25519' });

          const { signature } = this.api.registry
            .createType('ExtrinsicPayload', payload)
            .sign(pair);

          return {
            id,
            signature,
            signedTransaction: this.createSignedTx(payload, signature),
          };
        },

        signRaw: async payload => {
          const id = ++this.requestId;

          await cryptoWaitReady();

          const mnemonic = mnemonicGenerate();

          const pair = this.keyring.addFromUri(mnemonic, { name: `acc ${id}`, type: 'ed25519' });

          const signature = u8aToHex(pair.sign(payload.data));

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
        get: async () => this.accounts,
        subscribe: _cb => {
          console.log('accounts subscribe');
          return () => {
            console.log('accounts unsubscribe');
          };
        },
      },
    };
  }

  /**
   * @ref https://github.com/paritytech/txwrapper-core/blob/main/packages/txwrapper-core/src/core/construct/createSignedTx.ts
   */
  createSignedTx(unsignedTx: SignerPayloadJSON, signature: `0x${string}`) {
    // import { Metadata } from '@polkadot/types';
    // this.api.registry.setMetadata(new Metadata(this.api.registry, unsignedTx.metadataRpc));

    const extrinsic = this.api.registry.createType(
      'Extrinsic',
      { method: unsignedTx.method },
      { version: unsignedTx.version }
    );

    extrinsic.addSignature(unsignedTx.address, signature, unsignedTx);

    return extrinsic.toHex();
  }
}

export { EmbeddedPolkadotAdapter };
export default EmbeddedPolkadotAdapter;
