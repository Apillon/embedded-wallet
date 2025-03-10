import { ethers } from 'ethers';
import { useApproveContext } from '../../contexts/approve.context';
import { useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { formatBalance, formatTxObjectData } from '../../lib/helpers';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';

const ExcludedTxKeys = [
  'data',
  'gasLimit',
  'nonce',
  'maxFeePerGas',
  'gasPrice',
  'maxFeePerBlobGas',
  'maxPriorityFeePerGas',
  'chain', // viem
  'blobs', // viem
  'accessList', // viem
  'authorizationList', // viem
  'nonceManager', // viem
  'type', // viem
];

export default function ApprovePlainTx() {
  const {
    wallet,
    state: { username, appProps },
    handleSuccess,
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

      <PlainTxContent />

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

/**
 *
 * @param isToken Format value for ERC20 token -- get it from tokens context (selectedToken)
 */
export const PlainTxContent = ({
  tx,
  isToken,
}: {
  tx?: ethers.TransactionLike<ethers.AddressLike>;
  isToken?: boolean;
}) => {
  const { networksById } = useWalletContext();

  const {
    state: { txToConfirm: txFromState },
  } = useApproveContext();

  const txToConfirm = tx || txFromState;

  if (!txToConfirm) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      {Object.entries(txToConfirm)
        .filter(([k, v]) => {
          if (k === 'data' && v !== '0x') {
            return true;
          }

          if (k === 'value' && !v) {
            return false;
          }

          return !ExcludedTxKeys.includes(k);
        })
        .map(([k, v]) => (
          <ApproveDataRow
            key={k}
            label={k}
            data={
              k === 'value' || k === 'gas' ? (
                <ValueWithUSD value={v} isToken={isToken} />
              ) : k === 'chainId' ? (
                `${v}${networksById[v] ? ` (${networksById[v].name})` : ''}`
              ) : typeof v === 'bigint' ? (
                v.toString()
              ) : typeof v === 'object' ? (
                formatTxObjectData(v)
              ) : (
                v
              )
            }
            collapsable={typeof v === 'object' || k === 'data'}
            copyable={k === 'to'}
          />
        ))}
    </div>
  );
};

const ValueWithUSD = ({ value, isToken }: { value: any; isToken?: boolean }) => {
  const { formatNativeBalance, currentExchangeRate, selectedToken } = useTokensContext();

  let b = { amount: '0', symbol: 'ETH' };

  if (isToken && selectedToken) {
    b = {
      amount: ethers.formatUnits(value, selectedToken.decimals),
      symbol: selectedToken.symbol,
    };
  } else {
    b = formatNativeBalance(value);
  }

  return (
    <p className="text-right">
      <span>
        {b.amount} {b.symbol}
      </span>

      <br />

      {!!currentExchangeRate && (
        <span className="text-lightgrey">
          ${formatBalance(+b.amount * currentExchangeRate, '', 2)}
        </span>
      )}
    </p>
  );
};
