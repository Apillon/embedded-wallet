import { useMemo, useState } from 'react';
import { TokenInfo, useTokensContext } from '../contexts/tokens.context';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import { ERC20Abi } from '@apillon/wallet-sdk';
import { ethers } from 'ethers';
// @ts-ignore
import { QRCode } from 'react-qr-code';
import useCopyToClipboard from '../hooks/useCopyToClipboard';

export default function WalletTokens() {
  const { state, networksById, setScreen, wallet, handleError } = useWalletContext();
  const { state: tokens } = useTokensContext();

  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const nativeToken = useMemo<TokenInfo>(
    () => ({
      address: '',
      name: `${networksById?.[state.networkId]?.name} ETH`,
      symbol: 'ETH',
      decimals: 18,
      balance: state.balance,
    }),
    [state.balance, state.networkId]
  );

  const selectedToken = useMemo<TokenInfo>(() => {
    if (tokens.selectedToken) {
      const userTokens = tokens.list[state.address][state.networkId];

      if (userTokens) {
        const found = userTokens.find(x => x.address === tokens.selectedToken);

        if (found) {
          return found;
        }
      }
    }

    return nativeToken;
  }, [tokens.selectedToken, tokens.list]);

  if (state.walletScreen === 'selectToken') {
    return <SelectToken nativeToken={nativeToken} />;
  }

  if (state.walletScreen === 'receiveToken') {
    return <ReceiveToken />;
  }

  return (
    <form
      onSubmit={async ev => {
        ev.preventDefault();

        if (loading) {
          return;
        }

        if (!receiverAddress || !amount) {
          console.error('Address and amount are required');
          return;
        }

        if (!wallet) {
          console.error('Wallet not initialized');
          return;
        }

        setLoading(true);
        handleError();

        try {
          if (!selectedToken.address) {
            const label = 'Transfer native token';
            // Native token
            const res = await wallet.signPlainTransaction({
              mustConfirm: true,
              strategy: 'passkey',
              tx: {
                to: receiverAddress,
                data: '0x',
                gasLimit: 1_000_000,
                value: ethers.parseEther(amount),
              },
              label,
            });

            if (!state.appProps.broadcastAfterSign && res) {
              return await wallet.broadcastTransaction(res.signedTxData, res.chainId, label);
            } else {
              return res;
            }
          } else {
            const label = 'Transfer ERC20 token';

            // Other ERC20 Token
            const res = await wallet.signContractWrite({
              mustConfirm: true,
              contractAbi: ERC20Abi,
              contractAddress: selectedToken.address,
              contractFunctionName: 'transfer',
              contractFunctionValues: [
                receiverAddress,
                ethers.parseUnits(amount, selectedToken.decimals),
              ],
              label,
            });

            if (!state.appProps.broadcastAfterSign && res) {
              return await wallet.broadcastTransaction(res.signedTxData, res.chainId, label);
            } else {
              return res;
            }
          }
        } catch (e) {
          handleError(e, 'onTokensTransfer');
        }

        setLoading(false);
      }}
    >
      <h3 className="mb-6">Send</h3>

      <label className="block text-xs font-bold mb-2">Token</label>

      <Btn
        variant="secondary"
        className="mb-4 w-full text-left"
        onClick={() => setScreen('selectToken')}
      >
        {selectedToken.name}
        <br />
        <span className="font-normal">
          Balance: {selectedToken.balance} {selectedToken.symbol}
        </span>
      </Btn>

      <label htmlFor="receiver-wallet" className="block text-xs font-bold mb-2">
        Wallet
      </label>

      <input
        id="receiver-wallet"
        placeholder="Paste wallet here"
        value={receiverAddress}
        className="w-full mb-4"
        onChange={ev => setReceiverAddress(ev.target.value)}
      />

      <label htmlFor="send-amount" className="block text-xs font-bold mb-2">
        Amount
      </label>

      <input
        id="send-amount"
        placeholder="0"
        value={amount}
        className="w-full mb-8"
        onChange={ev => setAmount(ev.target.value)}
      />

      <Btn type="submit" className="w-full mb-4">
        Send
      </Btn>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('main')}>
        Cancel
      </Btn>
    </form>
  );
}

function SelectToken({ nativeToken }: { nativeToken: TokenInfo }) {
  const { state, setScreen, handleError } = useWalletContext();
  const { state: tokens, dispatch, getTokenDetails } = useTokensContext();

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const tokenList = useMemo<TokenInfo[]>(() => {
    return Array.isArray(tokens.list[state.address]?.[state.networkId])
      ? [nativeToken, ...tokens.list[state.address][state.networkId]]
      : [nativeToken];
  }, [tokens.list]);

  return (
    <div>
      {/* Select token */}
      <h3 className="mb-4">Select token</h3>

      <div className="flex flex-col gap-3 mb-8">
        {tokenList.map(token => (
          <Btn
            key={token.address}
            variant="secondary"
            disabled={token.address === tokens.selectedToken}
            className="w-full text-left"
            onClick={() => {
              dispatch({
                type: 'setValue',
                payload: { key: 'selectedToken', value: token.address },
              });
              setScreen('sendToken');
            }}
          >
            Token: {token.name}
            <br />
            <span className="font-normal">
              Balance: {token.balance} {token.symbol}
            </span>
          </Btn>
        ))}
      </div>

      {/* Add new token */}
      <h3 className="mb-4">Add token</h3>

      <form
        className="mb-8"
        onSubmit={async ev => {
          ev.preventDefault();

          if (loading) {
            return;
          }

          if (!address) {
            console.error('No address');
            return;
          }

          setLoading(true);
          handleError();

          try {
            const res = await getTokenDetails(address);

            if (!res) {
              throw new Error('Could not get token details');
            }

            dispatch({
              type: 'updateToken',
              payload: { owner: state.address, chainId: state.networkId, token: res },
            });
          } catch (e) {
            handleError(e, 'onTokensAdd');
          }

          setLoading(false);
        }}
      >
        <input
          placeholder="Token address"
          value={address}
          className="w-full mb-4"
          onChange={ev => setAddress(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Add
        </Btn>
      </form>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('sendToken')}>
        Cancel
      </Btn>
    </div>
  );
}

function ReceiveToken() {
  const { state, setScreen } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard();

  if (!state.address) {
    return <></>;
  }

  return (
    <div>
      <h3 className="mb-6">Receive</h3>

      <div className="p-4 mb-4 text-center">
        <QRCode
          value={`ethereum:${state.address}`}
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '256px', margin: '0 auto' }}
          viewBox={`0 0 256 256`}
        />
      </div>

      <input readOnly value={state.address} className="w-full mb-4" />

      <Btn className="w-full mb-4" onClick={() => onCopy(state.address)}>
        {copyText}
      </Btn>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('main')}>
        Cancel
      </Btn>
    </div>
  );
}
