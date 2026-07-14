const connectButton = document.getElementById("connectWallet");
const disconnectButton = document.getElementById("disconnectButton");
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const copyButton = document.getElementById("copyButton");

const CORE_CHAIN = {
  chainId: "0x45c",
  chainName: "Core Blockchain",
  nativeCurrency: {
    name: "CORE",
    symbol: "CORE",
    decimals: 18
  },
  rpcUrls: ["https://rpc.coredao.org"],
  blockExplorerUrls: ["https://scan.coredao.org"]
};

let currentAddress = "";

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask or Core Wallet.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    let chainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    if (chainId !== CORE_CHAIN.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_CHAIN.chainId }]
        });
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [CORE_CHAIN]
          });
        } else {
          throw err;
        }
      }
    }

    currentAddress = accounts[0];

    wallet
