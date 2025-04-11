import { useEffect, useState } from 'react';
import {
  AccountWallet,
  AccountWalletTypes,
  AuthStrategyName,
  Events,
  WalletType,
} from '@apillon/wallet-sdk';
import useWallet from './useWallet';

export function useAccount() {
  const { wallet } = useWallet();

  const [info, setInfo] = useState({
    username: '',
    activeWallet: undefined as AccountWallet | undefined,
    authStrategy: 'passkey' as AuthStrategyName,
    walletType: WalletType.EVM as AccountWalletTypes,
  });

  useEffect(() => {
    const onDataUpdated = ({ name, newValue }: Events['dataUpdated']) => {
      if (name === 'username') {
        setInfo(i => ({ ...i, username: newValue }));
      } else if (name === 'walletIndex') {
        setInfo(i => ({ ...i, activeWallet: wallet.getCurrentWallet() }));
      } else if ((name === 'walletsSS' || name === 'walletsEVM') && newValue.length) {
        setInfo(i => ({ ...i, activeWallet: wallet.getCurrentWallet() }));
      } else if (name === 'authStrategy') {
        setInfo(i => ({ ...i, authStrategy: newValue }));
      }
    };

    if (wallet) {
      setInfo({
        username: wallet.user.username,
        activeWallet: wallet.getCurrentWallet(),
        authStrategy: wallet.user.authStrategy,
        walletType: wallet.user.walletType,
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
