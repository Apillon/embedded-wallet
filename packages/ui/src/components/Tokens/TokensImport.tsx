import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import { useTokensContext } from '../../contexts/tokens.context';
import Input from '../ui/Input';
import Btn from '../ui/Btn';

export default function TokensImport() {
  const {
    state: { networkId, contractAddress },
    handleError,
    goScreenBack,
  } = useWalletContext();
  const { dispatch, getTokenDetails } = useTokensContext();

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="pt-10">
      <form
        className="mb-8"
        onSubmit={async ev => {
          ev.preventDefault();

          if (loading) {
            return;
          }

          if (!address) {
            console.error('No address');
            return;
          }

          setLoading(true);
          handleError();

          try {
            const res = await getTokenDetails(address);

            if (!res) {
              throw new Error('Could not get token details');
            }

            if (!contractAddress) {
              throw new Error('Could not get user wallet address');
            }

            dispatch({
              type: 'updateToken',
              payload: { owner: contractAddress, chainId: networkId, token: res },
            });

            goScreenBack();
          } catch (e) {
            handleError(e, 'onTokensAdd');
          }

          setLoading(false);
        }}
      >
        <Input
          placeholder="Address of token to add"
          value={address}
          className="w-full mb-6"
          onChange={ev => setAddress(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Add
        </Btn>
      </form>
    </div>
  );
}
