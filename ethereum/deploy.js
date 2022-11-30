import * as dotenv from "dotenv";
dotenv.config();

// Provider
import HDWalletProvider from "@truffle/hdwallet-provider";
const provider = new HDWalletProvider({
	mnemonic: process.env.NEXT_PUBLIC_MNEMONIC,
	providerOrUrl: process.env.NEXT_PUBLIC_GORLI_NODE_ENDPOINT,
});

// Web3
import Web3 from "web3";
const web3 = new Web3(provider);

// Contract
import compiledFactory from "../ethereum/build/CampaignFactory.json" assert { type: "json" };

// Deployment
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account ", accounts[0]);

	const result = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: "1400000" });

    console.log("Contract deployed to ", result.options.address);

    // Terminate the process
    provider.engine.stop();
};
deploy();