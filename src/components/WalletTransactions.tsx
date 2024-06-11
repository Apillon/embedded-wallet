import { useTransactionsContext } from '../contexts/transactions.context';
import { useWalletContext } from '../contexts/wallet.context';

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
      <p>PENDING TX: {JSON.stringify(state.pending)}</p>
      <div>
        <p>TX LIST</p>
        {Object.values(state.txs[address]).map(tx => (
          <p key={tx.hash} className="border border-red-500">
            {tx.label}
            <br />
            {tx.hash}
            <br />
          </p>
        ))}
      </div>
    </div>
  );
}
