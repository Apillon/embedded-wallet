import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { EVMAccountAbi, getEmbeddedWallet, TransactionItem, WalletType } from '@apillon/wallet-sdk';
import { useWalletContext } from './wallet.context';
import { WebStorageKeys } from '../lib/constants';
import { ethers, TransactionReceipt } from 'ethers6';
import { useTokensContext } from './tokens.context';

const initialState = () => ({
  txs: {} as { [ownerAddress: string]: { [txHash: string]: TransactionItem } },

  /**
   * Pending EVM tx hashes
   */
  pending: [] as string[],

  /**
   * Substrate txs that are being monitored for.
   * Txs should only be added here when listed. After reloading, monitoring does not continue.
   */
  monitoredSubstrateTxs: [] as {
    hash: string;
    blockHash: string;
    owner: string;
    chainId: string;
  }[],
});

type ContextState = ReturnType<typeof initialState>;

type ContextActions =
  | {
      type: 'setState';
      payload: Partial<ReturnType<typeof initialState>>;
    }
  | { type: 'addTx'; payload: TransactionItem }
  | {
      type: 'setTxStatus';
      payload: {
        tx: Pick<TransactionItem, 'hash' | 'owner' | 'chainId'>;
        status: 'pending' | 'confirmed' | 'failed';
      };
    };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'addTx':
      const monitoredSubstrateTxs = [...state.monitoredSubstrateTxs];

      /**
       * If adding a substrate transaction, add it to `monitoredSubstrateTxs` as well and start checking for its status
       */
      if (typeof action.payload.chainId === 'string') {
        try {
          const p = JSON.parse(action.payload.internalData || '{}');

          if (p?.blockHash) {
            monitoredSubstrateTxs.push({
              hash: action.payload.hash,
              blockHash: p.blockHash,
              owner: action.payload.owner,
              chainId: action.payload.chainId,
            });
          }
        } catch (_) {
          console.error('addTx', 'Cant get blockhash');
        }
      }

      return {
        ...state,
        txs: {
          ...state.txs,
          [action.payload.owner]: {
            ...state.txs[action.payload.owner],
            [action.payload.hash]: action.payload,
          },
        },
        monitoredSubstrateTxs,
        // pending: [...new Set([...state.pending, action.payload.hash])],
      };
    case 'setTxStatus':
      return {
        ...state,
        txs: {
          ...state.txs,
          [action.payload.tx.owner]: {
            ...state.txs[action.payload.tx.owner],
            [action.payload.tx.hash]: {
              ...state.txs[action.payload.tx.owner][action.payload.tx.hash],
              status: action.payload.status,
            },
          },
        },

        // Only EVM txs are in here
        pending:
          typeof action.payload.tx.chainId !== 'number'
            ? state.pending
            : action.payload.status === 'pending'
              ? [...new Set([...state.pending, action.payload.tx.hash])]
              : state.pending.filter(x => x !== action.payload.tx.hash),
      };
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const TransactionsContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      checkTransaction: (txData: TransactionItem) => void;
    }
  | undefined
>(undefined);

