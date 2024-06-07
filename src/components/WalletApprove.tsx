import { ethers } from 'ethers';

export default function WalletApprove({
  tx,
  signMessage,
  approveText = 'Approve',
  declineText = 'Reject',
  onApprove,
  onDecline,
}: {
  tx?: ethers.TransactionLike;
  signMessage?: string;
  approveText?: string;
  declineText?: string;
  onApprove: () => void;
  onDecline: () => void;
}) {
  return (
    <>
      <p>test</p>
      <hr />
      {!!signMessage && (
        <p>
          You are signing:
          <br />
          {signMessage}
        </p>
      )}
      {!!tx && (
        <pre>
          {JSON.stringify(
            tx,
            (_, value) => (typeof value === 'bigint' ? value.toString() : value),
            2
          )}
        </pre>
      )}
      <hr />
      <button onClick={onApprove}>{approveText}</button>
      <button onClick={onDecline}>{declineText}</button>
    </>
  );
}
