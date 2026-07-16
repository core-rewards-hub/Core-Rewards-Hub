// =======================================
// Core Rewards Hub - Phase 3
// Part 1
// =======================================

// Buttons
const connectButton = document.getElementById("connectWallet");
const disconnectButton = document.getElementById("disconnectButton");
const refreshButton = document.getElementById("refreshButton");
const copyButton = document.getElementById("copyButton");
const copyAddressButton = document.getElementById("copyAddressButton");
const openExplorerButton = document.getElementById("openExplorerButton");
const claimRewardsButton = document.getElementById("claimRewardsButton");

// UI Elements
const walletAddress = document.getElementById("walletAddress");
const status = document.getElementById("status");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const balanceUsd = document.getElementById("balanceUsd");
const portfolioValue = document.getElementById("portfolioValue");

// Effects
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

// Variables
let provider;
let signer;
let account = null;

// Core Mainnet
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

// Toast Notification
function showToast(message, success = true) {

    toast.textContent = message;

    toast.style.background =
        success ? "#16c784" : "#ff5b5b";

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Loading
function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

// =======================================
// Part 2 - Wallet Connection
// =======================================

async function connectWallet() {

    if (typeof window.ethereum === "undefined") {
        showToast("Please install MetaMask or Core Wallet.", false);
        return;
    }

    try {

        showLoader();

        provider = new ethers.providers.Web3Provider(window.ethereum);

        // Switch to Core Mainnet
        try {

            await provider.send(
                "wallet_switchEthereumChain",
                [{ chainId: CORE_CHAIN.chainId }]
            );

        } catch (switchError) {

            if (switchError.code === 4902) {

                await provider.send(
                    "wallet_addEthereumChain",
                    [CORE_CHAIN]
                );

            } else {

                throw switchError;

            }

        }

        await provider.send("eth_requestAccounts", []);

        signer = provider.getSigner();

        account = await signer.getAddress();

        const networkInfo = await provider.getNetwork();

        const balanceWei =
            await provider.getBalance(account);

        const balanceCore =
            ethers.utils.formatEther(balanceWei);

        // Update Dashboard

        walletAddress.textContent = account;

        status.textContent = "Connected";

        network.textContent =
            networkInfo.name + " (" + networkInfo.chainId + ")";

        balance.textContent =
            Number(balanceCore).toFixed(4) + " CORE";

        balanceUsd.textContent =
            "≈ USD value coming soon";

        portfolioValue.textContent =
            "$0.00";

        showToast("Wallet connected successfully!");

    } catch (error) {

        console.error(error);

        showToast("Connection failed.", false);

    } finally {

        hideLoader();

    }

}
