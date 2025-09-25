'use client';

import React, { useState } from 'react';
import FormInput from '../extras/FormInput';
import Image from 'next/image';
import { draft_arrow, publish_arrow } from '@/assets';
import { useAppContext } from '@/hooks/useAppContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { JobFormSchema } from '@/schema/JobFormSchema';
import { createJob } from '@/actions/job.action';
import toast from 'react-hot-toast';

type JobFormInputs = z.infer<typeof JobFormSchema>;

const JobForm = ({ onJobCreated }: { onJobCreated?: () => void }) => {
	const { formRef, setIsModalOpen } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<JobFormInputs>({
		resolver: zodResolver(JobFormSchema),
	});

	const onSubmit = async (data: JobFormInputs, e: any) => {
		const status = e.nativeEvent.submitter.value;
		setIsLoading(true);
		try {
			const response = await createJob(data, status);
			if (response.success) {
				toast.success('Job created successfully!');
				reset();
				setIsModalOpen(false);
				if (status === 'publish' && onJobCreated) {
					onJobCreated(); // <-- Notify parent to refresh jobs
				}
			}
		} catch (error) {
			console.error('Error creating job:', error);
			toast.error('Failed to create job. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className='w-full max-w-full flex flex-col gap-x-1 -mt-6'
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[16px]'>
				<div className='form_div flex-1'>
					<label htmlFor='job_title' className='form_label'>
						Job Title
					</label>
					<FormInput
						type='text'
						placeholder='Full Stack Developer'
						name='job_title'
						id='job_title'
						register={register('job_title')}
						error={errors.job_title?.message}
					/>
				</div>
				<div className='form_div flex-1'>
					<label htmlFor='company_name' className='form_label'>
						Company Name
					</label>
					<FormInput
						type='text'
						placeholder='Amazon, Microsoft, Swiggy'
						name='company_name'
						id='company_name'
						register={register('company_name')}
						error={errors.company_name?.message}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[16px]'>
				<div className='form_div flex-1'>
					<label htmlFor='location' className='form_label'>
						Location
					</label>
					<FormInput
						placeholder='Choose Preferred Location'
						name='location'
						id='location'
						type='select'
						options={['Chennai', 'Bangalore', 'Hyderabad','Kochi','Mumbai','Noida']}
						register={register('location')}
						error={errors.location?.message}
					/>
				</div>

				<div className='form_div flex-1'>
					<label htmlFor='job_type' className='form_label'>
						Job Type
					</label>
					<FormInput
						name='job_type'
						id='job_type'
						type='select'
						options={['FullTime', 'PartTime', 'Contract']}
						register={register('job_type')}
						error={errors.job_type?.message}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[16px] mt-2'>
				<div className='form_div flex-1'>
					<label htmlFor='min_salary' className='form_label'>
						Salary Range
					</label>
					<div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[8px]'>
						<FormInput
							placeholder='₹ 0'
							id='min_salary'
							name='min_salary'
							type='text'
							register={register('min_salary')}
							error={errors.min_salary?.message}
						/>
						<FormInput
							placeholder='₹ 12,00,000'
							id='max_salary'
							name='max_salary'
							type='text'
							register={register('max_salary')}
							error={errors.max_salary?.message}
						/>
					</div>
				</div>

				<div className='form_div'>
					<label
						htmlFor='application_deadline'
						className='form_label'
					>
						Application Deadline
					</label>
					<FormInput
						type='date'
						id='application_deadline'
						name='application_deadline'
						placeholder='Choose Application Deadline'
						register={register('application_deadline')}
						error={errors.application_deadline?.message}
					/>
				</div>
			</div>
			<div className='form_div'>
				<label htmlFor='job_description' className='form_label'>
					Job Description
				</label>
				<FormInput
					placeholder='Please share a description to let the candidate know more about the job role'
					id='job_description'
					name='job_description'
					type='textarea'
					register={register('job_description')}
					error={errors.job_description?.message}
				/>
			</div>

			<div className='flex items-center justify-between mt-[10px]'>
				<button
					type='submit'
					name='action'
					value='draft'
					className='flex cursor-pointer items-center justify-center text-[20px] font-[600] text-Range_input px-[60px] py-[16px] border-[1.5px] border-Range_input rounded-[10px]'
				>
					Save Draft
					<Image
						src={draft_arrow}
						className='w-[8px] h-[10px] ml-2'
						alt='Draft Arrow'
					/>
				</button>
				<button
					type='submit'
					name='action'
					value='publish'
					className='flex items-center cursor-pointer justify-center text-[20px] font-[600] text-white px-[60px] py-[16px] rounded-[10px] bg-button'
					disabled={isLoading}
				>
					{isLoading ? 'Publishing...' : 'Publish'}
					<Image
						src={publish_arrow}
						className='w-[8px] h-[10px] ml-2'
						alt='Publish Arrow'
					/>
				</button>
			</div>
		</form>
	);
};

export default JobForm;
