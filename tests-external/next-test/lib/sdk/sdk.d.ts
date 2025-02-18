import { EIP1193Provider } from 'viem';
import { Emitter } from 'mitt';
import { ethers } from 'ethers';
import { LocalAccount } from 'viem/accounts';
import { LocalAccount as LocalAccount_2 } from 'viem';
import { ProviderRpcError } from 'viem';
import { TypedContract } from 'ethers-abitype';

export declare function abort(e: keyof typeof Errors, message?: string): void;

export declare const AccountManagerAbi: readonly ["constructor()", "error AccessControlBadConfirmation()", "error AccessControlUnauthorizedAccount(address account, bytes32 neededRole)", "error AddressEmptyCode(address target)", "error DER_Split_Error()", "error ECDSAInvalidSignature()", "error ECDSAInvalidSignatureLength(uint256 length)", "error ECDSAInvalidSignatureS(bytes32 s)", "error ERC1967InvalidImplementation(address implementation)", "error ERC1967NonPayable()", "error FailedInnerCall()", "error InvalidInitialization()", "error NotInitializing()", "error UUPSUnauthorizedCallContext()", "error UUPSUnsupportedProxiableUUID(bytes32 slot)", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "event GaslessTransaction(bytes32 indexed dataHash, bytes32 indexed hashedUsername, address indexed publicAddress)", "event Initialized(uint64 version)", "event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)", "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)", "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)", "event Upgraded(address indexed implementation)", "function DEFAULT_ADMIN_ROLE() view returns (bytes32)", "function UPGRADE_INTERFACE_VERSION() view returns (string)", "function addWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function addWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)", "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, (uint8 walletType, bytes32 keypairSecret) wallet) args)", "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)", "function encryptedTx(bytes32 nonce, bytes ciphertext, uint256 timestamp, bytes32 dataHash)", "function gaspayingAddress() view returns (address)", "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)", "function getAccount(bytes32 in_username, uint8 walletType) view returns (address)", "function getRoleAdmin(bytes32 role) view returns (bytes32)", "function grantRole(bytes32 role, address account)", "function hasRole(bytes32 role, address account) view returns (bool)", "function hashUsage(bytes32) view returns (bool)", "function initialize(address _accountFactory, address _signer) payable", "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function manageCredentialPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)", "function personalization() view returns (bytes32)", "function proxiableUUID() view returns (bytes32)", "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, uint8 walletType, bytes in_data) view returns (bytes out_data)", "function proxyViewPassword(bytes32 in_hashedUsername, uint8 walletType, bytes32 in_digest, bytes in_data) view returns (bytes out_data)", "function removeWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function removeWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)", "function renounceRole(bytes32 role, address callerConfirmation)", "function revokeRole(bytes32 role, address account)", "function salt() view returns (bytes32)", "function setSigner(address _signer)", "function signer() view returns (address)", "function supportsInterface(bytes4 interfaceId) view returns (bool)", "function upgradeToAndCall(address newImplementation, bytes data) payable", "function userExists(bytes32 in_username) view returns (bool)", "function validateSignature(uint256 _gasPrice, uint64 _gasLimit, uint256 _timestamp, bytes32 _dataKeccak, bytes _signature) view returns (bytes32, bool)"];

export declare type AccountWallet = {
    walletType: AccountWalletTypes;
    address: string;
    index: number;
};

export declare type AccountWalletTypes = (typeof WalletType)[keyof typeof WalletType];

declare type AllValuesOf<T> = T extends any ? T[keyof T] : never;

export declare const ApillonApiErrors: {
    [code: number]: string;
};

export declare type AppParams = {
    /**
     * The Apillon integration UUID, obtained from the Apillon Developer Console
     */
    clientId: string;
    /**
     * Network ID for network (chain) selected on first use
     */
    defaultNetworkId?: number;
    /**
     * Configuration of available networks. Oasis Sapphire is always included (ids 23294 and 23295)
     *
     * @example
     ```ts
     [
     {
     name: 'Moonbase Testnet',
     id: 1287,
     rpcUrl: 'https://rpc.testnet.moonbeam.network',
     explorerUrl: 'https://moonbase.moonscan.io',
     }
     ]
     ```
     */
    networks?: Network[];
    /**
     * Method for authenticating with passkey to make it global.
     */
    passkeyAuthMode?: AuthPasskeyMode;
};

