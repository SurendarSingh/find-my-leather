import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewCustomerSchema,
  NewCustomerType,
} from "@/lib/user/NewCustomerSchema";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

const AddNewCustomerForm = ({
  addNewCustomer,
  setaddNewCustomer,
}: {
  addNewCustomer: boolean;
  setaddNewCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCustomerType>({
    resolver: zodResolver(NewCustomerSchema),
  });

  const onSubmit: SubmitHandler<NewCustomerType> = async (data) => {
    setIsFormSubmitting(true);
    try {
      console.log("NewCustomerData", data);
    } catch (error) {
      console.log("NewCustomerError", error);
    }
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        addNewCustomer ? "flex" : "hidden"
      } bg-gray-900/50 dark:bg-gray-900/80 inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Customer
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setaddNewCustomer(false)}
              disabled={isFormSubmitting}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-findmyleather focus:border-findmyleather block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-findmyleather dark:focus:border-findmyleather"
                  placeholder="Customer Name"
                  required
                  {...register("customerName")}
                  disabled={isFormSubmitting}
                />
                <ErrorMessage>{errors.customerName?.message}</ErrorMessage>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer Email Id
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-findmyleather focus:border-findmyleather block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-findmyleather dark:focus:border-findmyleather"
                  placeholder="Customer Email Id"
                  required
                  {...register("customerEmail")}
                  disabled={isFormSubmitting}
                />
                <ErrorMessage>{errors.customerEmail?.message}</ErrorMessage>
              </div>
            </div>
            <button
              type="submit"
              disabled={isFormSubmitting}
              className="text-white inline-flex items-center border border-findmyleather bg-findmyleather transition hover:bg-opacity-90 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isFormSubmitting ? (
                <>
                  <Spinner />
                  Adding New Customer
                </>
              ) : (
                <>
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add New Customer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCustomerForm;
