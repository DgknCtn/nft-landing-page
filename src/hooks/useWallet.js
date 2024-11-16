import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const providerOptions = {};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export function useWallet() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();

      setProvider(provider);
      setAccount(account);
      setChainId(network.chainId);
      setError(null);

      // Subscribe to accounts change
      instance.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      // Subscribe to chainId change
      instance.on("chainChanged", (chainId) => {
        setChainId(parseInt(chainId, 16));
      });

      return provider;
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    setProvider(null);
    setAccount(null);
    setChainId(null);
  }, []);

  // Auto connect if cached
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  return {
    connect,
    disconnect,
    provider,
    account,
    chainId,
    error,
  };
}