import Head from "next/head";
import Header from "src/components/header";

function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Kickstarter</title>
			</Head>
			<Header />
			<main>{children}</main>
		</>
	);
}

export default Layout;
