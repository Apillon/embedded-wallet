export default function TestEthers6() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {/* <button
        onClick={async () => {
          console.log(await signMessage('test massage'));
        }}
      >
        (SDK) Sign message
      </button> */}

      {/* <button
        onClick={async () => {
          console.log(await getBalance());
        }}
      >
        (SDK) Get native balance
      </button> */}

      {/* <button
        onClick={async () => {
          const res = await sendTransaction({
            to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
            value: '10000000',
          });
          console.log(res);
        }}
      >
        (SDK) Transfer native balance
      </button> */}

      {/* <button
        onClick={async () => {
          console.log(await read('balanceOf', [address]));
        }}
      >
        (SDK) Contract read (balanceOf)
      </button> */}

      {/* <button
        onClick={async () => {
          console.log(await write('claim'));
        }}
      >
        (SDK) Contract write (claim)
      </button> */}

      {/* <button
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
      </button> */}
    </div>
  );
}
