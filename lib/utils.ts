import { ethers } from 'ethers';
import OasisAppWallet from '.';
import { SapphireMainnet, SapphireTestnet, WindowId } from './constants';
import { pbkdf2Sync } from 'pbkdf2';
import { AppParams } from './types';

declare global {
  interface Window {
    [WindowId]: OasisAppWallet;
  }
}

/**
 * Global wallet object.
 */
export function initializeOnWindow(params?: AppParams) {
  if (typeof window !== 'undefined') {
    window[WindowId] = new OasisAppWallet(params);
  }
}

export function getOasisAppWallet() {
  if (typeof window !== 'undefined') {
    if (!window[WindowId]) {
      window[WindowId] = new OasisAppWallet();
    }

    return window[WindowId] as OasisAppWallet;
  }
}

export async function getHashedUsername(name = '') {
  const oaw = getOasisAppWallet();

  const salt = await oaw?.webauthnContract?.salt();

  if (salt) {
    return pbkdf2Sync(name, ethers.toBeArray(salt), 100_000, 32, 'sha256');
  }
}

export function chainIdIsSapphire(id: number) {
  return [SapphireTestnet, SapphireMainnet].includes(id);
}
