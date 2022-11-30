import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CampaignSummaryCard(props) {
	return (
		<Grid item sm={6}>
			<Card sx={{ height: 167 }}>
				<CardContent>
					<Typography variant="h6" component="div" noWrap={true}>
						{props.content.title}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{props.content.meta}
					</Typography>
					<Typography variant="body2">{props.content.description}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default CampaignSummaryCard;
