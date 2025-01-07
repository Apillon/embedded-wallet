import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import Spinner from '../ui/Spinner';
import AuthTitle from './AuthTitle';

export default () => {
  const {
    state: { loading },
    onAuth,
    startRegister,
  } = useAuthContext();

  return (
    <>
      <AuthTitle
        title="Configuring passkey"
        description="Please complete the passkey configuration with your browser."
        header={loading ? <Spinner size={56} className="mx-auto" /> : <></>}
      />

      <Btn
        variant="ghost"
        disabled={loading}
        className="w-full"
        onClick={async () => {
          /**
           * Check if account already exists (and log in) first
           */
          if (!(await onAuth(true))) {
            startRegister();
          }
        }}
      >
        Retry
      </Btn>
    </>
  );
};
