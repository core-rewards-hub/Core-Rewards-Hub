const connectButton = document.getElementById("connectWallet");
const disconnectButton = document.getElementById("disconnectButton");
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const copyButton = document.getElementById("copyButton");
const switchNetworkButton = document.getElementById("switchNetworkButton");

const CORE_CHAIN = {
  chainId: "0x45c",
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

async function switchToCore() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CORE_CHAIN.chainId }]
    });

    connectWallet();

  } catch (error) {

    if (error.code === 4902) {

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [CORE_CHAIN]
      });

      connectWallet();

    } else {

      alert("Unable to switch to Core Mainnet.");

    }

  }
}

async function connectWallet() {

  if (!window.ethereum) {
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

    if (chainId !== CORE_CHAIN.chainId) {

      switchNetworkButton.style.display = "inline-block";

      try {

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_CHAIN.chainId }]
        });

        chainId = CORE_CHAIN.chainId;

      } catch (error) {

        if (error.code === 4902) {

          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [CORE_CHAIN]
          });

          chainId = CORE_CHAIN.chainId;

        }

      }

    } else {

      switchNetworkButton.style.display = "none";

    }

    walletAddress.textContent = currentAddress;
    status.textContent = "Connected";

    network.textContent =
      chainId === CORE_CHAIN.chainId
        ? "Core Mainnet"
        : "Wrong Network";

    const rawBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [currentAddress, "latest"]
    });

    const coreBalance =
      (Number(BigInt(rawBalance)) / 1e18).toFixed(4);

    balance.textContent = `${coreBalance} CORE`;

    connectButton.disabled = true;
    connectButton.textContent = "Wallet Connected";

    copyButton.style.display = "inline-block";
    disconnectButton.style.display = "inline-block";

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
  switchNetworkButton.style.display = "none";

}

async function copyAddress() {

  if (!currentAddress) return;

  try {

    await navigator.clipboard.writeText(currentAddress);

    alert("Wallet address copied.");

  } catch {

    alert("Unable to copy wallet address.");

  }

}

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

connectButton.addEventListener("click", connectWallet);
disconnectButton.addEventListener("click", disconnectWallet);
copyButton.addEventListener("click", copyAddress);
switchNetworkButton.addEventListener("click", switchToCore);