function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());
  const initializing = useRef(false);
  const initialized = useRef(false);
  const ssMonitoringUnsubscribe = useRef<() => void>(undefined);

  const {
    state: { accountWallets, stagedWalletsCount, walletsCountBeforeStaging, walletType, networkId },
    wallet,
    activeWallet,
    reloadAccountBalances,
    saveAccountTitle,
    setStateValue: setForWallet,
    handleSuccess,
  } = useWalletContext();

  const { reloadTokenBalance } = useTokensContext();

  useEffect(() => {
    if (wallet && !initializing.current) {
      initializing.current = true;
      init();
    }
  }, [wallet]);

  useEffect(() => {
    if (initialized.current && wallet) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pending, monitoredSubstrateTxs, ...save } = state;
      wallet.xdomain?.storageSet(WebStorageKeys.TRANSACTIONS_CONTEXT, JSON.stringify(save));
    }
  }, [state]);

  useEffect(() => {
    if (
      activeWallet &&
      state.txs[activeWallet.address] &&
      Object.keys(state.txs[activeWallet.address]).length
    ) {
      for (const tx of Object.values(state.txs[activeWallet.address])) {
        if (typeof tx.chainId === 'number') {
          checkTransaction(tx);
        } else {
          /**
           * @TODO
           * Substrate tx status
           * @url https://github.com/TalismanSociety/talisman/blob/ddb5e62d5c3eb2b0dc8b44c778f04d1f63976215/packages/extension-core/src/domains/transactions/watchSubstrateTransaction.ts
           */
        }
      }
    }
  }, [activeWallet, state.txs]);

  useEffect(() => {
    return () => {
      ssStopMonitoring();
    };
  }, []);

  async function init() {
    const stored = await wallet?.xdomain?.storageGet(WebStorageKeys.TRANSACTIONS_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
        dispatch({ type: 'setState', payload: restored });
      } catch (e) {
        console.error('Cant parse context state localStorage', e);
      }
    }

    setTimeout(() => {
      initialized.current = true;
    }, 100);
  }

  /**
   * Check if transaction is already finalized in store.
   * If transaction is not finalized, check if it has been mined,
   * otherwise attach a listener to provider that updates when
   * the transaction is mined.
   *
   * @param rechecking Set if second run, some time after first run to check if tx is actually listed.
   */
  async function checkTransaction(txData: TransactionItem, rechecking = false) {
    if (!activeWallet) {
      return;
    }

    const txHash = txData.hash;
    const wallet = getEmbeddedWallet();

    if (!wallet) {
      throw new Error('Wallet not initialized.' + txHash);
    }

    const ethProvider = wallet.evm.getRpcProviderForNetworkId(txData?.chainId as number);

    if (!ethProvider) {
      throw new Error('Provider not initialized. ' + txHash);
    }

    const tx = state.txs[activeWallet.address]?.[txHash];

    // Tx doesnt exist, is done, or is already pending
    if (
      !tx ||
      tx.status === 'confirmed' ||
      tx.status === 'failed' ||
      state.pending.includes(txHash)
    ) {
      return;
    }

    // After 15s (ensure tx gets listed), check if tx exists (could be overwritten by speed up)
    // Stop checking if it doesnt exist
    if (Date.now() - tx.createdAt > 15000) {
      const txExists = await ethProvider.getTransaction(txHash);

      if (!txExists) {
        dispatch({ type: 'setTxStatus', payload: { tx, status: 'failed' } });
        return;
      }
    }

    // Try to get receipt (only exists if tx mined)
    const receipt = await ethProvider.getTransactionReceipt(txHash);

    if (!receipt) {
      /**
       * Tx pending
       */
      dispatch({
        type: 'setTxStatus',
        payload: {
          tx,
          status: 'pending',
        },
      });

      // Check for tx again after some time, to ensure tx is listed
      const recheckTimeout = !rechecking ? setTimeout(() => checkTransaction(txData), 16000) : null;

      // Attach listener
      ethProvider.once(txHash, ev => {
        if (recheckTimeout) {
          clearTimeout(recheckTimeout);
        }

        const failed = ev && !isNaN(ev.status) && ev.status === 0;

        // Finalize tx, also remove persist if tx failed
        dispatch({
          type: 'setTxStatus',
          payload: {
            tx,
            status: failed ? 'failed' : 'confirmed',
          },
        });

        if (!failed) {
          onTxDone(txData);
        }

        wallet.events.emit('txDone', tx);
      });
    } else {
      /**
       * Tx already finished - finalize
       */
      if (receipt.status) {
        dispatch({
          type: 'setTxStatus',
          payload: {
            tx,
            status: 'confirmed',
          },
        });

        onTxDone(txData, receipt);
      } else {
        // Tx failed
        dispatch({
          type: 'setTxStatus',
          payload: {
            tx,
            status: 'failed',
          },
        });
      }

      wallet.events.emit('txDone', tx);
    }
  }

  async function onTxDone(txData: TransactionItem, txReceipt?: TransactionReceipt | null) {
    if (!wallet) {
      return;
    }

    if (!txReceipt) {
      txReceipt = await wallet?.evm
        ?.getRpcProviderForNetworkId?.(txData?.chainId as number)
        ?.getTransactionReceipt(txData.hash);
    }

    reloadAccountBalances();

    // Reload token if found in current account's storage
    reloadTokenBalance(txReceipt?.to || undefined);

    if (
      !!txReceipt &&
      txData?.internalLabel &&
      ['accountsAdd', 'accountsImport'].includes(txData.internalLabel)
    ) {
      handleNewAccountName(txData, txReceipt);
    }
  }

  async function handleNewAccountName(
    txData: TransactionItem,
    txReceipt: TransactionReceipt | null
  ) {
    if (!wallet) {
      return;
    }

    if (txReceipt?.logs?.[0]) {
      const parsed = new ethers.Interface(EVMAccountAbi).parseLog(txReceipt.logs[0]);

      if (parsed?.args?.[0] && typeof parsed.args[0] === 'string') {
        try {
          const data = JSON.parse(txData.internalData || '""');

          if (data?.title && data?.index) {
            await saveAccountTitle(
              data.title,
              data.index,
              data.walletType === WalletType.SUBSTRATE
                ? parsed.args[0]
                : `0x${parsed.args[0].slice(-40)}`
            );
          }

          setForWallet('stagedWalletsCount', Math.max(0, stagedWalletsCount - 1));
          setForWallet('walletsCountBeforeStaging', Math.max(0, walletsCountBeforeStaging + 1));

          /**
           * Updates wallets in SDK
           * -> emits `dataUpdated` event
           * -> `useSdkEvents` handles event (parseAccountWallets)
           */
          wallet.initAccountWallets([...accountWallets.map(aw => aw.address), parsed.args[0]]);

          handleSuccess('Accounts updated', 5000);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  useEffect(() => {
    if (
      walletType === WalletType.SUBSTRATE &&
      state.monitoredSubstrateTxs.length &&
      !ssMonitoringUnsubscribe.current
    ) {
      ssStartMonitoring();
    } else if (ssMonitoringUnsubscribe.current) {
      ssStopMonitoring();
    }
  }, [walletType, state.monitoredSubstrateTxs]);

  useEffect(() => {
    setTimeout(() => {
      const monitoredTxsForChain = state.monitoredSubstrateTxs.filter(x => x.chainId === networkId);

      dispatch({ type: 'setState', payload: { monitoredSubstrateTxs: monitoredTxsForChain } });

      if (!monitoredTxsForChain.length) {
        ssStopMonitoring();
      } else {
        ssStartMonitoring();
      }
    }, 500);
  }, [networkId]);

  async function ssStartMonitoring() {
    const api = await wallet?.ss.getApiForNetworkId();

    if (!api) {
      return;
    }

    if (ssMonitoringUnsubscribe.current) {
      ssMonitoringUnsubscribe.current();
    }

    // console.log(':: MONITOR START');

    ssMonitoringUnsubscribe.current = await api.rpc.chain.subscribeFinalizedHeads(async header => {
      try {
        const { hash: blockHash } = api.registry.createType('Header', header);

        const blockData = await api.rpc.chain.getBlock(blockHash);
        const signedBlock: any = api.registry.createType('SignedBlock', blockData);

        const apiAt = await api.at(signedBlock.block.header.hash);
        const events = (await apiAt.query.system.events()) as any;

        signedBlock.block.extrinsics.forEach((x: any, txIndex: number) => {
          for (const monitoredTx of state.monitoredSubstrateTxs) {
            if (x.hash.eq(monitoredTx.hash)) {
              const matchedEvent = events.find(
                ({ phase, event }: any) =>
                  phase.isApplyExtrinsic &&
                  phase.asApplyExtrinsic.eq(txIndex) &&
                  ['ExtrinsicSuccess', 'ExtrinsicFailed'].includes(event.method)
              );

              if (matchedEvent) {
                if (matchedEvent.event.method === 'ExtrinsicSuccess') {
                  dispatch({
                    type: 'setTxStatus',
                    payload: { tx: monitoredTx, status: 'confirmed' },
                  });
                } else {
                  dispatch({
                    type: 'setTxStatus',
                    payload: { tx: monitoredTx, status: 'failed' },
                  });
                }

                // remove tx from monitored
                dispatch({
                  type: 'setState',
                  payload: {
                    monitoredSubstrateTxs: state.monitoredSubstrateTxs.filter(
                      x => x.hash !== monitoredTx.hash
                    ),
                  },
                });
              }
            }
          }
        });
      } catch (e) {
        console.error(e);
      }
    });
  }

  function ssStopMonitoring() {
    if (!state.monitoredSubstrateTxs.length && ssMonitoringUnsubscribe.current) {
      // console.log(':: MONITOR END');
      ssMonitoringUnsubscribe.current();
      ssMonitoringUnsubscribe.current = undefined;
    }
  }

  return (
    <TransactionsContext.Provider value={{ state, dispatch, checkTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (context === undefined) {
    throw new Error(
      'useTransactionsContext usage must be wrapped with TransactionsContext provider.'
    );
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TransactionsProvider, useTransactionsContext };
