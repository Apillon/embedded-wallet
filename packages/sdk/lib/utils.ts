import { ethers } from 'ethers';
import { EmbeddedWallet } from '.';
import { SapphireMainnet, SapphireTestnet, WindowId, Errors } from './constants';
import { pbkdf2Sync } from 'pbkdf2';
import { AppParams } from './types';

/**
 * Global wallet object.
 */
export function EmbeddedWalletSDK(params?: AppParams) {
  if (typeof window !== 'undefined') {
    window[WindowId] = new EmbeddedWallet(params);
    return window[WindowId];
  }
}

export function getEmbeddedWallet() {
  if (typeof window !== 'undefined') {
    if (!window[WindowId]) {
      window[WindowId] = new EmbeddedWallet();
    }

    return window[WindowId] as EmbeddedWallet;
  }
}

/**
 * Retry to get the wallet object on `window` a few times
 */
export async function getEmbeddedWalletRetry(retry = 0, retryMax = 4) {
  if (typeof window !== 'undefined' && !!window[WindowId]) {
    return window[WindowId] as EmbeddedWallet;
  }

  if (retry >= retryMax) {
    return null;
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  return await getEmbeddedWalletRetry(retry + 1, retryMax);
}

export async function getHashedUsername(name = '') {
  const oaw = getEmbeddedWallet();

  const salt = await oaw?.accountManagerContract?.salt();

  if (salt) {
    return pbkdf2Sync(name, ethers.toBeArray(salt), 100_000, 32, 'sha256');
  }
}

export function networkIdIsSapphire(id: number) {
  return [SapphireTestnet, SapphireMainnet].includes(id);
}

export function abort(e: keyof typeof Errors, message = 'Error') {
  const err = new Error(message);
  err.name = Errors[e];
  throw err;
}

/**
 * Extended ethers JsonRpcProvider that accepts multiple rpc urls as backup
 */
export class JsonMultiRpcProvider extends ethers.JsonRpcProvider {
  providers: ethers.JsonRpcProvider[] = [];
  frs: ethers.FetchRequest[] = [];
  rpcUrls: string[];
  lastIndex = -1;
  error: any;

  constructor(rpcUrls: string[], chainId?: number) {
    super(rpcUrls[0], chainId);

    this.rpcUrls = rpcUrls;
  }

  /**
   * Must override this.
   * Even if action is started with `send`, this connection gets used in background.
   */
  _getConnection(): ethers.FetchRequest {
    if (this.lastIndex < 0 || this.lastIndex > this.frs.length - 1) {
      // backup
      return new ethers.FetchRequest(this.rpcUrls[0]);
    }
    return this.frs[this.lastIndex].clone();
  }

  /**
   * Switch through all specified rpc urls until one works, or throw error if none works
   */
  async send(method: string, params: Array<any>, tryIndex = 0): Promise<any> {
    // Try last working index first
    if (this.lastIndex > -1) {
      tryIndex = this.lastIndex;
    }

    // Throw if all urls checked
    if (tryIndex >= this.rpcUrls.length) {
      const error = this.error;
      this.error = undefined;
      throw new Error(error);
    }

    try {
      if (tryIndex > this.providers.length - 1) {
        // Initialize new Fetch request & provider
        const fetchRequest = new ethers.FetchRequest(this.rpcUrls[tryIndex]);
        fetchRequest.timeout = 15000;
        this.providers.push(new ethers.JsonRpcProvider(fetchRequest));
        this.frs.push(fetchRequest);
      }

      const res = await this.providers[tryIndex].send(method, params);

      // Store last working index
      this.lastIndex = tryIndex;

      return res;
    } catch (error) {
      // Store error internally
      this.error = error;

      // Start from 0 if last working index fails (and is not 0)
      if (this.lastIndex > 0) {
        this.lastIndex = -1;
        return this.send(method, params, 0);
      }

      this.lastIndex = -1;

      return this.send(method, params, tryIndex + 1);
    }
  }
}
