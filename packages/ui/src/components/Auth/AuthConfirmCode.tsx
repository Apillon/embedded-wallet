import { useEffect, useRef, useState } from 'react';
import IconBird from '../ui/Icon/IconBird';
import Btn from '../ui/Btn';
import AuthTitle from './AuthTitle';
import { useAuthContext } from '../../contexts/auth.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { WebStorageKeys } from '../../lib/constants';

export default () => {
  const { wallet, handleError } = useWalletContext();
  const {
    state: { loading, username, lastCodeExpiretime },
    setStateValue: setForAuth,
    startRegister,
    sendConfirmationEmail,
  } = useAuthContext();

  const [code, setCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (code.length === 6 && !/\s/.test(code)) {
      onConfirm(code);
    }
  }, [code]);

  // #region code inputs
  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;

    // if (/^[^\d]$/.test(input.value)) {
    //   input.value = '';
    //   return;
    // }

    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = inputRefs.map((_, i) => code[i] || ' ');
    newCode[index] = input.value;
    setCode(newCode.join(''));

    input.select();

    if (input.value === '') {
      // If the value is deleted, select previous input, if exists
      if (previousInput?.current) {
        previousInput.current.focus();
      }
    } else if (nextInput?.current) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      e.preventDefault();

      setCode(prevCode => prevCode.slice(0, index) + ' ' + prevCode.slice(index + 1));

      if (previousInput?.current) {
        previousInput.current.focus();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pastedCode = e.clipboardData.getData('text');

    if (pastedCode.length === 6) {
      setCode(pastedCode);

      inputRefs.forEach((inputRef, index) => {
        if (inputRef?.current) {
          inputRef.current.value = pastedCode.charAt(index);
        }
      });
    }
  }
  // #endregion

  // #region submit
  async function onConfirm(code: string) {
    setForAuth('loading', true);
    handleError();

    try {
      /**
       * Code check
       */
      const { data } = await (
        await fetch(
          `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/otp/validate`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: username,
              code,
            }),
          }
        )
      ).json();

      let expireTs = lastCodeExpiretime;

      if (!expireTs) {
        expireTs = +((await wallet?.xdomain?.storageGet(WebStorageKeys.OTP_EXPIRATION, true)) || 0);
      }

      if (!data && !!expireTs && Date.now() > expireTs) {
        setIsExpired(true);
        throw new Error('Verification code is not valid.');
      }

      if (!data) {
        throw new Error('Verification code is not valid.');
      }

      // hashedUsername.current = await getHashedUsername(username);
      setForAuth('screen', 'codeSubmitted');

      await new Promise(resolve => setTimeout(resolve, 333));
      setForAuth('screen', 'configuringPasskey');
      startRegister();
    } catch (e) {
      handleError(e, 'confirmEmail');
      setForAuth('loading', false);
    }
  }

  async function onSendAgain() {
    setForAuth('loading', true);
    handleError();

    if (await sendConfirmationEmail()) {
      setResendCooldown(true);
      setTimeout(() => setResendCooldown(false), 30000);
    }

    setForAuth('loading', false);
  }
  // #endregion

  return (
    <>
      <AuthTitle
        title={isExpired ? 'Code expired' : 'Check your email'}
        description={
          isExpired
            ? 'Please resend a confirmation code to your email.'
            : 'We have just sent a confirmation code to your email. Paste the code below to proceed with account creation.'
        }
        header={!isExpired ? <IconBird className="mx-auto" /> : undefined}
        titleClass={isExpired ? 'text-red' : ''}
      />

      {!!isExpired && (
        <Btn
          variant="primary"
          disabled={loading || resendCooldown}
          className="w-full mb-6"
          onClick={() => onSendAgain()}
        >
          Send again
        </Btn>
      )}

      <p className="mb-6 font-bold text-center">Enter the 6-digit code you received</p>

      <div className="flex gap-2 mb-6 justify-center">
        {[0, 1, 2, 3, 4, 5].map(x => (
          <input
            ref={inputRefs[x]}
            key={x}
            type="text"
            maxLength={1}
            autoFocus={x === 0}
            disabled={loading}
            className="min-w-0 w-[3.25rem] h-16 px-2 text-center rounded-lg border border-brightdark font-bold focus:border-lightgrey"
            onFocus={ev => ev.target.select()}
            onKeyDown={ev => handleKeyDown(ev, x)}
            onPaste={ev => handlePaste(ev)}
            onChange={ev => handleInput(ev, x)}
          />
        ))}
      </div>

      <p className="text-lightgrey text-xs mb-3 text-center">Didn't receive an email?</p>

      {!isExpired && (
        <Btn
          variant="ghost"
          disabled={loading || resendCooldown}
          className="w-full"
          onClick={() => onSendAgain()}
        >
          Send again
        </Btn>
      )}

      {!!resendCooldown && <p className="mt-2">Email sent!</p>}
    </>
  );
};
