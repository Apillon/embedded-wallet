import { ethers } from 'ethers';
import { abort, getEmbeddedWallet } from '../utils';
import EmbeddedWallet from '..';

class EmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  wallet: EmbeddedWallet;
  internalSigner: InternalEmbeddedEthersSignerextends;

  constructor(provider?: ethers.JsonRpcProvider) {
    const w = getEmbeddedWallet();

    if (!w) {
      throw abort('OASIS_WALLET_NOT_INITIALIZED');
    }

    super(provider || w.getRpcProviderForChainId(w.defaultNetworkId));

    this.internalSigner = new InternalEmbeddedEthersSignerextends(
      provider || w.getRpcProviderForChainId(w.defaultNetworkId),
      w
    );

    this.wallet = w!;

    /**
     * Reinitialize signer with new provider when chain changes
     */
    w.events.on('dataUpdated', ({ name, newValue }) => {
      if (name === 'defaultNetworkId') {
        this.internalSigner = new InternalEmbeddedEthersSignerextends(
          w.getRpcProviderForChainId(newValue),
          this.wallet
        );
      }
    });
  }

  override connect(): ethers.Signer {
    return this.internalSigner;
  }

  override async getAddress(): Promise<string> {
    const a = await this.wallet.getAccountAddress();
    return a || '';
  }

  override async signTransaction(
    tx: ethers.TransactionRequest,
    mustConfirm = true
  ): Promise<string> {
    return this.internalSigner.signTransaction(tx, mustConfirm);
  }

  override async signMessage(message: string | Uint8Array, mustConfirm = true): Promise<string> {
    return this.internalSigner.signMessage(message, mustConfirm);
  }

  override async sendTransaction(
    tx: ethers.TransactionRequest
  ): Promise<ethers.TransactionResponse> {
    return this.internalSigner.sendTransaction(tx);
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
    return this.internalSigner.getBalance(blockTag);
  }
  async getTransactionCount(blockTag?: ethers.BlockTag) {
    return this.internalSigner.getTransactionCount(blockTag);
  }
  async getChainId() {
    return this.internalSigner.getChainId();
  }
  async getGasPrice() {
    return this.internalSigner.getGasPrice();
  }
  async getFeeData() {
    return this.internalSigner.getFeeData();
  }
}

class InternalEmbeddedEthersSignerextends extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  // address = '';
  // override provider: ethers.JsonRpcProvider;

  constructor(
    provider: ethers.JsonRpcProvider,
    private wallet: EmbeddedWallet
  ) {
    super(provider);
  }

  override connect(): ethers.Signer {
    return this;
  }

  override async getAddress(): Promise<string> {
    const a = await this.wallet.getAccountAddress();
    return a || '';
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
