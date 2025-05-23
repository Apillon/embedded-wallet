import { useWalletContext } from '../../contexts/wallet.context';
import SettingsUsername from '../Settings/SettingsUsername';
// @ts-ignore
import { QRCode } from 'react-qr-code';
import IconCopy from '../ui/Icon/IconCopy';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import IconCheckSmall from '../ui/Icon/IconCheckSmall';

export default () => {
  const { activeWallet } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  if (!activeWallet) {
    return <></>;
  }

  return (
    <div className="pt-10">
      <SettingsUsername className="mb-6 flex justify-center" />

      <div className="mb-6 text-center">
        <QRCode
          value={`ethereum:${activeWallet.address}`}
          size={256}
          bgColor="#F0F2DA"
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '200px',
            margin: '0 auto',
            padding: '1rem',
            background: '#F0F2DA',
            borderRadius: '6px',
          }}
          viewBox={`0 0 256 256`}
        />
      </div>

      <p className="text-center text-xs text-lightgrey break-all mb-2">{activeWallet.address}</p>

      <div className="flex justify-center mb-6">
        <button
          className="oaw-button-plain !inline-flex items-center gap-2 !text-yellow"
          onClick={() => onCopy(activeWallet.address)}
        >
          {copyText === '+' ? <IconCheckSmall /> : <IconCopy />}
          <span className="text-xs">Copy address</span>
        </button>
      </div>
    </div>
  );
};
