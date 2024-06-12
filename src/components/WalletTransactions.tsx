import { useState } from 'react';
import { TransactionItem } from '../../lib/types';
import { useTransactionsContext } from '../contexts/transactions.context';
import { useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import clsx from 'clsx';

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
  const [copied, setCopied] = useState(false);
  let copiedTimeout = null as any;

  function onCopy(val: string) {
    navigator.clipboard.writeText(val);

    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }

    setCopied(true);
    copiedTimeout = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-md bg-offwhite/5 px-2 py-1">
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">{tx.label}</span>

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
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </span>

        <span className="text-xs">
          {new Date(tx.createdAt).toISOString().slice(0, -5).replace('T', ' ')}
        </span>
      </div>
    </div>
  );
}
