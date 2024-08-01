import { getProvider } from '@embedded-wallet/sdk';

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
    </div>
  );
}
