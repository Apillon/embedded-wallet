import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../Btn';
import IconCheckmark from '../IconCheckmark';
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
        variant="primary"
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
