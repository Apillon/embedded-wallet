import { EmbeddedWallet, EmbeddedWalletSDK, ErrorMessages } from '@apillon/wallet-sdk';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { isValidUrl } from './helpers';

const GlobalContext = createContext<
  | {
      wallet?: EmbeddedWallet;
      setWallet: (wallet: EmbeddedWallet) => void;
      error: string;
      handleError: (e?: any, src?: string) => string;
    }
  | undefined
>(undefined);

function GlobalProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<EmbeddedWallet>();
  const [error, setError] = useState('');
  const referrerUrl = useRef('');

  /**
   * Initialize Oasis Wallet App SDK
   * & set referrer url
   */
  useEffect(() => {
    if (!wallet) {
      setWallet(EmbeddedWalletSDK());
    }

    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = urlParams.get('ref');

      if (!!isValidUrl(referrer || '')) {
        referrerUrl.current = referrer!;
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        wallet,
        setWallet,
        error,
        handleError: (e?: any, src?: string) => {
          let msg = '';

          if (e) {
            console.error(src ?? '', e);

            if (e?.name) {
              msg = ErrorMessages[e.name];
            }

            if (!msg && e?.error) {
              if (e?.error?.message) {
                msg = e.error.message;
              } else if (typeof e.error === 'string') {
                msg = e.error;
              }
            }

            if (!msg && e?.details) {
              msg = e.details;
            }

            if (!msg && e?.message) {
              msg = e.message;
            }

            if (
              msg &&
              msg !== 'already known' &&
              msg !== 'Request rejected by user' &&
              e?.code !== 4001
            ) {
              setError(msg);
            }
          } else {
            setError('');
          }

          return msg;
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGlobalContext usage must be wrapped with GlobalContext provider.');
  }

  return context;
}

export { GlobalProvider, useGlobalContext };
