import { useMemo } from 'react';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import TokensItem from './TokensItem';

export default function TokensList({ asButtons }: { asButtons?: boolean }) {
  const { state, setScreen, goScreenBack } = useWalletContext();
  const { state: tokens, dispatch, nativeToken } = useTokensContext();

  const tokenList = useMemo<TokenInfo[]>(() => {
    return Array.isArray(tokens.list[state.contractAddress || '']?.[state.networkId])
      ? [nativeToken, ...tokens.list[state.contractAddress || ''][state.networkId]]
      : [nativeToken];
  }, [tokens.list, state.networkId, state.contractAddress]);

  return (
    <div className="pt-10 pb-2 min-h-full flex flex-col">
      <div className="flex flex-col gap-3 mb-6">
        {tokenList.map(token => (
          <TokensItem
            key={token.address}
            token={token}
            asButton={asButtons}
            disabled={token.address === tokens.selectedToken}
            className="w-full text-left"
            onClick={
              !asButtons
                ? undefined
                : () => {
                    dispatch({
                      type: 'setValue',
                      payload: { key: 'selectedToken', value: token.address },
                    });
                    goScreenBack();
                  }
            }
          />
        ))}
      </div>

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('importToken')}>
        Import tokens
      </Btn>
    </div>
  );
}
