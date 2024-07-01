import { TypedContract } from 'ethers-abitype';
import { ethers } from 'ethers';

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
export type WebauthnContract = TypedContract<typeof wacAbi>;
export type NetworkConfig = {
    [networkId: number]: {
        rpcUrl: string;
        explorerUrl: string;
    };
};
export type SignatureCallback = (gaslessData: string) => Promise<{
    signature: string;
    gasLimit: number;
    timestamp: number;
}>;
export type AppParams = {
    accountManagerAddress?: string;
    sapphireUrl?: string;
    defaultNetworkId?: number;
    networkConfig?: NetworkConfig;
    signatureCallback?: SignatureCallback;
};
export type AuthData = {
    username: string;
    password?: string;
    hashedUsername?: Buffer | undefined;
};
export type RegisterData = {
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
export interface AuthStrategy {
    getRegisterData(authData: AuthData): Promise<RegisterData | undefined>;
    getProxyResponse(WAC: WebauthnContract, data: string, authData: AuthData): Promise<ethers.BytesLike | undefined>;
}
export type AuthStrategyName = 'password' | 'passkey';
export type UserInfo = {
    username: string;
    strategy: AuthStrategyName;
    publicAddress: string | ethers.Addressable;
    accountContractAddress: string | ethers.Addressable;
};
export type PlainTransactionParams = {
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
export type SignMessageParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    message: ethers.BytesLike | string;
    data?: string;
    mustConfirm?: boolean;
    resolve?: (value: string) => void;
};
export type ContractReadParams = {
    contractAbi: ethers.InterfaceAbi;
    contractFunctionName: string;
    contractFunctionValues?: any[];
    contractAddress: string;
    chainId?: number;
};
export type ContractWriteParams = {
    strategy?: AuthStrategyName;
    authData?: AuthData;
    label?: string;
    mustConfirm?: boolean;
    resolve?: (result: {
        signedTxData: any;
        chainId?: number;
    }) => void;
} & ContractReadParams;
export type TransactionItem = {
    hash: string;
    label: string;
    rawData: any;
    owner: string;
    status: 'pending' | 'confirmed' | 'failed';
    chainId: number;
    explorerUrl: string;
    createdAt: number;
};
export type Events = {
    signatureRequest: SignMessageParams;
    txApprove: {
        plain?: PlainTransactionParams;
        contractWrite?: ContractWriteParams;
    };
    txSubmitted: TransactionItem;
    txDone: TransactionItem;
};
export {};