declare interface AttestedCredentialData {
    aaguid: Uint8Array;
    credentialId: Uint8Array;
    credentialPublicKey: COSEPublicKey_EC;
}

export declare type AuthData = {
    username: string;
    password?: string;
    hashedUsername?: Buffer | undefined;
};

declare interface AuthenticatorData {
    rpIdHash: Uint8Array;
    flags: {
        UP: boolean;
        UV: boolean;
        BE: boolean;
        BS: boolean;
        AT: boolean;
        ED: boolean;
    };
    signCount: number;
    attestedCredentialData?: AttestedCredentialData;
}

export declare type AuthPasskeyMode = 'redirect' | 'popup' | 'tab_form';

export declare type AuthPasskeyModeInternal = 'iframe' | 'standalone';

export declare type AuthProxyWriteFns = AllValuesOf<(typeof ProxyWriteFunctionsByStrategy)[keyof typeof ProxyWriteFunctionsByStrategy]>;

export declare interface AuthStrategy {
    getRegisterData(authData: AuthData): Promise<RegisterData | undefined>;
    getProxyResponse(data: string, authData: AuthData): Promise<any>;
    proxyWrite(functionName: AuthProxyWriteFns, data: string, authData: AuthData, txLabel?: string, dontWait?: boolean): Promise<any>;
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
    walletIndex?: number;
    label?: string;
    mustConfirm?: boolean;
    resolve?: (result: {
        signedTxData: any;
        chainId?: number;
    }) => void;
    reject?: (reason?: any) => void;
} & ContractReadParams;

/**
 * @src https://github.com/oasisprotocol/demo-authzn/blob/main/backend/src/webauthn.ts
 */
declare type COSEPublicKey_EC = {
    kty: number;
    alg: number;
    crv: number;
    x: bigint;
    y: bigint;
};

export declare function credentialCreate(rp: PublicKeyCredentialRpEntity, user: PublicKeyCredentialUserEntity, challenge: Uint8Array): Promise<{
    id: Uint8Array<ArrayBuffer>;
    cd: string;
    ad: AuthenticatorData;
}>;

export declare function credentialGet(credentials: Uint8Array[], challenge?: Uint8Array, rpId?: string): Promise<{
    credentialIdHashed: string;
    challenge: Uint8Array<ArrayBufferLike>;
    resp: {
        authenticatorData: Uint8Array<ArrayBuffer>;
        clientDataTokens: {
            t: number;
            k: string;
            v: string;
        }[];
        sigR: bigint;
        sigS: bigint;
    };
}>;

export declare class EmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
    wallet: EmbeddedWallet;
    internalSigner: InternalEmbeddedEthersSignerextends;
    constructor(provider?: ethers.JsonRpcProvider);
    connect(): ethers.Signer;
    getAddress(): Promise<string>;
    signTransaction(tx: ethers.TransactionRequest, mustConfirm?: boolean): Promise<string>;
    signMessage(message: string | Uint8Array, mustConfirm?: boolean): Promise<string>;
    sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionResponse>;
    /**
     * NOT implemented
     */
    signTypedData(domain: ethers.TypedDataDomain, types: Record<string, ethers.TypedDataField[]>, value: Record<string, any>): Promise<string>;
    /**
     * @deprecated v5 signer properties
     */
    _isSigner: boolean;
    getBalance(blockTag?: ethers.BlockTag): Promise<bigint>;
    getTransactionCount(blockTag?: ethers.BlockTag): Promise<number>;
    getChainId(): Promise<bigint>;
    getGasPrice(): Promise<bigint | null>;
    getFeeData(): Promise<ethers.FeeData>;
}

export declare class EmbeddedViemAdapter {
    address: string;
    wallet: EmbeddedWallet;
    constructor();
    getAccount(): LocalAccount;
}

