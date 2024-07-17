import { TransactionItem } from '@oasis-app-wallet/sdk';
import { useTransactionsContext } from '../contexts/transactions.context';
import { useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import clsx from 'clsx';
import useCopyToClipboard from '../hooks/useCopyToClipboard';

export default function WalletTransactions() {
  const {
    state: { address },
  } = useWalletContext();
  const { state } = useTransactionsContext();

  if (!address || !state.txs[address]) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-col gap-1 max-h-[134px] overflow-auto pr-2">
        {Object.values(state.txs[address])
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          .map(tx => (
            <Transaction key={tx.hash} tx={tx} />
          ))}
      </div>
    </div>
  );
}

function Transaction({ tx }: { tx: TransactionItem }) {
  const { text: copyText, onCopy } = useCopyToClipboard();

  return (
    <div className="rounded-md bg-offwhite/5 px-2 py-1">
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">
          <a
            href={tx.explorerUrl || '#'}
            target="_blank"
            title="View on explorer"
            className="rounded-sm"
          >
            {tx.label}
            &nbsp; &#8599;
          </a>
        </span>

        <span
          className={clsx('text-sm', {
            'text-[#FF6188]': tx.status === 'failed',
            'text-[#A9DC76]': tx.status === 'confirmed',
            'text-[#F7AF39]': tx.status === 'pending',
          })}
        >
          {tx.status}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <span className="text-sm">
          {shortHash(tx.hash)}{' '}
          <button className="text-xs" onClick={() => onCopy(tx.hash)}>
            {copyText}
          </button>
        </span>

        <span className="text-xs">
          {new Date(tx.createdAt).toISOString().slice(0, -5).replace('T', ' ')}
        </span>
      </div>
    </div>
  );
}
