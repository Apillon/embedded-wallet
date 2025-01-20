import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { formatTxObjectData } from '../../lib/helpers';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';

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
    <div className="flex flex-col min-h-full pb-2">
      <h3 className="my-6">Contract Transaction</h3>

      {!!contractFunctionData.chainId && !!networksById[contractFunctionData.chainId] && (
        <ApproveDataRow
          label="Chain"
          data={`${contractFunctionData.chainId} (${networksById[contractFunctionData.chainId].name})`}
          className="mb-4"
        />
      )}

      <ApproveDataRow
        label="Contract address"
        data={contractFunctionData.contractAddress}
        className="mb-4"
      />

      <ApproveDataRow
        label="Contract function"
        data={contractFunctionData.contractFunctionName}
        className="mb-4"
      />

      {!!contractFunctionData.contractFunctionValues &&
        !!contractFunctionData.contractFunctionValues.length && (
          <ApproveDataRow
            label="Contract function values"
            data={formatTxObjectData(contractFunctionData.contractFunctionValues)}
            className="mb-4"
            collapsable
          />
        )}

      <div className="grow"></div>

      <ApproveButtons
        className="mt-6"
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
    </div>
  );
};
