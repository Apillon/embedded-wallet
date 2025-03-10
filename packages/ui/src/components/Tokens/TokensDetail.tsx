import { useTokensContext } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveDataRow from '../Approve/ApproveDataRow';
import Btn from '../ui/Btn';

export default function TokensDetail() {
  const {
    state: { networkId, contractAddress },
    goScreenBack,
    handleInfo,
  } = useWalletContext();

  const { selectedToken, dispatch } = useTokensContext();

  return (
    <div className="pt-10 min-h-full flex flex-col">
      <div key={selectedToken.address} className="mb-6 flex justify-center items-center">
        <div className="relative w-20 h-20 rounded-full bg-black text-white overflow-hidden flex justify-center items-center">
          {!!selectedToken.imageUrl && (
            <img src={selectedToken.imageUrl} alt={selectedToken.symbol} />
          )}
          {!selectedToken.imageUrl && (
            <span className="uppercase text-4xl font-semibold">{selectedToken.symbol[0]}</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        {!!selectedToken.address && (
          <ApproveDataRow
            label="Contract address"
            data={selectedToken.address}
            copyable
            className="mb-3"
          />
        )}

        {!selectedToken.address && <ApproveDataRow label="Native token" data="" className="mb-3" />}

        <ApproveDataRow label="Symbol" data={selectedToken.symbol} className="mb-3" />

        <ApproveDataRow label="Decimals" data={selectedToken.decimals} className="mb-3" />
      </div>

      <div className="grow"></div>

      {!!selectedToken.address && (
        <Btn
          variant="ghost"
          className="w-full mb-3 !text-red"
          onClick={() => {
            goScreenBack();

            dispatch({
              type: 'updateToken',
              payload: {
                token: selectedToken,
                owner: contractAddress,
                chainId: networkId,
                remove: true,
              },
            });

            handleInfo('Token removed', 5000);
          }}
        >
          Remove
        </Btn>
      )}

      <Btn variant="ghost" className="w-full" onClick={() => goScreenBack()}>
        Back
      </Btn>
    </div>
  );
}
