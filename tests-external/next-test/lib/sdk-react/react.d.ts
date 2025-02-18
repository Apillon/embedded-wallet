import { AccountWallet } from '@apillon/wallet-sdk';
import { AppProps } from '@apillon/wallet-ui';
import { AuthStrategyName } from '@apillon/wallet-sdk';
import { EmbeddedWallet as EmbeddedWallet_2 } from '@apillon/wallet-sdk';
import { JsonRpcProvider } from 'ethers';
import { JSX } from 'react/jsx-runtime';
import { PlainTransactionParams } from '@apillon/wallet-sdk';
import { SignMessageParams } from '@apillon/wallet-sdk';
import { TransactionItem } from '@apillon/wallet-sdk';

export declare function EmbeddedWallet({ className, ...params }: AppProps & {
    className?: string;
}): JSX.Element;

export declare function useAccount(): {
    info: {
        username: string;
        activeWallet: AccountWallet | undefined;
        authStrategy: AuthStrategyName;
    };
    getBalance: (networkId?: undefined) => Promise<string>;
};

export declare function useContract({ abi, address, chainId, mustConfirm, //
    broadcast, }: {
    abi: any;
    address: string;
    chainId?: number;
    mustConfirm?: boolean;
    broadcast?: boolean;
}): {
    read: (fn: string, values?: any[]) => Promise<any>;
    write: (fn: string, values?: any[], label?: string) => Promise<{
        txHash: any;
        ethProvider: JsonRpcProvider;
        txItem: TransactionItem;
    } | {
        signedTxData: string;
        chainId?: number;
    } | {
        signedTxData: any;
        chainId: number | undefined;
    } | undefined>;
};

export declare function useWallet(): {
    wallet: EmbeddedWallet_2;
    signMessage: (message: string, options?: SignMessageParams) => Promise<string | undefined>;
    sendTransaction: (tx: PlainTransactionParams["tx"], options?: PlainTransactionParams, internalLabel?: string) => Promise<void | {
        txHash: any;
        ethProvider: JsonRpcProvider;
        txItem: TransactionItem;
    }>;
};

export { }
