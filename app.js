document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const depositAvaxButton = document.getElementById('depositAvax');
    const depositMiaowButton = document.getElementById('depositMiaow');
    const withdrawButton = document.getElementById('withdraw');
    const compoundButton = document.getElementById('compound');
    
    let web3;
    let account;
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
    const contractABI = YOUR_CONTRACT_ABI; // Replace with your contract ABI

    connectWalletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
                web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];
                document.getElementById('account').textContent = `Connected: ${account}`;
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });

    depositAvaxButton.addEventListener('click', async () => {
        const amount = document.getElementById('depositAvaxAmount').value;
        const ref = document.getElementById('depositAvaxRef').value || '0x0000000000000000000000000000000000000000';
        if (amount && web3 && account) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            try {
                await contract.methods.depositAvax(0, ref).send({ from: account, value: web3.utils.toWei(amount, 'ether') });
                alert('Deposit successful');
            } catch (error) {
                console.error(error);
                alert('Error during deposit');
            }
        }
    });

    depositMiaowButton.addEventListener('click', async () => {
        const amount = document.getElementById('depositMiaowAmount').value;
        const ref = document.getElementById('depositMiaowRef').value || '0x0000000000000000000000000000000000000000';
        if (amount && web3 && account) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            try {
                await contract.methods.depositMiaow(web3.utils.toWei(amount, 'ether'), ref).send({ from: account });
                alert('Deposit successful');
            } catch (error) {
                console.error(error);
                alert('Error during deposit');
            }
        }
    });

    withdrawButton.addEventListener('click', async () => {
        if (web3 && account) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            try {
                await contract.methods.withdraw().send({ from: account });
                alert('Withdraw successful');
            } catch (error) {
                console.error(error);
                alert('Error during withdraw');
            }
        }
    });

    compoundButton.addEventListener('click', async () => {
        const ref = document.getElementById('compoundRef').value || '0x0000000000000000000000000000000000000000';
        if (web3 && account) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            try {
                await contract.methods.compound(ref).send({ from: account });
                alert('Compound successful');
            } catch (error) {
                console.error(error);
                alert('Error during compound');
            }
        }
    });
});
