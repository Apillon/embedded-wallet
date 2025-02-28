import { parseAbi } from 'abitype';
import { AccountManagerAbi } from './abi';
import { TypedContract } from 'ethers-abitype';
import { ethers } from 'ethers';
import { ProviderRpcError } from 'viem';
import { ProxyWriteFunctionsByStrategy, WalletType } from './constants';

const wacAbi = parseAbi(AccountManagerAbi);

export type WebauthnContract = TypedContract<typeof wacAbi>;

export type Network = {
  name: string;
  id: number;
  rpcUrl: string;
  explorerUrl: string;
  imageUrl?: string; // Icon of the chain for display in UI
  currencySymbol?: string; // Symbol of the native currency (default is 'ETH')
  currencyDecimals?: number; // Number of decimals of the native currency (default is 18)
};

export type SignatureCallback = (gaslessData: string) => Promise<{
  signature: string;
  gasLimit?: number;
  gasPrice?: number;
  timestamp: number;
  error?: string;
}>;

export type AppParams = {
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

export type AuthData = {
  username: string;
  password?: string;
  hashedUsername?: Buffer | undefined;
  privateKey?: string;
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

type AllValuesOf<T> = T extends any ? T[keyof T] : never;

export type AuthProxyWriteFns = AllValuesOf<
  (typeof ProxyWriteFunctionsByStrategy)[keyof typeof ProxyWriteFunctionsByStrategy]
>;

export interface AuthStrategy {
  getRegisterData(authData: AuthData): Promise<RegisterData | undefined>;

  getProxyResponse(data: string, authData: AuthData): Promise<any>;

  proxyWrite(
    functionName: AuthProxyWriteFns,
    data: string,
    authData: AuthData,
    txLabel?: string,
    dontWait?: boolean
  ): Promise<any>;
}

export type AuthPasskeyMode = 'redirect' | 'popup' | 'tab_form';

export type AuthPasskeyModeInternal = 'iframe' | 'standalone';

export type AuthStrategyName = 'password' | 'passkey';

export type UserInfo = {
  username: string;
  strategy: AuthStrategyName;
  publicAddress: string | ethers.Addressable;
  accountContractAddress: string | ethers.Addressable;
};

export type AccountWalletTypes = (typeof WalletType)[keyof typeof WalletType];

export type AccountWallet = {
  walletType: AccountWalletTypes;
  address: string;
  index: number;
};

export type PlainTransactionParams = {
  strategy?: AuthStrategyName;
  authData?: AuthData;
  walletIndex?: number;
  tx: ethers.TransactionLike<ethers.AddressLike>;
  label?: string;
  mustConfirm?: boolean;
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
  reject?: (reason?: any) => void;
};

export type SignMessageParams = {
  strategy?: AuthStrategyName;
  authData?: AuthData;
  walletIndex?: number;
  message: ethers.BytesLike | string;
  data?: string;
  mustConfirm?: boolean;
  resolve?: (value: string) => void;
  reject?: (reason?: any) => void;
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
  walletIndex?: number;
  label?: string;
  mustConfirm?: boolean;
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
  reject?: (reason?: any) => void;
} & ContractReadParams;

export enum GaslessTxType {
  CreateAccount,
  ManageCredential,
  ManageCredentialPassword,
  AddWallet,
  AddWalletPassword,
}

export type TransactionItem = {
  hash: string;
  label: string;
  rawData: any;
  owner: string;
  status: 'pending' | 'confirmed' | 'failed';
  chainId: number;
  explorerUrl: string;
  createdAt: number; // timestamp
  internalLabel?: string;
  internalData?: string;
};

export type Events = {
  signatureRequest: SignMessageParams;
  txApprove: { plain?: PlainTransactionParams; contractWrite?: ContractWriteParams };
  txSubmitted: TransactionItem;
  txDone: TransactionItem; // emitted by UI
  dataUpdated: {
    name:
      | 'username'
      | 'authStrategy'
      | 'defaultNetworkId'
      | 'sessionToken'
      | 'wallets'
      | 'walletIndex'
      | 'address'
      | 'contractAddress';
    newValue: any;
    oldValue: any;
  };

  /**
   * Event for UI -- to enable programmatic opening
   */
  open: boolean;

  /**
   * Event for UI -- programmatically add a token
   */
  addToken: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    imageUrl?: string;
    chainId?: number;
  };

  /**
   * Event for UI -- programmatically add an NFT
   */
  addTokenNft: {
    address: string;
    tokenId: number;
    name?: string;
    imageUrl?: string;
    chainId?: number;
  };

  /**
   * Feedback for `addToken` and `addTokenNft` events
   */
  addTokenStatus: {
    success: boolean;
    info?: string;
  };

  /**
   * Triggered in 'eth_requestAccounts' provider request handler.
   * Receives resolver fn that should be invoked when user's account is available (after sign in / register)
   */
  providerRequestAccounts: (address: string) => void;

  /**
   * Emitted when tx chainId is different from defaultNetworkId.
   * Must be resolve()'d to continue with the tx execution.
   */
  requestChainChange: { chainId: number; resolve: (confirmed: boolean) => void };

  /**
   * Provider event
   * @chainId hex
   */
  connect: { chainId: string };

  /**
   * Provider event
   */
  disconnect: { error: ProviderRpcError };

  /**
   * Provider event
   * @chainId hex
   */
  chainChanged: { chainId: string };

  /**
   * Provider event
   */
  accountsChanged: string[];
};
