import { ethers } from 'ethers6';
import { abort, getEmbeddedWallet } from '../utils';
import EmbeddedWallet from '..';

class EmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  wallet: EmbeddedWallet;
  internalSigner: InternalEmbeddedEthersSigner;

  constructor(provider?: ethers.JsonRpcProvider) {
    const w = getEmbeddedWallet();

    if (!w) {
      throw abort('OASIS_WALLET_NOT_INITIALIZED');
    }

    super(provider || w.evm.getRpcProviderForNetworkId(w.defaultNetworkId as number));

    this.internalSigner = new InternalEmbeddedEthersSigner(
      provider || w.evm.getRpcProviderForNetworkId(w.defaultNetworkId as number)!,
      w
    );

    this.wallet = w!;

    /**
     * Reinitialize signer with new provider when chain changes
     */
    w.events.on('dataUpdated', ({ name, newValue }) => {
      if (name === 'defaultNetworkId') {
        this.internalSigner = new InternalEmbeddedEthersSigner(
          w.evm.getRpcProviderForNetworkId(newValue)!,
          this.wallet
        );
      }
    });
  }

  override connect(): ethers.Signer {
    return this.internalSigner;
  }

  override async getAddress(): Promise<string> {
    const a = this.wallet.evm.userWallets?.[this.wallet.user.walletIndex]?.address;
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

/**
 * Internal signer, needed to enable switching between chains
 */
class InternalEmbeddedEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
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
    const a = this.wallet.evm.userWallets?.[this.wallet.user.walletIndex]?.address;
    return a || '';
  }

  override async signTransaction(
    tx: ethers.TransactionRequest,
    mustConfirm = true
  ): Promise<string> {
    const res = await this.wallet.evm.signPlainTransaction({
      strategy: this.wallet.user.authStrategy,
      authData: {
        username: this.wallet.user.username,
      },
      mustConfirm,
      tx: await this.populateTransaction(tx),
    });

    return res?.signedTxData || '';
  }

  override async signMessage(message: string | Uint8Array, mustConfirm = true): Promise<string> {
    const res = await this.wallet.signMessage({
      message,
      strategy: this.wallet.user.authStrategy,
      authData: {
        username: this.wallet.user.username,
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

    const res = await this.wallet.evm.broadcastTransaction(signedTxData, chainId);

    const txResponse: ethers.TransactionResponse = {
      ...tx,
      chainId: BigInt(chainId),
      hash: res?.txHash,
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
