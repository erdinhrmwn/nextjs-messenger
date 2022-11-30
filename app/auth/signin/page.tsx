import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

const SignIn = async () => {
	const providers = await getProviders();

	return (
		<div className='grid justify-center'>
			<div>
				<Image
					className='rounded-full mb-5 object-cover'
					width={500}
					height={500}
					src={"https://1000logos.net/wp-content/uploads/2021/11/Messenger-Logo.png"}
					alt='Profile Picture'
				/>
			</div>

			<SignInComponent providers={providers} />
		</div>
	);
};

export default SignIn;