export declare class EmbeddedWallet {
    sapphireProvider: ethers.JsonRpcProvider;
    sapphireChainId: number;
    accountManagerAddress: string;
    accountManagerContract: WebauthnContract;
    abiCoder: ethers.AbiCoder;
    events: Emitter<Events>;
    apillonClientId: string;
    xdomain?: XdomainPasskey;
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
        contractAddress: string;
        username: string;
        authStrategy: AuthStrategyName;
        wallets: AccountWallet[];
        walletIndex: number;
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
     *
     * @param skipAccountWallets  Dont make another request for listing the wallets on account
     * @param origin  Add custom header for origin website
     */
    register(strategy: AuthStrategyName, authData: AuthData, hashedUsername?: Buffer, skipAccountWallets?: boolean, origin?: string): Promise<string | void>;
    /**
     * Check that credentials belong to some account.
     */
    authenticate(strategy: AuthStrategyName, authData: AuthData): Promise<string | undefined>;
    /**
     * Return public address for username.
     */
    getAccountAddress(strategy?: AuthStrategyName, authData?: AuthData): Promise<string | undefined>;
    getAccountBalance(address: string, networkId?: number, decimals?: number): Promise<string>;
    getAccountPrivateKey(params?: {
        strategy?: AuthStrategyName;
        authData?: AuthData;
        walletIndex?: number;
    }): Promise<string | undefined>;
    /**
     * Get all wallets added on user's account. Requires authentication.
     * @param reload Ignore cache and get wallets from contract again
     */
    getAccountWallets(params?: {
        strategy?: AuthStrategyName;
        authData?: AuthData;
        reload?: boolean;
    }): Promise<AccountWallet[] | undefined>;
    /**
     * Add new wallet or import from privateKey.
     * Returns tx hash on success.
     */
    addAccountWallet(params: {
        walletType?: AccountWalletTypes;
        privateKey?: string;
        authData?: AuthData;
        strategy?: AuthStrategyName;
    }): Promise<string | undefined>;
    /**
     * Handler for getting signature.
     *
     * The request is limited to whitelisted domains determined by client integration ID.
     */
    getApillonSignature(gaslessData: Parameters<SignatureCallback>[0], origin?: string): ReturnType<SignatureCallback>;
    setAccount(params: {
        username?: string;
        walletIndex?: number;
        strategy?: AuthStrategyName;
        contractAddress?: string;
        wallets?: AccountWallet[];
    }): void;
    setWallets(wallets: AccountWallet[]): void;
    /**
     * Get a wallet address for account and pass it to listeners.
     * Update the stored lastAccount.
     * This process includes getting all wallets (getAccountWallets) which requires authentication (when no cache is available).
     */
    finalizeAccountAuth(strategy: AuthStrategyName, authData: AuthData): Promise<string | undefined>;
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
    signPlainTransaction(params: PlainTransactionParams): Promise<void | {
        signedTxData: string;
        chainId?: number;
    } | {
        signedTxData: any;
        chainId: number | undefined;
    }>;
    /**
     * Send raw transaction data to network.
     * If chainId is provided, the transaction is sent to that network (cross-chain).
     */
    broadcastTransaction(signedTxData: ethers.BytesLike, chainId?: number, label?: string, internalLabel?: string): Promise<{
        txHash: any;
        ethProvider: ethers.JsonRpcProvider;
        txItem: TransactionItem;
    }>;
    /**
     * Prepare tx and emit `txSubmitted` event (to show tx in tx history in UI e.g.)
     */
    submitTransaction(txHash: string, signedTxData?: ethers.BytesLike, chainId?: number, label?: string, internalLabel?: string): TransactionItem;
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
     * Call an `Account Manager` contract method with a gasless transaction.
     * This means that app owner (clientId) pays for the transaction fees instead of user.
     * These methods must be supported by `generateGaslessTx` method on the contract.
     * Supported methods are defined by `GaslessTxType`.
     * About
     * - get & confirm credentials
     * - calculate and format tx data (according to `funcDataTypes` and `funcDataValuesFormatter` params)
     * - broadcast the tx (marked with `label` from params)
     */
    processGaslessMethod(params: {
        strategy: AuthStrategyName;
        authData: AuthData;
        data: any;
        txType: GaslessTxType;
        funcDataTypes: string;
        funcDataValuesFormatter(p: {
            credentials: {
                passkey: Awaited<ReturnType<InstanceType<typeof PasskeyStrategy>['getPasskeyForMode']>>;
                password: Awaited<ReturnType<InstanceType<typeof PasswordStrategy>['getCredentials']>>;
            };
            hashedUsername: Buffer;
        }): any;
        label?: string;
        internalLabel?: string;
    }): Promise<any>;
    /**
     * Helper for triggering different auth strategies
     */
    getProxyForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData): Promise<any>;
    /**
     * Use signContractWrite to invoke an account manager method and broadcast the tx
     * @returns txHash | undefined
     */
    proxyWriteForStrategy(strategy: AuthStrategyName, functionName: keyof typeof ProxyWriteFunctionsByStrategy, data: any, authData: AuthData, txLabel?: string, dontWait?: boolean): Promise<any>;
    getCredentialsForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData): Promise<string | {
        credentialIdHashed: string;
        resp: {
            authenticatorData: Uint8Array;
            clientDataTokens: {
                t: number;
                k: string;
                v: string;
            }[];
            sigR: bigint;
            sigS: bigint;
        };
    } | undefined>;
    /**
     * Helper for waiting for tx receipt
     */
    waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider): Promise<ethers.TransactionReceipt | undefined>;
    setDefaultNetworkId(networkId: number): boolean;
    /**
     * Send event requestChainChange, wait for it to resolve.
     * Throws error if chain was not changed.
     */
    handleNetworkChange(chainId?: number): Promise<void>;
    loadSapphireChainId(): Promise<number>;
    /**
     * Check if rpc is configured for desired network ID.
     */
    validateChainId(chainId?: number): number | undefined;
    /**
     * Get provider object for chainId.
     * If no chainId specified, use sapphire network rpc.
     */
    getRpcProviderForChainId(chainId?: number): ethers.JsonRpcProvider;
    getGaspayingAddress(): Promise<string | ethers.Addressable>;
}

