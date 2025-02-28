import { useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';

export default function AccountsImport() {
  const {
    state: { accountWallets, stagedWalletsCount },
    wallet,
    goScreenBack,
    handleError,
    handleSuccess,
    setStateValue: setForWallet,
  } = useWalletContext();
  const [type, setType] = useState('pk'); // used in <Select />
  const [title, setTitle] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function importAccount() {
    if (loading || !privateKey || !title) {
      return;
    }

    setLoading(true);
    handleError();

    try {
      const predictedIndex =
        accountWallets[accountWallets.length - 1].index + 1 + stagedWalletsCount;

      // Save wallet name to tx metadata
      // When updating also check <AccountsAdd />
      await wallet?.addAccountWallet({
        privateKey: !privateKey.startsWith('0x') ? `0x${privateKey}` : privateKey,
        internalLabel: 'accountsImport',
        internalData: JSON.stringify({
          index: predictedIndex,
          title,
        }),
        // walletType??
      });

      // saveAccountTitle(title, predictedIndex);

      setForWallet('walletsCountBeforeStaging', accountWallets.length);
      setForWallet('stagedWalletsCount', stagedWalletsCount + 1);

      setSuccess(true);
      handleSuccess('Account imported. Wait for transaction to complete.');
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
        type="password"
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

      <div className="grow"></div>

      {!!success && (
        <Btn variant="ghost" onClick={() => goScreenBack()}>
          Done
        </Btn>
      )}
    </div>
  );
}
