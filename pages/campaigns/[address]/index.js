import { useRouter } from "next/router";

function Campaign() {
	const router = useRouter();
	const { address } = router.query;

	return <h1>Campaign {address}</h1>;
}

export default Campaign;
