"use client";

import React from "react";
import { Pipe } from "@/components";
import Image from "next/image";
import { filter_jobtype, filter_location, filter_search } from "@/assets";
import { useAppContext } from "@/hooks/useAppContext";
import SalaryInput from "./extras/SalaryInput";

const JobFilters = () => {
  const {
    search,
    setSearch,
    location,
    setLocation,
    jobType,
    setJobType,
    salaryRange,
  } = useAppContext();

  return (
    <form className="w-full flex flex-wrap gap-6 items-center justify-between py-5 container bg-white">
      <div className="filter_group">
        <Image
          src={filter_search}
          width={18}
          height={18}
          alt="search icon"
          className="ml-2"
        />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="filter_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Pipe />

      <div className="filter_group">
        <Image
          src={filter_location}
          width={18}
          height={18}
          alt="location icon"
          className="ml-2"
        />
        <select
          name="preferred_location"
          id="preferred_location"
          className="filter_input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Preferred Location</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <Pipe />

      <div className="filter_group">
        <Image
          src={filter_jobtype}
          width={18}
          height={18}
          alt="job type icon"
          className="ml-2"
        />
        <select
          name="preferred_job_type"
          id="preferred_job_type"
          className="filter_input"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">Job Type</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <Pipe />

      <div className="flex flex-col gap-2 flex-1">
        <label
          htmlFor="filter_salary"
          className="flex items-center justify-between text-Range_input font-[600]"
        >
          <span>Salary Per Month</span>
          <span>
            ₹{salaryRange.min}L - ₹{salaryRange.max}L
          </span>
        </label>
        <SalaryInput />
      </div>
    </form>
  );
};

export default JobFilters;
