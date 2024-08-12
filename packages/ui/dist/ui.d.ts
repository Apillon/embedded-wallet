import { AppParams } from '@embedded-wallet/sdk';

export declare type AppProps = {
    /**
     * Configuration of available networks. Oasis Sapphire is always included (ids 23294 and 23295).
     * @example
     ```ts
     [
     {
     name: 'Moonbeam Testnet',
     id: 1287,
     rpcUrl: 'https://rpc.testnet.moonbeam.network',
     explorerUrl: 'https://moonbase.moonscan.io',
     }
     ]
     ```
     */
    networks?: Network[];
    /**
     * Do not automatically broadcast with SDK after confirming a transaction.
     *
     * Useful when using ethers/viem where txs are automatically processed with contract interfaces e.g.
     */
    disableAutoBroadcastAfterSign?: boolean;
    /**
     * Remove styles from "open wallet" button
     */
    disableDefaultActivatorStyle?: boolean;
    /**
     * Placeholder displayed in input for username/email
     */
    authFormPlaceholder?: string;
    /**
     * Use email validation on input for username/email
     */
    isAuthEmail?: boolean;
    /**
     * Skip email confirmation / code check.
     */
    isEmailConfirm?: boolean;
    /**
     * Executes in auth process, after user enters a valid email. If an error is thrown, the auth process will terminate.
     *
     * Should be used to send a verification code to user.
     *
     * If this is not provided, Apillon service is used.
     */
    onEmailConfirmRequest?: (email: string) => Promise<any>;
    /**
     * Executes in auth process, during email verification, confirm that entered code is correct.
     *
     * If `onEmailConfirmRequest` is not provided, Apillon service is used.
     */
    onEmailConfirm?: (email: string, code: string) => Promise<any>;
} & AppParams;

export declare function initializeApp(activatorSelector?: string, options?: AppProps): void;

declare type Network = {
    name: string;
    id: number;
    rpcUrl: string;
    explorerUrl: string;
};

export { }
