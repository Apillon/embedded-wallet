import AuthLoginForm from './AuthLoginForm';
import Logo from '../Logo';
import WalletError from '../WalletError';
import { useAuthContext } from '../../contexts/auth.context';

export default ({ className }: { className?: string }) => {
  const {
    state: { screen },
  } = useAuthContext();

  function currentScreen() {
    if (screen === 'configuringPasskey') {
      return <AuthLoginForm />;
    }
    return <AuthLoginForm />;
  }

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <Logo />
      </div>

      {/* 'loginForm' | 'confirmCode' | 'codeSubmitted' | 'configuringPasskey' */}
      {currentScreen()}

      <WalletError show className="mt-6" />
    </div>
  );
};
