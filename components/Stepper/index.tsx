"use client";

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditOrderStatus from "../Form/EditOrderStatus";
import { DefaultOrderStatus } from "@/lib/order/DefaultOrderValues";
import { useSession } from "next-auth/react";
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
    className={`rounded px-2 py-1 w-24 ${disabled
      ? "bg-stroke text-black cursor-not-allowed"
      : "bg-findmyleather text-white cursor-pointer"
      } active:scale-95`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);



const ProgressSteps = ({ data }: any) => {


  const steps = [
    {
      date: data[0]?.trackingStatus?.supplierMatching,
      label: "Supplier Matching",
      step: 1,
    },
    {
      date: data[0]?.trackingStatus?.sampleRequest,
      label: "Sample Request",
      step: 2,
    },
    {
      date: data[0]?.trackingStatus?.sampling,
      label: "Sampling",
      step: 3,
    },
    {
      date: data[0]?.trackingStatus?.sampleApproval,
      label: "Sample Approval",
      step: 4,
    },
    {
      date: data[0]?.trackingStatus?.production,
      label: "Production",
      step: 5,
    },
    {
      date: data[0]?.trackingStatus?.qualityControl,
      label: "Quality Control",
      step: 6,
    },
    {
      date: data[0]?.trackingStatus?.packing,
      label: "Packing",
      step: 7,
    },
    {
      date: data[0]?.trackingStatus?.shipped,
      label: "Shipped",
      step: 8,
    },
    {
      date: data[0]?.trackingStatus?.delivered,
      label: "Delivered",
      step: 9,
    },
  ];

  const [EditForm, setEditForm] = useState(false)
  const [activeStep, setActiveStep] = useState(1);

  const { data: session } = useSession();
  useEffect(() => {
    DefaultOrderStatus.map((item, idx: any) => {
      if (data[0]?.orderStatus === item) {
        setActiveStep(idx + 1);
      }
    })
  }, [data])

  const handleChange = (e: any) => (
    setEditForm(true)
  )
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
        {steps.map(({ step, label, date }) => (

          <div className="relative z-1" key={step}>
            <div
              className={`w-10 h-10 rounded-full bg-white dark:bg-boxdark border-4 border-solid ${activeStep >= step
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
            <div className="absolute top-22 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className="text-lg text-form-input dark:text-white sm:text-base"
                key={step}
              >
                {label}
              </span>
              <br />
              <span>{date ? new Date(date).toLocaleDateString() : "-"}</span>
              <br />
            </div>
          </div>
        ))}
      </div>
      <ButtonsContainer>
        <ButtonStyle onClick={prevStep} disabled={activeStep === 1}>
          Previous
        </ButtonStyle>
        {session?.user?.role === "seller" && (
          <div className="rounded px-2 py-1 w-24 bg-blue-600 text-black cursor-pointer" onClick={handleChange}>
            <button
              onClick={(key: any) => {
                setEditForm(true)
              }}
              className="flex items-center justify-center gap-2 text-white ml-3"
            > <FaEdit /> Edit </button>
          </div>
        )}

        <ButtonStyle onClick={nextStep} disabled={activeStep === totalSteps}>
          Next
        </ButtonStyle>
      </ButtonsContainer>
      <EditOrderStatus
        EditForm={EditForm}
        setEditForm={setEditForm}
        orderItem={data}
      />
    </div>
  );
};

export default ProgressSteps;
