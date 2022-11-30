import TimeAgo from "react-timeago";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Message } from "../interfaces/message";

type Props = {
	message: Message;
};

const MessageComponent = ({ message }: Props) => {
	const { data: session } = useSession();
	const isUser = session?.user?.email === message.email;

	return (
		<div className={`flex w-fit ${isUser && "ml-auto"}`}>
			<div className={`flex-shrink-0 ${isUser && "order-2"}`}>
				<Image src={message.profile_pic} alt='Profile Picture' width={50} height={50} className='rounded-full mx-2' />
			</div>

			<div>
				<p className={`text-[0.65rem] px-[2px] pb-[2px] ${isUser ? "text-blue-600 text-right" : "text-purple-600 text-left"}`}>
					{message.username}
				</p>

				<div className='flex items-end'>
					<div className={`text-xs px-3 py-2 rounded-lg w-fit text-white ${isUser ? "bg-blue-600 ml-auto order-2" : "bg-purple-600"}`}>
						<p>{message.content}</p>
					</div>

					<p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && "text-right"}`}>
						<TimeAgo date={new Date(message.created_at)} />
					</p>
				</div>
			</div>
		</div>
	);
};

export default MessageComponent;
