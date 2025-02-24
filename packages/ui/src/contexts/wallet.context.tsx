import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  AuthStrategyName,
  ErrorMessages,
  EmbeddedWallet,
  EmbeddedWalletSDK,
  SapphireMainnet,
  Network,
  SapphireTestnet,
  AccountWallet,
} from '@apillon/wallet-sdk';
import { AppProps } from '../main';
import { WebStorageKeys } from '../lib/constants';
import { logToStorage } from '../lib/helpers';
import oasisLogo from '../assets/oasis.svg';

export type WalletScreens =
  | 'main'
  | 'approve'
  | 'networks'
  | 'transactions'
  | 'sendToken'
  | 'selectToken'
  | 'importToken'
  | 'exportPrivateKey'
  | 'selectAccounts'
  | 'addAccount'
  | 'importAccount'
  | 'reloadAccounts'
  | 'renameAccount'
  | 'menuDot'
  | 'menuMore'
  | 'accountDetails'
  | 'settingsGeneral'
  | 'importNft'
  | 'nftDetail';

type AccountWalletEx = AccountWallet & { balance: string; title: string };

const initialState = (defaultNetworkId = 0, appProps: AppProps) => ({
  username: '',
  walletIndex: 0,
  accountWallets: [] as AccountWalletEx[],
  stagedWalletsCount: 0, // how many new wallets have been addedd, but are not in `accountWallets` yet
  isAccountWalletsStale: false,
  contractAddress: '',
  privateKeys: {} as { [walletAddress: string]: string },
  authStrategy: 'passkey' as AuthStrategyName,
  networkId: defaultNetworkId,
  walletScreen: 'main' as WalletScreens,
  walletScreenHistory: [] as WalletScreens[],
  lastIndexTabIndex: 0, // index of last tab opened on <WalletIndex />
  isOpen: false, // is wallet modal displayed
  displayedError: '',
  displayedSuccess: '',
  displayedInfo: '',
  appProps,
  loadingWallets: false,
});

type ContextState = ReturnType<typeof initialState>;

/**
 * State actions/reducer
 */
type ContextActions =
  | {
      type: 'setValue';
      payload: { key: keyof ReturnType<typeof initialState>; value: any };
    }
  | {
      type: 'setState';
      payload: Partial<ReturnType<typeof initialState>>;
    }
  | { type: 'setBalance'; payload: { address: string; balance?: string } }
  | { type: 'reset' };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setValue': {
      // Keep history of wallet screens routing
      // and reset displayed error
      if (action.payload.key === 'walletScreen') {
        const walletScreenHistory = [...state.walletScreenHistory];

        if (
          walletScreenHistory.length > 1 &&
          walletScreenHistory[walletScreenHistory.length - 2] === action.payload.value
        ) {
          walletScreenHistory.pop();
        } else if (
          walletScreenHistory.length > 0 &&
          walletScreenHistory[walletScreenHistory.length - 1] === action.payload.value
        ) {
          // same screen, do nothing
        } else {
          walletScreenHistory.push(action.payload.value);
        }

        return {
          ...state,
          walletScreenHistory,
          displayedError: '',
          [action.payload.key]: action.payload.value,
        };
      }

      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'setBalance': {
      const updated = [...state.accountWallets];
      const found = updated.findIndex(x => x.address === action.payload.address);

      if (found > -1) {
        updated[found].balance = action.payload.balance || '';
      }

      return {
        ...state,
        accountWallets: updated,
      };
    }
    case 'reset':
      return initialState(state.networkId, state.appProps);
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

const WalletContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      networks: Network[];
      networksById: { [networkId: number]: Network };
      defaultNetworkId: number;
      activeWallet?: AccountWalletEx;
      wallet?: EmbeddedWallet;
      setWallet: (wallet: EmbeddedWallet) => void;
      initialized: boolean;
      loadAccountWallets: (
        strategy?: AuthStrategyName,
        username?: string
      ) => Promise<AccountWallet[] | undefined>;
      parseAccountWallets: (wallets: AccountWallet[]) => Promise<AccountWalletEx[]>;
      reloadAccountBalances: (
        addresses?: string[],
        accountWallets?: AccountWalletEx[]
      ) => Promise<boolean | undefined>;
      saveAccountTitle: (title: string, index?: number) => Promise<void>;
      setScreen: (screen: WalletScreens) => void;
      goScreenBack: () => void;
      handleSuccess: (msg: string, timeout?: number) => void;
      handleInfo: (msg: string, timeout?: number) => void;
      handleError: (e?: any, src?: string) => string;
      setStateValue: <T extends keyof ReturnType<typeof initialState>>(
        key: T,
        value: ReturnType<typeof initialState>[T]
      ) => void;
    }
  | undefined
