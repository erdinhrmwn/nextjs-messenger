import { unstable_getServerSession } from "next-auth";
import { Message } from "../interfaces/message";
import ChatInput from "./ChatInput";
import Header from "./Header";
import MessageList from "./MessageList";
import { Providers } from "./providers";

export default async function Home() {
	const session = await unstable_getServerSession();

	const { data } = await fetch(`${process.env.VERCEL_URL}/api/fetchMessages`).then((res) => res.json());
	const messages: Message[] = data;

	return (
		<Providers session={session}>
			<Header session={session} />
			<main className='p-2'>
				<MessageList initialMessages={messages} />
				<ChatInput session={session} />
			</main>
		</Providers>
	);
}
