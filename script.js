let web3;
let contract;
let userReferralLink;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('No Avalanche wallet detected. Install an Avalanche wallet like MetaMask');
    }

    const provider = new web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc');
    web3 = new Web3(provider);

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [ /* Your contract ABI */ ];
    contract = new web3.eth.Contract(contractABI, contractAddress);

    updateContractInfo();

    if (web3 && web3.eth.defaultAccount) {
        userReferralLink = generateReferralLink(web3.eth.defaultAccount);
    }
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

    if (userReferralLink) {
        document.getElementById('referralLink').textContent = userReferralLink;
    }
}

function generateReferralLink(address) {
    return `https://yourwebsite.com/?ref=${address}`;
}

document.getElementById('deposit').addEventListener('click', async () => {
    const depositAmount = document.getElementById('depositAmount').value;
    if (!depositAmount || depositAmount <= 0) {
        alert('Please enter a valid deposit amount');
        return;
    }

    // Convert deposit amount to Wei
    const amountWei = web3.utils.toWei(depositAmount, 'ether');

    // Call the deposit function on the contract
    await contract.methods.deposit(amountWei).send({ from: web3.eth.defaultAccount });

    // Update contract info after deposit
    updateContractInfo();
});

document.getElementById('claim').addEventListener('click', async () => {
    // Add claim logic here
});

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('No Avalanche wallet detected. Install an Avalanche wallet like MetaMask');
    }
});
