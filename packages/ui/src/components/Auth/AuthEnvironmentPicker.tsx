import { WalletType } from '@apillon/wallet-sdk';
import { useWalletContext } from '../../contexts/wallet.context';
import ethIcon from '../../assets/eth_logo.svg';
import polkadotIcon from '../../assets/polkadot-logo.png';
import Btn from '../ui/Btn';
import clsx from 'clsx';

/**
 * Display environment buttons if networks for both are supplied
 */
export default function AuthEnvironmentPicker({ className }: { className?: string }) {
  const {
    state: { appProps, walletType },
    wallet,
  } = useWalletContext();

  if (!appProps?.networks?.length || !appProps?.networksSubstrate?.length) {
    return <></>;
  }

  return (
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
  );
}
