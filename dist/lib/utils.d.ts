import { default as OasisAppWallet } from '.';
import { WindowId, Errors } from './constants';
import { AppParams } from './types';

declare global {
    interface Window {
        [WindowId]: OasisAppWallet;
    }
}
/**
 * Global wallet object.
 */
export declare function initializeOnWindow(params?: AppParams): OasisAppWallet | undefined;
export declare function getOasisAppWallet(): OasisAppWallet | undefined;
export declare function getHashedUsername(name?: string): Promise<Buffer | undefined>;
export declare function networkIdIsSapphire(id: number): boolean;
export declare function abort(e: keyof typeof Errors, message?: string): void;
