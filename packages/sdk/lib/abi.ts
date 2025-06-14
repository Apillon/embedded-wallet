export const AccountManagerAbi = [
  'constructor()',
  'error AccessControlBadConfirmation()',
  'error AccessControlUnauthorizedAccount(address account, bytes32 neededRole)',
  'error AddressEmptyCode(address target)',
  'error DER_Split_Error()',
  'error ECDSAInvalidSignature()',
  'error ECDSAInvalidSignatureLength(uint256 length)',
  'error ECDSAInvalidSignatureS(bytes32 s)',
  'error ERC1967InvalidImplementation(address implementation)',
  'error ERC1967NonPayable()',
  'error FailedCall()',
  'error InvalidInitialization()',
  'error NotInitializing()',
  'error UUPSUnauthorizedCallContext()',
  'error UUPSUnsupportedProxiableUUID(bytes32 slot)',
  'error expmod_Error()',
  'error k256Decompress_Invalid_Length_Error()',
  'error k256DeriveY_Invalid_Prefix_Error()',
  'error recoverV_Error()',
  'event GaslessTransaction(bytes32 indexed dataHash, address indexed publicAddress)',
  'event Initialized(uint64 version)',
  'event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)',
  'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
  'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
  'event Upgraded(address indexed implementation)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function UPGRADE_INTERFACE_VERSION() view returns (string)',
  'function addWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)',
  'function addWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)',
  'function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, (uint8 walletType, bytes32 keypairSecret) wallet) args)',
  'function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)',
  'function encryptedTx(bytes32 nonce, bytes ciphertext, uint256 timestamp, bytes32 dataHash)',
  'function gaspayingAddress() view returns (address)',
  'function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)',
  'function getAccount(bytes32 in_username, uint8 walletType) view returns (address)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function hashUsage(bytes32) view returns (bool)',
  'function initialize(address _accountFactory, address _signer) payable',
  'function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)',
  'function manageCredentialPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)',
  'function modifyController((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)',
  'function modifyControllerPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)',
  'function personalization() view returns (bytes32)',
  'function proxiableUUID() view returns (bytes32)',
  'function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, uint8 walletType, bytes in_data) view returns (bytes out_data)',
  'function proxyViewPassword(bytes32 in_hashedUsername, uint8 walletType, bytes32 in_digest, bytes in_data) view returns (bytes out_data)',
  'function removeWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)',
  'function removeWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)',
  'function renounceRole(bytes32 role, address callerConfirmation)',
  'function revokeRole(bytes32 role, address account)',
  'function salt() view returns (bytes32)',
  'function setSigner(address _signer)',
  'function signer() view returns (address)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function userExists(bytes32 in_username) view returns (bool)',
  'function validateSignature(uint256 _gasPrice, uint64 _gasLimit, uint256 _timestamp, bytes32 _dataKeccak, bytes _signature) view returns (bytes32, bool)',
] as const;

export const EVMAccountAbi = [
  'error DER_Split_Error()',
  'error expmod_Error()',
  'error k256Decompress_Invalid_Length_Error()',
  'error k256DeriveY_Invalid_Prefix_Error()',
  'error recoverV_Error()',
  'event WalletCreated(bytes32 indexed publicAddress)',
  'function addressToBytes32(address _addr) pure returns (bytes32)',
  'function bytes32ToAddress(bytes32 _b) pure returns (address)',
  'function call(address in_contract, bytes in_data, uint256 value, uint256 walletId) returns (bytes out_data)',
  'function createWallet(bytes32 keypairSecret) returns (bytes32 publicAddress)',
  'function exportPrivateKey(uint256 walletId, uint256 deadline) view returns (bytes32)',
  'function getWalletList() view returns (bytes32[])',
  'function init(address initialController, bytes32 keypairSecret)',
  'function isController(address who) view returns (bool)',
  'function modifyController(address who, bool status, uint256 deadline)',
  'function removeWallet(uint256 walletId)',
  'function sign(uint256 walletId, bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))',
  'function signEIP155(uint256 walletId, (uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)',
  'function staticcall(address in_contract, bytes in_data, uint256 walletId) view returns (bytes out_data)',
  'function transfer(address in_target, uint256 amount, uint256 walletId)',
  'function walletAddress(uint256 walletId) view returns (bytes32)',
] as const;

export const SubstrateAccountAbi = [
  'event WalletCreated(bytes32 indexed publicAddress)',
  'function bytes32ToAddress(bytes32 _b) pure returns (address)',
  'function call(address in_contract, bytes in_data, uint256 value, uint256 walletId) returns (bytes out_data)',
  'function createWallet(bytes32 keypairSecret) returns (bytes32 publicAddress)',
  'function exportPrivateKey(uint256 walletId, uint256 deadline) view returns (bytes32)',
  'function getWalletList() view returns (bytes32[])',
  'function init(address initialController, bytes32 keypairSecret)',
  'function isController(address who) view returns (bool)',
  'function modifyController(address who, bool status, uint256 deadline)',
  'function removeWallet(uint256 walletId)',
  'function sign(uint256 walletId, bytes data) view returns (bytes)',
  'function staticcall(address in_contract, bytes in_data, uint256 walletId) view returns (bytes out_data)',
  'function transfer(address in_target, uint256 amount, uint256 walletId)',
  'function walletAddress(uint256 walletId) view returns (bytes32)',
];

export const ERC20Abi = [
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'address', name: '_receiver', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const ERC721Abi = [
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        name: 'approved',
        type: 'bool',
      },
    ],
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    outputs: [
      {
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'getApproved',
    stateMutability: 'view',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
      },
    ],
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'operator',
        type: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'name',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'ownerOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'owner',
        type: 'address',
      },
    ],
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'operator',
        type: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'tokenByIndex',
    stateMutability: 'view',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'tokenByIndex',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'index',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'tokenURI',
    stateMutability: 'view',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'tokeId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
] as const;
