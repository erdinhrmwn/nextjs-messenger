import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type Props = {
	session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

const Header = ({ session }: Props) => {
	return (
		<>
			{!session ? (
				<header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
					<div className='flex flex-col items-center space-y-5'>
						<div className='flex space-x-2 items-center'>
							<Image
								src={"https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png"}
								width={50}
								height={50}
								alt='Messenger Logo'
							/>
							<p className='text-blue-400'>Welcome to Messenger</p>
						</div>
					</div>
				</header>
			) : (
				<header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
					<div className='flex space-x-2 items-center'>
						<Image className='rounded-full mr-1 object-contain' width={50} height={10} src={session.user?.image!} alt='Profile Picture' />

						<div>
							<p className='text-blue-400'>Logged in as:</p>
							<p className='font-bold text-sm md:text-lg'>{session.user?.name}</p>
						</div>
					</div>
					<LogoutButton />
				</header>
			)}
		</>
	);
};

export default Header;
