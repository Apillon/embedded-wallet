import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import AuthEnvironmentPicker from './AuthEnvironmentPicker';
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
      <AuthTitle title="Sign in or sign up" description="Enter your email to set up your passkey" />

      <form onSubmit={ev => onAuth(false, ev)}>
        <AuthEnvironmentPicker className="mb-2" />

        <Input
          type="email"
          placeholder="your email"
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
