import { ethers } from 'ethers';

export default function WalletApprove({
  tx,
  onApprove,
  onDecline,
}: {
  tx: ethers.TransactionLike;
  onApprove: () => void;
  onDecline: () => void;
}) {
  return (
    <>
      <p>test</p>
      <hr />
      <pre>
        {JSON.stringify(
          tx,
          (_, value) => (typeof value === 'bigint' ? value.toString() : value),
          2
        )}
      </pre>
      <hr />
      <button onClick={onApprove}>Approve tx</button>
      <button onClick={onDecline}>Decline</button>
    </>
  );
}
