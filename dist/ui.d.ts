import { OasisAppWallet } from "./sdk";

declare type AppParams = {
    accountManagerAddress?: string;
    sapphireUrl?: string;
    defaultNetworkId?: number;
    networkConfig?: NetworkConfig;
    signatureCallback?: SignatureCallback;
};

declare type AppProps = {
    networks?: Network[];
    disableAutoBroadcastAfterSign?: boolean;
} & AppParams;

export declare function initializeApp(activatorSelector?: string, options?: AppProps): void;

declare type Network = {
    name: string;
    id: number;
    rpcUrl: string;
    explorerUrl: string;
};

declare type NetworkConfig = {
    [networkId: number]: {
        rpcUrl: string;
        explorerUrl: string;
    };
};

declare type SignatureCallback = (gaslessData: string) => Promise<{
    signature: string;
    gasLimit: number;
    timestamp: number;
}>;

export { }


declare global {
    interface Window {
        oasisAppWallet: OasisAppWallet;
    }
}

