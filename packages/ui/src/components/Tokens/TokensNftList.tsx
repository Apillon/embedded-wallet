import { useMemo } from 'react';
import { TokenNftInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import clsx from 'clsx';
import Btn from '../ui/Btn';

export default function TokensNftList({ className }: { className?: string }) {
  const {
    state: { networkId },
    activeWallet,
    setScreen,
  } = useWalletContext();
  const {
    state: { nfts },
    dispatch,
  } = useTokensContext();

  const nftList = useMemo<TokenNftInfo[]>(
    () =>
      !!activeWallet?.address && Array.isArray(nfts[activeWallet?.address || '']?.[networkId])
        ? [...nfts[activeWallet?.address || ''][networkId]]
        : [],
    [networkId, activeWallet]
  );

  return (
    <div className={clsx('flex flex-col', className)}>
      {!nftList.length && (
        <p className="text-center text-lightgrey text-sm mb-3">No NFTs here, import them below.</p>
      )}

      {!!nftList.length && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {nftList.map(nft => (
            <a
              href="#"
              key={`${nft.address}-${nft.tokenId}`}
              className="relative w-full pb-[120%] bg-darkgrey rounded-md"
              onClick={() => {
                dispatch({ type: 'setValue', payload: { key: 'selectedNft', value: nft } });
                setScreen('nftDetail');
              }}
            >
              {!!nft.imageUrl && (
                <img
                  src={nft.imageUrl}
                  alt={nft.name || ''}
                  className="object-cover absolute inset-0 h-full w-full rounded-md"
                />
              )}
            </a>
          ))}
        </div>
      )}

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('importNft')}>
        Import NFTs
      </Btn>
    </div>
  );
}
