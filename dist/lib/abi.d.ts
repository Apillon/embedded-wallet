export declare const AccountManagerAbi: readonly ["constructor()", "error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)", "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)", "function encryptedTx(bytes32 nonce, bytes ciphertext)", "function gaspayingAddress() view returns (address)", "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)", "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)", "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)", "function manageCredentialPassword((bytes32 digest, bytes data) args)", "function personalization() view returns (bytes32)", "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)", "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)", "function salt() view returns (bytes32)", "function userExists(bytes32 in_username) view returns (bool)"];
export declare const AccountAbi: readonly ["constructor()", "error DER_Split_Error()", "error expmod_Error()", "error k256Decompress_Invalid_Length_Error()", "error k256DeriveY_Invalid_Prefix_Error()", "error recoverV_Error()", "function call(address in_contract, bytes in_data) returns (bytes out_data)", "function init(address starterOwner)", "function isController(address who) view returns (bool)", "function keypairAddress() view returns (address)", "function modifyController(address who, bool status)", "function sign(bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))", "function signEIP155((uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)", "function staticcall(address in_contract, bytes in_data) view returns (bytes out_data)", "function transfer(address in_target, uint256 amount)"];
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
