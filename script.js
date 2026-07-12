const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");

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

    walletAddress.innerHTML =
      "<strong>Connected:</strong><br>" +
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4);

    connectButton.textContent = "Wallet Connected";
    connectButton.disabled = true;
  } catch (error) {
    console.log(error);
    alert("Connection cancelled.");
  }
}

connectButton.addEventListener("click", connectWallet);
