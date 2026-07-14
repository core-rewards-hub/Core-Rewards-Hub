const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const copyButton = document.getElementById("copyButton");

const CORE_CHAIN = {
  chainId: "0x45c", // 1116
  chainName: "Core Blockchain",
  nativeCurrency: {
    name: "CORE",
    symbol: "CORE",
    decimals: 18
  },
  rpcUrls: ["https://rpc.coredao.org"],
  blockExplorerUrls: ["https://scan.coredao.org"]
};

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask or Core Wallet.");
    return;
  }

  try {
    // Request wallet connection
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    // Check current network
    let chainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    // Switch to Core Mainnet if necessary
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

    const address = accounts[0];

    walletAddress.textContent = address;
    status.textContent = "Connected";
    network.textContent = "Core Mainnet";

    // Get CORE balance
    const rawBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    const coreBalance =
      (parseInt(rawBalance, 16) / 1e18).toFixed(4);

    balance.textContent = coreBalance + " CORE";

    connectButton.textContent = "Wallet Connected";
    connectButton.disabled = true;

    copyButton.style.display = "block";

    copyButton.onclick = async () => {
      await navigator.clipboard.writeText(address);
      alert("Wallet address copied.");
    };

  } catch (error) {
    console.error(error);
    alert(error.message || "Wallet connection failed.");
  }
}

connectButton.addEventListener("click", connectWallet);
