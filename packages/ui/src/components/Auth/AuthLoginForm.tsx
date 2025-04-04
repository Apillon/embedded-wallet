import { WalletType } from '@apillon/wallet-sdk';
import { useAuthContext } from '../../contexts/auth.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import AuthTitle from './AuthTitle';
import ethIcon from '../../assets/eth_logo.svg';
import polkadotIcon from '../../assets/polkadot-logo.png';

export default () => {
  const {
    state: { appProps, walletType },
    wallet,
  } = useWalletContext();

  const {
    state: { username, loading },
    setStateValue: setForAuth,
    onAuth,
  } = useAuthContext();

  return (
    <>
      <AuthTitle title="Sign in or sign up" description="Enter your email to set up your passkey" />

      <form onSubmit={ev => onAuth(false, ev)}>
        {/* Display environment buttons if networks for both are supplied */}
        {!!appProps?.networks?.length && !!appProps?.networksSubstrate?.length && (
          <div className="flex items-center gap-2 mb-2">
            <Btn
              variant={walletType === WalletType.EVM ? 'secondary' : 'ghost'}
              className="w-full"
              onClick={() => wallet?.setAccount({ walletType: WalletType.EVM })}
            >
              <div className="flex items-center justify-center gap-4">
                <img src={ethIcon} alt="EVM" className="w-6 h-6" />
                EVM
              </div>
            </Btn>

            <Btn
              variant={walletType === WalletType.SUBSTRATE ? 'secondary' : 'ghost'}
              className="w-full"
              onClick={() => wallet?.setAccount({ walletType: WalletType.SUBSTRATE })}
            >
              <div className="flex items-center justify-center gap-4">
                <img src={polkadotIcon} alt="Substrate" className="w-6 h-6" />
                Substrate
              </div>
            </Btn>
          </div>
        )}

        <Input
          type="email"
          placeholder={appProps.authFormPlaceholder}
          value={username}
          className="w-full mb-6"
          onChange={ev => setForAuth('username', ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Continue
        </Btn>

        <div className="text-center my-2 text-sm text-darkgrey">
          <span>OR</span>
        </div>

        <Btn
          type="button"
          variant="ghost"
          disabled={loading}
          className="w-full"
          onClick={() => setForAuth('screen', 'importWallet')}
        >
          Import wallet
        </Btn>

        {/* <button
          type="button"
          className="oaw-button-plain mt-3 text-xs text-center w-full rounded-sm opacity-100 hover:opacity-80"
          onClick={() => {
            setForWallet('displayedError', '');

            if (!username) {
              setForWallet('displayedError', 'Enter your email');

              return;
            }

            setForAuth('screen', 'confirmCode');
          }}
        >
          I have a login code
        </button> */}
      </form>
    </>
  );
};
