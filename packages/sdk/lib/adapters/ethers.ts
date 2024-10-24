import { ethers } from 'ethers';
import { abort, getEmbeddedWallet } from '../utils';
import EmbeddedWallet from '..';

class EmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  address = '';
  wallet: EmbeddedWallet;
  // override provider: ethers.JsonRpcProvider;

  constructor(provider?: ethers.JsonRpcProvider) {
    const w = getEmbeddedWallet();

    if (!w) {
      throw abort('OASIS_WALLET_NOT_INITIALIZED');
    }

    super(provider || w.getRpcProviderForChainId(w.defaultNetworkId));

    this.wallet = w!;
    // this.provider = provider;
  }

  override connect(): ethers.Signer {
    return this;
  }

  override async getAddress(): Promise<string> {
    const a = await this.wallet.getAccountAddress();
    return a?.publicAddress || '';
  }

  override async signTransaction(
    tx: ethers.TransactionRequest,
    mustConfirm = true
  ): Promise<string> {
    const res = await this.wallet.signPlainTransaction({
      strategy: this.wallet.lastAccount.authStrategy,
      authData: {
        username: this.wallet.lastAccount.username,
      },
      mustConfirm,
      tx: await this.populateTransaction(tx),
    });

    return res?.signedTxData || '';
  }

  override async signMessage(message: string | Uint8Array, mustConfirm = true): Promise<string> {
    const res = await this.wallet.signMessage({
      message,
      strategy: this.wallet.lastAccount.authStrategy,
      authData: {
        username: this.wallet.lastAccount.username,
      },
      mustConfirm,
    });

    return res || '';
  }

  override async sendTransaction(
    tx: ethers.TransactionRequest
  ): Promise<ethers.TransactionResponse> {
    const signedTxData = await this.signTransaction(tx);

    let chainId = +(tx?.chainId?.toString() || 0);

    if (!chainId) {
      const network = await this.provider.getNetwork();
      chainId = +network.chainId.toString();
    }

    const res = await this.wallet.broadcastTransaction(signedTxData, chainId);

    const txResponse: ethers.TransactionResponse = {
      ...tx,
      chainId: BigInt(chainId),
      hash: res.txHash,
      blockHash: null,
      blockNumber: null,
      index: 0,
      // @ts-expect-error - unreliable
      signature: null,
    };

    return txResponse;
  }

  /**
   * NOT implemented
   */
  override async signTypedData(
    domain: ethers.TypedDataDomain,
    types: Record<string, ethers.TypedDataField[]>,
    value: Record<string, any>
  ): Promise<string> {
    console.error('EmbeddedEthersSigner#signTypedData Not implemented', { domain, types, value });
    return '';
  }

  /**
   * @deprecated v5 signer properties
   */
  _isSigner = true;
  async getBalance(blockTag?: ethers.BlockTag) {
    return await this.provider.getBalance(await this.getAddress(), blockTag);
  }
  async getTransactionCount(blockTag?: ethers.BlockTag) {
    return await this.provider.getTransactionCount(await this.getAddress(), blockTag);
  }
  async getChainId() {
    const network = await this.provider.getNetwork();
    return network.chainId;
  }
  async getGasPrice() {
    const feeData = await this.provider.getFeeData();
    return feeData.gasPrice;
  }
  async getFeeData() {
    return await this.provider.getFeeData();
  }
}

export { EmbeddedEthersSigner };
export default EmbeddedEthersSigner;
