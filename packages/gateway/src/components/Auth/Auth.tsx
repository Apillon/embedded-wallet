import AuthLoginForm from './AuthLoginForm';
import Logo from '../ui/Logo';
import MsgError from '../ui/MsgError';
import { useGlobalContext } from '../../contexts/global.context';
import { useAuthContext } from '../../contexts/auth.context';
import AuthConfiguringPasskey from './AuthConfiguringPasskey';
import AuthConfirmCode from './AuthConfirmCode';
import AuthCodeSubmitted from './AuthCodeSubmitted';
import clsx from 'clsx';
import AuthTitle from './AuthTitle';
import Btn from '../ui/Btn';

export default ({ className }: { className?: string }) => {
  const { referrer, redirectBack } = useGlobalContext();

  const {
    state: { screen },
  } = useAuthContext();

  function currentScreen() {
    if (!referrer) {
      return (
        <>
          <AuthTitle
            title="Session timed out"
            description="Please try again"
            titleClass="text-red"
          />

          <div>
            <Btn
              className="w-full"
              variant="ghost"
              onClick={() => redirectBack({ username: '', authStrategy: 'passkey', address0: '' })}
            >
              Continue
            </Btn>
          </div>
        </>
      );
    }

    switch (screen) {
      case 'confirmCode':
        return <AuthConfirmCode />;
      case 'codeSubmitted':
        return <AuthCodeSubmitted />;
      case 'configuringPasskey':
        return <AuthConfiguringPasskey />;
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
