import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { formatTxObjectData } from '../../lib/helpers';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';
import { PlainTxContent } from './ApprovePlainTx';

export default () => {
  const {
    wallet,
    state: { username, appProps, networkId },
    networksById,
    handleSuccess,
  } = useWalletContext();

  const {
    state: { contractFunctionData, approveParams },
  } = useApproveContext();

  if (!contractFunctionData) {
    return <></>;
  }

  const isTransfer =
    contractFunctionData.contractFunctionName === 'transfer' &&
    (contractFunctionData?.contractFunctionValues?.length || 0) > 1;

  return (
    <div className="flex flex-col min-h-full pb-2">
      {!isTransfer && (
        <>
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
            copyable
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
        </>
      )}

      {/* If transferring tokens, display details with plain transaction view so it looks the same as native transfer */}
      {!!isTransfer && (
        <>
          <h3 className="my-6">Approve Transaction</h3>

          <PlainTxContent
            tx={{
              chainId: networkId,
              data: '0x',
              to: contractFunctionData.contractFunctionValues![0],
              value: contractFunctionData.contractFunctionValues![1],
            }}
            isToken
          />
        </>
      )}

      <div className="grow"></div>

      <ApproveButtons
        className="mt-6"
        onApprove={async () => {
          if (approveParams?.contractWrite) {
            const res = await wallet?.evm.signContractWrite({
              ...approveParams.contractWrite,
              authData: { username },
            });

            if (appProps.broadcastAfterSign && res) {
              const { signedTxData, chainId } = res;
              await wallet?.evm.broadcastTransaction(
                signedTxData,
                chainId,
                approveParams.contractWrite.label || 'Transaction'
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
};
