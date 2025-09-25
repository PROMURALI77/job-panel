import { z } from "zod";

const locations = ["Chennai", "Bangalore", "Hyderabad","Kochi","Mumbai","Noida"] as const;
const jobTypes = ["FullTime", "PartTime", "Contract"] as const;

export const JobFormSchema = z
  .object({
    job_title: z.string().min(1, "Job title is required"),

    company_name: z.string().min(1, "Company name is required"),

    location: z.enum(locations, {
      message: "Please select a valid location",
    }),

    job_type: z.enum(jobTypes, {
      message: "Please select a valid job type",
    }),

    min_salary: z
      .string()
      .min(1, "Minimum salary is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Minimum salary must be a positive number",
      }),
    max_salary: z
      .string()
      .min(1, "Maximum salary is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Maximum salary must be a positive number",
      }),

    application_deadline: z
      .string()
      .min(1, "Application deadline is required")
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime()) && date >= new Date();
        },
        {
          message: "Application deadline must be a valid future date",
        }
      ),

    job_description: z.string().min(1, "Job description is required"),
  })
  .refine((data) => data.max_salary >= data.min_salary, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["max_salary"],
  });
