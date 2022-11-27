import * as dotenv from 'dotenv';
dotenv.config();
import Web3 from "web3";

let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
	// In the browser with Metamask
	window.ethereum.request({ method: "eth_requestAccounts" });
	// Get provider from Metamask
	provider = window.ethereum;
} else {
	// On the server or In the browser without Metamask
	// Create own provider from node
	provider = new Web3.providers.HttpProvider(process.env.GORLI_NODE_ENDPOINT);
}

const web3 = new Web3(provider);

export default web3;