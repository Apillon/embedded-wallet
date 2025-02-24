import { useMemo } from 'react';
import { TokenNftInfo, useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import clsx from 'clsx';
import Btn from '../ui/Btn';

export default function TokensNftList({ className }: { className?: string }) {
  const {
    state: { networkId, contractAddress },
    setScreen,
  } = useWalletContext();
  const {
    state: { nfts },
  } = useTokensContext();

  const nftList = useMemo<TokenNftInfo[]>(
    () =>
      Array.isArray(nfts[contractAddress || '']?.[networkId])
        ? [...nfts[contractAddress || ''][networkId]]
        : [],
    [networkId, contractAddress]
  );

  return (
    <div className={clsx('flex flex-col', className)}>
      {!nftList.length && (
        <p className="text-center text-lightgrey text-sm mb-3">No NFTs here, import it below.</p>
      )}

      {!!nftList.length && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {nftList.map(nft => (
            <div key={`${nft.address}-${nft.tokenId}`}>{nft.tokenId}</div>
          ))}
        </div>
      )}

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('importNft')}>
        Import NFTs
      </Btn>
    </div>
  );
}
