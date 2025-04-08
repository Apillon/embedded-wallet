import { WalletType } from '@apillon/wallet-sdk';
import { useApproveContext } from '../../contexts/approve.context';
import { useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';
import { formatSubstrateBalance, formatTxObjectData } from '../../lib/helpers';

export default function ApproveSubstrateTx() {
  const {
    wallet,
    state: { username, appProps },
    handleSuccess,
  } = useWalletContext();

  const {
    state: { approveParams, substrateTxData },
  } = useApproveContext();

  if (!substrateTxData) {
    return <></>;
  }

  return (
    <div className="flex flex-col min-h-full pb-2">
      <h3 className="my-6">Approve Transaction</h3>

      <div className="flex flex-col gap-4 mb-6">
        {!substrateTxData.method && !substrateTxData.section ? (
          <ApproveDataRow
            label="Transaction data"
            data={formatTxObjectData(substrateTxData)}
            collapsable
          />
        ) : (
          Object.entries(substrateTxData)
            .filter(([_k, v]) => !!v)
            .map(([k, v]) => (
              <ApproveDataRow
                key={k}
                label={k}
                data={
                  k === 'value' ? (
                    <Balance amount={v} />
                  ) : typeof v === 'object' ? (
                    JSON.stringify(v, undefined, 2)
                  ) : (
                    v
                  )
                }
                copyable={k === 'address'}
                collapsable={typeof v === 'object'}
              />
            ))
        )}
      </div>

      <div className="grow"></div>

      <ApproveButtons
        onApprove={async () => {
          if (approveParams?.polkadot) {
            const res = await wallet?.ss.signTransaction({
              ...approveParams.polkadot,
              authData: { username: username },
            });

            if (appProps.broadcastAfterSign && res) {
              const { signedTxData, chainId } = res;
              await wallet?.ss.broadcastTransaction(
                signedTxData,
                chainId as string,
                approveParams.polkadot.label || 'Transaction'
              );
            }

            handleSuccess('Transaction submitted', 5000);
          } else {
            const err = new Error('Embedded wallet approve');
            err.name = 'no approve data';
            throw err;
          }
        }}
      />
    </div>
  );
}

const Balance = ({ amount }: { amount: string }) => {
  const {
    state: { walletType },
  } = useWalletContext();
  const { selectedToken } = useTokensContext();

  if (!!selectedToken.assetId || (!selectedToken.address && walletType === WalletType.SUBSTRATE)) {
    amount = formatSubstrateBalance(amount, { decimals: selectedToken.decimals });
  }

  return (
    <p className="text-right">
      {amount} {selectedToken.symbol}
    </p>
  );
};
