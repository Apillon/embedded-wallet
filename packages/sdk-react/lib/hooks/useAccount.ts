import { useEffect, useState } from 'react';
import { AuthStrategyName, Events } from '@apillon/wallet-sdk';
import useWallet from './useWallet';

export function useAccount() {
  const { wallet } = useWallet();

  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [authStrategy, setAuthStrategy] = useState<AuthStrategyName>('passkey');

  useEffect(() => {
    const onDataUpdated = ({ name, newValue }: Events['dataUpdated']) => {
      if (name === 'username') {
        setUsername(newValue);
      } else if (name === 'address') {
        setAddress(newValue);
      } else if (name === 'authStrategy') {
        setAuthStrategy(newValue);
      }
    };

    if (wallet) {
      setUsername(wallet.lastAccount.username);
      setAddress(wallet.lastAccount.address);
      setAuthStrategy(wallet.lastAccount.authStrategy);

      wallet.events.on('dataUpdated', onDataUpdated);
    }

    return () => {
      if (wallet) {
        wallet.events.off('dataUpdated', onDataUpdated);
      }
    };
  }, [wallet]);

  async function getBalance(networkId = undefined) {
    return await wallet?.getAccountBalance(address, networkId);
  }

  return {
    username,
    address,
    authStrategy,
    getBalance,
  };
}

export default useAccount;
