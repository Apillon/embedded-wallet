import { WalletType } from '@apillon/wallet-sdk';
import ethIcon from '../../assets/eth_logo.svg';
import polkadotIcon from '../../assets/polkadot-logo.svg';
import Btn from '../ui/Btn';
import clsx from 'clsx';
import { useAuthContext } from '../../contexts/auth.context';
import { useGlobalContext } from '../../contexts/global.context';

/**
 * Display environment buttons if networks for both are supplied
 */
export default function AuthEnvironmentPicker({ className }: { className?: string }) {
  const { wallet } = useGlobalContext();
  const {
    state: { walletType, supportedWalletTypes },
  } = useAuthContext();

  if (supportedWalletTypes.length < 2) {
    return <></>;
  }

  return (
    <div className="mb-6">
      <p className="text-center text-xs text-offwhite font-semibold mb-3 leading-5">Select chain</p>

      <div className={clsx('flex items-center gap-2', className)}>
        <Btn
          variant={walletType === WalletType.EVM ? 'secondary' : 'ghost'}
          className={clsx('w-full', {
            'outline outline-1 outline-yellow/50': walletType === WalletType.EVM,
          })}
          onClick={() => wallet?.setAccount({ walletType: WalletType.EVM })}
        >
          <div className="flex items-center justify-center gap-4">
            <img src={ethIcon} alt="EVM" className="w-6 h-6" />
            EVM
          </div>
        </Btn>

        <Btn
          variant={walletType === WalletType.SUBSTRATE ? 'secondary' : 'ghost'}
          className={clsx('w-full', {
            'outline outline-1 outline-yellow/50': walletType === WalletType.SUBSTRATE,
          })}
          onClick={() => wallet?.setAccount({ walletType: WalletType.SUBSTRATE })}
        >
          <div className="flex items-center justify-center gap-4">
            <img src={polkadotIcon} alt="Substrate" className="w-6 h-6" />
            Substrate
          </div>
        </Btn>
      </div>
    </div>
  );
}
