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
        <div className="inline-block opacity-50 hover:opacity-100">
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
          <div className="mb-8">
            <h3 className="mb-2">Transactions</h3>
            <WalletTransactions />
          </div>

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
      <h2 className="break-all mb-1">Hi, {state.username}</h2>

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
