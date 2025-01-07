import { useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';

export default function AccountsImport() {
  const { wallet, setScreen, handleError } = useWalletContext();
  const [type, setType] = useState('pk');
  const [title, setTitle] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  return (
    <div>
      <h3 className="mb-6">Import private key</h3>

      <Select
        value={type}
        label="Select type"
        options={[
          { label: 'Private Key', value: 'pk' },
          { label: 'JSON File', value: 'json' },
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
        placeholder="Enter Account name (for personal reference)"
        className="mb-6"
        onChange={ev => setTitle(ev.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Btn variant="ghost" onClick={() => setScreen('selectAccounts')}>
          Cancel
        </Btn>

        <Btn variant="primary" loading={loading} onClick={() => importAccount()}>
          Import
        </Btn>
      </div>
    </div>
  );
}
