import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MetaMaskLogin.css';

function MetaMaskLogin() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      navigate('/dashboard', { state: { account: storedWallet } });
    }
  }, [navigate]);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      localStorage.setItem('wallet', walletAddress); // ✅ persist
      setAccount(walletAddress);

      console.log("Navigating to dashboard with:", walletAddress);
      navigate('/dashboard', { state: { account: walletAddress } }); // ✅ pass state

    } catch (error) {
      alert("Failed to connect wallet");
    }
  }

  return (
    <div className="login-container">
      <button onClick={connectWallet}>Connect MetaMask Wallet</button>
    </div>
  );
}

export default MetaMaskLogin;
