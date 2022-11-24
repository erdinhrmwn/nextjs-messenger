"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../interfaces/message";
import fetcher from "../utils/fetchMessages";

const ChatInput = () => {
	const [input, setInput] = useState("");
	const { data: messages, error, mutate } = useSWR("fetchMessages", fetcher);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const message: Message = {
			id: uuid(),
			content: input,
			email: "me@erdinhrmwn.net",
			username: "Erdin",
			profile_pic: "https://avatars.githubusercontent.com/u/76886259?v=4",
			created_at: Date.now(),
		};

		setInput("");

		const uploadToRedis = async () => {
			const res = await fetch("/api/addMessage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			const { data: newMessage } = await res.json();

			return [newMessage, ...messages!];
		};

		await mutate(uploadToRedis, {
			optimisticData: [message, ...messages!],
			rollbackOnError: true,
		});
	};

	return (
		<form onSubmit={sendMessage} className='fixed bottom-0 z-50 w-full flex space-x-2 px-9 py-5 border-t border-gray-100 bg-white'>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Enter message here...'
				className='flex-1 rounded border border-grey-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent p-3 disabled:opacity-50 disabled:cursor-not-allowed'
			/>
			<button
				type='submit'
				disabled={!input}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed'>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
