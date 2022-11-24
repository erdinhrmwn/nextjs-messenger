import { Message } from "../interfaces/message";

const fetcher = async () => {
	const res = await fetch("/api/fetchMessages");
	const result = await res.json();
	const messages: Message[] = result.data;

	return messages;
};

export default fetcher;
