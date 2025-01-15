import clsx from 'clsx';
import { useWalletContext } from '../../contexts/wallet.context';
import TopbarMain from './TopbarMain';
import TopbarSub from './TopbarSub';

export default () => {
  const {
    state: { walletScreen },
  } = useWalletContext();

  const isMain = walletScreen === 'main' || walletScreen === 'approve';

  return (
    <div
      className={clsx(isMain ? 'bg-lightdark' : 'bg-deepdark')}
      style={{
        height: isMain ? '82px' : '64px',
        transition: 'height 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {isMain ? <TopbarMain /> : <TopbarSub />}
    </div>
  );
};
