const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const networkName = document.getElementById("networkName");
const walletBalance = document.getElementById("walletBalance");
const copyButton = document.getElementById("copyButton");

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask or Core Wallet.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    // Show full wallet address
    walletAddress.textContent = address;

    // Status
    status.textContent = "Connected";

    // Network
    const chainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    const networks = {
      "0x1": "Ethereum Mainnet",
      "0x45c": "Core DAO Mainnet",
      "0x5": "Goerli Testnet",
      "0xaa36a7": "Sepolia Testnet"
    };

    networkName.textContent = networks[chainId] || chainId;

    // Balance
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    const balanceInCore = (parseInt(balance, 16) / 1e18).toFixed(4);
    walletBalance.textContent = balanceInCore + " CORE";

    // Update button
    connectButton.textContent = "Wallet Connected";
    connectButton.disabled = true;

    // Copy button
    copyButton.style.display = "inline-block";

    copyButton.onclick = () => {
      navigator.clipboard.writeText(address);
      alert("Wallet address copied!");
    };

  } catch (error) {
    console.log(error);
    alert("Connection cancelled.");
  }
}

connectButton.addEventListener("click", connectWallet);
