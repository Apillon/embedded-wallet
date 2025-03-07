import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import { useTokensContext } from '../../contexts/tokens.context';

export default function TokensNftImport() {
  const {
    state: { networkId },
    activeWallet,
    handleError,
    handleSuccess,
    goScreenBack,
  } = useWalletContext();
  const { dispatch, getNftDetails } = useTokensContext();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [tokenId, setTokenId] = useState('');

  async function onSubmit() {
    if (loading) {
      return;
    }

    if (!address || !+tokenId) {
      handleError('Please enter the required data', 'TokensNftImport');
      return;
    }

    setLoading(true);
    handleError();

    try {
      const res = await getNftDetails(address, +tokenId);

      if (!res) {
        throw new Error('Could not get NFT details');
      }

      if (!activeWallet || !res.isOwner) {
        throw new Error('Ownership details do not match');
      }

      if (!res.data) {
        throw new Error('Could not get NFT details');
      }

      dispatch({
        type: 'addNft',
        payload: {
          owner: activeWallet?.address,
          chainId: networkId,
          nft: res.data,
        },
      });

      handleSuccess(`NFT succesfully added`);

      // setAddress('');
      // setTokenId('');
      goScreenBack();
    } catch (e) {
      handleError(e, 'TokensNftImport');
    }

    setLoading(false);
  }

  return (
    <div className="pt-10">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <Input
          label="NFT Collection address"
          placeholder="Paste collection address here"
          value={address}
          className="w-full mb-6"
          onChange={ev => setAddress(ev.target.value)}
        />

        <Input
          label="Token ID"
          placeholder="Enter the token ID"
          type="number"
          value={tokenId}
          className="w-full mb-6"
          onChange={ev => setTokenId(ev.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <Btn variant="ghost" onClick={() => goScreenBack()}>
            Cancel
          </Btn>

          <Btn type="submit" variant="primary" loading={loading}>
            Import
          </Btn>
        </div>
      </form>
    </div>
  );
}