>(undefined);

function WalletProvider({
  children,
  networks = [],
  defaultNetworkId = 0,
  ...restOfParams
}: {
  children: ReactNode;
  networks?: Network[];
} & AppProps) {
  // If not already set, add sapphire network
  if (!networks.some(n => n.id === SapphireTestnet || n.id === SapphireMainnet)) {
    networks = [
      import.meta.env.VITE_SAPPHIRE_TESTNET
        ? {
            name: 'Sapphire Testnet',
            id: SapphireTestnet,
            rpcUrl: 'https://testnet.sapphire.oasis.io',
            explorerUrl: 'https://explorer.oasis.io/testnet/sapphire',
            imageUrl: oasisLogo,
            currencySymbol: 'ROSE',
          }
        : {
            name: 'Oasis Sapphire',
            id: SapphireMainnet,
            rpcUrl: 'https://sapphire.oasis.io',
            explorerUrl: 'https://explorer.oasis.io/mainnet/sapphire',
            imageUrl: oasisLogo,
            currencySymbol: 'ROSE',
          },
      ...networks,
    ];
  }

  const [state, dispatch] = useReducer(
    reducer,
    initialState(defaultNetworkId || networks[0].id, { ...restOfParams, defaultNetworkId })
  );
  const initializingWallet = useRef(false);
  const [initialized, setInitialized] = useState(false);
  const [wallet, setWallet] = useState<EmbeddedWallet>();
  const successTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const infoTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const networksById = networks.reduce(
    (acc, x) => {
      acc[x.id] = x;
      return acc;
    },
    {} as { [networkId: number]: Network }
  );

  const activeWallet = useMemo(() => {
    if (state.walletIndex >= state.accountWallets.length) {
      return undefined;
    }

    return state.accountWallets[state.walletIndex];
  }, [state.walletIndex, state.accountWallets]);

  /**
   * Initialize Oasis Wallet App SDK
   * + initialize last global state
   */
  useEffect(() => {
    if (!wallet && !initializingWallet.current) {
      initializingWallet.current = true;
      initWallet();
    }
  }, []);

  /**
   * Store changed state to gateway localStorage
   */
  useEffect(() => {
    if (initialized && wallet) {
      /**
       * Exclude some state variables from being saved
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        walletScreen,
        displayedError,
        loadingWallets,
        privateKeys,
        appProps,
        walletScreenHistory,
        isOpen,
        ...save
      } = state;

      wallet.xdomain?.storageSet(WebStorageKeys.WALLET_CONTEXT, JSON.stringify(save));
    }
  }, [state]);

  /**
   * Reload balance on:
   * - login
   * - account change
   */
  useEffect(() => {
    if (state.walletIndex < state.accountWallets.length) {
      reloadAccountBalances([state.accountWallets[state.walletIndex].address]);
    }
  }, [state.username, state.walletIndex, state.accountWallets.length]);

  async function initWallet() {
    let w = undefined as EmbeddedWallet | undefined;

    if (networks && networks.length) {
      w = EmbeddedWalletSDK({
        ...restOfParams,
        networks,
        defaultNetworkId,
      });
    } else {
      w = EmbeddedWalletSDK();
    }

    if (w) {
      setWallet(w);

      // Get stored state
      const stored = await w.xdomain?.storageGet(WebStorageKeys.WALLET_CONTEXT);

      let mergedState = { ...state };

      if (stored) {
        try {
          const restored = JSON.parse(stored) as ContextState;
          mergedState = { ...mergedState, ...restored };
          dispatch({ type: 'setState', payload: restored });
        } catch (e) {
          console.error('Cant parse global state localStorage', e);
        }
      }

      if (mergedState.networkId !== defaultNetworkId) {
        w.setDefaultNetworkId(mergedState.networkId);
      }

      w.setAccount({
        username: mergedState.username,
        strategy: mergedState.authStrategy,
        walletIndex: mergedState.walletIndex,
        contractAddress: mergedState.contractAddress,
      });

      w.setWallets(mergedState.accountWallets);

      await new Promise(resolve => setTimeout(resolve, 10));

      initializingWallet.current = false;
      setInitialized(true);
    }
  }

  function setStateValue<T extends keyof ReturnType<typeof initialState>>(
    key: T,
    value: ReturnType<typeof initialState>[T]
  ) {
    dispatch({ type: 'setValue', payload: { key, value } });
  }

  /**
   * Load all wallet accounts for user. Requires auth
   */
  async function loadAccountWallets(strategy?: AuthStrategyName, username?: string) {
    if (state.loadingWallets) {
      return;
    }

    setStateValue('loadingWallets', true);

    try {
      const wallets =
        (await wallet?.getAccountWallets({
          strategy: strategy || state.authStrategy,
          authData: { username: username || state.username },
          reload: true,
        })) || [];

      wallet?.setAccount({
        strategy: strategy || state.authStrategy,
        username: username || state.username,
      });

      const newWallets = await parseAccountWallets(wallets, username);

      if (state.walletIndex < wallets.length) {
        wallet?.events.emit('accountsChanged', [wallets[state.walletIndex].address]);
      }

      setStateValue('loadingWallets', false);
      setStateValue('isAccountWalletsStale', false);
      setStateValue('displayedError', '');

      reloadAccountBalances(
        wallets.map(w => w.address),
        newWallets
      );

      return wallets;
    } catch (e) {
      console.error('loadAccountWallets', e);
      handleError(e);
    }

    setStateValue('loadingWallets', false);
  }

  /**
   * Add info from global storage, initialize some info, set state.
   */
  async function parseAccountWallets(wallets: AccountWallet[], username?: string) {
    // Get account names from global storage
    const { all: accountNamesStorage, current: accountNames } = await getAccountTitles();
    const accountNamesUpdates = {} as { [accountAddress: string]: string };

    username = username || state.username || wallet?.lastAccount.username || '-';
    const contractAddress = state.contractAddress || wallet?.lastAccount?.contractAddress || '-';

    const newWallets = [] as AccountWalletEx[];

    for (const w of wallets) {
      newWallets.push({
        ...w,
        balance: '0',
        title: accountNames[w.address] || accountNames[`${w.index}`] || username,
      });

      // Store (update global storage) names with wallet address if any are only stored with index
      if (!accountNames[w.address] && !!accountNames[`${w.index}`]) {
        accountNamesUpdates[w.address] = accountNames[`${w.index}`];
      }
    }

    // Update global storage if needed
    if (Object.keys(accountNamesUpdates).length) {
      wallet?.xdomain?.storageSet(
        WebStorageKeys.WALLET_NAMES,
        JSON.stringify({
          ...accountNamesStorage,
          [contractAddress]: {
            ...accountNames,
            ...accountNamesUpdates,
          },
        })
      );
    }

    setStateValue('accountWallets', newWallets);

    return newWallets;
  }

  async function reloadAccountBalances(
    addresses?: string[],
    accountWallets: AccountWalletEx[] = state.accountWallets
  ) {
    await new Promise(resolve => setTimeout(resolve, 50));

    if (!addresses) {
      if (!activeWallet?.address) {
        return;
      }

      addresses = [activeWallet.address];
    }

    try {
      const balances = await Promise.all(
        addresses.map(async address => {
          const balance = await wallet?.getAccountBalance(address);

          return {
            address,
            balance,
          };
        })
      );

      const updatedWallets = [...accountWallets];

      balances.forEach(b => {
        const found = updatedWallets.findIndex(x => x.address === b.address);

        if (found > -1) {
          updatedWallets[found].balance = b.balance || '0';
        }
      });

      setStateValue('accountWallets', updatedWallets);

      return true;
    } catch (e) {
      console.error('Reloading balance', e);
    }
  }

  /**
   * Save new custom account name, or update existing one.
   */
  async function saveAccountTitle(title: string, index?: number) {
    if (!index && index !== 0) {
      index = state.walletIndex;
    }

    const { all, current } = await getAccountTitles();

    // When address not available, use index instead to save the username (use e.g. when address is not available yet after creating account)
    wallet?.xdomain?.storageSet(
      WebStorageKeys.WALLET_NAMES,
      JSON.stringify({
        ...all,
        [state.contractAddress]: {
          ...current,
          [index > state.accountWallets.length - 1
            ? `${index}`
            : state.accountWallets[index].address]: title,
        },
      })
    );

    const found = state.accountWallets.findIndex(x => x.index === index);

    // Update wallet title in state
    if (found > -1) {
      const n = [...state.accountWallets];
      n[found] = { ...n[found], title };
      setStateValue('accountWallets', n);
    }
  }

  /**
   * Get wallet names from global storage. Names are stored like
   * ```
   * {
   *   // user wallet contract address
   *   '0x5A891D65DFeE86b0eCceCFdfC788CFf5e41a073f': {
   *     // each account wallet address
   *     '0x2F76b9370743f9F38F261AA7Eb0e6879F7df76a4': 'Wallet name 1',
   *     '0x9d39f807B7146a46e19456431aae8B9Ab22DC24b': 'Wallet name 2',
   *   },
   * },
   * ```
   */
  async function getAccountTitles() {
    const stored = await wallet?.xdomain?.storageGet(WebStorageKeys.WALLET_NAMES);
    const contractAddress = state.contractAddress || wallet?.lastAccount?.contractAddress || '-';

    let all = {} as { [contractAddress: string]: { [accountAddress: string]: string } };
    let current = {} as { [accountAddress: string]: string };

    if (stored) {
      try {
        all = JSON.parse(stored);
        if (all[contractAddress]) {
          current = all[contractAddress];
        }
      } catch (_e) {}
    }

    return { all, current };
  }

  function handleError(e?: any, src?: string) {
    let msg = '';

    if (e) {
      console.error(src ?? '', e);

      if (typeof e === 'string') {
        msg = e;
      }

      if (e?.name) {
        msg = ErrorMessages[e.name];
      }

      if (!msg && e?.error) {
        if (e?.error?.message) {
          msg = e.error.message;
        } else if (typeof e.error === 'string') {
          msg = e.error;
        }
      }

      if (!msg && e?.details) {
        msg = e.details;
      }

      if (!msg && e?.message) {
        msg = e.message;
      }

      if (msg.includes('message: ')) {
        msg = msg.split('message: ')[1];
      }

      logToStorage(msg);

      if (
        msg &&
        msg !== 'already known' &&
        msg !== 'Request rejected by user' &&
        e?.code !== 4001 &&
        e?.name !== 'NotAllowedError' // user cancelled passkey prompt
      ) {
        setStateValue('displayedError', msg);
      }
    } else {
      setStateValue('displayedError', '');
    }

    return msg;
  }

  /**
   * Show success toast and hide it after a timeout
   */
  function handleSuccess(msg: string, timeout = 10000) {
    if (successTimeout.current) {
      clearTimeout(successTimeout.current);
    }

    setStateValue('displayedSuccess', msg);

    successTimeout.current = setTimeout(() => {
      setStateValue('displayedSuccess', '');
      successTimeout.current = undefined;
    }, timeout);
  }

  /**
   * Show info toast and hide it after a timeout
   */
  function handleInfo(msg: string, timeout = 10000) {
    if (infoTimeout.current) {
      clearTimeout(infoTimeout.current);
    }

    setStateValue('displayedInfo', msg);

    infoTimeout.current = setTimeout(() => {
      setStateValue('displayedInfo', '');
      infoTimeout.current = undefined;
    }, timeout);
  }

  return (
    <WalletContext.Provider
      value={{
        state,
        dispatch,
        networks,
        networksById,
        defaultNetworkId: defaultNetworkId || 0,
        activeWallet,
        wallet,
        setWallet,
        initialized,
        loadAccountWallets,
        parseAccountWallets,
        reloadAccountBalances,
        saveAccountTitle,
        handleError,
        handleSuccess,
        handleInfo,
        setStateValue,
        setScreen: (s: WalletScreens) => setStateValue('walletScreen', s),
        goScreenBack: () => {
          if (state.walletScreenHistory.length > 1) {
            setStateValue(
              'walletScreen',
              state.walletScreenHistory[state.walletScreenHistory.length - 2]
            );
          } else {
            setStateValue('walletScreen', 'main');
          }
        },
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

function useWalletContext() {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error('useWalletContext usage must be wrapped with WalletContext provider.');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WalletProvider, useWalletContext };
