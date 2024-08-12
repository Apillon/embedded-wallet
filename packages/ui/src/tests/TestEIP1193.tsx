import { getEmbeddedWallet, getProvider } from '@apillon/wallet-sdk';

export default function TestEIP1193() {
  return (
    <div>
      <div className="row">
        <button
          onClick={async () => {
            const p = getProvider();

            const accs = await p.request({ method: 'eth_requestAccounts' });
            console.log(accs);
          }}
        >
          eth_requestAccounts
        </button>
      </div>

      <div className="row">
        <button
          onClick={async () => {
            const p = getProvider();
            const w = getEmbeddedWallet();

            if (w?.lastAccount.address) {
              const res = await p.request({
                method: 'eth_sign',
                params: [w?.lastAccount.address, `0xTest message`],
              });
              console.log(res);
            }
          }}
        >
          eth_sign
        </button>
      </div>

      <div className="row">
        <button
          onClick={async () => {
            const p = getProvider();
            const w = getEmbeddedWallet();

            if (w?.lastAccount.address) {
              const res = await p.request({
                method: 'eth_signTransaction',
                params: [
                  {
                    to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
                    data: '0x',
                    gasLimit: 1_000_000,
                    value: 5_000_000_000_000,
                    chainId: 23295,
                    gasPrice: 100_000_000_000,
                  } as any,
                ],
              });
              console.log(res);
            }
          }}
        >
          eth_signTransaction
        </button>
      </div>
    </div>
  );
}
