export const WindowId = 'embeddedWallet'; // update "interface Window" manually in index.ts (.d.ts doesnt replace WindowId on build)
export const SapphireMainnet = 23294;
export const SapphireTestnet = 23295;

export const WalletType = {
  EVM: 0,
  SUBSTRATE: 1,
  BITCOIN: 2,
} as const;

export const Errors = {
  SAPPHIRE_PROVIDER_NOT_INITIALIZED: 'OAW_SAPPHIRE_PROVIDER_NOT_INITIALIZED',
  ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: 'OAW_ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED',
  NO_USERNAME: 'OAW_NO_USERNAME',
  NO_PASSWORD: 'OAW_NO_PASSWORD',
  NO_LOGIN_PROXY_DATA: 'OAW_NO_LOGIN_PROXY_DATA',
  AUTHENTICATION_DATA_NOT_PROVIDED: 'OAW_AUTHENTICATION_DATA_NOT_PROVIDED',
  CANT_GET_ACCOUNT_ADDRESS: 'OAW_CANT_GET_ACCOUNT_ADDRESS',
  CANT_GET_ACCOUNT_WALLETS: 'OAW_CANT_GET_ACCOUNT_WALLETS',
  NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: 'OAW_NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID',
  CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: 'OAW_CROSS_CHAIN_PROVIDER_NOT_INITIALIZED',
  OASIS_WALLET_NOT_INITIALIZED: 'OAW_OASIS_WALLET_NOT_INITIALIZED',
  CANT_HASH_USERNAME: 'OAW_CANT_HASH_USERNAME',
  CANT_GET_SIGNATURE: 'CANT_GET_SIGNATURE',
  NO_APILLON_SESSION_TOKEN_CALLBACK: 'NO_APILLON_SESSION_TOKEN_CALLBACK',
  INVALID_APILLON_SESSION_TOKEN: 'INVALID_APILLON_SESSION_TOKEN',
  NO_APILLON_CLIENT_ID: 'NO_APILLON_CLIENT_ID',
  CANT_GET_SIGNED_TX: 'CANT_GET_SIGNED_TX',
  CHAIN_CHANGE_FAILED: 'CHAIN_CHANGE_FAILED',
  XDOMAIN_NOT_INIT: 'XDOMAIN_NOT_INIT',
  XDOMAIN_STOPPED: 'XDOMAIN_STOPPED',
  XDOMAIN_BLOCKED: 'XDOMAIN_BLOCKED',
  CANT_GET_WALLET_ADDRESS: 'CANT_GET_WALLET_ADDRESS',
  WALLET_TITLE_UPDATE_FAILED: 'WALLET_TITLE_UPDATE_FAILED',
};

export const ErrorMessages = {
  [Errors.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: 'Sapphire provider not initialized',
  [Errors.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: 'Account manager contract not initialized',
  [Errors.NO_USERNAME]: 'No username',
  [Errors.NO_PASSWORD]: 'No password',
  [Errors.NO_LOGIN_PROXY_DATA]: 'No login proxy data',
  [Errors.AUTHENTICATION_DATA_NOT_PROVIDED]: 'Authentication data not provided',
  [Errors.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [Errors.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: 'Selected chain is not supported',
  [Errors.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: 'Cross chain provider not initialized',
  [Errors.OASIS_WALLET_NOT_INITIALIZED]: 'Embedded wallet not initialized',
  [Errors.CANT_HASH_USERNAME]: "Can't hash username",
  [Errors.NO_APILLON_SESSION_TOKEN_CALLBACK]: 'Session token callback must be provided',
  [Errors.INVALID_APILLON_SESSION_TOKEN]: 'Session token is not valid',
  [Errors.NO_APILLON_CLIENT_ID]: 'Client ID is not valid',
  [Errors.CANT_GET_SIGNED_TX]: 'Could not get signed transaction',
  [Errors.CHAIN_CHANGE_FAILED]: 'Failed to switch chain',
  [Errors.XDOMAIN_NOT_INIT]: 'Passkey interface not initialized',
  [Errors.XDOMAIN_STOPPED]: 'Passkey configuration stopped, window closed',
  [Errors.XDOMAIN_BLOCKED]:
    'Passkey configuration popup blocked, please allow browser popups to continue',
};

export const ProxyWriteFunctionsByStrategy = {
  addWallet: {
    passkey: 'addWallet',
    password: 'addWalletPassword',
  },
  manageCredential: {
    passkey: 'manageCredential',
    password: 'manageCredentialPassword',
  },
} as const;
