import { useMemo } from 'react';
import { TokenInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import TokensItem from './TokensItem';
import clsx from 'clsx';

export default function TokensList({
  asButtons,
  highlightActiveToken,
  showArrow,
  className,
  onItemClick,
}: {
  asButtons?: boolean;
  highlightActiveToken?: boolean;
  showArrow?: boolean;
  className?: string;
  onItemClick?: (token: TokenInfo) => void;
}) {
  const { state, setScreen, activeWallet } = useWalletContext();
  const { state: tokens, dispatch, nativeToken } = useTokensContext();

  const tokenList = useMemo<TokenInfo[]>(() => {
    return Array.isArray(tokens.list[activeWallet?.address || '']?.[state.networkId])
      ? [nativeToken, ...tokens.list[activeWallet?.address || ''][state.networkId]]
      : [nativeToken];
  }, [tokens.list, state.networkId, state.contractAddress, nativeToken, activeWallet]);

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
            showArrow={showArrow}
            // menuItems={
            //   !asButtons && !!token.address
            //     ? [
            //         {
            //           label: 'Remove',
            //           onClick: () => {
            //             dispatch({
            //               type: 'updateToken',
            //               payload: {
            //                 token,
            //                 owner: activeWallet?.address || '',
            //                 chainId: state.networkId,
            //                 remove: true,
            //               },
            //             });
            //           },
            //         },
            //       ]
            //     : undefined
            // }
            className="w-full text-left"
            onClick={
              !asButtons
                ? undefined
                : () => {
                    dispatch({
                      type: 'setValue',
                      payload: { key: 'selectedToken', value: token.address },
                    });
                    onItemClick?.(token);
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
