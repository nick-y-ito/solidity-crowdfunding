import { useState } from "react";
import { useRouter } from "next/router";
import web3 from "ethereum/web3";
import Layout from "src/components/Layout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import campaign from "ethereum/campaign";

function NewRequest() {
	const router = useRouter();
	const campaignAddress = router.query.address;
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setErrMsg("");

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign(campaignAddress)
				.methods.createRequest(description, amount, recipientAddress)
				.send({ from: accounts[0] });
			router.push(`/campaigns/${campaignAddress}/requests`);
		} catch (err) {
			setErrMsg(err.message);
		}

		setIsLoading(false);
	}

	return (
		<Layout>
			<Typography variant="h5" sx={{ mb: 3 }}>
				Create a Request
			</Typography>
			<Grid container>
				<Grid xs={12} sm={6}>
					<Box onSubmit={handleSubmit} component="form" autoComplete="off">
						<TextField
							fullWidth
							label="Description"
							sx={{ mb: 1 }}
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
						<TextField
							fullWidth
							label="Amount"
							sx={{ mb: 1 }}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">Wei</InputAdornment>
								),
							}}
							value={amount}
							onChange={(event) => setAmount(event.target.value)}
						/>
						<TextField
							fullWidth
							label="Recipient Address"
							sx={{ mb: 1 }}
							value={recipientAddress}
							onChange={(event) => setRecipientAddress(event.target.value)}
						/>
						{errMsg && (
							<Alert severity="error" sx={{ mb: 1 }}>
								{errMsg}
							</Alert>
						)}
						<LoadingButton
							loading={isLoading}
							type="submit"
							variant="contained"
							color="primary"
							style={{ textTransform: "none" }}
						>
							Create!
						</LoadingButton>
					</Box>
				</Grid>
			</Grid>
		</Layout>
	);
}

export default NewRequest;
