import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import { ThumbUpOffAlt, Check } from "@mui/icons-material";

function RequestsTable(props) {
	return (
		<>
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
										variant="outlined"
										color="success"
										startIcon={<ThumbUpOffAlt />}
										style={{ textTransform: "none" }}
									>
										Approve
									</LoadingButton>
								</TableCell>
								<TableCell align="center">
									<LoadingButton
										variant="outlined"
										color="secondary"
										startIcon={<Check />}
										style={{ textTransform: "none" }}
									>
										Finalize
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
