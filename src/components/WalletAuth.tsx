import { useEffect, useRef, useState } from 'react';
import { getOasisAppWallet } from '../../lib/utils';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import { AuthStrategyName } from '../../lib/types';

export default function WalletAuth() {
  const { dispatch, defaultNetworkId } = useWalletContext();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeScreen, setIsCodeScreen] = useState(false);

  async function onAuth(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!username) {
      return;
    }

    const wallet = getOasisAppWallet();

    setLoading(true);

    try {
      if (await wallet?.userExists(username)) {
        /**
         * Login
         */
        const address = await wallet?.authenticate('passkey', { username });

        if (address) {
          setupUserInfo({
            username,
            address: address.publicAddress,
            authStrategy: 'passkey',
          });
        }
      } else {
        /**
         * Register
         * 1. Send email
         * 2. Enter code
         * 3. Setup passkey
         */
        setIsCodeScreen(true);
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  async function setupUserInfo({
    username,
    address,
    authStrategy,
  }: {
    username: string;
    address: string;
    authStrategy: AuthStrategyName;
  }) {
    const wallet = getOasisAppWallet();

    const balance = (await wallet?.getAccountBalance(address)) || '0';

    dispatch({
      type: 'setState',
      payload: {
        address,
        username,
        balance,
        authStrategy,
        networkId: defaultNetworkId || undefined,
      },
    });
  }

  if (isCodeScreen) {
    return (
      <ConfirmEmail
        loading={loading}
        onConfirm={async () => {
          setLoading(true);

          try {
            const wallet = getOasisAppWallet();

            const res = await wallet?.register('passkey', { username });

            if (res) {
              setupUserInfo({ username, address: res.publicAddress, authStrategy: 'passkey' });
            }
          } catch (e) {
            console.error(e);
          }

          setLoading(false);
        }}
      />
    );
  }

  return (
    <div>
      <h2 className="mb-6">Sign in or Sign up</h2>

      <form onSubmit={ev => onAuth(ev)}>
        <input
          placeholder="your e-mail@email.com"
          value={username}
          className="w-full mb-8"
          onChange={ev => setUsername(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Continue
        </Btn>
      </form>
    </div>
  );
}

function ConfirmEmail({
  loading,
  onConfirm,
  onLoading,
}: {
  loading: boolean;
  onConfirm?: (code: string) => void;
  onLoading?: (val: boolean) => void;
}) {
  const [code, setCode] = useState('');
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);

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
      onSubmit();
    }
  }, [code]);

  async function onSubmit() {
    onLoading?.(true);

    try {
      /**
       * @TODO Code check
       */
      console.log(code);

      await new Promise(resolve => setTimeout(resolve, 1337));

      setIsCodeSubmitted(true);

      onConfirm?.(code);
    } catch (e) {
      console.error(e);

      onLoading?.(false);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;

    if (/^[^\d]$/.test(input.value)) {
      input.value = '';
      return;
    }

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

  if (isCodeSubmitted) {
    return (
      <div className="text-center">
        <h2 className="mb-12">Email succesfully confirmed.</h2>

        <p className="text-xl mb-12">Passkey configuration will now start.</p>

        <Btn loading={loading} onClick={() => onConfirm?.(code)}>
          Retry
        </Btn>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p>
        We just sent a confirmation code to your email. Paste the code below to proceed with account
        creation.
      </p>

      <h2 className="my-6">Check your email</h2>

      <p className="mb-6">Enter the 6-digit code you received</p>

      <div className="flex gap-2 mb-12 justify-center">
        {[0, 1, 2, 3, 4, 5].map(x => (
          <input
            ref={inputRefs[x]}
            key={x}
            type="text"
            maxLength={1}
            autoFocus={x === 0}
            disabled={loading}
            className="min-w-0 w-14 h-14"
            onFocus={ev => ev.target.select()}
            onKeyDown={ev => handleKeyDown(ev, x)}
            onPaste={ev => handlePaste(ev)}
            onChange={ev => handleInput(ev, x)}
          />
        ))}
      </div>

      <Btn disabled={loading}>Send again</Btn>
    </div>
  );
}
