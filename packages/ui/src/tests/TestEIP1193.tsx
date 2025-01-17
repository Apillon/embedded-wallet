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

            if (w?.lastAccount.wallets?.[w?.lastAccount.walletIndex]) {
              const res = await p.request({
                method: 'eth_sign',
                params: [
                  w?.lastAccount.wallets[w?.lastAccount.walletIndex].address,
                  `Test message` as `0x${string}`,
                ],
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

            if (w?.lastAccount.wallets[w?.lastAccount.walletIndex]) {
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