/**
 * Global wallet object.
 */
export declare function EmbeddedWalletSDK(params?: AppParams): EmbeddedWallet | undefined;

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
    CANT_GET_ACCOUNT_WALLETS: string;
    NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: string;
    CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: string;
    OASIS_WALLET_NOT_INITIALIZED: string;
    CANT_HASH_USERNAME: string;
    CANT_GET_SIGNATURE: string;
    NO_APILLON_SESSION_TOKEN_CALLBACK: string;
    INVALID_APILLON_SESSION_TOKEN: string;
    NO_APILLON_CLIENT_ID: string;
    CANT_GET_SIGNED_TX: string;
    CHAIN_CHANGE_FAILED: string;
    XDOMAIN_NOT_INIT: string;
    XDOMAIN_STOPPED: string;
    XDOMAIN_BLOCKED: string;
    CANT_GET_WALLET_ADDRESS: string;
    WALLET_TITLE_UPDATE_FAILED: string;
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
        name: 'username' | 'authStrategy' | 'defaultNetworkId' | 'sessionToken' | 'wallets' | 'walletIndex' | 'address' | 'contractAddress';
        newValue: any;
        oldValue: any;
    };
    /**
     * Event for UI -- to enable programmatic opening
     */
    open: boolean;
    /**
     * Triggered in 'eth_requestAccounts' provider request handler.
     * Receives resolver fn that should be invoked when user's account is available (after sign in / register)
     */
    providerRequestAccounts: (address: string) => void;
    /**
     * Emitted when tx chainId is different from defaultNetworkId.
     * Must be resolve()'d to continue with the tx execution.
     */
    requestChainChange: {
        chainId: number;
        resolve: (confirmed: boolean) => void;
    };
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

export declare const EVMAccountAbi: readonly ["error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function addressToBytes32(address _addr) pure returns (bytes32)", "function bytes32ToAddress(bytes32 _b) pure returns (address)", "function call(address in_contract, bytes in_data) returns (bytes out_data)", "function createWallet(bytes32 keypairSecret) returns (address)", "function exportPrivateKey(uint256 walletId) view returns (bytes32)", "function getWalletList() view returns (bytes32[])", "function init(address initialController, bytes32 keypairSecret)", "function isController(address who) view returns (bool)", "function modifyController(address who, bool status)", "function removeWallet(uint256 walletId)", "function sign(uint256 walletId, bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))", "function signEIP155(uint256 walletId, (uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)", "function staticcall(address in_contract, bytes in_data) view returns (bytes out_data)", "function transfer(address in_target, uint256 amount)", "function walletAddress(uint256 walletId) view returns (bytes32)"];

