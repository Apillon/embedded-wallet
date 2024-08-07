import { toAccount } from 'viem/accounts';
import EmbeddedWallet from '..';
import { abort, getEmbeddedWallet } from '../utils';

class EmbeddedViemAdapter {
  address = '';
  wallet: EmbeddedWallet;

  constructor() {
    const w = getEmbeddedWallet();

    if (!w) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
    }

    this.wallet = w!;
  }

  getAccount() {
    return toAccount({
      address: this.wallet.lastAccount.address,

      signMessage: async ({ message }, mustConfirm = false) => {
        const res = await this.wallet.signMessage({
          message: message as any,
          strategy: this.wallet.lastAccount.authStrategy,
          authData: {
            username: this.wallet.lastAccount.username,
          },
          mustConfirm,
        });

        if (res) {
          return res as `0x${string}`;
        }

        return '0x';
      },

      signTransaction: async (transaction, _serializer, mustConfirm = false) => {
        const res = await this.wallet.signPlainTransaction({
          strategy: this.wallet.lastAccount.authStrategy,
          authData: {
            username: this.wallet.lastAccount.username,
          },
          mustConfirm,
          tx: transaction as any,
        });

        if (res) {
          return res.signedTxData;
        }

        return '';
      },

      signTypedData: async typedData => {
        console.error('EmbeddedViemAdapter#signTypedData Not implemented', typedData);
        return '0x';
      },
    });
  }
}

export { EmbeddedViemAdapter };
export default EmbeddedViemAdapter;
