import web3 from "./web3";
import compiledCampaign from "./build/Campaign.json" assert { type: "json" };

function campaign(campaignAddress) {
	return new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
}

export default campaign;