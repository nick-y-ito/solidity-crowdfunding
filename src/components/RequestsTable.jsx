import { useState } from "react";
import { useRouter } from "next/router";
import web3 from "ethereum/web3";
import campaign from "ethereum/campaign";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { ThumbUpOffAlt, Check } from "@mui/icons-material";

function RequestsTable(props) {
	const router = useRouter();
	const campaignAddress = router.query.address;

	const [loadingApprove, setLoadingApprove] = useState();
	const [loadingFinalize, setLoadingFinalize] = useState();
	const [errMsg, setErrMsg] = useState("");

	async function approveRequest(index) {
		setLoadingApprove(index);
		setErrMsg("");
		const accounts = await web3.eth.getAccounts();
		try {
			await campaign(campaignAddress)
				.methods.approveRequest(index)
				.send({ from: accounts[0] });
			router.reload();
		} catch (err) {
			setErrMsg(err.message);
		}
		setLoadingApprove();
	}

	async function finalizeRequest(index) {
		setLoadingFinalize(index);
		setErrMsg("");
		const accounts = await web3.eth.getAccounts();
		try {
			await campaign(campaignAddress)
				.methods.finalizeRequest(index)
				.send({ from: accounts[0] });
			router.reload();
		} catch (err) {
			setErrMsg(err.message);
		}
		setLoadingFinalize();
	}

	return (
		<>
			{errMsg && (
				<Alert severity="error" sx={{ mb: 1 }}>
					{errMsg}
				</Alert>
			)}
			<TableContainer component={Paper} sx={{ mb: 1 }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Recipient</TableCell>
							<TableCell>Approval Count</TableCell>
							<TableCell align="center">Approve</TableCell>
							<TableCell align="center">Finalize</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.requests.map((request, index) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{index}
								</TableCell>
								<TableCell>{request.description}</TableCell>
								<TableCell>{request.value}</TableCell>
								<TableCell>{request.recipient}</TableCell>
								<TableCell>
									{request.approvalsCount}/{props.approversCount}
								</TableCell>
								<TableCell align="center">
									<LoadingButton
										loading={loadingApprove === index}
										disabled={
											!!request.complete ||
											typeof loadingFinalize === "number" ||
											(typeof loadingApprove === "number" &&
												loadingApprove !== index)
										}
										variant="outlined"
										color="success"
										startIcon={<ThumbUpOffAlt />}
										style={{ textTransform: "none" }}
										onClick={() => approveRequest(index)}
									>
										Approve
									</LoadingButton>
								</TableCell>
								<TableCell align="center">
									<LoadingButton
										loading={loadingFinalize === index}
										disabled={
											!!request.complete ||
											typeof loadingApprove === "number" ||
											(typeof loadingFinalize === "number" &&
												loadingFinalize !== index)
										}
										variant="outlined"
										color="secondary"
										startIcon={<Check />}
										style={{ textTransform: "none" }}
										onClick={() => finalizeRequest(index)}
									>
										{!!request.complete ? "Finalized" : "Finalize"}
									</LoadingButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Typography>Found {props.requests.length} requests.</Typography>
		</>
	);
}

export default RequestsTable;
