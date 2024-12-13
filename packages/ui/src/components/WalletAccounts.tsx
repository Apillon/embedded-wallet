import clsx from 'clsx';
import { useWalletContext } from '../contexts/wallet.context';
import { shortHash } from '../lib/helpers';
import Btn from './Btn';
import { useEffect } from 'react';

export default function WalletAccounts() {
  const {
    wallet,
    state: { accountWallets, walletIndex },
    dispatch,
    setScreen,
    reloadAccountBalances,
  } = useWalletContext();

  useEffect(() => {
    reloadAccountBalances(accountWallets.map(x => x.address));
  }, []);

  return (
    <div>
      <h3 className="mb-6">Select account</h3>

      <div className="flex flex-col gap-3">
        {accountWallets.map(aw => (
          <button
            key={aw.address}
            className={clsx(
              'oaw-button bg-primarylight px-3 py-2 rounded-md',
              'border border-solid border-primarylight',
              {
                '!border-yellow': aw.index === walletIndex,
              }
            )}
            onClick={() => {
              if (aw.index === walletIndex) {
                return;
              }

              wallet?.setAccount({ walletIndex: aw.index });
              dispatch({ type: 'setValue', payload: { key: 'walletIndex', value: aw.index } });
            }}
          >
            <div>
              <p className="text-sm font-bold text-offwhite mb-1.5">
                {aw.title} -- {aw.balance}
              </p>
              <p className="text-xs text-lightgrey">{shortHash(aw.address)}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-12"></div>

      <Btn variant="primary" className="w-full mb-6" onClick={() => setScreen('addAccount')}>
        Add new account
      </Btn>

      <Btn variant="primary" className="w-full mb-6" onClick={() => setScreen('importAccount')}>
        Import private key into new account
      </Btn>

      <Btn variant="primary" className="w-full mb-6" onClick={() => setScreen('renameAccount')}>
        Rename active account
      </Btn>

      <Btn variant="ghost" className="w-full mb-6" onClick={() => setScreen('reloadAccounts')}>
        Reload accounts
      </Btn>
    </div>
  );
}
