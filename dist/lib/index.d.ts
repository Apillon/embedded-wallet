import { ethers } from 'ethers';
import { AppParams, AuthData, AuthStrategyName, ContractReadParams, ContractWriteParams, Events, PlainTransactionParams, SignMessageParams, SignatureCallback, WebauthnContract } from './types';
import { Emitter } from 'mitt';

declare class OasisAppWallet {
    sapphireProvider: ethers.JsonRpcProvider;
    accountManagerContract: WebauthnContract;
    abiCoder: ethers.AbiCoder;
    events: Emitter<Events>;
    onGetSignature: SignatureCallback | undefined;
    defaultNetworkId: number;
    rpcUrls: {
        [networkId: number]: string;
    };
    rpcProviders: {
        [networkId: number]: ethers.JsonRpcProvider;
    };
    explorerUrls: {
        [networkId: number]: string;
    };
    lastAccount: {
        username: string;
        authStrategy: AuthStrategyName;
        address: string;
        contractAddress: string;
    };
    /**
     * Prepare sapphire provider and account manager (WebAuthn) contract.
     * Prepare data for available chains
     */
    constructor(params?: AppParams);
    /**
     * Check if `username` is already registered on accountManager
     */
    userExists(username: string): Promise<boolean>;
    /**
     * Create new "wallet" for username.
     * Creates a new contract for each account on sapphire network.
     */
    register(strategy: AuthStrategyName, authData: AuthData): Promise<{
        publicAddress: string;
        accountContractAddress: string;
    } | undefined>;
    /**
     * Check that credentials belong to some account.
     */
    authenticate(strategy: AuthStrategyName, authData: AuthData): Promise<{
        publicAddress: string;
        accountContractAddress: string;
    } | undefined>;
    /**
     * Return address for username.
     * - Public EVM address
     * - Account contract address (deployed on sapphire)
     */
    getAccountAddress(username?: string): Promise<{
        publicAddress: string;
        accountContractAddress: string;
    } | undefined>;
    getAccountBalance(address: string, networkId?: number, decimals?: number): Promise<string>;
    setAccount(params: {
        username: string;
        strategy: AuthStrategyName;
        address: string;
        contractAddress: string;
    }): void;
    signMessage(params: SignMessageParams): Promise<string | undefined>;
    /**
     * Authenticate with selected auth strategy through sapphire "Account Manager",
     * then return signed tx data and chainId of tx.
     */
    signPlainTransaction(params: PlainTransactionParams): Promise<{
        signedTxData: string;
        chainId?: number | undefined;
    } | {
        signedTxData: any;
        chainId: number | undefined;
    } | undefined>;
    /**
     * Send raw transaction data to network.
     * If chainId is provided, the transaction is sent to that network (cross-chain).
     */
    broadcastTransaction(signedTxData: ethers.BytesLike, chainId?: number, label?: string): Promise<{
        txHash: any;
        ethProvider: ethers.JsonRpcProvider;
        txItem: {
            hash: any;
            label: string;
            rawData: ethers.BytesLike;
            owner: string;
            status: "pending";
            chainId: number;
            explorerUrl: string;
            createdAt: number;
        };
    }>;
    /**
     * Get signed tx for making a contract write call.
     */
    signContractWrite(params: ContractWriteParams): Promise<{
        signedTxData: string;
        chainId?: number | undefined;
    } | {
        signedTxData: any;
        chainId: number | undefined;
    } | undefined>;
    /**
     * Get result of contract read.
     * Utility function, this has nothing to do with Oasis.
     */
    contractRead(params: ContractReadParams): Promise<any>;
    /**
     * Helper for triggering different auth strategies
     */
    getProxyForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData): Promise<string | undefined>;
    /**
     * Helper for waiting for tx receipt
     */
    waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider): Promise<ethers.TransactionReceipt | undefined>;
    setDefaultNetworkId(networkId: number): void;
    /**
     * Check if rpc is configured for desired network ID.
     */
    validateChainId(chainId?: number): number | undefined;
    /**
     * Get provider object for chainId.
     * If no chainId specified, use sapphire network rpc.
     */
    getRpcProviderForChainId(chainId?: number): ethers.JsonRpcProvider;
}
export { OasisAppWallet };
export default OasisAppWallet;
