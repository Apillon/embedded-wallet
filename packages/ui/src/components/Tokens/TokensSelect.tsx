import { useMemo } from 'react';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import SettingsMenuItem from '../Settings/SettingsMenuItem';

export default () => {
  const { state, activeWallet, setScreen, goScreenBack } = useWalletContext();
  const { state: tokens, dispatch, nativeToken } = useTokensContext();

  const tokenList = useMemo<TokenInfo[]>(() => {
    return Array.isArray(tokens.list[activeWallet?.address || '']?.[state.networkId])
      ? [nativeToken, ...tokens.list[activeWallet?.address || ''][state.networkId]]
      : [nativeToken];
  }, [tokens.list]);

  return (
    <div className="pt-10 pb-2 min-h-full flex flex-col">
      <div className="flex flex-col gap-3 mb-6">
        {tokenList.map(token => (
          <SettingsMenuItem
            key={token.address}
            disabled={token.address === tokens.selectedToken}
            title={`Token: ${token.name}`}
            description={`Balance: ${token.balance} ${token.symbol}`}
            className="w-full text-left"
            onClick={() => {
              dispatch({
                type: 'setValue',
                payload: { key: 'selectedToken', value: token.address },
              });
              goScreenBack();
            }}
          />
        ))}
      </div>

      <div className="grow"></div>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('addToken')}>
        Add token
      </Btn>
    </div>
  );
};
