import { useRouter } from "next/router";
import Layout from "src/components/layout";

function NewRequest() {
	const router = useRouter();
	const { address } = router.query;

	return (
		<Layout>
			<h1>New Request for Campaign {address}</h1>
		</Layout>
	);
}

export default NewRequest;
