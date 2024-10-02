import { parseAbi } from 'abitype';
import { AccountManagerAbi } from './abi';
import { TypedContract } from 'ethers-abitype';
import { ethers } from 'ethers';
import { ProviderRpcError } from 'viem';

const wacAbi = parseAbi(AccountManagerAbi);

export type WebauthnContract = TypedContract<typeof wacAbi>;

export type Network = { name: string; id: number; rpcUrl: string; explorerUrl: string };

export type SignatureCallback = (
  gaslessData: string
) => Promise<{ signature: string; gasLimit?: number; gasPrice?: number; timestamp: number }>;

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
        name: 'Moonbeam Testnet',
        id: 1287,
        rpcUrl: 'https://rpc.testnet.moonbeam.network',
        explorerUrl: 'https://moonbase.moonscan.io',
      }
    ]
    ```
   */
  networks?: Network[];
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
  strategy?: AuthStrategyName;
  authData?: AuthData;
  tx: ethers.TransactionLike<ethers.AddressLike>;
  label?: string;
  mustConfirm?: boolean;
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
  reject?: (reason?: any) => void;
};

export type SignMessageParams = {
  strategy?: AuthStrategyName;
  authData?: AuthData;
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
  label?: string;
  mustConfirm?: boolean;
  resolve?: (result: { signedTxData: any; chainId?: number }) => void;
  reject?: (reason?: any) => void;
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
    name: 'username' | 'address' | 'authStrategy' | 'defaultNetworkId' | 'sessionToken';
    newValue: any;
    oldValue: any;
  };

  /**
   * Triggered in 'eth_requestAccounts' provider request handler.
   * Receives resolver fn that should be invoked when user's account is available (after sign in / register)
   */
  providerRequestAccounts: (address: string) => void;

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
