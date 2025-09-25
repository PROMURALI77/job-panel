import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  type?: string;
  placeholder?: string;
  name: string;
  id?: string;
  options?: string[];
  register?: UseFormRegisterReturn;
  error?: string;
};

const FormInput = ({
  type = "text",
  placeholder,
  name,
  id,
  options = [],
  register,
  error,
}: FormInputProps) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "date":
      return (
        <div>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className="max-w-[376px] w-full  placeholder:font-[500] placeholder:text-Form_placeholder text-[18px] font-[500]"
            {...register}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "textarea":
      return (
        <div>
          <textarea
            placeholder={placeholder}
            id={id}
            name={name}
            className="w-full h-32  placeholder:font-[500] placeholder:text-Form_placeholder"
            rows={5}
            {...register}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "select":
      return (
        <div className="relative">
          <select
            id={id}
            name={name}
            className="max-w-[376px] w-full appearance-none pr-12 font-semibold"
            defaultValue=""
            {...register}
          >
            <option
              value=""
              disabled
              className="text-Form_placeholder font-[500]"
            >
              {placeholder || "Select an option"}
            </option>
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* Bigger Chevron Icon */}
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    default:
      return null;
  }
};

export default FormInput;
