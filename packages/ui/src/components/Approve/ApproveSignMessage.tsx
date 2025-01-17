import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';

export default () => {
  const {
    wallet,
    state: { username },
  } = useWalletContext();

  const {
    state: { messageToSign, approveParams },
  } = useApproveContext();

  return (
    <div className="flex flex-col min-h-full pb-2">
      <h3 className="my-6">Sign Message</h3>

      <ApproveDataRow label="Signing" data={messageToSign} className="mb-6" />

      <div className="grow"></div>

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
    </div>
  );
};
