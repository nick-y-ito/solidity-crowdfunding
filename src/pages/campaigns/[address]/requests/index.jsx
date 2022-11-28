import { useRouter } from "next/router";
import Layout from "../../../../components/layout";

function Requests() {
	const router = useRouter();
	const { address } = router.query;

	return (
		<Layout>
			<h1>Requests of Campaign {address}</h1>
		</Layout>
	);
}

export default Requests;
