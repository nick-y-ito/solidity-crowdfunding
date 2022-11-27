import { useRouter } from "next/router";

function NewRequest() {
	const router = useRouter();
	const { address } = router.query;

	return <h1>New Request for Campaign {address}</h1>;
}

export default NewRequest;
