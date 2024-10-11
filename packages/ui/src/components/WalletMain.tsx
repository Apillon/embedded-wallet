import { useMemo } from 'react';
import { WalletScreens, useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import Btn from './Btn';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTransactions from './WalletTransactions';
import WalletTokens from './WalletTokens';
import { TokensProvider } from '../contexts/tokens.context';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import WalletError from './WalletError';

export default function WalletMain() {
  const { wallet, state, dispatch, networksById, setScreen } = useWalletContext();

  const back = useMemo<{ key: WalletScreens; label: string }>(() => {
    if (state.walletScreen === 'main') {
      return { key: 'networks', label: '' };
    }

    if (state.walletScreen === 'selectToken') {
      return { key: 'sendToken', label: 'Back' };
    }
    return { key: 'main', label: 'Back' };
  }, [state.walletScreen]);

  return (
    <div>
      {/* Selected network + trigger change screen to network select */}
      <div className="mb-4 -mt-4">
        <button className="opacity-50 hover:opacity-100" onClick={() => setScreen(back.key)}>
          <span className="!text-sm !text-offwhite">
            {!!state.networkId && !!networksById[state.networkId]
              ? networksById[state.networkId].name
              : 'No network'}
          </span>

          {!!back.label && (
            <span className="flex gap-0.5 items-center !text-xs text-left">
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12H4M4 12L10 6M4 12L10 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {back.label}
            </span>
          )}
        </button>
      </div>

      {/* Error */}
      <WalletError show className="mb-2" />

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
          <WalletTransactions />

          <Btn
            variant="secondary"
            className="w-full"
            onClick={() => {
              dispatch({ type: 'reset' });

              wallet?.setAccount({
                username: '',
                address: '',
                contractAddress: '',
                strategy: 'passkey',
              });
            }}
          >
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
  const { text: copyText, onCopy } = useCopyToClipboard();

  return (
    <div className={className}>
      <h2 className="break-words mb-1">Hi, {state.username}</h2>

      <p title={state.address} className="text-xl">
        <span className="mr-2">{shortHash(state.address)}</span>

        <button className="text-sm" onClick={() => onCopy(state.address)}>
          {copyText}
        </button>
      </p>

      <p>{state.balance} ETH</p>
    </div>
  );
}
