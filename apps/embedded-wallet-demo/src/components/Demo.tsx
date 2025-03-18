import { useState } from 'react';
import { ethers } from 'ethers6';
import { getEmbeddedWallet, ERC20Abi } from '@apillon/wallet-sdk';

export default function Demo() {
  const [message, setMessage] = useState('Hello from Apillon!');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('');
  const [tokenName, setTokenName] = useState('');

  const inputClass =
    'rounded-lg border border-lightgrey/25 bg-lightdark text-offwhite px-5 py-3 outline-none focus:border-lightgrey';

  const btnClass =
    'relative rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] !bg-yellow ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50 ' +
    'bg-lightdark text-dark border-b-lightdark border-t-lightdark';

  return (
    <div className="text-offwhite  px-4 py-4 max-w-lg w-[767px] mt-10">
      <p className="flex gap-4 flex-col">
        <input
          type="text"
          value={message}
          className={inputClass}
          onChange={ev => setMessage(ev.target.value)}
        />

        <button
          className={btnClass}
          onClick={async () => {
            const wallet = getEmbeddedWallet();
            const msg = await wallet?.signMessage({
              mustConfirm: true,
              strategy: 'passkey',
              message,
            });
            window.alert(msg);
          }}
        >
          Sign message
        </button>
      </p>

      <form
        className="grid grid-cols-2 gap-4 mt-10"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getEmbeddedWallet();

          await wallet?.signContractWrite({
            mustConfirm: true,
            strategy: 'passkey',
            contractAbi: ERC20Abi,
            contractAddress: '0xb1058eD01451B947A836dA3609f88C91804D0663',
            contractFunctionName: 'transfer',
            contractFunctionValues: [address, ethers.parseEther(amount)],
            chainId: 1287,
          });
        }}
      >
        <input
          value={address}
          placeholder="Receiver Address"
          className={inputClass}
          onChange={ev => setAddress(ev.target.value)}
        />

        <input
          value={amount}
          placeholder="Amount"
          className={inputClass}
          onChange={ev => setAmount(ev.target.value)}
        />

        <button
          type="button"
          className={btnClass}
          onClick={async () => {
            const wallet = getEmbeddedWallet();
            await wallet?.signPlainTransaction({
              mustConfirm: true,
              strategy: 'passkey',
              tx: {
                to: address,
                data: '0x',
                gasLimit: 1_000_000,
                value: ethers.parseEther(amount),
                chainId: 23295, // 1287,
                gasPrice: 100_000_000_000,
              },
            });
          }}
        >
          Plain Transfer
        </button>
        <button
          type="button"
          className={btnClass}
          onClick={async () => {
            const wallet = getEmbeddedWallet();
            await wallet?.signPlainTransaction({
              mustConfirm: true,
              strategy: 'passkey',
              tx: {
                to: address,
                data: '0x',
                gasLimit: 1_000_000,
                value: ethers.parseEther(amount),
                chainId: 1287,
                gasPrice: 100_000_000_000,
              },
            });
          }}
        >
          Cross-chain Transfer
        </button>
      </form>

      <form
        className="grid grid-cols-2 gap-4 mt-10"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getEmbeddedWallet();
          wallet?.events.emit('addToken', {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: parseInt(tokenDecimals),
            name: tokenName,
          });
          window.alert('Token imported');
        }}
      >
        <input
          value={tokenAddress}
          placeholder="Token Address"
          className={inputClass}
          onChange={ev => setTokenAddress(ev.target.value)}
        />

        <input
          value={tokenSymbol}
          placeholder="Token Symbol"
          className={inputClass}
          onChange={ev => setTokenSymbol(ev.target.value)}
        />

        <input
          value={tokenDecimals}
          placeholder="Token ID/Decimals"
          className={inputClass}
          onChange={ev => setTokenDecimals(ev.target.value)}
        />

        <input
          value={tokenName}
          placeholder="Token Name"
          className={inputClass}
          onChange={ev => setTokenName(ev.target.value)}
        />

        <button
          type="button"
          className={`${btnClass} col-span-1`}
          onClick={() => {
            const wallet = getEmbeddedWallet();
            wallet?.events.emit('addTokenNft', {
              address: tokenAddress,
              tokenId: parseInt(tokenDecimals),
            });
            window.alert('NFT imported');
          }}
        >
          Import NFT
        </button>

        <button type="submit" className={`${btnClass} col-span-1`}>
          Import Token
        </button>
      </form>
    </div>
  );
}
