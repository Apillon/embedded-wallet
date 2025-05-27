import { useState } from 'react';
import { ethers } from 'ethers6';
import { ERC20Abi } from '@apillon/wallet-sdk';
import { useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import TokensInput from '../Tokens/TokensInput';
import TokensItem from './TokensItem';

export default () => {
  const { state, goScreenBack, wallet, handleError, setScreen, isSubstrate } = useWalletContext();
  const { selectedToken } = useTokensContext();

  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

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

      if (!selectedToken.address && !selectedToken.assetId) {
        const label = 'Transfer native token';

        if (isSubstrate()) {
          /**
           * Substrate native token
           */
          const api = await wallet.ss.getApiForNetworkId();
          const decimals = api!.registry.chainDecimals[0];

          const res = await wallet.ss.signTransaction({
            mustConfirm: true,
            strategy: 'passkey',
            tx: api!.tx.balances.transferKeepAlive(
              receiverAddress,
              +amount * Math.pow(10, decimals)
            ),
            label,
          });

          return res;
          /**
           * Tx is broadcast in txApprove event handler (approve.context.ts)
           */
          // if (res) {
          //   return await wallet.ss.broadcastTransaction(
          //     res.signedTxData,
          //     res.chainId as string | undefined,
          //     label,
          //     undefined,
          //     JSON.stringify({
          //       decimals,
          //     })
          //   );
          // }
        } else {
          /**
           * EVM Native token
           */
          const res = await wallet.evm.signPlainTransaction({
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

          return res;
          /**
           * Tx is broadcast in txApprove event handler (approve.context.ts)
           */
          // if (!state.appProps.broadcastAfterSign && res) {
          //   return await wallet.evm.broadcastTransaction(
          //     res.signedTxData,
          //     res.chainId as number,
          //     label
          //   );
          // } else {
          //   return res;
          // }
        }
      } else if (selectedToken.address) {
        /**
         * EVM ERC20 Token
         */
        const label = 'Transfer ERC20 token';

        const res = await wallet.evm.signContractWrite({
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
          return await wallet.evm.broadcastTransaction(res.signedTxData, res.chainId, label);
        } else {
          return res;
        }
      } else if (selectedToken.assetId) {
        /**
         * Substrate custom token/asset
         */
        const label = 'Transfer polkadot asset';

        const api = await wallet.ss.getApiForNetworkId();

        const res = await wallet.ss.signTransaction({
          mustConfirm: true,
          strategy: 'passkey',
          tx: api!.tx.assets.transfer(
            selectedToken.assetId,
            receiverAddress,
            +amount * Math.pow(10, selectedToken.decimals)
          ),
          label,
        });

        return res;
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

      <TokensItem
        token={selectedToken}
        asButton
        showArrow
        className="w-full mb-6"
        onClick={() => setScreen('selectToken')}
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
