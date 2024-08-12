import { EIP1193Provider } from 'viem';
import { Emitter } from 'mitt';
import { ethers } from 'ethers';
import { LocalAccount } from 'viem/accounts';
import { LocalAccount as LocalAccount_2 } from 'viem';
import { ProviderRpcError } from 'viem';
import { TypedContract } from 'ethers-abitype';

export declare function abort(e: keyof typeof Errors, message?: string): void;

export declare const AccountAbi: readonly ["constructor()", "error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function call(address in_contract, bytes in_data) returns (bytes out_data)", "function init(address starterOwner)", "function isController(address who) view returns (bool)", "function keypairAddress() view returns (address)", "function modifyController(address who, bool status)", "function sign(bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))", "function signEIP155((uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)", "function staticcall(address in_contract, bytes in_data) view returns (bytes out_data)", "function transfer(address in_target, uint256 amount)"];

export declare const AccountManagerAbi: readonly ["constructor()", "error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)", "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)", "function encryptedTx(bytes32 nonce, bytes ciphertext)", "function gaspayingAddress() view returns (address)", "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)", "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)", "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function manageCredentialPassword((bytes32 digest, bytes data) args)", "function personalization() view returns (bytes32)", "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)", "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)", "function salt() view returns (bytes32)", "function userExists(bytes32 in_username) view returns (bool)"];

export declare const AccountManagerAbiOld: readonly ["constructor()", "error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)", "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)", "function encryptedTx(bytes32 nonce, bytes ciphertext)", "function gaspayingAddress() view returns (address)", "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice) view returns (bytes out_data)", "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)", "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function manageCredentialPassword((bytes32 digest, bytes data) args)", "function personalization() view returns (bytes32)", "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)", "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)", "function salt() view returns (bytes32)", "function userExists(bytes32 in_username) view returns (bool)"];

export declare type AppParams = {
    /**
     * Use test URLS
     * - Oasis Sapphire testnet instead of mainnet
     */
    test?: boolean;
    /**
     * Address for "Account manager" contract on Oasis Sapphire chain
     */
    accountManagerAddress?: string;
    /**
     * Network ID for network (chain) selected on first use
     */
    defaultNetworkId?: number;
    /**
     * Configuration of available networks. Oasis Sapphire is always included (ids 23294 and 23295)
     *
     * @example
     ```ts
     { 1287: { rpcUrl: 'https://rpc.testnet.moonbeam.network', explorerUrl: 'https://moonbase.moonscan.io' } }
     ```
     */
    networkConfig?: NetworkConfig;
    /**
     * Provide this callback in configuration and it will be used to get contract values for registration.
     *
     * This is useful for controlling gas expenses on account manager contract when registering new wallets.
     *
     * @more sdk/README.md
     */
    onGetSignature?: SignatureCallback;
    /**
     * Provide the Apillon session token to be used with Apillon API to generate a signature for contract interaction.
     *
     * @more sdk/README.md
     */
    onGetApillonSessionToken?: () => Promise<string>;
};

export declare type AuthData = {
    username: string;
    password?: string;
    hashedUsername?: Buffer | undefined;
};

export declare interface AuthStrategy {
    getRegisterData(authData: AuthData): Promise<RegisterData | undefined>;
    getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData): Promise<ethers.BytesLike | undefined>;
}

export declare type AuthStrategyName = 'password' | 'passkey';

export declare type ContractReadParams = {
    contractAbi: ethers.InterfaceAbi;
    contractFunctionName: string;
    contractFunctionValues?: any[];
    contractAddress: string;
    chainId?: number;
};

export declare type ContractWriteParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    label?: string;
    mustConfirm?: boolean;
    resolve?: (result: {
        signedTxData: any;
        chainId?: number;
    }) => void;
    reject?: (reason?: any) => void;
} & ContractReadParams;

export declare class EmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
    address: string;
    wallet: EmbeddedWallet;
    provider: ethers.JsonRpcProvider;
    constructor(provider: ethers.JsonRpcProvider);
    connect(): ethers.Signer;
    getAddress(): Promise<string>;
    signTransaction(tx: ethers.TransactionRequest, mustConfirm?: boolean): Promise<string>;
    signMessage(message: string | Uint8Array, mustConfirm?: boolean): Promise<string>;
    sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionResponse>;
    /**
     * NOT implemented
     */
    signTypedData(domain: ethers.TypedDataDomain, types: Record<string, ethers.TypedDataField[]>, value: Record<string, any>): Promise<string>;
}

export declare class EmbeddedViemAdapter {
    address: string;
    wallet: EmbeddedWallet;
    constructor();
    getAccount(): LocalAccount;
}

