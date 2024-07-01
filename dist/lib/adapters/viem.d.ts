import { default as OasisAppWallet } from '..';

declare class OasisViemAdapter {
    address: string;
    wallet: OasisAppWallet;
    constructor();
    getAccount(): import('viem/accounts').LocalAccount;
}
export { OasisViemAdapter };
export default OasisViemAdapter;
