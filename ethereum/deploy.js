require("dotenv").config();

// Provider
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new HDWalletProvider({
	mnemonic: process.env.MNEMONIC,
	providerOrUrl: process.env.GORLI_NODE_ENDPOINT,
});

// Web3
const Web3 = require("web3");
const web3 = new Web3(provider);

// Contract
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

// Deployment
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account ", accounts[0]);

	const result = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: "1200000" });

    console.log("Contract deployed to ", result.options.address);

    // Terminate the process
    provider.engine.stop();
};
deploy();