const connectButton = document.getElementById("connectWallet");
const walletAddress = document.getElementById("walletAddress");

connectButton.addEventListener("click", async () => {

    if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask or Core Wallet.");
        return;
    }

    try {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });

        walletAddress.innerHTML =
            "Connected: " + accounts[0];

    } catch (err) {
        console.log(err);
    }

});
