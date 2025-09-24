'use client';

import React from 'react';
import { CreateJob, JobList, Navbar } from '@/components';
import { useAppContext } from '@/hooks/useAppContext';

const Home = () => {
	const { isModalOpen } = useAppContext();

	return (
		<>
			{isModalOpen && <CreateJob />}
			<div className='w-full h-screen bg-primary'>
				<div className='w-full bg-white'>
					<Navbar />
				</div>
				<div className='container'>
					<JobList />
				</div>
			</div>
		</>
	);
};

export default Home;
