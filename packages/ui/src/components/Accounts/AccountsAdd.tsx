import { AccountWalletTypes, WalletType } from '@apillon/wallet-sdk';
import clsx from 'clsx';
import { useState } from 'react';
import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';
import Input from '../ui/Input';
import ethIcon from '../../assets/eth_logo.svg';
import polkadotIcon from '../../assets/polkadot-logo.png';
import Pill from '../ui/Pill';

const walletTypeOptions = [
  {
    type: WalletType.EVM,
    title: 'EVM',
    description: 'Ethereum, Arbitrum, Moonbeam etc',
    icon: ethIcon,
  },
  {
    type: WalletType.SUBSTRATE,
    title: 'Substrate',
    description: 'Polkadot, Kusama, Parachains',
    icon: polkadotIcon,
    disabled: true,
  },
];

export default function AccountsAdd() {
  const { wallet, handleError, goScreenBack, handleSuccess } = useWalletContext();
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
      handleSuccess('Account created. Wait for transaction to complete.');
      goScreenBack();
    } catch (e) {
      handleError(e);
    }

    setLoading(false);
  }

  return (
    <div className="pt-6">
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
                'oaw-button-plain !bg-primarylight !px-3 !py-2 !rounded-md relative',
                '!border !border-solid border-brightdark hover:border-lightgrey !transition-colors',
                '!flex items-center gap-3',
                {
                  '!border-yellow': type === wt.type,
                  'pointer-events-none': wt.disabled,
                }
              )}
              onClick={() => setType(wt.type)}
            >
              {!!wt.disabled && (
                <span className="absolute inset-0 bg-primarylight/60">
                  <Pill text="Coming soon" className="absolute top-2 right-2" />
                </span>
              )}

              <img src={wt.icon} alt={wt.title} className="w-10 h-10" />

              <div className="text-left">
                <p className="text-sm font-bold text-offwhite mb-1">{wt.title}</p>
                <p className="text-xs text-lightgrey">{wt.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Input
          label="Account name"
          placeholder="Enter name (for personal reference)"
          value={title}
          className="w-full mb-6"
          onChange={ev => setTitle(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Create account
        </Btn>
      </form>
    </div>
  );
}
