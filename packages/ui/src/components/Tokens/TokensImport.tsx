import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import Input from '../ui/Input';
import Btn from '../ui/Btn';
import WarningBox from '../ui/WarningBox';
import TokensItem from './TokensItem';

export default function TokensImport() {
  const {
    state: { networkId, contractAddress },
    handleError,
    handleSuccess,
    goScreenBack,
    activeWallet,
  } = useWalletContext();
  const { dispatch, getTokenDetails } = useTokensContext();

  const [address, setAddress] = useState('');
  const [token, setToken] = useState<TokenInfo>();
  const [loading, setLoading] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  async function onSubmit() {
    if (loading) {
      return;
    }

    if (!address) {
      handleError('No address', 'TokensImport');
      return;
    }

    if (!!token) {
      if (!token.symbol || token.symbol.length > 11) {
        handleError('Invalid symbol (must be less than 11 characters)', 'TokensImport');
        return;
      }

      if (!token.decimals || isNaN(token.decimals)) {
        handleError('Invalid decimals', 'TokensImport');
        return;
      }

      if (!isConfirmation) {
        setIsConfirmation(true);
        return;
      }
    }

    setLoading(true);
    handleError();

    try {
      const res = await getTokenDetails(address);

      if (!res) {
        throw new Error(`Token does not exist on chain (ID: ${networkId})`);
      }

      if (!contractAddress) {
        throw new Error('Could not get user wallet address');
      }

      if (!token) {
        // Step 1 -> show extra details for selected token address
        setToken(res);
      } else if (isConfirmation) {
        // Step 2 -> Confirmation
        dispatch({
          type: 'updateToken',
          payload: { owner: activeWallet?.address || '', chainId: networkId, token },
        });

        handleSuccess(`Succesfully added ${token.symbol} token`);

        goScreenBack();
      }
    } catch (e) {
      handleError(e, 'TokensImport');
    }

    setLoading(false);
  }

  if (!!token && isConfirmation) {
    return (
      <div className="pt-10">
        <p className="text-center font-bold text-sm mb-6">Would you like to import this token?</p>

        <TokensItem token={token} className="w-full mb-6" />

        <div className="grid grid-cols-2 gap-2">
          <Btn variant="ghost" onClick={() => setIsConfirmation(false)}>
            Back
          </Btn>

          <Btn variant="primary" loading={loading} onClick={() => onSubmit()}>
            Import
          </Btn>
        </div>
      </div>
    );
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
          label="Token contract address"
          placeholder="Paste contract address here"
          value={address}
          className="w-full mb-6"
          onChange={ev => setAddress(ev.target.value)}
        />

        {!!token && (
          <>
            <Input
              label="Token symbol"
              placeholder="Enter the token symbol"
              value={token?.symbol}
              className="w-full mb-6"
              onChange={ev => setToken(t => (!t ? undefined : { ...t, symbol: ev.target.value }))}
            />

            <Input
              label="Token decimal"
              placeholder="Enter the token decimal"
              value={token?.decimals}
              disabled
              className="w-full mb-6"
              // onChange={ev => setSymbol(ev.target.value)}
            />
          </>
        )}

        <WarningBox
          text="Anyone can create a token, including creating fake versions of existing tokens."
          className="mb-6"
        />

        <Btn type="submit" loading={loading} className="w-full">
          Next
        </Btn>
      </form>
    </div>
  );
}