export declare class EmbeddedWallet {
    sapphireProvider: ethers.JsonRpcProvider;
    accountManagerContract: WebauthnContract;
    abiCoder: ethers.AbiCoder;
    events: Emitter<Events>;
    onGetSignature: SignatureCallback | undefined;
    onGetApillonSessionToken: (() => Promise<string>) | undefined;
    isTest: boolean;
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
     * Resolve on login/register if defined. This resolves EIP-1193 request.
     */
    waitForAccountResolver: null | ((address: string) => void);
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
    /**
     * Default handler for getting signature.
     *
     * If no custom `onGetSignature` param is provided, use apillon^tm by default.
     *
     * `onGetApillonSessionToken` param must be provided in this case to authenticate
     * with the signature generating endpoint.
     */
    getApillonSignature(gaslessData: Parameters<SignatureCallback>[0]): ReturnType<SignatureCallback>;
    setAccount(params: {
        username: string;
        strategy: AuthStrategyName;
        address: string;
        contractAddress: string;
    }): void;
    handleAccountAfterAuth(username: string): Promise<{
        publicAddress: string;
        accountContractAddress: string;
    } | undefined>;
    /**
     * Create a promise and pass resolver to event `providerRequestAccounts`.
     * Once the promise resolves, return account address.
     */
    waitForAccount(): Promise<string>;
    signMessage(params: SignMessageParams): Promise<string | undefined>;
    /**
     * Authenticate with selected auth strategy through sapphire "Account Manager",
     * then return signed tx data and chainId of tx.
     */
    signPlainTransaction(params: PlainTransactionParams): Promise<{
        signedTxData: string;
        chainId?: number;
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
        chainId?: number;
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
    setDefaultNetworkId(networkId: number): boolean;
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

export declare const ERC20Abi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

export declare const ErrorMessages: {
    [x: string]: string;
};

export declare const Errors: {
    SAPPHIRE_PROVIDER_NOT_INITIALIZED: string;
    ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: string;
    NO_USERNAME: string;
    NO_PASSWORD: string;
    NO_LOGIN_PROXY_DATA: string;
    AUTHENTICATION_DATA_NOT_PROVIDED: string;
    CANT_GET_ACCOUNT_ADDRESS: string;
    NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: string;
    CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: string;
    OASIS_WALLET_NOT_INITIALIZED: string;
    CANT_HASH_USERNAME: string;
    CANT_GET_SIGNATURE: string;
    NO_APILLON_SESSION_TOKEN_CALLBACK: string;
    INVALID_APILLON_SESSION_TOKEN: string;
};

export declare type Events = {
    signatureRequest: SignMessageParams;
    txApprove: {
        plain?: PlainTransactionParams;
        contractWrite?: ContractWriteParams;
    };
    txSubmitted: TransactionItem;
    txDone: TransactionItem;
    dataUpdated: {
        name: 'username' | 'address' | 'authStrategy' | 'defaultNetworkId';
        newValue: any;
        oldValue: any;
    };
    /**
     * Triggered in 'eth_requestAccounts' provider request handler.
     * Receives resolver fn that should be invoked when user's account is available (after sign in / register)
     */
    providerRequestAccounts: (address: string) => void;
    /**
     * Provider event
     * @chainId hex
     */
    connect: {
        chainId: string;
    };
    /**
     * Provider event
     */
    disconnect: {
        error: ProviderRpcError;
    };
    /**
     * Provider event
     * @chainId hex
     */
    chainChanged: {
        chainId: string;
    };
    /**
     * Provider event
     */
    accountsChanged: string[];
};

export declare function getEmbeddedWallet(): EmbeddedWallet | undefined;

/**
 * Retry to get the wallet object on `window` a few times
 */
export declare function getEmbeddedWalletRetry(retry?: number, retryMax?: number): Promise<EmbeddedWallet | null>;

export declare function getHashedUsername(name?: string): Promise<Buffer | undefined>;

export declare function getProvider(): EIP1193Provider & {
    getSigner: () => Promise<EmbeddedEthersSigner>;
    getAccount: () => Promise<LocalAccount_2>;
};

/**
 * Global wallet object.
 */
export declare function initializeOnWindow(params?: AppParams): EmbeddedWallet | undefined;

export declare type NetworkConfig = {
    [networkId: number]: {
        rpcUrl: string;
        explorerUrl: string;
    };
};

export declare function networkIdIsSapphire(id: number): boolean;

export declare type PlainTransactionParams = {
    strategy: AuthStrategyName;
    authData?: AuthData;
    tx: ethers.TransactionLike<ethers.AddressLike>;
    label?: string;
    mustConfirm?: boolean;
    resolve?: (result: {
        signedTxData: any;
        chainId?: number;
    }) => void;
    reject?: (reason?: any) => void;
};

export declare type RegisterData = {
    hashedUsername: Buffer | Uint8Array | string;
    credentialId: Uint8Array | string;
    pubkey: {
        kty: number;
        alg: number;
        crv: number;
        x: bigint | number;
        y: bigint | number;
    };
    optionalPassword: string;
};

export declare const SapphireMainnet = 23294;

export declare const SapphireTestnet = 23295;

export declare type SignatureCallback = (gaslessData: string) => Promise<{
    signature: string;
    gasLimit?: number;
    gasPrice?: number;
    timestamp: number;
}>;

export declare type SignMessageParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    message: ethers.BytesLike | string;
    data?: string;
    mustConfirm?: boolean;
    resolve?: (value: string) => void;
    reject?: (reason?: any) => void;
};

export declare type TransactionItem = {
    hash: string;
    label: string;
    rawData: any;
    owner: string;
    status: 'pending' | 'confirmed' | 'failed';
    chainId: number;
    explorerUrl: string;
    createdAt: number;
};

export declare type UserInfo = {
    username: string;
    strategy: AuthStrategyName;
    publicAddress: string | ethers.Addressable;
    accountContractAddress: string | ethers.Addressable;
};

export declare class UserRejectedRequestError extends ProviderRpcError {
    constructor();
}

declare const wacAbi: readonly [{
    readonly type: "constructor";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
}, {
    readonly name: "DER_Split_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "expmod_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "k256Decompress_Invalid_Length_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "k256DeriveY_Invalid_Prefix_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "recoverV_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "createAccount";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "hashedUsername";
        }, {
            readonly type: "bytes";
            readonly name: "credentialId";
        }, {
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "kty";
            }, {
                readonly type: "int8";
                readonly name: "alg";
            }, {
                readonly type: "uint8";
                readonly name: "crv";
            }, {
                readonly type: "uint256";
                readonly name: "x";
            }, {
                readonly type: "uint256";
                readonly name: "y";
            }];
            readonly name: "pubkey";
        }, {
            readonly type: "bytes32";
            readonly name: "optionalPassword";
        }];
        readonly name: "args";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "credentialIdsByUsername";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "in_hashedUsername";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes[]";
        readonly name: "out_credentialIds";
    }];
}, {
    readonly name: "encryptedTx";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "nonce";
    }, {
        readonly type: "bytes";
        readonly name: "ciphertext";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "gaspayingAddress";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "generateGaslessTx";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes";
        readonly name: "in_data";
    }, {
        readonly type: "uint64";
        readonly name: "nonce";
    }, {
        readonly type: "uint256";
        readonly name: "gasPrice";
    }, {
        readonly type: "uint64";
        readonly name: "gasLimit";
    }, {
        readonly type: "uint256";
        readonly name: "timestamp";
    }, {
        readonly type: "bytes";
        readonly name: "signature";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes";
        readonly name: "out_data";
    }];
}, {
    readonly name: "getAccount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "in_username";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "address";
        readonly name: "keypairAddress";
    }];
}, {
    readonly name: "manageCredential";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "credentialIdHashed";
        }, {
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "bytes";
                readonly name: "authenticatorData";
            }, {
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly type: "uint8";
                    readonly name: "t";
                }, {
                    readonly type: "string";
                    readonly name: "k";
                }, {
                    readonly type: "string";
                    readonly name: "v";
                }];
                readonly name: "clientDataTokens";
            }, {
                readonly type: "uint256";
                readonly name: "sigR";
            }, {
                readonly type: "uint256";
                readonly name: "sigS";
            }];
            readonly name: "resp";
        }, {
            readonly type: "bytes";
            readonly name: "data";
        }];
        readonly name: "args";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "manageCredentialPassword";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "digest";
        }, {
            readonly type: "bytes";
            readonly name: "data";
        }];
        readonly name: "args";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "personalization";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "proxyView";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "in_credentialIdHashed";
    }, {
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes";
            readonly name: "authenticatorData";
        }, {
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "t";
            }, {
                readonly type: "string";
                readonly name: "k";
            }, {
                readonly type: "string";
                readonly name: "v";
            }];
            readonly name: "clientDataTokens";
        }, {
            readonly type: "uint256";
            readonly name: "sigR";
        }, {
            readonly type: "uint256";
            readonly name: "sigS";
        }];
        readonly name: "in_resp";
    }, {
        readonly type: "bytes";
        readonly name: "in_data";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes";
        readonly name: "out_data";
    }];
}, {
    readonly name: "proxyViewPassword";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "in_hashedUsername";
    }, {
        readonly type: "bytes32";
        readonly name: "in_digest";
    }, {
        readonly type: "bytes";
        readonly name: "in_data";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes";
        readonly name: "out_data";
    }];
}, {
    readonly name: "salt";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "userExists";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "in_username";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}];

export declare class WalletDisconnectedError extends ProviderRpcError {
    constructor();
}

export declare type WebauthnContract = TypedContract<typeof wacAbi>;

export declare const WebStorageKeys: {
    WALLET_CONTEXT: string;
    TRANSACTIONS_CONTEXT: string;
    TOKENS_CONTEXT: string;
};

export declare const WindowId = "embeddedWallet";

export { }


declare global {
    interface Window {
        embeddedWallet: EmbeddedWallet;
    }
}

