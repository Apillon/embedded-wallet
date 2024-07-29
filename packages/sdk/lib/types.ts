import { parseAbi } from 'abitype';
import { AccountManagerAbi } from './abi';
import { TypedContract } from 'ethers-abitype';
import { ethers } from 'ethers';

const wacAbi = parseAbi(AccountManagerAbi);

export type WebauthnContract = TypedContract<typeof wacAbi>;

export type NetworkConfig = { [networkId: number]: { rpcUrl: string; explorerUrl: string } };

export type SignatureCallback = (
  gaslessData: string
) => Promise<{ signature: string; gasLimit?: number; gasPrice?: number; timestamp: number }>;

export type AppParams = {
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
  onGetApillonSessionToken?: () => Promise<string>; // only used if no `onGetSignature` param is provided
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

  getProxyResponse(
    WAC: WebauthnContract,
    data: string,
    authData: AuthData
  ): Promise<ethers.BytesLike | undefined>;
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
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
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
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
} & ContractReadParams;

export type TransactionItem = {
  hash: string;
  label: string;
  rawData: any;
  owner: string;
  status: 'pending' | 'confirmed' | 'failed';
  chainId: number;
  explorerUrl: string;
  createdAt: number; // timestamp
};

export type Events = {
  signatureRequest: SignMessageParams;
  txApprove: { plain?: PlainTransactionParams; contractWrite?: ContractWriteParams };
  txSubmitted: TransactionItem;
  txDone: TransactionItem; // emitted by UI
  dataUpdated: {
    name: 'username' | 'address' | 'authStrategy' | 'defaultNetworkId';
    newValue: any;
    oldValue: any;
  };
};
