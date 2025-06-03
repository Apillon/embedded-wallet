import { ethers } from 'ethers6';
import { WebStorageKeys } from './constants';
import { encodeAddress } from '@polkadot/util-crypto';

export function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function shortHash(val: string) {
  if (!val || val.length <= 10) {
    return val;
  }
  return `${val.slice(0, 6)}...${val.slice(-4)}`;
}

export function logToStorage(msg: string) {
  let ls = localStorage.getItem(WebStorageKeys.ERROR_LOG) || '';

  if (ls.length > 64_000) {
    ls = ls.slice(0, 56_000);
  }

  localStorage.setItem(
    WebStorageKeys.ERROR_LOG,
    `${new Date().toISOString().slice(0, -5)} ~ ${msg}\n` + ls
  );
}

// @TODO Maybe use bignumber from ethers?
export function formatBalance(balance: string | number, unit = 'ETH', maxDecimals = 4) {
  if (maxDecimals < 0 || maxDecimals > 18) {
    maxDecimals = 5;
  }

  let parsed = typeof balance === 'string' ? parseFloat(balance) : balance;

  const v = (typeof balance !== 'string' ? balance.toString() : balance).match(
    new RegExp('(\\d+\\.\\d{' + maxDecimals + '})(\\d)')
  );

  if (v) {
    parsed = parseFloat(v[1]);
  }

  return `${parsed}${!!unit ? ` ${unit}` : ''}`;
}

export function formatSubstrateBalance(balance = '0', decimals = 12) {
  return ethers.formatUnits(BigInt(balance.replace(/,/g, '')), decimals);
}

/**
 * Format object/array data for display on approve screens
 */
export function formatTxObjectData(data: Object) {
  if (Array.isArray(data)) {
    return data.join(`\n`);
  }

  return Object.entries(data).reduce((acc, [key, value]) => {
    acc += `${key}: ${typeof value === 'object' ? `\n${formatTxObjectData(value)}` : value}\n`;
    return acc;
  }, '');
}

export function isLowerCaseEqual(s1?: string, s2?: string) {
  if (!s1 || !s2) {
    return false;
  }

  return s1.toLowerCase() === s2.toLowerCase();
}

/**
 * Must wait for polkadot utils to get ready -> check for `isPolkadotCryptoReady` from wallet.context
 */
export function getSS58Address(pk: string, prefix?: number, isPublicKey = false) {
  if (!pk || isPublicKey) {
    return pk;
  }

  try {
    return encodeAddress(pk, prefix);
    // const keyring = new Keyring({ type: 'sr25519' });
    // const pair = keyring.createFromUri(pk);

    // if (typeof prefix !== 'undefined') {
    //   keyring.setSS58Format(prefix);
    // }

    // return pair.address;
  } catch (e) {
    console.error(e);
  }

  return pk;
}
