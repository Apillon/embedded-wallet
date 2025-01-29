import clsx from 'clsx';
import { useWalletContext } from '../../contexts/wallet.context';
import { formatBalance, shortHash } from '../../lib/helpers';
import Btn from '../ui/Btn';
import { useEffect, useState } from 'react';
import InputSearch from '../ui/InputSearch';
import { useTokensContext } from '../../contexts/tokens.context';

export default () => {
  const {
    wallet,
    state: { accountWallets, walletIndex },
    dispatch,
    setScreen,
    reloadAccountBalances,
    goScreenBack,
  } = useWalletContext();

  const { selectedToken, currentExchangeRate } = useTokensContext();

  const [search, setSearch] = useState('');

  useEffect(() => {
    reloadAccountBalances(accountWallets.map(x => x.address));
  }, []);

  return (
    <div className="pb-2 min-h-full flex flex-col">
      <InputSearch value={search} onChange={ev => setSearch(ev)} className="my-6" />

      <div className="flex flex-col gap-3 mb-6">
        {accountWallets
          .filter(aw => aw.title.toLowerCase().includes(search.toLowerCase()))
          .map(aw => (
            <button
              key={aw.address}
              className={clsx(
                'oaw-button-plain !bg-primarylight !px-3 !py-2 !rounded-md',
                '!border !border-solid border-brightdark hover:border-lightgrey !transition-colors',
                '!flex justify-between items-center',
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
                goScreenBack();
              }}
            >
              <div className="text-left">
                <p className="text-sm font-bold text-offwhite mb-1.5">{aw.title}</p>

                <p title={aw.address} className="text-xs text-lightgrey">
                  {shortHash(aw.address)}
                </p>
              </div>

              <div className="text-xs text-offwhite text-right">
                <p>
                  {!!currentExchangeRate ? (
                    `$${formatBalance(+aw.balance * currentExchangeRate, '', 2)}`
                  ) : (
                    <>&nbsp;</>
                  )}
                </p>

                <p>{formatBalance(aw.balance, selectedToken.symbol)}</p>
              </div>
            </button>
          ))}
      </div>

      <div className="grow"></div>

      <Btn variant="primary" className="w-full mb-2" onClick={() => setScreen('addAccount')}>
        Add new account
      </Btn>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('importAccount')}>
        Import private key into new account
      </Btn>
    </div>
  );
};
