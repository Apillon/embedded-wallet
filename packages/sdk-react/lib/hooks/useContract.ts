import { abort, WalletType } from '@apillon/wallet-sdk';
import useWallet from './useWallet';
import useAccount from './useAccount';

export function useContract({
  abi,
  address,
  chainId,
  mustConfirm = true, //
  broadcast = false,
}: {
  abi: any;
  address: string;
  chainId?: number;
  mustConfirm?: boolean;
  broadcast?: boolean;
}) {
  const { wallet } = useWallet();
  const { info } = useAccount();

  async function read(fn: string, values?: any[]) {
    if (!wallet) {
      abort('OASIS_WALLET_NOT_INITIALIZED');
      return;
    }

    if (wallet.user.walletType !== WalletType.EVM) {
      abort('WRONG_WALLET_ENVIRONMENT');
      return;
    }

    return await wallet.evm.contractRead({
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

    if (wallet.user.walletType !== WalletType.EVM) {
      abort('WRONG_WALLET_ENVIRONMENT');
      return;
    }

    const result = await wallet.evm.signContractWrite({
      contractAbi: abi,
      contractAddress: address,
      contractFunctionName: fn,
      contractFunctionValues: values,
      chainId,
      label,
      strategy: info.authStrategy,
      authData: { username: info.username },
      mustConfirm,
    });

    if (broadcast && result) {
      return await wallet.evm.broadcastTransaction(result.signedTxData, result.chainId, label);
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
