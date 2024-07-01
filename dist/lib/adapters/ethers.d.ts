import { ethers } from 'ethers';
import { default as OasisAppWallet } from '..';

declare class OasisEthersSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
    address: string;
    wallet: OasisAppWallet;
    provider: ethers.JsonRpcProvider;
    constructor(provider: ethers.JsonRpcProvider);
    connect(): ethers.Signer;
    getAddress(): Promise<string>;
    signTransaction(tx: ethers.TransactionRequest): Promise<string>;
    signMessage(message: string | Uint8Array): Promise<string>;
    sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionResponse>;
    /**
     * NOT implemented
     */
    signTypedData(domain: ethers.TypedDataDomain, types: Record<string, ethers.TypedDataField[]>, value: Record<string, any>): Promise<string>;
}
export { OasisEthersSigner };
export default OasisEthersSigner;
