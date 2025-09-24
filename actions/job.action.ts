"use server";

import { connectDB } from "@/lib/db";
import Job from "@/model/jobs.model";
import { JobFormSchema } from "@/schema/JobFormSchema";
import { z } from "zod";

export const createJob = async (formData: z.infer<typeof JobFormSchema>,status: 'draft' | 'publish') => {
  try {
    await connectDB();
    const job = await Job.create({
      ...formData,
      min_salary: Number(formData.min_salary),
      max_salary: Number(formData.max_salary),
      application_deadline: new Date(formData.application_deadline),
      status:status,
    });

    return {
      success: true,
      job: JSON.parse(JSON.stringify(job)),
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create job: " + error,
    };
  }
};
