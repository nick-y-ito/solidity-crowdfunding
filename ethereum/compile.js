const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

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
