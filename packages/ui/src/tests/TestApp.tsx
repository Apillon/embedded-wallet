import WalletWidget from '../components/WalletWidget';
import TestSign from './TestSign';

export default function TestApp() {
  return (
    <div>
      <h2>Wallet Widget</h2>

      <WalletWidget
        // disableAutoBroadcastAfterSign
        // disableDefaultActivatorStyle
        accountManagerAddress="0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC"
        isAuthEmail={false}
        // accountManagerAddress="0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1"
        defaultNetworkId={1287}
        networks={[
          {
            name: 'Moonbeam Testnet',
            id: 1287,
            rpcUrl: 'https://rpc.testnet.moonbeam.network',
            explorerUrl: 'https://moonbase.moonscan.io',
          },
          {
            name: 'Celo Alfajores Testnet',
            id: 44787,
            rpcUrl: 'https://alfajores-forno.celo-testnet.org',
            explorerUrl: 'https://explorer.celo.org/alfajores',
          },
          {
            name: 'Amoy',
            id: 80002,
            rpcUrl: 'https://rpc-amoy.polygon.technology',
            explorerUrl: 'https://www.oklink.com/amoy',
          },
        ]}
        onGetSignature={async gaslessData => {
          try {
            const res = await (
              await fetch(`{{Apillon API url}}/oasis/signature`, {
                method: 'POST',
                body: JSON.stringify({
                  token: '',
                  data: gaslessData,
                }),
              })
            ).json();

            return {
              signature: res?.signature,
              gasLimit: res?.gasLimit,
              timestamp: res?.timestamp,
            };
          } catch (e) {
            console.error('Signature request error', e);
          }

          return { signature: '', gasLimit: 0, timestamp: 0 };
        }}
      />

      <br />
      <br />

      <h2>Test sign</h2>

      <TestSign />
      {/* <Test2 />
      <hr className="my-6" />
      <Test3 />
      <hr className="my-6" />
      <Test4 /> */}
    </div>
  );
}
