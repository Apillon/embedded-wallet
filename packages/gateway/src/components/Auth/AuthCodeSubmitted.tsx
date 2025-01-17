import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import IconCheckmark from '../ui/Icon/IconCheckmark';
import AuthTitle from './AuthTitle';

export default () => {
  const {
    state: { loading },
    setStateValue: setForAuth,
    startRegister,
  } = useAuthContext();
  return (
    <>
      <AuthTitle
        title="Email succesfully confirmed"
        description="Passkey configuration can now start."
        header={<IconCheckmark className="mx-auto" />}
      />

      <Btn
        variant="ghost"
        disabled={loading}
        className="w-full"
        onClick={() => {
          setForAuth('screen', 'configuringPasskey');
          startRegister();
        }}
      >
        Configure passkey
      </Btn>
    </>
  );
};
