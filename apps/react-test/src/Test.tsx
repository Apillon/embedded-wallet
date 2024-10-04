import { useAccount, useContract, useWallet, WalletWidget } from '@apillon/wallet-react';

export default function Test() {
  const { username, address, getBalance } = useAccount();
  const { signMessage, sendTransaction } = useWallet();
  const { read, write } = useContract({
    abi: [
      'function claim() public',
      'function balanceOf(address) view returns (uint256)',
      'function transfer(address to, uint256 amount) public returns (bool)',
    ],
    address: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
    chainId: 1287,
  });

  return (
    <div>
      <WalletWidget
        clientId={import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
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
      />

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <p>username: {username}</p>

      <p>address: {address}</p>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={async () => {
            console.log(await signMessage('test massage'));
          }}
        >
          (SDK) Sign message
        </button>

        <button
          onClick={async () => {
            console.log(await getBalance());
          }}
        >
          (SDK) Get native balance
        </button>

        <button
          onClick={async () => {
            const res = await sendTransaction({
              to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
              value: '10000000',
            });
            console.log(res);
          }}
        >
          (SDK) Transfer native balance
        </button>

        <button
          onClick={async () => {
            console.log(await read('balanceOf', [address]));
          }}
        >
          (SDK) Contract read (balanceOf)
        </button>

        <button
          onClick={async () => {
            console.log(await write('claim'));
          }}
        >
          (SDK) Contract write (claim)
        </button>

        <button
          onClick={async () => {
            const txHash = await write(
              'transfer',
              ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
              'React Transfer'
            );

            console.log(txHash);
          }}
        >
          (SDK) Contract write (transfer)
        </button>
      </div>
    </div>
  );
}
