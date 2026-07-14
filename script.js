const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const copyButton = document.getElementById("copyButton");

const CORE_CHAIN_ID = "0x45c"; // 1116

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

    // Switch to Core Mainnet
    if (chainId !== CORE_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_CHAIN_ID }]
        });

        chainId = CORE_CHAIN_ID;

      } catch (switchError) {

        // Add Core Mainnet if missing
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: CORE_CHAIN_ID,
              chainName: "Core Blockchain",
              nativeCurrency: {
                name: "CORE",
                symbol: "CORE",
                decimals: 18
              },
              rpcUrls: [
                "https://rpc.coredao.org"
              ],
              blockExplorerUrls: [
                "https://scan.coredao.org"
              ]
            }]
          });

          chainId = CORE_CHAIN_ID;
        } else {
          throw switchError;
        }
      }
    }

    const address = accounts[0];

    walletAddress.textContent = address;
    status.textContent = "Connected";
    network.textContent = "Core Mainnet";

    const rawBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    const coreBalance = (
      parseInt(raw
