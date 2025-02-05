import { useEffect, useState } from 'react';
import { AccountWallet, AuthStrategyName, Events } from '@apillon/wallet-sdk';
import useWallet from './useWallet';

export function useAccount() {
  const { wallet } = useWallet();

  const [info, setInfo] = useState({
    username: '',
    activeWallet: undefined as AccountWallet | undefined,
    authStrategy: 'passkey' as AuthStrategyName,
  });

  // const [username, setUsername] = useState('');
  // const [address, setAddress] = useState('');
  // const [authStrategy, setAuthStrategy] = useState<AuthStrategyName>('passkey');

  useEffect(() => {
    const onDataUpdated = ({ name, newValue }: Events['dataUpdated']) => {
      if (name === 'username') {
        setInfo(i => ({ ...i, username: newValue }));
      } else if (name === 'walletIndex') {
        setInfo(i => ({ ...i, activeWallet: wallet.lastAccount.wallets[newValue] }));
      } else if (name === 'wallets' && newValue.length) {
        setInfo(i => ({ ...i, activeWallet: newValue[wallet.lastAccount.walletIndex] }));
      } else if (name === 'authStrategy') {
        setInfo(i => ({ ...i, authStrategy: newValue }));
      }
    };

    if (wallet) {
      setInfo({
        username: wallet.lastAccount.username,
        activeWallet: wallet.lastAccount.wallets[wallet.lastAccount.walletIndex],
        authStrategy: wallet.lastAccount.authStrategy,
      });

      wallet.events.on('dataUpdated', onDataUpdated);
    }

    return () => {
      if (wallet) {
        wallet.events.off('dataUpdated', onDataUpdated);
      }
    };
  }, [wallet]);

  async function getBalance(networkId = undefined) {
    if (!info.activeWallet) {
      return '0';
    }

    return await wallet?.getAccountBalance(info.activeWallet.address, networkId);
  }

  return {
    info,
    getBalance,
  };
}

export default useAccount;
