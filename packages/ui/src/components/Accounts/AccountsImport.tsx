import { useEffect, useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';
import { WalletType } from '@apillon/wallet-sdk';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

export default function AccountsImport() {
  const {
    state: { accountWallets, stagedWalletsCount, username, walletType },
    wallet,
    goScreenBack,
    handleError,
    handleSuccess,
    setStateValue: setForWallet,
  } = useWalletContext();
  const [type, setType] = useState<'' | 'pk' | 'mnemonic'>(''); // used in <Select />
  const [title, setTitle] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (walletType === WalletType.SUBSTRATE) {
      setType('mnemonic');
    } else {
      setType('pk');
    }
  }, [walletType]);

  async function importAccount() {
    if (loading || !title || (!privateKey && !mnemonic)) {
      return;
    }

    setLoading(true);
    handleError();

    try {
      const predictedIndex =
        accountWallets[accountWallets.length - 1].index + 1 + stagedWalletsCount;

      let pk = '';

      if (type === 'mnemonic') {
        pk = u8aToHex(mnemonicToMiniSecret(mnemonic));
      } else {
        pk = !privateKey.startsWith('0x') ? `0x${privateKey}` : privateKey;
      }

      // Save wallet name to tx metadata
      // When updating also check <AccountsAdd />
      await wallet?.addAccountWallet({
        privateKey: pk,
        authData: { username, walletType },
        internalLabel: 'accountsImport',
        internalData: JSON.stringify({
          index: predictedIndex,
          title,
          walletType,
        }),
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

      <form
        onSubmit={ev => {
          ev.preventDefault();
          importAccount();
        }}
      >
        <Select
          value={type}
          options={[
            { label: 'Select type', value: '' },
            ...(walletType === WalletType.EVM ? [{ label: 'Private Key', value: 'pk' }] : []),
            ...(walletType === WalletType.SUBSTRATE
              ? [{ label: 'Mnemonic', value: 'mnemonic' }]
              : []),
          ]}
          className="w-full mb-6"
          onChange={ev => setType(ev.target.value as any)}
        />

        {type === 'pk' && (
          <Input
            autoFocus
            value={privateKey}
            placeholder="Enter your private key string here"
            type="password"
            className="mb-6"
            onChange={ev => setPrivateKey(ev.target.value)}
          />
        )}

        {type === 'mnemonic' && (
          <Input
            autoFocus
            value={mnemonic}
            placeholder="Enter your seed phrase"
            type="text"
            className="mb-6"
            onChange={ev => setMnemonic(ev.target.value)}
          />
        )}

        <Input
          value={title}
          placeholder="Enter name (for personal reference)"
          className="mb-6"
          onChange={ev => setTitle(ev.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <Btn type="button" variant="ghost" onClick={() => goScreenBack()}>
            Cancel
          </Btn>

          <Btn type="submit" variant="primary" loading={loading}>
            Import
          </Btn>
        </div>
      </form>

      <div className="grow"></div>

      {!!success && (
        <Btn variant="ghost" onClick={() => goScreenBack()}>
          Done
        </Btn>
      )}
    </div>
  );
}