export declare enum GaslessTxType {
    CreateAccount = 0,
    ManageCredential = 1,
    ManageCredentialPassword = 2,
    AddWallet = 3,
    AddWalletPassword = 4
}

export declare function getEmbeddedWallet(): EmbeddedWallet | undefined;

/**
 * Retry to get the wallet object on `window` a few times
 */
export declare function getEmbeddedWalletRetry(retry?: number, retryMax?: number): Promise<EmbeddedWallet | null>;

export declare function getHashedUsername(name?: string): Promise<Buffer<ArrayBufferLike> | undefined>;

export declare function getPasskeyOrigin(): string;

export declare function getProvider(): EIP1193Provider & {
    getSigner: () => Promise<EmbeddedEthersSigner>;
    getAccount: () => Promise<LocalAccount_2>;
};

declare class InternalEmbeddedEthersSignerextends extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
    private wallet;
    constructor(provider: ethers.JsonRpcProvider, wallet: EmbeddedWallet);
    connect(): ethers.Signer;
    getAddress(): Promise<string>;
    signTransaction(tx: ethers.TransactionRequest, mustConfirm?: boolean): Promise<string>;
    signMessage(message: string | Uint8Array, mustConfirm?: boolean): Promise<string>;
    sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionResponse>;
    /**
     * NOT implemented
     */
    signTypedData(domain: ethers.TypedDataDomain, types: Record<string, ethers.TypedDataField[]>, value: Record<string, any>): Promise<string>;
    /**
     * @deprecated v5 signer properties
     */
    _isSigner: boolean;
    getBalance(blockTag?: ethers.BlockTag): Promise<bigint>;
    getTransactionCount(blockTag?: ethers.BlockTag): Promise<number>;
    getChainId(): Promise<bigint>;
    getGasPrice(): Promise<bigint | null>;
    getFeeData(): Promise<ethers.FeeData>;
}

export declare function isSafari(): boolean;

/**
 * Extended ethers JsonRpcProvider that accepts multiple rpc urls as backup
 */
export declare class JsonMultiRpcProvider extends ethers.JsonRpcProvider {
    providers: ethers.JsonRpcProvider[];
    frs: ethers.FetchRequest[];
    rpcUrls: string[];
    lastIndex: number;
    error: any;
    constructor(rpcUrls: string[], chainId?: number);
    /**
     * Must override this.
     * Even if action is started with `send`, this connection gets used in background.
     */
    _getConnection(): ethers.FetchRequest;
    /**
     * Switch through all specified rpc urls until one works, or throw error if none works
     */
    send(method: string, params: Array<any>, tryIndex?: number): Promise<any>;
}

export declare type Network = {
    name: string;
    id: number;
    rpcUrl: string;
    explorerUrl: string;
    imageUrl?: string;
    currencySymbol?: string;
    currencyDecimals?: number;
};

export declare function networkIdIsSapphire(id: number): boolean;

declare class PasskeyStrategy implements AuthStrategy {
    wallet: EmbeddedWallet;
    constructor(wallet: EmbeddedWallet);
    getRegisterData(authData: AuthData): Promise<{
        hashedUsername: Buffer<ArrayBufferLike>;
        credentialId: Uint8Array<ArrayBufferLike>;
        pubkey: any;
        optionalPassword: string;
        wallet: {
            walletType: 0;
            keypairSecret: string;
        };
    } | undefined>;
    getProxyResponse(data: string, authData: AuthData): Promise<string | undefined>;
    proxyWrite(functionName: AuthProxyWriteFns, data: string, authData: AuthData, txLabel?: string, dontWait?: boolean): Promise<any>;
    getPasskeyForMode(mode: AuthPasskeyMode | AuthPasskeyModeInternal, hashedUsername: Buffer, data: any): Promise<{
        credentialIdHashed: string;
        resp: {
            authenticatorData: Uint8Array;
            clientDataTokens: {
                t: number;
                k: string;
                v: string;
            }[];
            sigR: bigint;
            sigS: bigint;
        };
    } | undefined>;
}

