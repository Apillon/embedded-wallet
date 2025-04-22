import { useWalletContext } from '../../contexts/wallet.context';
import SettingsUsername from '../Settings/SettingsUsername';
// @ts-ignore
import { QRCode } from 'react-qr-code';
import IconCopy from '../ui/Icon/IconCopy';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import IconCheckSmall from '../ui/Icon/IconCheckSmall';
import { useMemo, useState } from 'react';
import { WalletType } from '@apillon/wallet-sdk';
import { getSS58Address } from '../../lib/helpers';
import Select from '../ui/Select';
import Input from '../ui/Input';

export default () => {
  const {
    state: { walletType, isPolkadotCryptoReady },
    activeWallet,
    isSubstrate,
  } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  const [ss58Prefix, setSs58Prefix] = useState<'generic' | 'public_key' | 'custom'>('generic');
  const [ss58CustomPrefix, setSs58CustomPrefix] = useState('0');

  const address = useMemo(() => {
    if (walletType === WalletType.SUBSTRATE && isPolkadotCryptoReady) {
      return getSS58Address(
        activeWallet?.address || '',
        ss58Prefix === 'custom' ? Math.abs(+ss58CustomPrefix) : undefined,
        ss58Prefix === 'public_key'
      );
    }
    return activeWallet?.address || '';
  }, [activeWallet, walletType, ss58Prefix, ss58CustomPrefix, isPolkadotCryptoReady]);

  if (!address) {
    return <></>;
  }

  return (
    <div className="pt-10">
      <SettingsUsername className="mb-6 flex justify-center" />

      <div className="mb-6 text-center">
        <QRCode
          value={`${!isSubstrate() ? 'ethereum:' : ''}${address}`}
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

      <p className="text-center text-xs text-lightgrey break-all mb-2">{address}</p>

      <div className="flex justify-center">
        <button
          className="oaw-button-plain !inline-flex items-center gap-2 !text-yellow"
          onClick={() => onCopy(address)}
        >
          {copyText === '+' ? <IconCheckSmall /> : <IconCopy />}
          <span className="text-xs">Copy address</span>
        </button>
      </div>

      {isSubstrate() && (
        <div className="mt-4">
          <Select
            label="Address type"
            value={ss58Prefix}
            options={[
              { label: 'Generic Substrate', value: 'generic' },
              { label: 'Public Key', value: 'public_key' },
              { label: 'Custom prefix', value: 'custom' },
            ]}
            className="w-full mb-6"
            onChange={ev => setSs58Prefix(ev.target.value as any)}
          />

          {ss58Prefix === 'custom' && (
            <Input
              label="Prefix"
              placeholder="Enter the network prefix"
              type="number"
              value={ss58CustomPrefix}
              className="w-full mb-6"
              onChange={ev => setSs58CustomPrefix(ev.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
};
