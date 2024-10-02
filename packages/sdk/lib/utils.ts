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
