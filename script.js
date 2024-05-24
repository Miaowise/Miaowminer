let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('No Ethereum provider detected. Install MetaMask');
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [ /* Your contract ABI */ ];
    contract = new web3.eth.Contract(contractABI, contractAddress);

    updateContractInfo();
});

async function updateContractInfo() {
    if (!web3 || !contract) {
        console.error('Web3 or contract not initialized');
        return;
    }

    const totalRewards = await contract.methods.totalRewards().call();
    const claimableRewards = await contract.methods.claimableRewards().call();
    const contractBalance = await web3.eth.getBalance(contractAddress);

    document.getElementById('totalRewards').textContent = web3.utils.fromWei(totalRewards, 'ether');
    document.getElementById('claimableRewards').textContent = web3.utils.fromWei(claimableRewards, 'ether');
    document.getElementById('contractBalance').textContent = web3.utils.fromWei(contractBalance, 'ether');
}

document.getElementById('deposit').addEventListener('click', async () => {
    // Add deposit logic here
});

document.getElementById('claim').addEventListener('click', async () => {
    // Add claim logic here
});

document.getElementById('connectWallet').addEventListener('click', async () => {
    // Add wallet connection logic here
});
