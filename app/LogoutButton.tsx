'use client'

const LogoutButton = () => {
	return (
		<div>
			<button
				onClick={() => console.log("error")}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-lg'>
				Sign Out
			</button>
		</div>
	);
};

export default LogoutButton;
