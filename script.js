let provider;
let signer;
let userAddress;
let web3Modal;
let connection;
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
    // Replace this with your contract's ABI
];

async function init() {
    const providerOptions = {
        walletconnect: {
            package: window.WalletConnectProvider.default,
            options: {
                infuraId: "YOUR_INFURA_PROJECT_ID"
            }
        },
        fortmatic: {
            package: window.Fortmatic,
            options: {
                key: "YOUR_FORTMATIC_KEY"
            }
        }
    };

    web3Modal = new window.Web3Modal.default({
        cacheProvider: false,
        providerOptions
    });

    document.getElementById('connectButton').addEventListener('click', connectWallet);
}

async function connectWallet() {
    try {
        connection = await web3Modal.connect();
        provider = new ethers.providers.Web3Provider(connection);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        document.getElementById('walletAddress').innerText = `Connected: ${userAddress}`;
        document.getElementById('connectButton').innerText = 'Wallet Connected';

        // Generate and display referral link
        const referralLink = `https://yourdomain.com/?ref=${userAddress}`;
        document.getElementById('referralLink').innerText = `Your referral link: ${referralLink}`;
        document.getElementById('referralLink').style.display = 'block';
    } catch (error) {
        console.error("Error connecting to wallet", error);
    }
}

async function deposit() {
    if (!signer) return alert("Please connect your wallet first!");

    const amount = document.getElementById('depositAmount').value;
    const referrer = document.getElementById('referrerAddress').value || '0x0000000000000000000000000000000000000000';

    // Implement permit functionality here to get v, r, s, and deadline

    // Assuming v, r, s, and deadline are obtained
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const v = 0; // replace with actual value
    const r = '0x'; // replace with actual value
    const s = '0x'; // replace with actual value

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.deposit(amount, referrer, deadline, v, r, s);
    await tx.wait();

    alert('Deposit successful!');
}

async function claim() {
    if (!signer) return alert("Please connect your wallet first!");

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.claim();
    await tx.wait();

    alert('Rewards claimed!');
}

async function getUserInfo() {
    if (!signer) return alert("Please connect your wallet first!");

    const userAddress = document.getElementById('userAddress').value;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const userInfo = await contract.users(userAddress);

    document.getElementById('userInfo').innerHTML = `
        <p>Deposit: ${ethers.utils.formatUnits(userInfo.deposit, 18)} tokens</p>
        <p>Last Claim: ${new Date(userInfo.lastClaim * 1000).toLocaleString()}</p>
        <p>Referrer: ${userInfo.referrer}</p>
    `;
}

window.addEventListener('load', async () => {
    await init();
});