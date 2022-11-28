import { useRouter } from "next/router";
import Layout from "src/components/layout";

function Campaign() {
	const router = useRouter();
	const { address } = router.query;

	return (
		<Layout>
			<h1>Campaign {address}</h1>
		</Layout>
	);
}

export default Campaign;
