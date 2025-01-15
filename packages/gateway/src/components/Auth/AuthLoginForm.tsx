import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import AuthTitle from './AuthTitle';

export default () => {
  // const {
  //   state: { appProps },
  //   setStateValue: setForWallet,
  // } = useWalletContext();

  const {
    state: { username, loading },
    setStateValue: setForAuth,
    onAuth,
  } = useAuthContext();

  return (
    <>
      <AuthTitle
        title="Sign in or Sign up"
        description="Enter your e-mail to initialize a passkey through your email address."
      />

      <form onSubmit={ev => onAuth(false, ev)}>
        <Input
          type="email"
          placeholder="your e-mail"
          value={username}
          className="w-full mb-6"
          onChange={ev => setForAuth('username', ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Continue
        </Btn>
      </form>
    </>
  );
};
