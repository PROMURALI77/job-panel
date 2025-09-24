"use client";

import React from "react";
import { Range, getTrackBackground } from "react-range";
import { useAppContext } from "@/hooks/useAppContext";

const SALARY_MIN = 0;
const SALARY_MAX = 20;

const SalaryInput = () => {
  const { salaryRange, setSalaryRange } = useAppContext();

  const values = [salaryRange.min, salaryRange.max];

  return (
    <div className="w-full max-w-md">
      <Range
        step={1}
        min={SALARY_MIN}
        max={SALARY_MAX}
        values={values}
        onChange={(newValues) =>
          setSalaryRange({ min: newValues[0], max: newValues[1] })
        }
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "16px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "3px",
                width: "100%",
                background: getTrackBackground({
                  values,
                  colors: ["#D1D5DB", "#000", "#D1D5DB"],
                  min: SALARY_MIN,
                  max: SALARY_MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: "4px solid #000",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}
          />
        )}
      />
    </div>
  );
};

export default SalaryInput;
