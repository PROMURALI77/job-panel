"use client";

import React from "react";
import { JobCard } from "@/components";
import { jobs } from "@/constants";
import { useAppContext } from "@/hooks/useAppContext";

const JobList = () => {
  const { search, location, jobType, salaryRange } = useAppContext();

  const jobsList = [...jobs, ...jobs, ...jobs];
  jobsList.splice(jobsList.length - 1, 1);

  const filteredJobs = jobsList.filter((job) => {
    const matchSearch = job.job_title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchLocation = location ? job.location === location : true;
    const matchType = jobType ? job.job_type === jobType : true;

    const matchSalary =
      job.job_salary >= salaryRange.min && job.job_salary <= salaryRange.max;

    return matchSearch && matchLocation && matchType && matchSalary;
  });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
      {filteredJobs.map((item, index) => (
        <JobCard
          key={index}
          job_exp={item.job_exp}
          job_img={item.job_img}
          job_title={item.job_title}
          job_desc={item.job_desc}
          job_location={item.job_location}
          job_salary={item.job_salary}
        />
      ))}
    </div>
  );
};

export default JobList;
