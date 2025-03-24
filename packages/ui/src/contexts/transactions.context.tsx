import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { EVMAccountAbi, getEmbeddedWallet, TransactionItem, WalletType } from '@apillon/wallet-sdk';
import { useWalletContext } from './wallet.context';
import { WebStorageKeys } from '../lib/constants';
import { ethers, TransactionReceipt } from 'ethers6';
import { useTokensContext } from './tokens.context';

const initialState = () => ({
  txs: {} as { [ownerAddress: string]: { [txHash: string]: TransactionItem } },
  pending: [] as string[],
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

  const {
    state: { accountWallets, stagedWalletsCount, walletsCountBeforeStaging },
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
      const { pending, ...save } = state;
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
        checkTransaction(tx);
      }
    }
  }, [activeWallet, state.txs]);

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

    const ethProvider = wallet.getRpcProviderForChainId(txData?.chainId);

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
      txReceipt = await wallet
        .getRpcProviderForChainId(txData?.chainId)
        .getTransactionReceipt(txData.hash);
    }

    reloadAccountBalances();

    // Reload token if found in current account's storage
    reloadTokenBalance(txReceipt?.to || undefined);

    if (txData?.internalLabel && ['accountsAdd', 'accountsImport'].includes(txData.internalLabel)) {
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
          console.log(parsed.args);
          debugger;
          const data = JSON.parse(txData.internalData || '""');

          if (data?.title && data?.index) {
            await saveAccountTitle(data.title, data.index, `0x${parsed.args[0].slice(-40)}`);
          }

          setForWallet('stagedWalletsCount', Math.max(0, stagedWalletsCount - 1));
          setForWallet('walletsCountBeforeStaging', Math.max(0, walletsCountBeforeStaging + 1));

          /**
           * Updates wallets in SDK
           * -> emits `dataUpdated` event
           * -> `useSdkEvents` handles event (parseAccountWallets)
           */
          wallet.initAccountWallets([
            ...accountWallets,
            { address: parsed.args[0], index: data.index || 0, walletType: WalletType.EVM },
          ]);

          handleSuccess('Accounts updated', 5000);
        } catch (e) {
          console.error(e);
        }
      }
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
