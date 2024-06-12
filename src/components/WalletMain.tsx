import { useState } from 'react';
import { useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import Btn from './Btn';
import clsx from 'clsx';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTransactions from './WalletTransactions';

export default function WalletMain() {
  const { state, dispatch, networksById } = useWalletContext();

  const [screen, setScreen] = useState<'main' | 'networks' | 'transactions'>('main');

  return (
    <div>
      {/* Selected network + trigger change screen to network select */}
      {!!state.networkId && !!networksById[state.networkId] && (
        <div className="text-center -mt-4 sm:-mt-8 mb-4">
          <div className="inline-block">
            <p>{networksById[state.networkId].name}</p>

            <p>
              <button
                className="text-sm"
                onClick={() => setScreen(screen === 'main' ? 'networks' : 'main')}
              >
                {screen === 'main' ? 'Change' : 'Back'}
              </button>
            </p>
          </div>
        </div>
      )}

      {screen === 'main' && (
        <div>
          {/* Account info: username, address, balance */}
          <AccountInfo className="mb-6" />

          {/* Actions: send/receive */}
          <Actions className="mb-6" />

          {/* Transactions */}
          <div className="mb-12">
            <h3>Transactions</h3>
            <WalletTransactions />
          </div>

          <Btn variant="secondary" className="w-full" onClick={() => dispatch({ type: 'reset' })}>
            Disconnect wallet
          </Btn>
        </div>
      )}

      {screen === 'networks' && (
        <div>
          <WalletNetworkSelect />
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

function Actions({ className }: { className: string }) {
  return (
    <div className={clsx('flex gap-4', className)}>
      <Btn minWidth="0" className="w-full">
        Send
      </Btn>
      <Btn minWidth="0" className="w-full">
        Receive
      </Btn>
      <Btn disabled minWidth="0" className="w-full">
        Buy
      </Btn>
    </div>
  );
}
