import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';

export default function AccountsRename() {
  const {
    state: { walletIndex },
    wallet,
    handleError,
  } = useWalletContext();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function updateWalletTitle() {
    if (loading || !title) {
      return;
    }

    setLoading(true);

    try {
      await wallet?.updateAccountWalletTitle({
        walletIndex,
        title,
      });
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  return (
    <div>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          updateWalletTitle();
        }}
      >
        <Input
          value={title}
          label="Enter new name"
          placeholder="Enter Account name (for personal reference)"
          className="mb-6"
          onChange={ev => setTitle(ev.target.value)}
        />

        <Btn variant="primary" type="submit" loading={loading} className="w-full">
          Change name
        </Btn>
      </form>
    </div>
  );
}
