import { WalletType } from '@apillon/wallet-sdk';
import { u8aToHex } from '@polkadot/util';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { ethers } from 'ethers6';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/auth.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { WebStorageKeys } from '../../lib/constants';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import Select from '../ui/Select';
import AuthCaptchaInput from './AuthCaptchaInput';
import AuthEnvironmentPicker from './AuthEnvironmentPicker';
import AuthTitle from './AuthTitle';

/**
 * Make a new wallet by providing a private key
 */
export default function AuthImport() {
  const {
    wallet,
    state: { appProps, walletType },
    handleError,
  } = useWalletContext();

  const {
    state: { username, loading, captcha },
    setStateValue: setForAuth,
    sendConfirmationEmail,
    onRegister,
  } = useAuthContext();

  const [type, setType] = useState<'' | 'pk' | 'mnemonic'>(''); // used in <Select />
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    if (walletType === WalletType.SUBSTRATE) {
      setType('mnemonic');
    } else {
      setType('pk');
    }
  }, [walletType]);

  async function onSubmit() {
    if (
      loading ||
      !username ||
      (type === 'pk' && !privateKey) ||
      (type === 'mnemonic' && !mnemonic) ||
      !captcha
    ) {
      return;
    }

    let pk = '';

    try {
      if (type === 'mnemonic') {
        pk = u8aToHex(mnemonicToMiniSecret(mnemonic));
      } else {
        pk = !privateKey.startsWith('0x') ? `0x${privateKey}` : privateKey;
      }

      new ethers.Wallet(pk);
    } catch (e) {
      handleError(
        `Incorrect ${walletType === WalletType.SUBSTRATE ? 'Substrate' : 'EVM'} ${type === 'mnemonic' ? 'mnemonic' : 'private key'}`,
        'AuthImport',
      );
      return;
    }

    setForAuth('loading', true);
    setForAuth('privateKey', pk);
    handleError('');

    try {
      if (await wallet?.userExists(username)) {
        throw new Error('Wallet for email already exists');
      }

      if (await sendConfirmationEmail()) {
        wallet?.xdomain?.storageSet(WebStorageKeys.REGISTER_PK, pk, true);
        await onRegister(true);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      handleError(e, 'AuthImport');
    }

    setForAuth('loading', false);
  }

  return (
    <>
      <AuthTitle
        title="Import another wallet"
        description="Connect using an existing wallet by providing its private key"
      />

      <form
        onSubmit={ev => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <AuthEnvironmentPicker className="mb-6" />

        <Select
          value={type}
          options={[
            { label: 'Select type', value: '' },
            { label: 'Private Key', value: 'pk' },
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
          type="email"
          placeholder={appProps.authFormPlaceholder}
          value={username}
          className="w-full mb-6"
          onChange={ev => setForAuth('username', ev.target.value)}
        />

        <div className="text-center mb-6">
          <AuthCaptchaInput />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Btn variant="ghost" onClick={() => setForAuth('screen', 'loginForm')}>
            Back
          </Btn>

          <Btn
            disabled={
              !username ||
              !captcha ||
              (type === 'pk' && !privateKey) ||
              (type === 'mnemonic' && !mnemonic)
            }
            type="submit"
            variant="primary"
            loading={loading}
          >
            Continue
          </Btn>
        </div>
      </form>
    </>
  );
}
