import campaign from "ethereum/campaign";
import Layout from "src/components/Layout";
import RequestsTable from "src/components/RequestsTable";
import Typography from "@mui/material/Typography";

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

	return { requests, approversCount };
};

function Requests({ requests, approversCount }) {
	return (
		<Layout>
			<Typography variant="h5" sx={{ mb: 3 }}>
				Requests
			</Typography>
			<RequestsTable requests={requests} approversCount={approversCount} />
		</Layout>
	);
}

export default Requests;
