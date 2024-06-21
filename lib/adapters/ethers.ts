import { ethers } from 'ethers';
import { getOasisAppWallet } from '../utils';
import OasisAppWallet from '..';

class OasisEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  address = '';
  wallet: OasisAppWallet;
  override provider: ethers.JsonRpcProvider;

  constructor(provider: ethers.JsonRpcProvider) {
    super(provider);

    const w = getOasisAppWallet();

    if (!w) {
      throw new Error('Oasis wallet not initialized');
    }

    this.wallet = w;
    this.provider = provider;
  }

  override connect(): ethers.Signer {
    return this;
  }

  override async getAddress(): Promise<string> {
    const a = await this.wallet.getAccountAddress();
    return a?.publicAddress || '';
  }

  override async signTransaction(tx: ethers.TransactionRequest): Promise<string> {
    const res = await this.wallet.signPlainTransaction({
      strategy: this.wallet.lastAccountStrategy,
      authData: {
        username: this.wallet.lastAccountUsername,
      },
      mustConfirm: true,
      tx: await this.populateTransaction(tx),
    });

    return res?.signedTxData || '';
  }

  override async signMessage(message: string | Uint8Array): Promise<string> {
    const res = await this.wallet.signMessage({
      message,
      strategy: this.wallet.lastAccountStrategy,
      authData: {
        username: this.wallet.lastAccountUsername,
      },
      mustConfirm: true,
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
    console.error('OasisEthersSigner#signTypedData Not implemented', { domain, types, value });
    return '';
  }
}

export { OasisEthersSigner };
export default OasisEthersSigner;
