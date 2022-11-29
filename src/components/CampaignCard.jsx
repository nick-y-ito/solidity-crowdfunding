import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CampaignCard(props) {
	return (
		<Card sx={{ minWidth: 275, mb: 1 }}>
			<CardContent sx={{ pb: 0 }}>
				<Typography variant="subtitle1" component="div">
					{props.campaign}
				</Typography>
			</CardContent>
			<CardActions sx={{ pt: 0 }}>
				<Link
					href={`/campaigns/${props.campaign}`}
					style={{ textDecoration: "none" }}
				>
					<Button size="small" style={{ textTransform: "none" }}>
						View Campaign
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}

export default CampaignCard;
