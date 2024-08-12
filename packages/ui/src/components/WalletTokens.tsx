import { useMemo, useState } from 'react';
import { TokenInfo, useTokensContext } from '../contexts/tokens.context';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import { ERC20Abi } from '@apillon/wallet-sdk';
import { ethers } from 'ethers';
import QRCode from 'react-qr-code';
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
            // Native token
            await wallet.signPlainTransaction({
              mustConfirm: true,
              strategy: 'passkey',
              tx: {
                to: receiverAddress,
                data: '0x',
                gasLimit: 1_000_000,
                value: ethers.parseEther(amount),
              },
              label: 'Transfer native token',
            });
          } else {
            // Other ERC20 Token
            await wallet.signContractWrite({
              mustConfirm: true,
              contractAbi: ERC20Abi,
              contractAddress: selectedToken.address,
              contractFunctionName: 'transfer',
              contractFunctionValues: [
                receiverAddress,
                ethers.parseUnits(amount, selectedToken.decimals),
              ],
              label: 'Transfer ERC20 token',
            });
          }
        } catch (e) {
          handleError(e);
        }

        setLoading(false);
      }}
    >
      <h2 className="mb-8">Send tokens to address</h2>

      <Btn
        variant="secondary"
        className="mb-4 w-full text-left"
        onClick={() => setScreen('selectToken')}
      >
        Token: {selectedToken.name}
        <br />
        <span className="font-normal">
          Balance: {selectedToken.balance} {selectedToken.symbol}
        </span>
      </Btn>

      <input
        placeholder="Receiver address"
        value={receiverAddress}
        className="w-full mb-4"
        onChange={ev => setReceiverAddress(ev.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        className="w-full mb-8"
        onChange={ev => setAmount(ev.target.value)}
      />

      <Btn type="submit" className="w-full">
        Send
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
      <h2 className="mb-4">Add token</h2>

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
            handleError(e);
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

      <h2 className="mb-4">Select token</h2>

      <div className="flex flex-col gap-3">
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
    </div>
  );
}

function ReceiveToken() {
  const { state } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard();

  if (!state.address) {
    return <></>;
  }

  return (
    <div>
      <div className="p-4 mb-4">
        <QRCode
          value={`ethereum:${state.address}`}
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '256px', margin: '0 auto' }}
          viewBox={`0 0 256 256`}
        />
      </div>

      <input readOnly value={state.address} className="w-full mb-4" />

      <Btn className="w-full" onClick={() => onCopy(state.address)}>
        {copyText}
      </Btn>
    </div>
  );
}
