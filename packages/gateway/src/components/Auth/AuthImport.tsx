import { ethers } from 'ethers6';
import { useAuthContext } from '../../contexts/auth.context';
import { useGlobalContext } from '../../contexts/global.context';
import { WebStorageKeys } from '../../helpers';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import AuthTitle from './AuthTitle';

/**
 * Make a new wallet by providing a private key
 */
export default function AuthImport() {
  const { wallet, handleError } = useGlobalContext();

  const {
    state: { username, privateKey, loading, captcha },
    setStateValue: setForAuth,
    sendConfirmationEmail,
    onAuth,
  } = useAuthContext();

  async function onSubmit() {
    if (loading || !username || !privateKey || !captcha) {
      return;
    }

    try {
      new ethers.Wallet(privateKey);
    } catch (e) {
      handleError('Incorrect EVM private key', 'AuthImport');
      return;
    }

    setForAuth('loading', true);
    handleError('');

    try {
      if (await wallet?.userExists(username)) {
        throw new Error('Wallet for email already exists');
      }

      if (await sendConfirmationEmail()) {
        sessionStorage.setItem(WebStorageKeys.REGISTER_PK, privateKey);
        await onAuth(true, undefined, true);
      }
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
        <Input
          value={privateKey}
          placeholder="Enter your private key string here"
          type="password"
          className="mb-6"
          onChange={ev => setForAuth('privateKey', ev.target.value)}
        />

        <Input
          type="email"
          placeholder="your email"
          value={username}
          className="w-full mb-6"
          onChange={ev => setForAuth('username', ev.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <Btn variant="ghost" onClick={() => setForAuth('screen', 'loginForm')}>
            Back
          </Btn>

          <Btn
            disabled={!username || !privateKey || !captcha}
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
