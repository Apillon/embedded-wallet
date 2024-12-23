import { useEffect, useRef, useState } from 'react';
import { abort, AuthStrategyName, getHashedUsername } from '@apillon/wallet-sdk';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import { AppProps } from './WalletWidget';
import WalletError from './WalletError';
import IconCheckmark from './IconCheckmark';
import IconBird from './IconBird';
import Spinner from './Spinner';
import clsx from 'clsx';
import Input from './Input';

export default function WalletAuth({
  authFormPlaceholder = 'your e-mail',
  passkeyAuthMode,
  onGatewayRedirect,
}: Pick<AppProps, 'authFormPlaceholder' | 'passkeyAuthMode'> & {
  onGatewayRedirect?: (username?: string) => void;
}) {
  const { wallet, dispatch, defaultNetworkId, handleError, loadAccountWallets } =
    useWalletContext();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeScreen, setIsCodeScreen] = useState(false);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const [isConfiguringPasskey, setIsConfiguringPasskey] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const hashedUsername = useRef<Buffer>();

  /**
   * @param onlyLogin Just check that user has logged in, don't try to register if login fails.
   * @returns `true` if login is successful
   */
  async function onAuth(onlyLogin = false, ev?: React.FormEvent<HTMLFormElement>) {
    ev?.preventDefault();

    if (!username) {
      return;
    }

    setLoading(true);
    handleError();

    try {
      if (await wallet?.userExists(username)) {
        /**
         * Login
         */
        const address = await wallet?.authenticate('passkey', { username });

        if (address) {
          setupUserInfo({
            username,
            authStrategy: 'passkey',
          });

          return true;
        }
      } else if (!onlyLogin) {
        if (await sendConfirmationEmail()) {
          if (passkeyAuthMode === 'tab_form') {
            if (!wallet?.xdomain) {
              throw abort('XDOMAIN_NOT_INIT');
            }

            setIsConfiguringPasskey(true);

            const res = await wallet.xdomain.createViaTab(username);

            if (res) {
              await loadAccountWallets(res.authStrategy, res.username);
              setupUserInfo({ username, authStrategy: 'passkey' });
            }
          } else if (!!onGatewayRedirect) {
            onGatewayRedirect(username);
          } else {
            setIsCodeScreen(true);
          }
        }
      }
    } catch (e) {
      handleError(e, 'onAuth');
    }

    setLoading(false);
  }

  async function sendConfirmationEmail() {
    try {
      /**
       * Apillon email confirmation
       */
      const res = await fetch(
        `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/otp/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: username,
          }),
        }
      );

      if (!res.ok || res.status >= 400) {
        throw new Error('Could not send confirmation email');
      }

      return true;
    } catch (e) {
      handleError(e, 'sendConfirmationEmail');
    }
  }

  async function startRegister() {
    setLoading(true);

    handleError();

    try {
      let res: any;

      if (passkeyAuthMode === 'tab_form') {
        if (!wallet?.xdomain) {
          throw abort('XDOMAIN_NOT_INIT');
        }

        res = await wallet.xdomain.createViaTab(username);
        await loadAccountWallets(res.authStrategy, res.username);
      } else {
        res = await wallet?.register('passkey', { username }, hashedUsername.current);
      }

      if (res) {
        setupUserInfo({ username, authStrategy: 'passkey' });
      }
    } catch (e) {
      handleError(e, 'startRegister');
    }

    setLoading(false);
  }

  async function setupUserInfo({
    username,
    authStrategy,
  }: {
    username: string;
    authStrategy: AuthStrategyName;
  }) {
    // const balance = (await wallet?.getAccountBalance(address)) || '0';

    dispatch({
      type: 'setState',
      payload: {
        walletIndex: 0,
        username,
        authStrategy,
        networkId: defaultNetworkId || undefined,
      },
    });

    await new Promise(resolve => setTimeout(resolve, 50));

    if (wallet?.lastAccount.wallets) {
      dispatch({
        type: 'setValue',
        payload: {
          key: 'accountWallets',
          value: wallet?.lastAccount.wallets,
        },
      });
    }
  }

  if (isConfiguringPasskey) {
    return (
      <div className="text-center mt-2">
        <div className={clsx(['text-center mb-4', { invisible: !loading }])}>
          <Spinner size={56} className="mx-auto" />
        </div>

        <h2 className="mb-2">Configuring passkey</h2>

        <p className="text-sm text-lightgrey mb-6">
          Please complete the passkey configuration with your browser.
        </p>

        <Btn
          variant="ghost"
          disabled={loading}
          className="w-full"
          onClick={async () => {
            /**
             * Check if account exists already (and log in) first
             */
            if (!(await onAuth(true))) {
              startRegister();
            }
          }}
        >
          Retry
        </Btn>

        <WalletError show className="mt-6" />
      </div>
    );
  }

  if (isCodeSubmitted) {
    return (
      <div className="text-center mt-2">
        <div className="text-center">
          <IconCheckmark className="mx-auto" />
        </div>

        <h2 className="mb-2">Email succesfully confirmed</h2>

        <p className="text-sm text-lightgrey mb-6">Passkey configuration can now start.</p>

        <Btn
          variant="primary"
          disabled={loading}
          className="w-full"
          onClick={() => {
            setIsConfiguringPasskey(true);
            startRegister();
          }}
        >
          Configure passkey
        </Btn>
      </div>
    );
  }

  if (isCodeScreen) {
    return (
      <>
        <ConfirmEmail
          loading={loading}
          resendCooldown={resendCooldown}
          onConfirm={async code => {
            setLoading(true);
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

              if (!data) {
                throw new Error('Verification code is not valid.');
              }

              hashedUsername.current = await getHashedUsername(username);
              setIsCodeSubmitted(true);

              await new Promise(resolve => setTimeout(resolve, 333));
              setIsConfiguringPasskey(true);
              startRegister();
            } catch (e) {
              handleError(e, 'confirmEmail');
              setLoading(false);
            }
          }}
          onSendAgain={async () => {
            setLoading(true);
            handleError();

            if (await sendConfirmationEmail()) {
              setResendCooldown(true);
              setTimeout(() => setResendCooldown(false), 30000);
            }

            setLoading(false);
          }}
        />

        <WalletError show className="mt-6" />
      </>
    );
  }

  return (
    <div>
      <h2 className="mb-2">Sign in or Sign up</h2>

      <p className="text-center mb-6 text-sm text-lightgrey">
        Enter your e-mail to initialize a passkey through your email address.
      </p>

      <form onSubmit={ev => onAuth(false, ev)}>
        <Input
          type="email"
          placeholder={authFormPlaceholder}
          value={username}
          className="w-full mb-6"
          onChange={ev => setUsername(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Continue
        </Btn>

        <button
          type="button"
          className="oaw-button-plain mt-3 text-xs text-center w-full rounded-sm opacity-100 hover:opacity-80"
          onClick={() => {
            dispatch({
              type: 'setValue',
              payload: { key: 'displayedError', value: '' },
            });

            if (!username) {
              dispatch({
                type: 'setValue',
                payload: { key: 'displayedError', value: 'Enter your email' },
              });

              return;
            }

            setIsCodeScreen(true);
          }}
        >
          I have a login code
        </button>
      </form>

      <WalletError show className="mt-6" />
    </div>
  );
}

function ConfirmEmail({
  loading,
  resendCooldown,
  onConfirm,
  onSendAgain,
}: {
  loading: boolean;
  resendCooldown: boolean;
  onConfirm: (code: string) => void;
  onSendAgain: () => void;
}) {
  const [code, setCode] = useState('');

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

  return (
    <div className="text-center">
      <div className="text-center mb-4">
        <IconBird className="mx-auto" />
      </div>

      <h2 className="mb-2">Check your email</h2>

      <p className="text-lightgrey text-sm mb-2">
        We have just sent a confirmation code to your email. Paste the code below to proceed with
        account creation.
      </p>

      <p className="mb-6 font-bold">Enter the 6-digit code you received</p>

      <div className="flex gap-2 mb-6 justify-center">
        {[0, 1, 2, 3, 4, 5].map(x => (
          <input
            ref={inputRefs[x]}
            key={x}
            type="text"
            maxLength={1}
            autoFocus={x === 0}
            disabled={loading}
            className="min-w-0 w-[3.25rem] h-16 px-2 text-center rounded-lg border border-brightdark focus:border-lightgrey"
            onFocus={ev => ev.target.select()}
            onKeyDown={ev => handleKeyDown(ev, x)}
            onPaste={ev => handlePaste(ev)}
            onChange={ev => handleInput(ev, x)}
          />
        ))}
      </div>

      <p className="text-lightgrey text-xs mb-3">Didn't receive e-mail?</p>

      <Btn
        variant="ghost"
        disabled={loading || resendCooldown}
        className="w-full"
        onClick={() => onSendAgain()}
      >
        Send again
      </Btn>

      {!!resendCooldown && <p className="mt-2">Email sent!</p>}
    </div>
  );
}
