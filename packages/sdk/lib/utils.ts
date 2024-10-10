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

export class RetriableJsonRpcProvider extends ethers.JsonRpcProvider {
  providerList: ethers.JsonRpcProvider[];
  currentIndex = 0;
  error: any;

  constructor(rpcs: string[], chainId: number) {
    super(rpcs[0], chainId);

    this.providerList = rpcs.map(url => new ethers.JsonRpcProvider(url, chainId));
  }

  async send(method: string, params: Array<any>, retry = 0): Promise<any> {
    // Throw if all providers checked
    if (retry === this.providerList.length) {
      const error = this.error;
      this.error = undefined;
      throw new Error(error);
    }

    try {
      const provider = this.selectProvider();

      /**
       * @TODO set timeout to like 15s, default is 300s
       * @TODO add another retry cycle
       * @url https://github.com/ethers-io/ethers.js/issues/4122
       */
      return await provider.send(method, params);
    } catch (error) {
      // store error internally
      this.error = error;

      retry = retry + 1;

      return this.send(method, params, retry);
    }
  }

  private selectProvider() {
    if (this.currentIndex === this.providerList.length) {
      this.currentIndex = 1;
      return this.providerList[0];
    }

    const provider = this.providerList[this.currentIndex];
    this.currentIndex = this.currentIndex + 1;

    return provider;
  }
}
