import { useState } from "react";
import { useRouter } from "next/router";
import web3 from "ethereum/web3";
import campaign from "ethereum/campaign";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

function ContributeArea(props) {
	const router = useRouter();
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setErrMsg("");

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign(props.campaignAddress)
				.methods.contribute()
				.send({ from: accounts[0], value: amount });
			router.reload();
		} catch (err) {
			setErrMsg(err.message);
		}

		setIsLoading(false);
	}

	return (
		<Box onSubmit={handleSubmit} component="form" autoComplete="off">
			<FormControl fullWidth sx={{ mb: 1 }}>
				<InputLabel htmlFor="amount-in-wei">Amount to Contribute</InputLabel>
				<OutlinedInput
					id="amount-in-wei"
					value={amount}
					onChange={(event) => setAmount(event.target.value)}
					endAdornment={<InputAdornment position="end">Wei</InputAdornment>}
					label="Amount to Contribute"
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
				Contribute!
			</LoadingButton>
		</Box>
	);
}

export default ContributeArea;
