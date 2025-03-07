import AuthLoginForm from './AuthLoginForm';
import Logo from '../ui/Logo';
import { useAuthContext } from '../../contexts/auth.context';
import AuthConfiguringPasskey from './AuthConfiguringPasskey';
import AuthConfirmCode from './AuthConfirmCode';
import AuthCodeSubmitted from './AuthCodeSubmitted';
import clsx from 'clsx';
import AuthCaptcha from './AuthCaptcha';
import AuthImport from './AuthImport';
import MsgError from '../ui/MsgError';

export default ({ className }: { className?: string }) => {
  const {
    state: { screen },
  } = useAuthContext();

  function currentScreen() {
    switch (screen) {
      case 'confirmCode':
        return <AuthConfirmCode />;
      case 'codeSubmitted':
        return <AuthCodeSubmitted />;
      case 'configuringPasskey':
        return <AuthConfiguringPasskey />;
      case 'captcha':
        return <AuthCaptcha />;
      case 'importWallet':
        return <AuthImport />;
      case 'loginForm':
      default:
        return <AuthLoginForm />;
    }
  }

  return (
    <div className={clsx('p-8 sm:p-12', className)}>
      <div className="text-center mb-12">
        <Logo className="inline-block" />
      </div>

      {currentScreen()}

      <MsgError show className="mt-6" />
    </div>
  );
};
