import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';

const preClass = 'bg-offwhite/25 p-3 whitespace-pre-wrap break-all rounded-sm mt-2';

export default () => {
  const {
    wallet,
    state: { username, appProps },
    networksById,
  } = useWalletContext();

  const {
    state: { contractFunctionData, approveParams },
  } = useApproveContext();

  if (!contractFunctionData) {
    return <></>;
  }

  return (
    <>
      <div>
        <h3 className="mb-6">Approve Contract Transaction</h3>

        {!!contractFunctionData.chainId && !!networksById[contractFunctionData.chainId] && (
          <div className="mb-3">
            <p className="font-bold text-xs mb-1">Chain</p>
            {networksById[contractFunctionData.chainId].name}
          </div>
        )}

        <div className="mb-3 break-all">
          <p className="font-bold text-xs mb-1">Contract address</p>
          {contractFunctionData.contractAddress}
        </div>

        <div className="mb-3 break-all">
          <p className="font-bold text-xs mb-1">Contract function</p>
          {contractFunctionData.contractFunctionName}
        </div>

        {!!contractFunctionData.contractFunctionValues &&
          !!contractFunctionData.contractFunctionValues.length && (
            <div className="break-all">
              <p className="font-bold text-xs mb-1">Contract function values</p>

              <pre className={preClass}>
                {JSON.stringify(
                  contractFunctionData.contractFunctionValues,
                  (_, value) => (typeof value === 'bigint' ? value.toString() : value),
                  2
                )}
              </pre>
            </div>
          )}
      </div>

      <ApproveButtons
        onApprove={async () => {
          if (approveParams?.contractWrite) {
            const res = await wallet?.signContractWrite({
              ...approveParams.contractWrite,
              authData: { username },
            });

            if (appProps.broadcastAfterSign && res) {
              const { signedTxData, chainId } = res;
              await wallet?.broadcastTransaction(
                signedTxData,
                chainId,
                approveParams.contractWrite.label || 'Transaction'
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
