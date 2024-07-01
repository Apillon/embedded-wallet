import { Emitter } from 'mitt';
import { ethers } from 'ethers';
import { TypedContract } from 'ethers-abitype';

export declare function abort(e: keyof typeof Errors, message?: string): void;

export declare type AppParams = {
    accountManagerAddress?: string;
    sapphireUrl?: string;
    defaultNetworkId?: number;
    networkConfig?: NetworkConfig;
    signatureCallback?: SignatureCallback;
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
} & ContractReadParams;

declare const Errors: {
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
};

export declare type Events = {
    signatureRequest: SignMessageParams;
    txApprove: {
        plain?: PlainTransactionParams;
        contractWrite?: ContractWriteParams;
    };
    txSubmitted: TransactionItem;
    txDone: TransactionItem;
};

export declare function getHashedUsername(name?: string): Promise<Buffer | undefined>;

export declare function getOasisAppWallet(): OasisAppWallet | undefined;

/**
 * Global wallet object.
 */
export declare function initializeOnWindow(params?: AppParams): OasisAppWallet | undefined;

export declare type NetworkConfig = {
    [networkId: number]: {
        rpcUrl: string;
        explorerUrl: string;
    };
};

export declare function networkIdIsSapphire(id: number): boolean;

export declare class OasisAppWallet {
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

export declare type SignatureCallback = (gaslessData: string) => Promise<{
    signature: string;
    gasLimit: number;
    timestamp: number;
}>;

export declare type SignMessageParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    message: ethers.BytesLike | string;
    data?: string;
    mustConfirm?: boolean;
    resolve?: (value: string) => void;
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
    readonly stateMutability: never;
    readonly inputs: never;
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

export declare type WebauthnContract = TypedContract<typeof wacAbi>;

export { }


declare global {
    interface Window {
        oasisAppWallet: OasisAppWallet;
    }
}

