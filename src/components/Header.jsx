import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header() {
	return (
		<>
			<Box sx={{ flexGrow: 1, mb: 2 }}>
				<AppBar position="static">
					<Toolbar>
						<Link href="/" style={{ textDecoration: "none", color: "white" }}>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Kickstarter
							</Typography>
						</Link>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}

export default Header;
