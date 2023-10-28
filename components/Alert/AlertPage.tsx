"use client";

import React from "react";
import { toast } from "react-toastify";

const alert = {
  title: "Your Account Successfully Created",
  message: "You can now login to your account",
};

const AlertPage = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
      <div className="flex flex-col gap-7.5">
        <button
          onClick={() => toast.success(alert.title + "\n" + alert.message)}
          className="text-white bg-meta-3 text-lg font-semibold px-6 py-2.5 rounded-md"
        >
          Success Alert
        </button>
        <button
          onClick={() => toast.error(alert.title + "\n" + alert.message)}
          className="text-white bg-meta-1 text-lg font-semibold px-6 py-2.5 rounded-md"
        >
          Error Alert
        </button>
        <button
          onClick={() => toast.warn(alert.title + "\n" + alert.message)}
          className="text-white bg-warning text-lg font-semibold px-6 py-2.5 rounded-md"
        >
          Warning Alert
        </button>
        <button
          onClick={() => toast.info(alert.title + "\n" + alert.message)}
          className="text-white bg-primary text-lg font-semibold px-6 py-2.5 rounded-md"
        >
          Info Alert
        </button>
      </div>
    </div>
  );
};

export default AlertPage;
