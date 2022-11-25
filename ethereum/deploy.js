// Provider
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = "aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk lll";
const provider = new HDWalletProvider({
	mnemonic: mnemonicPhrase,
	providerOrUrl: "https://goerli.infura.io/v3/xxxxxxxxxxxxxxxxxxxxxxxx",
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

	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to ", result.options.address);

    // Terminate the process
    provider.engine.stop();
};
deploy();