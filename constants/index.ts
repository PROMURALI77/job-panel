import { comp_amazon, comp_swiggy, comp_tesla } from "@/assets";

export const navLinks = [
  "Home",
  "Find Jobs",
  "Find Talents",
  "About Us",
  "Testimonials",
];

export const jobs = [
  {
    job_id: 1,
    job_img: comp_amazon,
    job_title: "Full Stack Developer",
    job_exp: "1-3 yr Exp",
    job_location: "Onsite",
    job_salary: 10,
    job_desc: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    job_type: "FullTime",
    location: "Bangalore",
    

  },
  {
    job_id: 2,
    job_img: comp_tesla,
    job_title: "Node Js Developer",
    job_exp: "1-3 yr Exp",
    job_location: "Onsite",
    job_salary: 12,
    job_desc: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    job_type: "PartTime",
    location: "Chennai",
  },
  {
    job_id: 3,
    job_img: comp_swiggy,
    job_title: "UX/UI Designer",
    job_exp: "1-3 yr Exp",
    job_location: "Onsite",
    job_salary: 6,
    job_desc: [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized",
    ],
    job_type: "Contract",
    location: "Hyderabad",
  },
];
