'use client';

import React, { useEffect } from 'react';
import JobForm from './forms/JobForm';
import { useAppContext } from '@/hooks/useAppContext';

const CreateJob = () => {
	const { formRef, setIsModalOpen } = useAppContext();

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				formRef?.current &&
				!formRef?.current.contains(event.target as any)
			) {
				setIsModalOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='fixed inset-0 bg-secondary/80 flex justify-center overflow-y-auto z-40'>
			{/* Modal */}
			<div className='bg-white p-6 rounded-[16px] shadow-xl flex flex-col items-center w-full max-w-[848px] relative z-50 my-12'>
				<h1 className='font-bold text-[24px] mb-[30px]'>
					Create Job Opening
				</h1>
				<JobForm />
			</div>
		</div>
	);
};

export default CreateJob;
