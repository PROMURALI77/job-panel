import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      enum: {
        values: ["Chennai", "Bangalore", "Hyderabad","Kochi","Mumbai","Noida"],
        message: "Location must be Chennai, Bangalore, Hyderabad, Kochi, Mumbai, or Noida",
      },
    },
    job_type: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: ["FullTime", "PartTime", "Contract"],
        message: "Job type must be FullTime, PartTime, or Contract",
      },
    },
    min_salary: {
      type: Number,
      required: [true, "Minimum salary is required"],
      min: [0, "Minimum salary must be a positive number"],
    },
    max_salary: {
      type: Number,
      required: [true, "Maximum salary is required"],
      min: [0, "Maximum salary must be a positive number"],
      validate: {
        validator: function (value: number) {
          return value >= (this as any).min_salary;
        },
        message:
          "Maximum salary must be greater than or equal to minimum salary",
      },
    },
    application_deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
      validate: {
        validator: function (value: Date) {
          return value >= new Date();
        },
        message: "Application deadline cannot be in the past",
      },
    },
    job_description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Job description must be at least 10 characters long"],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "publish"],
        message: "Status must be either 'draft' or 'publish'",
      },
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Job=mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
