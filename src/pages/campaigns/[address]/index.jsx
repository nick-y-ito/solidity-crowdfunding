import web3 from "ethereum/web3";
import campaign from "ethereum/campaign";
import Layout from "src/components/Layout";
import Grid from "@mui/material/Grid";
import CampaignSummaryCard from "src/components/CampaignSummaryCard";
import Typography from "@mui/material/Typography";

Campaign.getInitialProps = async (props) => {
	const campaignAddress = props.query.address;
	const summary = await campaign(campaignAddress).methods.getSummary().call();
	const cardItems = [
		{
			title: summary.manager,
			meta: "Address of Manager",
			description:
				"The manager created this campaign and can create requests to withdraw money",
		},
		{
			title: summary.minimumContribution,
			meta: "Minimum Contribution (wei)",
			description:
				"You must contribute at least this much wei to become an approver",
		},
		{
			title: summary.requestsCount,
			meta: "Number of Requests",
			description:
				"A request tries to withdraw money from the contract. Requests must be approved by approvers",
		},
		{
			title: summary.approversCount,
			meta: "Number of Approvers",
			description: "Number of people who have already donated to this campaign",
		},
		{
			title: web3.utils.fromWei(summary.balance, "ether"),
			meta: "Campaign Balance (ether)",
			description:
				"The balance is how much money this campaign has left to spend.",
		},
	];

	return { campaignAddress, cardItems };
};

function Campaign({ campaignAddress, cardItems }) {
	return (
		<Layout>
			<Typography variant="h5" sx={{ mb: 3 }}>
				Campaign at "{campaignAddress}"
			</Typography>
			<Grid container spacing={9}>
				<Grid container item xs={12} md={7} spacing={2}>
					{cardItems.map((item, index) => {
						return <CampaignSummaryCard key={index} content={item} />;
					})}
				</Grid>
				<Grid item xs={12} md={5}>
				</Grid>
			</Grid>
		</Layout>
	);
}

export default Campaign;
