import Head from "next/head";
import Header from "src/components/Header";
import Container from "@mui/material/Container";

function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Kickstarter</title>
			</Head>
			<Header />
			<Container>
				<main>{children}</main>
			</Container>
		</>
	);
}

export default Layout;
