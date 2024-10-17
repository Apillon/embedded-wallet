import { abort } from '@apillon/wallet-sdk';
import useAccount from './useAccount';
import useWallet from './useWallet';

export function useContract({
  abi,
  address,
  chainId,
  mustConfirm = true,
  broadcast = false,
}: {
  abi: any;
  address: string;
  chainId?: number;
  mustConfirm?: boolean;
  broadcast?: boolean;
}) {
  const { wallet } = useWallet();
  const { info: accountInfo } = useAccount();

  async function read(fn: string, values?: any[]) {
    if (!wallet.value) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    return await wallet.value.contractRead({
      contractAbi: abi,
      contractAddress: address,
      contractFunctionName: fn,
      contractFunctionValues: values,
      chainId,
    });
  }

  async function write(fn: string, values?: any[], label?: string) {
    if (!wallet.value) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    const result = await wallet.value.signContractWrite({
      contractAbi: abi,
      contractAddress: address,
      contractFunctionName: fn,
      contractFunctionValues: values,
      chainId,
      label,
      strategy: accountInfo.authStrategy,
      authData: { username: accountInfo.username },
      mustConfirm,
    });

    if (broadcast && result) {
      return await wallet.value.broadcastTransaction(result.signedTxData, result.chainId, label);
    } else {
      return result;
    }
  }

  return {
    read,
    write,
  };
}

export default useContract;
