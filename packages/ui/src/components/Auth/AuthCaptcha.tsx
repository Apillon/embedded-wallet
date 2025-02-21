import { useState } from 'react';
import { useAuthContext } from '../../contexts/auth.context';
import Btn from '../ui/Btn';
import IconCheckmark from '../ui/Icon/IconCheckmark';
import AuthCaptchaInput from './AuthCaptchaInput';
import AuthTitle from './AuthTitle';
import Loader from '../ui/Loader';

export default function AuthCaptcha() {
  const [isReady, setIsReady] = useState(false);

  const {
    state: { loading, captcha },
    setStateValue: setForAuth,
    sendConfirmationEmail,
    onRegister,
  } = useAuthContext();

  return (
    <>
      {!!isReady && (
        <AuthTitle
          title="Verify you are human"
          description="Please complete the captcha"
          header={<IconCheckmark className="mx-auto" />}
        />
      )}

      {!isReady && <AuthTitle title="" header={<Loader size={56} />} />}

      <form
        className="text-center mb-6"
        onSubmit={ev => {
          ev.preventDefault();
        }}
      >
        <AuthCaptchaInput
          onInitialized={() => setIsReady(true)}
          onVerified={async t => {
            setForAuth('loading', true);

            if (await sendConfirmationEmail(t)) {
              onRegister();
            } else {
              setForAuth('screen', 'loginForm');
            }

            setForAuth('loading', false);
          }}
        />
      </form>

      {!!isReady && (
        <Btn
          variant="ghost"
          disabled={!captcha}
          loading={loading}
          className="w-full"
          onClick={async () => {
            setForAuth('loading', true);

            if (await sendConfirmationEmail()) {
              onRegister();
            } else {
              setForAuth('screen', 'loginForm');
            }

            setForAuth('loading', false);
          }}
        >
          Continue
        </Btn>
      )}
    </>
  );
}
