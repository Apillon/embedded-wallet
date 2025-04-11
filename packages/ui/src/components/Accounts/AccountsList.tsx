import clsx from 'clsx';
import { AccountWalletEx, useWalletContext } from '../../contexts/wallet.context';
import { formatBalance, getSS58Address, shortHash } from '../../lib/helpers';
import Btn from '../ui/Btn';
import { useEffect, useMemo, useState } from 'react';
import InputSearch from '../ui/InputSearch';
import { useTokensContext } from '../../contexts/tokens.context';
import MsgInfo from '../ui/MsgInfo';
import { WalletType } from '@apillon/wallet-sdk';

export default function AccountsList() {
  const {
    state: { accountWallets, isAccountWalletsStale, loadingWallets },
    setScreen,
    reloadAccountBalances,
    loadAccountWallets,
  } = useWalletContext();

  const [search, setSearch] = useState('');

  useEffect(() => {
    reloadAccountBalances(accountWallets.map(x => x.address));
  }, []);

  return (
    <div className="pb-2 min-h-full flex flex-col">
      {!!isAccountWalletsStale && <MsgInfo text="stale" className="mt-6" />}

      <InputSearch value={search} onChange={ev => setSearch(ev)} className="my-6" />

      <div className="flex flex-col gap-3 mb-6">
        {accountWallets
          .filter(aw => aw.title.toLowerCase().includes(search.toLowerCase()))
          .map((aw, index) => (
            <ListItem key={aw.address} aw={aw} index={index} />
          ))}
      </div>

      <div className="grow"></div>

      <Btn variant="primary" className="w-full mb-2" onClick={() => setScreen('addAccount')}>
        Add new account
      </Btn>

      <Btn variant="ghost" className="w-full mb-2" onClick={() => setScreen('importAccount')}>
        Import private key into new account
      </Btn>

      <Btn
        variant="ghost"
        loading={loadingWallets}
        className="w-full"
        onClick={() => loadAccountWallets()}
      >
        Reload accounts
      </Btn>
    </div>
  );
}

function ListItem({ aw, index }: { aw: AccountWalletEx; index: number }) {
  const {
    wallet,
    state: { walletIndex, walletType },
    dispatch,
    goScreenBack,
  } = useWalletContext();

  const { nativeToken, currentExchangeRate } = useTokensContext();

  const address = useMemo(() => {
    if (walletType === WalletType.SUBSTRATE) {
      return getSS58Address(aw.address || '');
    }
    return aw.address || '';
  }, [aw, walletType]);

  return (
    <button
      className={clsx(
        'oaw-button-plain !bg-primarylight !px-3 !py-2 !rounded-md',
        '!border !border-solid border-brightdark hover:border-lightgrey !transition-colors',
        '!flex justify-between items-center',
        {
          '!border-yellow': index === walletIndex,
        }
      )}
      onClick={() => {
        if (index === walletIndex) {
          return;
        }

        wallet?.setAccount({ walletIndex: index });
        dispatch({ type: 'setValue', payload: { key: 'walletIndex', value: index } });
        goScreenBack();
      }}
    >
      <div className="text-left">
        <p className="text-sm font-bold text-offwhite mb-1.5">{aw.title}</p>

        <p title={address} className="text-xs text-lightgrey">
          {shortHash(address)}
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

        <p>{formatBalance(aw.balance, nativeToken.symbol)}</p>
      </div>
    </button>
  );
}
