import { useRouter } from "next/router";

function Requests() {
	const router = useRouter();
	const { address } = router.query;

	return <h1>Requests of Campaign {address}</h1>;
}

export default Requests;
