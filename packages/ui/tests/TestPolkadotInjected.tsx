import { getEmbeddedWallet } from '@apillon/wallet-sdk';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';

export default function TestPolkadotInjected() {
  return (
    <div>
      <div className="row">
        <button
          onClick={async () => {
            await web3Enable('my cool dapp');

            const allAccounts = await web3Accounts();

            const account = allAccounts.find(a => a.meta.source === 'apillon-embedded-wallet');

            if (!account) {
              return;
            }
            const injector = await web3FromSource(account.meta.source);

            const signRaw = injector?.signer?.signRaw;

            if (!!signRaw) {
              console.log(
                await signRaw({
                  address: account.address,
                  data: stringToHex('message to sign'),
                  type: 'bytes',
                })
              );
            }
          }}
        >
          Test polka sign
        </button>

        <button
          onClick={async () => {
            await web3Enable('my cool dapp');

            const w = getEmbeddedWallet();
            const api = await w?.ss.getApiForNetworkId();

            if (!api) {
              console.error('no polkadot api');
              return;
            }

            const allAccounts = await web3Accounts();

            const account = allAccounts.find(a => a.meta.source === 'apillon-embedded-wallet');

            if (!account) {
              return;
            }

            const injector = await web3FromSource(account.meta.source);

            const transferExtrinsic = api.tx.balances.transferAllowDeath(
              '5H6Ym2FDEn8u5sfitLyKfGRMMZhmp2u855bxQBxDUn4ekhbK',
              0.01 * 1e12
            );

            transferExtrinsic
              .signAndSend(
                account.address,
                { signer: injector.signer, withSignedTransaction: true },
                ({ status }) => {
                  if (status.isInBlock) {
                    console.log(`Completed at block hash #${status.asInBlock.toString()}`);
                  } else {
                    console.log(`Current status: ${status.type}`);
                  }
                }
              )
              .catch((error: any) => {
                console.log(':( transaction failed', error);
              });
          }}
        >
          Test polka tx
        </button>
      </div>
    </div>
  );
}
