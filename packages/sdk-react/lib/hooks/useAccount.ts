import { useEffect, useState } from 'react';
import { AuthStrategyName, Events } from '@apillon/wallet-sdk';
import useWallet from './useWallet';

export function useAccount() {
  const { wallet } = useWallet();

  const [info, setInfo] = useState({
    username: '',
    address: '',
    authStrategy: 'passkey' as AuthStrategyName,
  });

  // const [username, setUsername] = useState('');
  // const [address, setAddress] = useState('');
  // const [authStrategy, setAuthStrategy] = useState<AuthStrategyName>('passkey');

  useEffect(() => {
    const onDataUpdated = ({ name, newValue }: Events['dataUpdated']) => {
      if (name === 'username') {
        setInfo(i => ({ ...i, username: newValue }));
      } else if (name === 'address') {
        setInfo(i => ({ ...i, address: newValue }));
      } else if (name === 'authStrategy') {
        setInfo(i => ({ ...i, authStrategy: newValue }));
      }
    };

    if (wallet) {
      setInfo({
        username: wallet.lastAccount.username,
        address: wallet.lastAccount.address,
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
    return await wallet?.getAccountBalance(info.address, networkId);
  }

  return {
    info,
    getBalance,
  };
}

export default useAccount;
