import { useMemo, useState } from 'react';
import { WalletScreens, useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import Btn from './Btn';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTransactions from './WalletTransactions';
import WalletTokens from './WalletTokens';
import { TokensProvider } from '../contexts/tokens.context';

export default function WalletMain() {
  const { state, dispatch, networksById, setScreen, handleError } = useWalletContext();

  const back = useMemo<{ key: WalletScreens; label: string }>(() => {
    if (state.walletScreen === 'main') {
      return { key: 'networks', label: 'Change' };
    }

    if (state.walletScreen === 'selectToken') {
      return { key: 'sendToken', label: 'Back' };
    }
    return { key: 'main', label: 'Back' };
  }, [state.walletScreen]);

  return (
    <div>
      {/* Selected network + trigger change screen to network select */}
      <div className="text-center -mt-4 sm:-mt-8 mb-4">
        <div className="inline-block">
          <p>
            {!!state.networkId && !!networksById[state.networkId]
              ? networksById[state.networkId].name
              : 'No network'}
          </p>

          <p>
            <button className="text-sm" onClick={() => setScreen(back.key)}>
              {back.label}
            </button>
          </p>
        </div>
      </div>

      {/* Error */}
      {!!state.displayedError && (
        <div className="flex gap-2 justify-between items-start py-2 pl-3 pr-2 break-all text-sm text-white bg-red/75 mb-2 rounded-md">
          {state.displayedError}

          <button
            title="Dismiss"
            className="text-offwhite hover:text-white -mt-0.5 shrink-0"
            onClick={() => handleError()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      )}

      {state.walletScreen === 'main' && (
        <div>
          {/* Account info: username, address, balance */}
          <AccountInfo className="mb-6" />

          {/* Actions: send/receive */}
          <div className="flex gap-4 mb-6">
            <Btn minWidth="0" className="w-full" onClick={() => setScreen('sendToken')}>
              Send
            </Btn>

            <Btn minWidth="0" className="w-full" onClick={() => setScreen('receiveToken')}>
              Receive
            </Btn>
          </div>

          {/* Transactions */}
          <div className="mb-8">
            <h3 className="mb-2">Transactions</h3>
            <WalletTransactions />
          </div>

          <Btn variant="secondary" className="w-full" onClick={() => dispatch({ type: 'reset' })}>
            Disconnect wallet
          </Btn>
        </div>
      )}

      {state.walletScreen === 'networks' && (
        <div>
          <WalletNetworkSelect />
        </div>
      )}

      {['sendToken', 'selectToken', 'receiveToken'].includes(state.walletScreen) && (
        <div>
          <TokensProvider>
            <WalletTokens />
          </TokensProvider>
        </div>
      )}
    </div>
  );
}

function AccountInfo({ className }: { className: string }) {
  const { state } = useWalletContext();

  const [copied, setCopied] = useState(false);
  let copiedTimeout = null as any;

  function onCopy() {
    navigator.clipboard.writeText(state.address);

    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }

    setCopied(true);
    copiedTimeout = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={className}>
      <h2 className="break-all mb-1">Hi, {state.username}</h2>

      <p title={state.address} className="text-xl">
        <span className="mr-2">{shortHash(state.address)}</span>

        <button className="text-sm" onClick={() => onCopy()}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </p>

      <p>{state.balance} ETH</p>
    </div>
  );
}
