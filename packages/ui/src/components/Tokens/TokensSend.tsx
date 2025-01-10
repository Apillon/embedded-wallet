import { useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { ERC20Abi } from '@apillon/wallet-sdk';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import SettingsMenuItem from '../Settings/SettingsMenuItem';
import TokensInput from '../Tokens/TokensInput';

export default () => {
  const { state, activeWallet, goScreenBack, wallet, handleError } = useWalletContext();
  const { state: tokens, nativeToken } = useTokensContext();

  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedToken = useMemo<TokenInfo>(() => {
    if (tokens.selectedToken) {
      const userTokens = tokens.list?.[activeWallet?.address || '']?.[state.networkId];

      if (userTokens) {
        const found = userTokens.find(x => x.address === tokens.selectedToken);

        if (found) {
          return found;
        }
      }
    }

    return nativeToken;
  }, [tokens.selectedToken, tokens.list]);

  async function onSubmit() {
    if (loading) {
      return;
    }

    try {
      if (!receiverAddress || !amount) {
        throw new Error('Address and amount are required');
      }

      if (!wallet) {
        throw new Error('Wallet not initialized');
      }

      setLoading(true);
      handleError();

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
  }

  return (
    <form
      className="pt-10"
      onSubmit={ev => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <Input
        label="Wallet"
        placeholder="Paste wallet here"
        value={receiverAddress}
        className="w-full mb-4"
        onChange={ev => setReceiverAddress(ev.target.value)}
      />

      <TokensInput
        value={amount}
        token={selectedToken}
        label="Amount"
        placeholder="0"
        className="w-full mb-4"
        onChange={ev => setAmount(ev.target.value)}
      />

      <SettingsMenuItem
        title={selectedToken.name}
        description={`Balance: ${selectedToken.balance} ${selectedToken.symbol}`}
        screen="selectToken"
        className="w-full mb-6"
      />

      <div className="grid grid-cols-2 gap-2">
        <Btn variant="ghost" type="button" onClick={() => goScreenBack()}>
          Cancel
        </Btn>

        <Btn type="submit" loading={loading}>
          Send
        </Btn>
      </div>
    </form>
  );
};
