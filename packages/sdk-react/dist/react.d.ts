import { AppProps } from '@embedded-wallet/ui';
import { AuthStrategyName } from '@embedded-wallet/sdk';
import { EmbeddedWallet } from '@embedded-wallet/sdk';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare function useAccount(): {
    username: string;
    address: string;
    authStrategy: AuthStrategyName;
    getBalance: (networkId?: undefined) => Promise<string | undefined>;
};

export declare function useContract({ abi, address, chainId, mustConfirm, }: {
    abi: any;
    address: string;
    chainId?: number;
    mustConfirm?: boolean;
}): {
    read: (fn: string, values?: any[]) => Promise<any>;
    write: (fn: string, values?: any[], label?: string) => Promise<{
        signedTxData: string;
        chainId?: number;
    } | {
        signedTxData: any;
        chainId: number | undefined;
    } | undefined>;
};

export declare function useWallet(): {
    wallet: EmbeddedWallet | undefined;
};

export declare function WalletWidget({ className, ...params }: AppProps & {
    className?: string;
}): JSX_2.Element;

export { }
