'use client';

import React, { useEffect, useState } from 'react';
import { JobCard } from '@/components';
import { comp_amazon, comp_swiggy, comp_tesla } from '@/assets';
import { useAppContext } from '@/hooks/useAppContext';

const companyImages = [comp_amazon, comp_swiggy, comp_tesla];

const JobList = ({ refreshFlag }: { refreshFlag?: boolean }) => {
	const { search, location, jobType, salaryRange } = useAppContext();
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch('/api/jobs')
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setJobs(data);
				} else if (data.jobs && Array.isArray(data.jobs)) {
					setJobs(data.jobs);
				} else {
					setJobs([]);
				}
				setLoading(false);
			})
			.catch(() => {
				setJobs([]);
				setLoading(false);
			});
	}, [refreshFlag]); // <-- re-fetch when refreshFlag changes

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			search.trim() === '' ||
			job.job_title.toLowerCase().includes(search.toLowerCase()) ||
			(job.job_description &&
				job.job_description
					.toLowerCase()
					.includes(search.toLowerCase()));

		const matchesLocation =
			location.trim() === '' || job.location === location;

		const matchesJobType =
			jobType.trim() === '' || job.job_type === jobType;

		// Salary filter: job.min_salary is in INR, salaryRange is in lakhs
		const minSalaryLakh = job.min_salary ? job.min_salary / 100000 : 0;
		const matchesSalary =
			minSalaryLakh >= salaryRange.min &&
			minSalaryLakh <= salaryRange.max;

		return (
			matchesSearch && matchesLocation && matchesJobType && matchesSalary
		);
	});

	if (loading) {
		return <div className='text-center py-10'>Loading jobs...</div>;
	}

	if (jobs.length === 0) {
		return <div className='text-center py-10'>No jobs available.</div>;
	}

	if (filteredJobs.length === 0) {
		return (
			<div className='text-center py-10'>No jobs match your filters.</div>
		);
	}

	return (
		<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]'>
			{filteredJobs.map((item, index) => {
				const salaryLPA = item.min_salary
					? Math.round(item.min_salary / 100000)
					: 0;
				const randomImg = companyImages[Math.floor(Math.random() * companyImages.length)];
				return (
					<JobCard
						key={item._id || index}
						job_exp={'1-3yr Exp'}
						job_img={randomImg}
						job_title={item.job_title}
						job_desc={[item.job_description]}
						job_location={item.location}
						job_salary={salaryLPA}
					/>
				);
			})}
		</div>
	);
};

export default JobList;
