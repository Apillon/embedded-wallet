export const WindowId = 'oasisAppWallet';
export const SapphireMainnet = 23294;
export const SapphireTestnet = 23295;

export const WebStorageKeys = {
  WALLET_CONTEXT: 'oaw_context',
  TRANSACTIONS_CONTEXT: 'oaw_transactions',
  TOKENS_CONTEXT: 'oaw_tokens',
};

export const Errors = {
  SAPPHIRE_PROVIDER_NOT_INITIALIZED: 'SAPPHIRE_PROVIDER_NOT_INITIALIZED',
  ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: 'ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED',
  NO_USERNAME: 'NO_USERNAME',
  NO_PASSWORD: 'NO_PASSWORD',
  NO_LOGIN_PROXY_DATA: 'NO_LOGIN_PROXY_DATA',
  AUTHENTICATION_DATA_NOT_PROVIDED: 'AUTHENTICATION_DATA_NOT_PROVIDED',
  CANT_GET_ACCOUNT_ADDRESS: 'CANT_GET_ACCOUNT_ADDRESS',
  NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: 'NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID',
  CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: 'CROSS_CHAIN_PROVIDER_NOT_INITIALIZED',
  OASIS_WALLET_NOT_INITIALIZED: 'OASIS_WALLET_NOT_INITIALIZED',
  CANT_HASH_USERNAME: 'CANT_HASH_USERNAME',
};

export const ErrorMessages = {
  [Errors.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: 'Sapphire provider not initialized',
  [Errors.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: 'Account manager contract not initialized',
  [Errors.NO_USERNAME]: 'No username',
  [Errors.NO_PASSWORD]: 'No password',
  [Errors.NO_LOGIN_PROXY_DATA]: 'No login proxy data',
  [Errors.AUTHENTICATION_DATA_NOT_PROVIDED]: 'Authentication data not provided',
  [Errors.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [Errors.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: 'No rpc url configured for selected chainid',
  [Errors.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: 'Cross chain provider not initialized',
  [Errors.OASIS_WALLET_NOT_INITIALIZED]: 'Oasis wallet not initialized',
  [Errors.CANT_HASH_USERNAME]: "Can't hash username",
};
