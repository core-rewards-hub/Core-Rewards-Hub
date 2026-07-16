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
