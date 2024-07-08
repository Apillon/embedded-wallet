import { useState } from 'react';

export default function useAccount() {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  function getBalance() {}

  function connect(username: string, strat: any) {}

  function disconnect() {}
}
