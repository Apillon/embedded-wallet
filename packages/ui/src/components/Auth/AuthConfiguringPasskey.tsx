import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import Loader from '../ui/Loader';
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
        header={loading ? <Loader size={56} /> : <></>}
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
