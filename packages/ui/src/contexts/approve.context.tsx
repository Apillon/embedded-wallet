import { ethers } from 'ethers';
import { ContractReadParams, Events, UserRejectedRequestError } from '@apillon/wallet-sdk';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useTransactionsContext } from './transactions.context';
import { useWalletContext } from './wallet.context';
import { MODAL_TRANSITION_TIME } from '../components/ui/Modal';

export type DisplayedContractParams = Pick<
  ContractReadParams,
  'chainId' | 'contractAddress' | 'contractFunctionName' | 'contractFunctionValues'
>;

function ApproveProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const {
    state: { walletScreenHistory },
    wallet,
    setStateValue: setForWallet,
    setScreen,
  } = useWalletContext();
  const { dispatch: dispatchTx } = useTransactionsContext();

  /**
   * Handle wallet SDK Events
   */
  useEffect(() => {
    const onTxApproveEvent = (params: Events['txApprove']) => {
      if (params.plain) {
        setStateValue('txToConfirm', params.plain?.tx);
        setStateValue('approveParams', params);
        setForWallet('isOpen', true);
      } else if (params.contractWrite) {
        setStateValue('contractFunctionData', {
          chainId: params.contractWrite.chainId,
          contractAddress: params.contractWrite.contractAddress,
          contractFunctionName: params.contractWrite.contractFunctionName,
          contractFunctionValues: params.contractWrite.contractFunctionValues,
        });
        setStateValue('approveParams', params);
        setForWallet('isOpen', true);
      }
    };

    const onSignatureRequestEvent = (params: Events['signatureRequest']) => {
      setStateValue('messageToSign', params.message as string);
      setStateValue('approveParams', { signature: params });
      setForWallet('isOpen', true);
    };

    const onTxSubmittedEvent = async (params: Events['txSubmitted']) => {
      dispatchTx({ type: 'addTx', payload: params });

      if (params.internalLabel && ['gasless_3', 'gasless_4'].includes(params.internalLabel)) {
        // Dont show transaction submitted screen
        return;
      }

      setStateValue('successInfo', {
        title: 'Successfully sent',
        txHash: params.hash,
        explorerUrl: params.explorerUrl,
      });

      await new Promise(resolve => setTimeout(resolve, MODAL_TRANSITION_TIME * 2));

      setForWallet('isOpen', true);
    };

    const onProviderRequestAccounts = () => {
      setForWallet('isOpen', true);
    };

    const onRequestChainChange = (params: Events['requestChainChange']) => {
      setStateValue('targetChain', params);
      setForWallet('isOpen', true);
    };

    if (wallet) {
      wallet.events.on('txApprove', onTxApproveEvent);
      wallet.events.on('signatureRequest', onSignatureRequestEvent);
      wallet.events.on('txSubmitted', onTxSubmittedEvent);
      wallet.events.on('providerRequestAccounts', onProviderRequestAccounts);
      wallet.events.on('requestChainChange', onRequestChainChange);
    }

    return () => {
      if (wallet) {
        wallet.events.off('txApprove', onTxApproveEvent);
        wallet.events.off('signatureRequest', onSignatureRequestEvent);
        wallet.events.off('txSubmitted', onTxSubmittedEvent);
        wallet.events.off('providerRequestAccounts', onProviderRequestAccounts);
        wallet.events.off('requestChainChange', onRequestChainChange);
      }
    };
  }, [wallet]);

  useEffect(() => {
    if (state.approveParams || state.targetChain || state.successInfo) {
      setScreen('approve');
    }
  }, [state.approveParams, state.targetChain, state.successInfo]);

  function setStateValue<T extends keyof ReturnType<typeof initialState>>(
    key: T,
    value: ReturnType<typeof initialState>[T]
  ) {
    dispatch({ type: 'setValue', payload: { key, value } });
  }

  // Close wallet modal if wallet was not opened before approve action.
  function onApproveDone(success = false) {
    const newHistory = walletScreenHistory.filter(s => s !== 'approve');

    setForWallet('walletScreenHistory', newHistory);

    if (newHistory.length > 1) {
      if (!success) {
        if (!state.successInfo?.title) {
          if (state.approveParams?.contractWrite?.reject) {
            state.approveParams.contractWrite.reject(new UserRejectedRequestError());
          } else if (state.approveParams?.plain?.reject) {
            state.approveParams.plain.reject(new UserRejectedRequestError());
          } else if (state.approveParams?.signature?.reject) {
            state.approveParams.signature.reject(new UserRejectedRequestError());
          } else if (state?.targetChain?.resolve) {
            state.targetChain.resolve(false);
          }
        }
      }

      dispatch({ type: 'reset' });
      // setForWallet('walletScreen', newHistory[newHistory.length - 1]);
      setForWallet('walletScreen', 'main');
    } else {
      setForWallet('isOpen', false);
    }
  }

  return (
    <ApproveContext.Provider
      value={{
        state,
        dispatch,
        setStateValue,
        onApproveDone,
      }}
    >
      {children}
    </ApproveContext.Provider>
  );
}

const ApproveContext = createContext<
  | {
      state: ContextState;
      dispatch: (action: ContextActions) => void;
      setStateValue: <T extends keyof ReturnType<typeof initialState>>(
        key: T,
        value: ReturnType<typeof initialState>[T]
      ) => void;
      onApproveDone: (success?: boolean) => void;
    }
  | undefined
>(undefined);

const initialState = () => ({
  txToConfirm: undefined as undefined | ethers.TransactionLike<ethers.AddressLike>,
  contractFunctionData: undefined as undefined | DisplayedContractParams,
  messageToSign: '',
  targetChain: undefined as undefined | Events['requestChainChange'],
  approveParams: undefined as
    | undefined
    | Partial<Events['txApprove'] & { signature: Events['signatureRequest'] }>,
  successInfo: undefined as undefined | { title: string; txHash: string; explorerUrl: string },
});

type ContextState = ReturnType<typeof initialState>;

type ContextActions =
  | {
      type: 'setState';
      payload: Partial<ReturnType<typeof initialState>>;
    }
  | {
      type: 'setValue';
      payload: { key: keyof ReturnType<typeof initialState>; value: any };
    }
  | { type: 'reset' };

function reducer(state: ContextState, action: ContextActions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    case 'setValue':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'reset':
      return initialState();
    default:
      throw new Error('Unhandled action type.' + JSON.stringify(action));
  }
}

function useApproveContext() {
  const context = useContext(ApproveContext);

  if (context === undefined) {
    throw new Error('useApproveContext usage must be wrapped with TokensContext provider.');
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ApproveProvider, useApproveContext };
