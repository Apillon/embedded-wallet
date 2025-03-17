import { Events, getEmbeddedWallet } from '@apillon/wallet-sdk';
import { useEffect } from 'react';

export default function TestTokenEvents() {
  useEffect(() => {
    const w = getEmbeddedWallet();

    const onAddTokenStatus = ({ success, info, token, nft }: Events['addTokenStatus']) => {
      console.log(success ? 'Success' : 'Error', info, token, nft);
    };

    w?.events?.on('addTokenStatus', onAddTokenStatus);

    return () => w?.events?.off('addTokenStatus', onAddTokenStatus);
  }, []);

  return (
    <div className="row">
      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          w?.events.emit('addToken', {
            address: '0x3c8e129ca9e8439f7539fadd58e8c769ffdfc93e',
            symbol: 'USDC',
            decimals: 6,
            name: 'USD Coin',
          });
        }}
      >
        Add some token
      </button>

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          w?.events.emit('addTokenNft', {
            address: '0x14EeBa9Cf473c007997dB49a7600835e543BA3F5',
            tokenId: 8,
          });
        }}
      >
        Add some NFT
      </button>
    </div>
  );
}
