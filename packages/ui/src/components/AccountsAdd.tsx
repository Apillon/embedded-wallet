import { AccountWalletTypes, WalletType } from '@apillon/wallet-sdk';
import clsx from 'clsx';
import { useState } from 'react';
import Btn from './Btn';
import { useWalletContext } from '../contexts/wallet.context';

const walletTypeOptions = [
  {
    type: WalletType.EVM,
    title: 'Ethereum',
    description: 'Ethereum, Arbitrum, Moonbeam etc',
  },
  {
    type: WalletType.SUBSTRATE,
    title: 'Substrate',
    description: 'Polkadot, Kusama, Parachains',
  },
];

export default function AccountsAdd() {
  const { wallet, handleError } = useWalletContext();
  const [type, setType] = useState<AccountWalletTypes>(WalletType.EVM);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (loading || !title) {
      return;
    }

    setLoading(true);

    try {
      await wallet?.addAccountWallet({ title, walletType: type });
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  return (
    <div>
      <h3 className="mb-6">Add new account</h3>

      <form
        onSubmit={ev => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <p className="mb-3 font-bold text-sm">Select type</p>

        <div className="flex flex-col gap-3 mb-6">
          {walletTypeOptions.map(wt => (
            <button
              key={wt.type}
              type="button"
              className={clsx(
                'oaw-button bg-primarylight px-3 py-2 rounded-md',
                'border border-solid border-primarylight',
                {
                  '!border-yellow': type === wt.type,
                }
              )}
              onClick={() => setType(wt.type)}
            >
              <div>
                <p className="text-sm font-bold text-offwhite mb-1.5">{wt.title}</p>
                <p className="text-xs text-lightgrey">{wt.description}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="mb-3 font-bold text-sm">Account name</p>

        <input
          placeholder="Enter Account name (for personal reference)"
          value={title}
          className="w-full mb-6"
          onChange={ev => setTitle(ev.target.value)}
        />

        <Btn type="submit" className="w-full">
          Create account
        </Btn>
      </form>
    </div>
  );
}
