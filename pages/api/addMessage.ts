// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../interfaces/message";
import { pusher } from "../../pusher";
import redis from "../../redis";

type Data = {
	success: boolean;
	message: string;
	data: Message | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "POST") {
		res.status(405).json({ success: false, message: "Method Not Allowed", data: null });
		return;
	}

	const { message } = req.body;

	// push to upstash redis db
	await redis.hset("messages", { [message.id]: JSON.stringify(message) });
	await pusher.trigger("messages", "newMessage", message);

	res.status(200).json({ success: true, message: "Message sent.", data: message });
}
