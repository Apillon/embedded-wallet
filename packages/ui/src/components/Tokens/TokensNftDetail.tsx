import { useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveDataRow from '../Approve/ApproveDataRow';
import Btn from '../ui/Btn';

export default function TokensNftDetail() {
  const { goScreenBack } = useWalletContext();
  const {
    state: { selectedNft },
  } = useTokensContext();

  if (!selectedNft) {
    return <></>;
  }

  return (
    <div className="pt-10">
      <div
        key={`${selectedNft.address}-${selectedNft.tokenId}`}
        className="relative w-full pb-[100%] bg-darkgrey rounded-md mb-6"
      >
        {!!selectedNft.imageUrl && (
          <img
            src={selectedNft.imageUrl}
            alt={selectedNft.name || ''}
            className="object-cover absolute inset-0 h-full w-full rounded-md"
          />
        )}
      </div>

      <div className="mb-6">
        <ApproveDataRow
          label="Contract address"
          data={selectedNft.address}
          copyable
          className="mb-3"
        />

        <ApproveDataRow
          label="Token ID"
          data={selectedNft.tokenId}
          noLabelFormatting
          className="mb-3"
        />

        {!!selectedNft.name && (
          <ApproveDataRow label="Name" data={selectedNft.name} className="mb-3" />
        )}
      </div>

      <Btn variant="ghost" className="w-full" onClick={() => goScreenBack()}>
        Back
      </Btn>
    </div>
  );
}
