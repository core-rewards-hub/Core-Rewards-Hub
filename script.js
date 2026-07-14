const connectButton = document.getElementById("connectWallet");
const disconnectButton = document.getElementById("disconnectButton");
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

let currentAddress = "";

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Please open this website inside MetaMask or Core Wallet.");
    return;
  }

  try {
    // Connect wallet
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    currentAddress = accounts[0];

    // Current network
    let chainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    // Switch to Core Mainnet if needed
    if (chainId !== CORE_CHAIN.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_CHAIN.chainId }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [CORE_CHAIN]
          });
        } else {
          throw switchError;
        }
      }

      chainId = await window.ethereum.request({
        method: "eth_chainId"
      });
    }

    // Display wallet
    walletAddress.textContent = currentAddress;
    status.textContent = "Connected";
    network.textContent =
      chainId === CORE_CHAIN.chainId
        ? "Core Mainnet"
        : chainId;

    // Get balance
    const rawBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [currentAddress, "latest"]
    });

    const coreBalance =
      (Number(BigInt(rawBalance)) / 1e18).toFixed(4);

    balance.textContent = `${coreBalance} CORE`;

    // Update buttons
    connectButton.textContent = "Wallet Connected";
    connectButton.disabled = true;

    copyButton.style.display = "block";
    disconnectButton.style.display = "block";

  } catch (error) {
    console.error(error);
    alert(error.message || "Wallet connection failed.");
  }
}

function disconnectWallet() {
  currentAddress = "";

  status.textContent = "Not Connected";
  walletAddress.textContent = "----------";
  network.textContent = "Unknown";
  balance.textContent = "0.0000 CORE";

  connectButton.disabled = false;
  connectButton.textContent = "Connect Wallet";

  copyButton.style.display = "none";
  disconnectButton.style.display = "none";
}

copyButton.addEventListener("click", async () => {
  if (!currentAddress) return;

  try {
    await navigator.clipboard.writeText(currentAddress);
    alert("Wallet address copied.");
  } catch (err) {
    alert("Unable to copy address.");
  }
});

disconnectButton.addEvent
