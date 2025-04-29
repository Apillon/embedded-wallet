import { Network } from './types';

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
  SIGN_TX_NO_PROVIDER: 'SIGN_TX_NO_PROVIDER',
  SIGN_TX_NO_POLKADOT_API: 'SIGN_TX_NO_POLKADOT_API',
  SIGN_TX_INVALID_WALLET_INDEX: 'SIGN_TX_INVALID_WALLET_INDEX',
  BROADCAST_TX_NO_PROVIDER: 'BROADCAST_TX_NO_PROVIDER',
  BROADCAST_TX_NO_POLKADOT_API: 'BROADCAST_TX_NO_POLKADOT_API',
  CHAIN_CHANGE_FAILED: 'CHAIN_CHANGE_FAILED',
  XDOMAIN_NOT_INIT: 'XDOMAIN_NOT_INIT',
  XDOMAIN_STOPPED: 'XDOMAIN_STOPPED',
  XDOMAIN_BLOCKED: 'XDOMAIN_BLOCKED',
  CANT_GET_WALLET_ADDRESS: 'CANT_GET_WALLET_ADDRESS',
  WALLET_TITLE_UPDATE_FAILED: 'WALLET_TITLE_UPDATE_FAILED',
  WRONG_WALLET_ENVIRONMENT: 'WRONG_WALLET_ENVIRONMENT',
  NO_POLKADOT_NETWORKS: 'NO_POLKADOT_NETWORKS',
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

export const ApillonApiErrors: { [code: number]: string } = {
  404130001: 'Invalid wallet integration UUID', // EMBEDDED_WALLET_INTEGRATION_NOT_FOUND
  403130000: 'Domain not whitelisted for wallet usage', // EMBEDDED_WALLET_INTEGRATION_DOMAIN_NOT_WHITELISTED
  40013002: 'Wallet usage limit reached', // MAX_NUMBER_OF_EMBEDDED_WALLET_SIGNATURES_REACHED
  40300001: 'Invalid origin', // INVALID_ORIGIN
};

const asNetworkDict = <K extends PropertyKey>(o: { [P in K]: Network }) => o;

export const EthereumNetworks = asNetworkDict({
  SapphireTestnet: {
    name: 'Sapphire Testnet',
    id: 23295,
    rpcUrl: 'https://testnet.sapphire.oasis.io',
    explorerUrl: 'https://explorer.oasis.io/testnet/sapphire',
    currencySymbol: 'ROSE',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJLFfaXf1ps3rBkzl5mzkyKdWP6np5YLMEQ&s',
  },
  MoonbaseTestnet: {
    name: 'Moonbase Testnet',
    id: 1287,
    rpcUrl: 'https://rpc.testnet.moonbeam.network',
    explorerUrl: 'https://moonbase.moonscan.io',
    currencySymbol: 'DEV',
    imageUrl:
      'https://moonbase.moonscan.io/assets/moonbase/images/svg/logos/token-light.svg?v=25.2.4.0',
  },
  PolygonAmoy: {
    name: 'Polygon Amoy',
    id: 80002,
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorerUrl: 'https://www.oklink.com/amoy',
    currencySymbol: 'MATIC',
    imageUrl: 'https://pbs.twimg.com/profile_images/1781426525083963392/FH-8AGTJ_400x400.jpg',
  },
  BaseSepolia: {
    name: 'Base Sepolia',
    id: 84532,
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    imageUrl: 'https://basescan.org/assets/base/images/svg/logos/chain-light.svg?v=25.1.4.0',
  },
});

export const SubstrateNetworks = asNetworkDict({
  Westend: {
    name: 'Westend',
    id: 'westend',
    rpcUrl: 'wss://rpc.ibp.network/westend',
    explorerUrl: 'https://westend.subscan.io',
    currencySymbol: 'WND',
    currencyDecimals: 12,
    imageUrl:
      'https://raw.githubusercontent.com/TalismanSociety/chaindata/main/assets/chains/westend-testnet.svg',
  },
  WestendAssetHub: {
    name: 'Westend Asset Hub',
    id: 'westend-asset-hub',
    rpcUrl: 'wss://westmint-rpc-tn.dwellir.com',
    explorerUrl: 'https://assethub-westend.subscan.io',
    currencySymbol: 'WND',
    currencyDecimals: 12,
    imageUrl:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NDAgNjQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzMyMUQ0Nzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qye2ZpbGw6I0U2MDA3QTt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzNy4zLDMxOS4zYzAsMTc1LjItMTQyLDMxNy4zLTMxNy4zLDMxNy4zUzIuNyw0OTQuNiwyLjcsMzE5LjNTMTQ0LjgsMi4xLDMyMCwyLjFTNjM3LjMsMTQ0LjEsNjM3LjMsMzE5LjN6IgoJCS8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDQ0LjIsMzkyLjRoLTY3LjZsLTEyLjctMzFoLTg1LjhsLTEyLjcsMzFoLTY3LjZsODAuOS0xODQuM2g4NC41TDQ0NC4yLDM5Mi40eiBNMzIxLjEsMjU2bC0yMi40LDU1aDQ0LjcKCQlMMzIxLjEsMjU2eiIvPgoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMzIxIiBjeT0iMTIyLjEiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjMyMSIgY3k9IjUxNy4xIiByPSI0Ni45Ii8+Cgk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxNDcuOCIgY3k9IjIxNiIgcj0iNDYuOSIvPgoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNDk0LjMiIGN5PSIyMTYiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjE0Ny44IiBjeT0iNDI0LjgiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjQ5NC4zIiBjeT0iNDI0LjgiIHI9IjQ2LjkiLz4KPC9nPgo8L3N2Zz4K',
  },
});

export const DefaultEthereumNetworks = [
  EthereumNetworks.SapphireTestnet,
  EthereumNetworks.MoonbaseTestnet,
  EthereumNetworks.PolygonAmoy,
  EthereumNetworks.BaseSepolia,
];

export const DefaultSubstrateNetworks = [
  SubstrateNetworks.Westend,
  SubstrateNetworks.WestendAssetHub,
];
