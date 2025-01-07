import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';

const ExcludedTxKeys = ['data', 'gasLimit', 'nonce', 'maxFeePerGas', 'gasPrice'];
const preClass = 'bg-offwhite/25 p-3 whitespace-pre-wrap break-all rounded-sm mt-2';

export default () => {
  const {
    wallet,
    state: { username, appProps },
  } = useWalletContext();

  const {
    state: { txToConfirm, approveParams },
  } = useApproveContext();

  if (!txToConfirm) {
    return <></>;
  }

  return (
    <>
      <div>
        <h3 className="mb-6">Approve Transaction</h3>

        {Object.entries(txToConfirm)
          .filter(([k, v]) => {
            if (k === 'data' && v !== '0x') {
              return true;
            }

            return !ExcludedTxKeys.includes(k);
          })
          .map(([k, v]) => (
            <div key={k} className="mb-2 break-all">
              <p className="font-bold text-xs">{k}</p>

              <div
                style={{ maxHeight: '220px' }}
                className="overflow-auto pr-8 -mr-8 sm:pr-12 sm:-mr-12 text-sm"
              >
                {typeof v === 'bigint' ? (
                  v.toString()
                ) : typeof v === 'object' ? (
                  <pre className={preClass}>
                    {JSON.stringify(
                      txToConfirm,
                      (_, value) => (typeof value === 'bigint' ? value.toString() : value),
                      2
                    )}
                  </pre>
                ) : (
                  v
                )}
              </div>
            </div>
          ))}
      </div>

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
    </>
  );
};
