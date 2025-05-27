import EmbeddedWallet from '.';

export { EmbeddedWallet };
export * from './types';
export * from './utils';
export * from './abi';
export * from './constants';
export * from './adapters/ethers';
export * from './adapters/viem';
export * from './adapters/eip1193';
export * from './adapters/polkadot-inject';
export { credentialGet, credentialCreate } from './browser-webauthn';
