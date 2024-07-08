import { abort } from '@oasis-app-wallet/sdk';
import useWallet from './useWallet';
import useAccount from './useAccount';

export default function useContract({
  abi,
  address,
  chainId,
}: {
  abi: string;
  address: string;
  chainId?: number;
}) {
  const { wallet } = useWallet();
  const { username, authStrategy } = useAccount();

  async function read(fn: string, values?: any[]) {
    if (!wallet) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    return await wallet.contractRead({
      contractAbi: abi,
      contractAddress: address,
      contractFunctionName: fn,
      contractFunctionValues: values,
      chainId,
    });
  }

  async function write(fn: string, values?: any[], label?: string) {
    if (!wallet) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    return await wallet.signContractWrite({
      contractAbi: abi,
      contractAddress: address,
      contractFunctionName: fn,
      contractFunctionValues: values,
      chainId,
      label,
      strategy: authStrategy,
      authData: { username: username },
    });
  }

  return {
    read,
    write,
  };
}
