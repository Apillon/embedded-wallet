import { WebStorageKeys } from './constants';
import { formatBalance as formatBalanceSs } from '@polkadot/util';

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

export function formatSubstrateBalance(
  balance = '0',
  options: Parameters<typeof formatBalanceSs>[1]
) {
  return formatBalanceSs(balance.replace(/,/g, ''), {
    withSi: false,
    withZero: false,
    ...options,
  });
}

/**
 * Format object/array data for display on approve screens
 */
export function formatTxObjectData(data: Object) {
  if (Array.isArray(data)) {
    return data.join(`\n`);
  }

  return Object.values(data).reduce((acc, [key, value]) => {
    acc += `${key}: ${value}`;
  }, '');
}

export function isLowerCaseEqual(s1?: string, s2?: string) {
  if (!s1 || !s2) {
    return false;
  }

  return s1.toLowerCase() === s2.toLowerCase();
}
