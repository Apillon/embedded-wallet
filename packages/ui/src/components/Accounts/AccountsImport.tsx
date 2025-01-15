import { useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';
import MsgSuccess from '../ui/MsgSuccess';

export default function AccountsImport() {
  const { wallet, goScreenBack, handleError } = useWalletContext();
  const [type, setType] = useState('pk');
  const [title, setTitle] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function importAccount() {
    if (loading || !privateKey || !title) {
      return;
    }

    setLoading(true);

    try {
      await wallet?.addAccountWallet({
        title,
        privateKey: !privateKey.startsWith('0x') ? `0x${privateKey}` : privateKey,
        // walletType??
      });

      setSuccess(true);
      setTitle('');
      setPrivateKey('');
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  return (
    <div className="pt-10 pb-2 min-h-full flex flex-col">
      <p className="text-sm font-normal mb-6 text-center">
        Import your private key from an existing account
      </p>

      <Select
        value={type}
        options={[
          { label: 'Select type', value: '' },
          { label: 'Private Key', value: 'pk' },
          // { label: 'JSON File', value: 'json' },
        ]}
        className="w-full mb-6"
        onChange={ev => setType(ev.target.value)}
      />

      <Input
        value={privateKey}
        placeholder="Enter your private key string here"
        className="mb-6"
        onChange={ev => setPrivateKey(ev.target.value)}
      />

      <Input
        value={title}
        placeholder="Enter name (for personal reference)"
        className="mb-6"
        onChange={ev => setTitle(ev.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Btn variant="ghost" onClick={() => goScreenBack()}>
          Cancel
        </Btn>

        <Btn variant="primary" loading={loading} onClick={() => importAccount()}>
          Import
        </Btn>
      </div>

      {!!success && <MsgSuccess text="Account imported" className="my-6" />}

      <div className="grow"></div>

      {!!success && (
        <Btn variant="ghost" onClick={() => goScreenBack()}>
          Done
        </Btn>
      )}
    </div>
  );
}
