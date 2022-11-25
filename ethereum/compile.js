const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");

// Clear the build directory
fs.removeSync(buildPath);

// Compile contract file
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const compiledContracts = solc.compile(source, 1).contracts;

// Check if the directory exists
fs.ensureDirSync(buildPath);

// Create JSON file of each contract
let fileName;
for (let contract in compiledContracts) {
    fileName = contract.replace(':', '');
    fs.outputJSONSync(
        path.resolve(buildPath, fileName + '.json'),
        compiledContracts[contract]
    );
}
