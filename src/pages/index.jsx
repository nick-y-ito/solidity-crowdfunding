import Link from "next/link";
import Layout from "src/components/Layout";
import CampaignCard from "src/components/campaignCard";
import factory from "ethereum/factory";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";

Top.getInitialProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return { campaigns };
};

function Top({ campaigns }) {
	return (
		<Layout>
			<Typography variant="h5" sx={{ mb: 1 }}>
				Open Campaigns
			</Typography>
			<Grid container spacing={2}>
				<Grid xs={9}>
					{campaigns.map((campaign, index) => {
						return <CampaignCard key={index} campaign={campaign} />;
					})}
				</Grid>
				<Grid xs={3}>
					<Link href="/campaigns/new" style={{ textDecoration: "none" }}>
						<Button
							variant="contained"
							startIcon={<AddCircle />}
							style={{ textTransform: "none" }}
						>
							Create Campaign
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Layout>
	);
}

export default Top;
