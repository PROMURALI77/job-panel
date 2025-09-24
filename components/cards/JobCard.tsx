import { cards_exp, cards_salary, cards_type, comp_amazon } from "@/assets";
import Image, { StaticImageData } from "next/image";
import React from "react";

type JobCardProps = {
  job_img?: string | StaticImageData;
  job_title: string;
  job_desc?: string[];
  job_exp: string;
  job_location?: string;
  job_salary?: number;
};

const JobCard = ({
  job_img = comp_amazon,
  job_title,
  job_desc,
  job_exp,
  job_location,
  job_salary,
}: JobCardProps) => {
  return (
    <div className="cards mt-10 w-full">
      <div className="w-full flex items-start justify-between">
        <div className="comp_linear_gradient w-[82px] h-[82px] flex items-center justify-center rounded-[12px] border-white border-[1px]">
          <Image src={job_img} alt="Company Logo" width={65} height={65} />
        </div>
        <p className="px-[10px] py-[7px] rounded-[10px] bg-tag font-[500]">
          24h Ago
        </p>
      </div>
      <h1 className="font-[700] text-[20px] mt-3">{job_title}</h1>

      <div className="font-[500] text-[16px] text-Cards_info flex items-center gap-[16px] mt-3">
        <p className="flex items-center gap-1">
          <Image src={cards_exp} width={16} height={16} alt="Experience Icon" />
          {job_exp}
        </p>
        <p className="flex items-center gap-1">
          <Image src={cards_type} width={16} height={16} alt="Location Icon" />
          {job_location}
        </p>
        <p className="flex items-center gap-1">
          <Image src={cards_salary} width={16} height={16} alt="Salary Icon" />
          {job_salary}LPA
        </p>
      </div>

      <ul className="list-disc ml-[16px] text-Cards_desc text-[14px] font-[500] mt-3">
        {job_desc?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button className="button flex items-center justify-center font-[600] w-full mt-3">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
