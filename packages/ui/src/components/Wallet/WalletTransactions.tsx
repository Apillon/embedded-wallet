import { TransactionItem } from '@apillon/wallet-sdk';
import clsx from 'clsx';
import { useTransactionsContext } from '../../contexts/transactions.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { shortHash } from '../../lib/helpers';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import IconCopy from '../ui/IconCopy';
import IconCheckSmall from '../ui/IconCheckSmall';
import dayjs from 'dayjs';

export default function WalletTransactions({ className }: { className?: string }) {
  const { activeWallet } = useWalletContext();
  const { state } = useTransactionsContext();

  if (!activeWallet?.address || !state.txs[activeWallet.address]) {
    return <></>;
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-2 max-h-[278px] overflow-auto pr-2">
        {Object.values(state.txs[activeWallet.address])
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          .map(tx => (
            <Transaction key={tx.hash} tx={tx} />
          ))}
      </div>
    </div>
  );
}

function Transaction({ tx }: { tx: TransactionItem }) {
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  return (
    <div className="rounded-lg bg-primarylight px-4 py-2">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm text-offwhite">
          <a
            href={tx.explorerUrl || '#'}
            target="_blank"
            title="View on explorer"
            className="rounded-sm"
          >
            {tx.label}
          </a>
        </span>

        <span
          className={clsx(
            'font-ibm text-[10px] font-bold text-center uppercase text-deepdark',
            'px-2.5 py-1 min-h-6 rounded-full',
            {
              'bg-[#F00]': tx.status === 'failed',
              'bg-[#A9DC76]': tx.status === 'confirmed',
              'bg-[#F7AF39]': tx.status === 'pending',
            }
          )}
        >
          {tx.status}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <button
          className="text-xs inline-flex items-center oaw-button-plain gap-1"
          onClick={() => onCopy(tx.hash)}
        >
          <span title={tx.hash} className="text-xs text-ellipsis">
            {shortHash(tx.hash)}{' '}
          </span>

          <span className={clsx(['shrink-0 pl-0.5', { 'text-green': copyText === '+' }])}>
            {copyText === '+' ? <IconCheckSmall /> : <IconCopy className="text-lightgrey" />}
          </span>
        </button>

        <span title={new Date(tx.createdAt).toISOString()} className="text-xs text-lightgrey">
          {dayjs(tx.createdAt).format(
            tx.createdAt > dayjs().startOf('day').valueOf() ? 'HH:mm' : 'MMM D, YYYY'
          )}
        </span>
      </div>
    </div>
  );
}
