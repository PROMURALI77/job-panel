import { NextResponse } from "next/server";
import Job from "@/model/jobs.model";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const jobs = await Job.find({ status: "publish" }).sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}