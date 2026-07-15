alert("script.js loaded");
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
  rpcUrls: [
    "https://rpc.coredao.org"
  ],
  blockExplorerUrls: [
    "https://scan.coredao.org"
  ]
};

let currentAddress = "";

// Connect Wallet
async function connectWallet() {

  if (typeof window.ethereum === "undefined") {
    alert("Please open this website inside MetaMask or Core Wallet.");
    return;
  }

  try {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    currentAddress = accounts[0];

    let chainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    // Switch to Core Mainnet
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

    // Wallet Address
    walletAddress.textContent = currentAddress;

    // Status
    status.textContent = "Connected";

    // Network
    if (chainId === CORE_CHAIN.chainId) {
      network.textContent = "Core Mainnet";
    } else {
      network.textContent = chainId;
    }

    // Balance
    const rawBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [currentAddress, "latest"]
    });

    const coreBalance =
      (Number(BigInt(rawBalance)) / 1e18).toFixed(4);

    balance.textContent = `${coreBalance} CORE`;

    // Buttons
    connectButton.disabled = true;
    connectButton.textContent = "Wallet Connected";

    disconnectButton.style.display = "inline-block";
    copyButton.style.display = "inline-block";

  } catch (error) {

    console.error(error);

    alert(
      error.message ||
      "Wallet connection failed."
    );

  }

}

// Disconnect
function disconnectWallet() {

  currentAddress = "";

  status.textContent = "Not Connected";
  walletAddress.textContent = "----------";
  network.textContent = "Unknown";
  balance.textContent = "0.0000 CORE";

  connectButton.disabled = false;
  connectButton.textContent = "Connect Wallet";

  disconnectButton.style.display = "none";
  copyButton.style.display = "none";

}

// Copy Address
async function copyAddress() {

  if (!currentAddress) return;

  try {

    await navigator.clipboard.writeText(currentAddress);

    alert("Wallet address copied.");

  } catch (err) {

    alert("Unable to copy wallet address.");

  }

}

// Wallet Changed
if (window.ethereum) {

  window.ethereum.on("accountsChanged", (accounts) => {

    if (accounts.length === 0) {

      disconnectWallet();

    } else {

      connectWallet();

    }

  });

  window.ethereum.on("chainChanged", () => {

    connectWallet();

  });

}

// Button Events
connectButton.addEventListener(
  "click",
  connectWallet
);

disconnectButton.addEventListener(
  "click",
  disconnectWallet
);

copyButton.addEventListener(
  "click",
  copyAddress
);
