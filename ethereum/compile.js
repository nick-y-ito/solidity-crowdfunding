import path from "path";
import fs from "fs-extra";
import solc from "solc";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, "build");

// Clear the build directory
fs.removeSync(buildPath);

// Compile contract file
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const input = {
	language: "Solidity",
	sources: { "Campaign.sol": { content: source } },
	settings: { outputSelection: { "*": { "*": ["*"] } } },
};
const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

// Check if the directory exists
fs.ensureDirSync(buildPath);

// Create JSON file of each contract
for (let contract in compiledContracts) {
	fs.outputJSONSync(
		path.resolve(buildPath, contract + ".json"),
		compiledContracts[contract]
	);
}
