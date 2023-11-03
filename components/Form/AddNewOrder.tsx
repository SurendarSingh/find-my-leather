"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getErrorMessage from "@/lib/getErrorMessage";
import { toast } from "react-toastify";
import { GenerateOrderId } from "@/serverAction/GenerateOrderId";
import { OrderSchema, OrderType } from "@/lib/order/OrderZodSchema";

const AddNewOrderForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });

  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [isOrderIdGenerated, setIsOrderIdGenerated] = useState(false);

  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    setIsFormEnabled(false);

    try {
      const res: any = null;

      if (!res) {
        toast.warn("Something went wrong, Please try again later!");
      } else if (res.error) {
        toast.error("Invalid Email or Password!");
      } else if (res.ok) {
        toast.success("You're LoggedIn!");
        router.push("/");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      reset();
      setIsFormEnabled(true);
    }
  };

  const handleGenerateOrderId = async () => {
    setIsOrderIdGenerated(true);
    try {
      const newOrderId = await GenerateOrderId();

      if (newOrderId && newOrderId.data) {
        setValue("orderId", newOrderId.data);
        toast.success(`Order ID Generated: ${newOrderId.data}`);
        setIsFormEnabled(true);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsOrderIdGenerated(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          New Order Form
        </h3>
      </div>
      <form>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Order ID <span className="text-meta-1">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Generate Order ID"
                  disabled
                  {...register("orderId")}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input"
                />
                <button
                  className="inline-flex items-center justify-center gap-3.5 cursor-pointer rounded-md bg-findmyleather py-3 px-4 text-center font-medium text-white transition hover:bg-opacity-90 disabled:bg-bodydark lg:px-8 xl:px-10"
                  type="button"
                  onClick={() => {
                    handleGenerateOrderId();
                  }}
                  disabled={isFormEnabled && isOrderIdGenerated}
                >
                  {isOrderIdGenerated ? (
                    <>
                      Generating
                      <Spinner />
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Last name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                disabled={!isFormEnabled}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                First name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                disabled={!isFormEnabled}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Last name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                disabled={!isFormEnabled}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Subject
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                disabled={!isFormEnabled}
              >
                <option value="">Type your subject</option>
                <option value="">USA</option>
                <option value="">UK</option>
                <option value="">Canada</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="flex w-1/2 items-center justify-center rounded gap-3.5 cursor-pointer bg-findmyleather p-3 font-medium text-white transition hover:bg-opacity-90 disabled:bg-bodydark"
              disabled={!isFormEnabled}
              type="submit"
            >
              {isOrderIdGenerated ? (
                <>
                  Adding New Order
                  <Spinner />
                </>
              ) : (
                "Add New Order"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewOrderForm;
