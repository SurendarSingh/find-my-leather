"use client";

import React, { useState } from "react";

const ButtonsContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-between mx-0 my-[-15px] mt-25">{children}</div>
);
const ButtonStyle = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={`rounded px-2 py-1 w-24 ${
      disabled
        ? "bg-stroke text-black cursor-not-allowed"
        : "bg-findmyleather text-white cursor-pointer"
    } active:scale-95`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const steps = [
  {
    label: "Address",
    step: 1,
  },
  {
    label: "Shipping",
    step: 2,
  },
  {
    label: "Payment",
    step: 3,
  },
  {
    label: "Summary",
    step: 4,
  },
];

const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className="w-full max-w-600 mx-0 my-auto px-0 py-4">
      <div className="flex justify-between mt-5 relative">
        <div className="absolute bg-stroke h-1 w-full top-1/2 transform -translate-y-1/2 left-0 dark:bg-meta-4"></div>
        <div
          className="absolute bg-findmyleather h-1 top-1/2 transform -translate-y-1/2 left-0 transition-all duration-400 ease-in-out"
          style={{ width }}
        ></div>
        {steps.map(({ step, label }) => (
          <div className="relative z-1" key={step}>
            <div
              className={`w-10 h-10 rounded-full bg-white dark:bg-boxdark border-4 border-solid ${
                activeStep >= step
                  ? "border-findmyleather"
                  : "border-stroke dark:border-meta-4"
              } transition-all duration-400 ease-in-out flex justify-center items-center`}
            >
              {activeStep > step ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <span className="text-body text-lg sm:text-base">{step}</span>
              )}
            </div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className="text-lg text-form-input dark:text-white sm:text-base"
                key={step}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ButtonsContainer>
        <ButtonStyle onClick={prevStep} disabled={activeStep === 1}>
          Previous
        </ButtonStyle>
        <ButtonStyle onClick={nextStep} disabled={activeStep === totalSteps}>
          Next
        </ButtonStyle>
      </ButtonsContainer>
    </div>
  );
};

export default ProgressSteps;
