import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';

const ExcludedTxKeys = ['data', 'gasLimit', 'nonce', 'maxFeePerGas', 'gasPrice'];

export default () => {
  const {
    wallet,
    state: { username, appProps },
    formatNativeBalance,
  } = useWalletContext();

  const {
    state: { txToConfirm, approveParams },
  } = useApproveContext();

  if (!txToConfirm) {
    return <></>;
  }

  return (
    <div className="flex flex-col min-h-full pb-2">
      <h3 className="my-6">Approve Transaction</h3>

      <div className="flex flex-col gap-4 mb-6">
        {Object.entries(txToConfirm)
          .filter(([k, v]) => {
            if (k === 'data' && v !== '0x') {
              return true;
            }

            return !ExcludedTxKeys.includes(k);
          })
          .map(([k, v]) => (
            <ApproveDataRow
              key={k}
              label={k}
              data={
                k === 'value'
                  ? formatNativeBalance(v)
                  : typeof v === 'bigint'
                    ? v.toString()
                    : typeof v === 'object'
                      ? JSON.stringify(
                          v,
                          (_, value) => (typeof value === 'bigint' ? value.toString() : value),
                          2
                        )
                      : v
              }
              collapsable={typeof v === 'object'}
            />
          ))}
      </div>

      <div className="grow"></div>

      <ApproveButtons
        onApprove={async () => {
          if (approveParams?.plain) {
            const res = await wallet?.signPlainTransaction({
              ...approveParams.plain,
              authData: { username: username },
            });

            if (appProps.broadcastAfterSign && res) {
              const { signedTxData, chainId } = res;
              await wallet?.broadcastTransaction(
                signedTxData,
                chainId,
                approveParams.plain.label || 'Transaction'
              );
            }
          } else {
            const err = new Error('Embedded wallet approve');
            err.name = 'no approve data';
            throw err;
          }
        }}
      />
    </div>
  );
};
