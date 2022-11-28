import web3 from "./web3.js";
import compiledFactory from "../ethereum/build/CampaignFactory.json" assert { type: "json" };

const factory = new web3.eth.Contract(
	compiledFactory.abi,
	process.env.NEXT_PUBLIC_FACTORY_ADDRESS
);

export default factory;