declare class PasswordStrategy implements AuthStrategy {
    wallet: EmbeddedWallet;
    abiCoder: ethers.AbiCoder;
    constructor(wallet: EmbeddedWallet);
    getRegisterData(authData: AuthData): Promise<{
        hashedUsername: Buffer<ArrayBufferLike>;
        credentialId: string;
        pubkey: {
            kty: number;
            alg: number;
            crv: number;
            x: bigint;
            y: bigint;
        };
        optionalPassword: string;
        wallet: {
            walletType: 0;
            keypairSecret: string;
        };
    } | undefined>;
    getProxyResponse(data: string, authData: AuthData): Promise<string | undefined>;
    proxyWrite(functionName: AuthProxyWriteFns, data: string, authData: AuthData, txLabel?: string, dontWait?: boolean): Promise<any>;
    getCredentials(data: any, authData: AuthData): Promise<string | undefined>;
    generateNewKeypair(): {
        credentialId: string;
        privateKey: Uint8Array<ArrayBufferLike>;
        decoded_x: bigint;
        decoded_y: bigint;
    };
}

export declare type PlainTransactionParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    walletIndex?: number;
    tx: ethers.TransactionLike<ethers.AddressLike>;
    label?: string;
    mustConfirm?: boolean;
    resolve?: (result: {
        signedTxData: any;
        chainId?: number;
    }) => void;
    reject?: (reason?: any) => void;
};

export declare const ProxyWriteFunctionsByStrategy: {
    readonly addWallet: {
        readonly passkey: "addWallet";
        readonly password: "addWalletPassword";
    };
    readonly manageCredential: {
        readonly passkey: "manageCredential";
        readonly password: "manageCredentialPassword";
    };
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
    error?: string;
}>;

export declare type SignMessageParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    walletIndex?: number;
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
    internalLabel?: string;
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
    readonly name: "AccessControlBadConfirmation";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "AccessControlUnauthorizedAccount";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "bytes32";
        readonly name: "neededRole";
    }];
}, {
    readonly name: "AddressEmptyCode";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "target";
    }];
}, {
    readonly name: "DER_Split_Error";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ECDSAInvalidSignature";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ECDSAInvalidSignatureLength";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "length";
    }];
}, {
    readonly name: "ECDSAInvalidSignatureS";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "s";
    }];
}, {
    readonly name: "ERC1967InvalidImplementation";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "implementation";
    }];
}, {
    readonly name: "ERC1967NonPayable";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "FailedInnerCall";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidInitialization";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NotInitializing";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "UUPSUnauthorizedCallContext";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "UUPSUnsupportedProxiableUUID";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "slot";
    }];
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
    readonly name: "GaslessTransaction";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "dataHash";
        readonly indexed: true;
    }, {
        readonly type: "bytes32";
        readonly name: "hashedUsername";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "publicAddress";
        readonly indexed: true;
    }];
}, {
    readonly name: "Initialized";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "version";
    }];
}, {
    readonly name: "RoleAdminChanged";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
        readonly indexed: true;
    }, {
        readonly type: "bytes32";
        readonly name: "previousAdminRole";
        readonly indexed: true;
    }, {
        readonly type: "bytes32";
        readonly name: "newAdminRole";
        readonly indexed: true;
    }];
}, {
    readonly name: "RoleGranted";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "sender";
        readonly indexed: true;
    }];
}, {
    readonly name: "RoleRevoked";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "sender";
        readonly indexed: true;
    }];
}, {
    readonly name: "Upgraded";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "implementation";
        readonly indexed: true;
    }];
}, {
    readonly name: "DEFAULT_ADMIN_ROLE";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "UPGRADE_INTERFACE_VERSION";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "string";
    }];
}, {
    readonly name: "addWallet";
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
    readonly name: "addWalletPassword";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "hashedUsername";
        }, {
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
        }, {
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "uint8";
                readonly name: "walletType";
            }, {
                readonly type: "bytes32";
                readonly name: "keypairSecret";
            }];
            readonly name: "wallet";
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
    }, {
        readonly type: "uint256";
        readonly name: "timestamp";
    }, {
        readonly type: "bytes32";
        readonly name: "dataHash";
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
    }, {
        readonly type: "uint8";
        readonly name: "walletType";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "getRoleAdmin";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "grantRole";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
    }, {
        readonly type: "address";
        readonly name: "account";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "hasRole";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
    }, {
        readonly type: "address";
        readonly name: "account";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}, {
    readonly name: "hashUsage";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}, {
    readonly name: "initialize";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "_accountFactory";
    }, {
        readonly type: "address";
        readonly name: "_signer";
    }];
    readonly outputs: readonly [];
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
            readonly name: "hashedUsername";
        }, {
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
    readonly name: "proxiableUUID";
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
        readonly type: "uint8";
        readonly name: "walletType";
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
        readonly type: "uint8";
        readonly name: "walletType";
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
    readonly name: "removeWallet";
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
    readonly name: "removeWalletPassword";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "hashedUsername";
        }, {
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
    readonly name: "renounceRole";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
    }, {
        readonly type: "address";
        readonly name: "callerConfirmation";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "revokeRole";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "role";
    }, {
        readonly type: "address";
        readonly name: "account";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "salt";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "setSigner";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "_signer";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "signer";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "supportsInterface";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes4";
        readonly name: "interfaceId";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}, {
    readonly name: "upgradeToAndCall";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "newImplementation";
    }, {
        readonly type: "bytes";
        readonly name: "data";
    }];
    readonly outputs: readonly [];
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
}, {
    readonly name: "validateSignature";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "_gasPrice";
    }, {
        readonly type: "uint64";
        readonly name: "_gasLimit";
    }, {
        readonly type: "uint256";
        readonly name: "_timestamp";
    }, {
        readonly type: "bytes32";
        readonly name: "_dataKeccak";
    }, {
        readonly type: "bytes";
        readonly name: "_signature";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }, {
        readonly type: "bool";
    }];
}];

