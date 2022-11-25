const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

// Contracts
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let managerAccount;
let contributerAccount;
let vendorAccount;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	// Account definition
	accounts = await web3.eth.getAccounts();
	managerAccount = accounts[0];
	contributerAccount = accounts[1];
	vendorAccount = accounts[9];

	// Factory contract instance (Deploying Factory contract)
	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({
			data: compiledFactory.bytecode,
		})
		.send({
			from: managerAccount,
			gas: "1000000",
		});

	// Campaign deployment
	await factory.methods.createCampaign("100").send({
		from: managerAccount,
		gas: "1000000",
	});
	campaignAddress = await factory.methods.deployedCampaigns(0).call();

	// Campaign contract instance (Accessing deployed campaign contract)
	campaign = await new web3.eth.Contract(
		JSON.parse(compiledCampaign.interface),
		campaignAddress
	);
});

describe("Campaigns", () => {
	it("deploys a factory and a campaign", () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it("marks caller as the campaign manager", async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(managerAccount, manager);
	});

	it("allows people to contribute money and marks them as approvers", async () => {
		await campaign.methods.contribute().send({
			from: contributerAccount,
			value: "100",
		});

		const approversCount = await campaign.methods.approversCount().call();
		assert.equal(1, approversCount);

		const isContributer = await campaign.methods
			.approvers(contributerAccount)
			.call();
		assert.ok(isContributer);
	});

	it("requires a minimum contribution", async () => {
		try {
			await campaign.methods.contribute().send({
				from: contributerAccount,
				value: "99",
			});
			assert.ok(false);
		} catch (err) {
			assert.ok(err);
		}
	});

	it("allows a manager to make a payment request", async () => {
		await campaign.methods
			.createRequest(
				"Buy batteries",
				web3.utils.toWei("1", "ether"),
				vendorAccount
			)
			.send({
				from: managerAccount,
				gas: "1000000",
			});

		const request = await campaign.methods.requests(0).call();
		assert.equal("Buy batteries", request.description);
	});

	it("processes requests", async () => {
		await campaign.methods
			.createRequest(
				"Buy batteries",
				web3.utils.toWei("1", "ether"),
				vendorAccount
			)
			.send({
				from: managerAccount,
				gas: "1000000",
			});

		await campaign.methods.contribute().send({
			from: contributerAccount,
			value: web3.utils.toWei("5", "ether"),
			gas: "1000000",
		});

		await campaign.methods.approveRequest(0).send({
			from: contributerAccount,
			gas: "1000000",
		});

		const vendorInitialBalance = await web3.eth.getBalance(vendorAccount);
		await campaign.methods.finalizeRequest(0).send({
			from: managerAccount,
			gas: "1000000",
		});
		const vendorFinalBalance = await web3.eth.getBalance(vendorAccount);
		const diff = vendorFinalBalance - vendorInitialBalance;

		const request = await campaign.methods.requests(0).call();
		assert.equal(parseInt(request.value), diff);
	});
});
