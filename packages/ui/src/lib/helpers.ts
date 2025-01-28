import { WebStorageKeys } from './constants';

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

export function formatBalance(balance: string, unit = 'ETH') {
  return `${parseFloat(balance)} ${unit}`;
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
