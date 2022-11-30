// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../interfaces/message";
import redis from "../../redis";

type Data = {
	success: boolean;
	message: string | null;
	data: Message[] | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "GET") {
		res.status(405).json({ success: false, message: "Method Not Allowed", data: null });
		return;
	}

	const messageRes = await redis.hvals("messages");
	const messages: Message[] = messageRes.sort((a: Message, b: Message) => a.created_at - b.created_at);

	res.status(200).json({ success: true, message: null, data: messages });
}
