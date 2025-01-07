import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';

export default () => {
  const {
    wallet,
    state: { username },
  } = useWalletContext();

  const {
    state: { messageToSign, approveParams },
  } = useApproveContext();

  return (
    <>
      <div>
        <h3 className="mb-6">Sign Message</h3>

        <p className="text-xs font-bold mb-1">You are signing:</p>
        <p className="break-all">{messageToSign}</p>
      </div>

      <ApproveButtons
        onApprove={async () => {
          if (approveParams?.signature) {
            await wallet?.signMessage({
              ...approveParams.signature,
              authData: { username: username },
            });
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
