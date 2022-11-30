"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import { Message } from "../interfaces/message";
import { pusherClient } from "../pusher";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

type Props = {
	initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
	const bottomRef = useRef<null | HTMLDivElement>(null);
	const { data: messages, error, mutate } = useSWR("fetchMessages", fetcher);

	useEffect(() => {
		const channel = pusherClient.subscribe("messages");

		channel.bind("newMessage", async (data: Message) => {
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				mutate(fetcher, {
					optimisticData: [data, ...messages!],
					rollbackOnError: true,
				});
			}
		});

		setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 500);

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages, mutate, pusherClient]);

	return (
		<div>
			<div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
				{(messages || initialMessages)?.map((message) => (
					<MessageComponent message={message} key={message.id} />
				))}
			</div>
			<div ref={bottomRef} />
		</div>
	);
};

export default MessageList;