export declare class WalletDisconnectedError extends ProviderRpcError {
    constructor();
}

export declare const WalletType: {
    readonly EVM: 0;
    readonly SUBSTRATE: 1;
    readonly BITCOIN: 2;
};

export declare type WebauthnContract = TypedContract<typeof wacAbi>;

export declare const WindowId = "embeddedWallet";

/**
 * Iframe for cross domain passkey checks.
 * Only `credentials.get` supported.
 * `credentials.create` is subject to strict limitations when in iframe, so it should be done via popup or a gateway page.
 */
declare class XdomainPasskey {
    clientId: string;
    mode: AuthPasskeyMode | AuthPasskeyModeInternal;
    src: any;
    promises: {
        id: number;
        resolve: (v: any) => void;
        reject: (e: any) => void;
    }[];
    lastEventId: number;
    iframe: HTMLIFrameElement | undefined;
    iframeLoadPromise: Promise<void> | undefined;
    isIframeLoaded: boolean;
    popup: Window | null;
    popupLoadPromise: {
        resolve: () => void;
        reject: (e: any) => void;
    } | undefined;
    isPopupLoaded: boolean;
    popupCheckInterval: null | ReturnType<typeof setInterval>;
    constructor(clientId: string, mode?: AuthPasskeyMode | AuthPasskeyModeInternal);
    onResponse(ev: MessageEvent): void;
    initIframe(): Promise<void>;
    openPopup(username: string): Promise<void>;
    /**
     * Create credentials through popup window. Not available in iframe!
     */
    create(hashedUsername: Buffer, username: string): Promise<void | {
        credentialId: Uint8Array;
        pubkey: any;
    }>;
    createViaTab(username: string): Promise<void | {
        username: string;
        authStrategy: AuthStrategyName;
    }>;
    /**
     * Get credentials -- always through iframe.
     */
    get(credentials: Uint8Array[], challenge: Uint8Array): Promise<void | {
        credentials: {
            credentialIdHashed: string;
            challenge: Uint8Array;
            resp: {
                authenticatorData: Uint8Array;
                clientDataTokens: {
                    t: number;
                    k: string;
                    v: string;
                }[];
                sigR: bigint;
                sigS: bigint;
            };
        };
    }>;
    /**
     * Gateway localStorage get
     * @param isSession Use sessionStorage instead of localStorage
     */
    storageGet(key: string, isSession?: boolean): Promise<string | void | null>;
    /**
     * Gateway localStorage set
     */
    storageSet(key: string, value: string, isSession?: boolean): void;
    getEventId(): number;
}

export { }


declare global {
    interface Window {
        embeddedWallet: EmbeddedWallet;
    }
}
