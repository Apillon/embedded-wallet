import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getEmbeddedWallet, TransactionItem } from '@apillon/wallet-sdk';
import { useWalletContext } from './wallet.context';
import { WebStorageKeys } from '../lib/constants';

const initialState = () => ({
  txs: {} as { [ownerAddress: string]: { [txHash: string]: TransactionItem } },
  pending: [] as string[],
  chainIdsForHash: {} as { [txHash: string]: number }, // for pending hashes
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
      payload: { tx: TransactionItem; status: 'pending' | 'confirmed' | 'failed' };
    };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'addTx':
      return {
        ...state,
        txs: {
          ...state.txs,
          [action.payload.owner]: {
            ...state.txs[action.payload.owner],
            [action.payload.hash]: action.payload,
          },
        },
        // pending: [...new Set([...state.pending, action.payload.hash])],
        chainIdsForHash: {
          ...state.chainIdsForHash,
          [action.payload.hash]: action.payload.chainId,
        },
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
        pending:
          action.payload.status === 'pending'
            ? [...new Set([...state.pending, action.payload.tx.hash])]
            : state.pending.filter(x => x !== action.payload.tx.hash),
        chainIdsForHash:
          action.payload.status === 'pending'
            ? {
                ...state.chainIdsForHash,
                [action.payload.tx.hash]: action.payload.tx.chainId,
              }
            : Object.keys(state.chainIdsForHash).reduce(
                (acc, x) => {
                  if (x !== action.payload.tx.hash) {
                    acc[x] = action.payload.tx.chainId;
                  }
                  return acc;
                },
                {} as { [txHash: string]: number }
              ),
      };
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const TransactionsContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      checkTransaction: (txHash: string) => void;
    }
  | undefined
>(undefined);

function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());
  const [initialized, setInitialized] = useState(false);

  const { activeWallet, reloadUserBalance } = useWalletContext();

  useEffect(() => {
    if (initialized) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pending, chainIdsForHash, ...save } = state;
      localStorage.setItem(WebStorageKeys.TRANSACTIONS_CONTEXT, JSON.stringify(save));
    }
  }, [state]);

  useEffect(() => {
    const stored = localStorage.getItem(WebStorageKeys.TRANSACTIONS_CONTEXT);

    if (stored) {
      try {
        const restored = JSON.parse(stored);
        dispatch({ type: 'setState', payload: restored });
      } catch (e) {
        console.error('Cant parse context state localStorage', e);
      }
    }

    setTimeout(() => {
      setInitialized(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (
      activeWallet &&
      state.txs[activeWallet.address] &&
      Object.keys(state.txs[activeWallet.address]).length
    ) {
      for (const h of Object.keys(state.txs[activeWallet.address])) {
        checkTransaction(h);
      }
    }
  }, [activeWallet, state.txs]);

  /**
   * Check if transaction is already finalized in store.
   * If transaction is not finalized, check if it has been mined,
   * otherwise attach a listener to provider that updates when
   * the transaction is mined.
   */
  async function checkTransaction(txHash: string) {
    if (!activeWallet) {
      return;
    }

    const wallet = getEmbeddedWallet();

    if (!wallet) {
      throw new Error('Wallet not initialized.' + txHash);
    }

    const ethProvider = wallet.getRpcProviderForChainId(state.chainIdsForHash[txHash]);

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

      // Attach listener
      ethProvider.once(txHash, ev => {
        const failed = ev && !isNaN(ev.status) && ev.status === 0;

        // Reload balance on every tx
        reloadUserBalance();

        // Finalize tx, also remove persist if tx failed
        dispatch({
          type: 'setTxStatus',
          payload: {
            tx,
            status: failed ? 'failed' : 'confirmed',
          },
        });

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

      // Reload balance on every tx
      reloadUserBalance();

      wallet.events.emit('txDone', tx);
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
