import { WebStorageKeys } from './constants';

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

export function formatBalance(balance: string) {
  return `${parseFloat(balance)} ETH`;
}
