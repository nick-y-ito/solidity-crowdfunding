import campaign from "ethereum/campaign";
import Link from "next/link";
import Layout from "src/components/Layout";
import Grid from "@mui/material/Grid";
import RequestsTable from "src/components/RequestsTable";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";

Requests.getInitialProps = async (props) => {
	const campaignAddress = props.query.address;
	const approversCount = parseInt(
		await campaign(campaignAddress).methods.approversCount().call()
	);
	const requestsCount = parseInt(
		await campaign(campaignAddress).methods.getRequestsCount().call()
	);
	const arr = [...Array(requestsCount).keys()]; // Generates Array like: [0, 1, 2, 3, ...]
	const requests = await Promise.all(
		arr.map(async (index) => {
			const request = await campaign(campaignAddress)
				.methods.requests(index)
				.call();
			return request;
		})
	);

	return { campaignAddress, requests, approversCount };
};

function Requests({ campaignAddress, requests, approversCount }) {
	return (
		<Layout>
			<Typography variant="h5">Requests</Typography>
			<Grid container justifyContent="flex-end" sx={{ mb: 1 }}>
				<Link
					href={`/campaigns/${campaignAddress}/requests/new`}
					style={{ textDecoration: "none" }}
				>
					<Button
						variant="contained"
						startIcon={<AddCircle />}
						style={{ textTransform: "none" }}
					>
						Add Requests
					</Button>
				</Link>
			</Grid>
			<RequestsTable
				campaignAddress={campaignAddress}
				requests={requests}
				approversCount={approversCount}
			/>
		</Layout>
	);
}

export default Requests;
