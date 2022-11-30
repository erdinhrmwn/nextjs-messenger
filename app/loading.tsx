"use client";

import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPage = () => {
	return (
		<div className='text-center pt-8'>
			<Spinner size={"lg"} />
		</div>
	);
};

export default LoadingPage;
