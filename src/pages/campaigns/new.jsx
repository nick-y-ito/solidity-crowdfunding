import { useState } from "react";
import { useRouter } from "next/router";
import web3 from "ethereum/web3";
import Layout from "src/components/Layout";
import factory from "ethereum/factory";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

function NewCampaign() {
	const router = useRouter();
	const [minContribution, setMinContribution] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setErrMsg("");

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createCampaign(minContribution)
				.send({ from: accounts[0] });
			router.push("/");
		} catch (err) {
			setErrMsg(err.message);
		}

		setIsLoading(false);
	}

	return (
		<Layout>
			<Typography variant="h5" sx={{ mb: 1 }}>
				Create Campaign
			</Typography>
			<Grid container>
				<Grid xs={12} sm={6}>
					<Box onSubmit={handleSubmit} component="form" autoComplete="off">
						<FormControl fullWidth sx={{ mb: 1 }}>
							<InputLabel htmlFor="min-contribution">
								Minimum Contribution
							</InputLabel>
							<OutlinedInput
								id="min-contribution"
								value={minContribution}
								onChange={(event) => setMinContribution(event.target.value)}
								endAdornment={
									<InputAdornment position="end">Wei</InputAdornment>
								}
								label="Minimum Contribution"
							/>
						</FormControl>
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

export default NewCampaign;
