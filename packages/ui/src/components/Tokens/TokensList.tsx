import { useMemo } from 'react';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import TokensItem from './TokensItem';
import clsx from 'clsx';

export default function TokensList({
  asButtons,
  highlightActiveToken,
  className,
}: {
  asButtons?: boolean;
  highlightActiveToken?: boolean;
  className?: string;
}) {
  const { state, setScreen, goScreenBack } = useWalletContext();
  const { state: tokens, dispatch, nativeToken } = useTokensContext();

  const tokenList = useMemo<TokenInfo[]>(() => {
    return Array.isArray(tokens.list[state.contractAddress || '']?.[state.networkId])
      ? [nativeToken, ...tokens.list[state.contractAddress || ''][state.networkId]]
      : [nativeToken];
  }, [tokens.list, state.networkId, state.contractAddress]);

  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="flex flex-col gap-3 mb-6">
        {!tokenList.length && (
          <p className="text-center text-lightgrey text-sm mb-2">
            No tokens here, import them below.
          </p>
        )}

        {tokenList.map(token => (
          <TokensItem
            key={token.address}
            token={token}
            asButton={asButtons}
            disabled={highlightActiveToken && token.address === tokens.selectedToken}
            menuItems={
              !asButtons && !!token.address
                ? [
                    {
                      label: 'Remove',
                      onClick: () => {
                        dispatch({
                          type: 'updateToken',
                          payload: {
                            token,
                            owner: state.contractAddress,
                            chainId: state.networkId,
                            remove: true,
                          },
                        });
                      },
                    },
                  ]
                : undefined
            }
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
