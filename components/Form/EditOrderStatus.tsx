"use client";

import { DefaultOrderStatus } from '@/lib/order/DefaultOrderValues'
import { OrderSchema, OrderStatusType, OrderType, orderStatusSchema } from '@/lib/order/OrderZodSchema';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import getErrorMessage from '@/lib/getErrorMessage';
import { UpdateOrderStatus } from '@/serverAction/UpdateOrderStatus';
import { UpdateOrderStatusDate } from '@/serverAction/UpdateOrderStatusDate';
const EditOrderStatus = ({
    EditForm,
    setEditForm,
    orderItem }: any) => {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<OrderStatusType>({
        resolver: zodResolver(orderStatusSchema),
    });

    useEffect(() => {
        if (orderItem[0]) {
            setValue("orderId", orderItem[0]?.orderId)
            setValue("orderStatus", orderItem[0]?.orderStatus)
        }
    },[orderItem[0]])

    
  const orderId = watch("orderId");
  const orderStatus = watch("orderStatus");

  const handleSelectChange = (
    event: any,
    key:any // 1 based index
    ) => {
        if (orderId && key) {
            handleEdit( orderId, new Date(), key, orderStatus);    
        }
        
  };

  const handleEdit = async (orderId: string, selectedDate: Date,  idx: number, orderStatus: string) => {
    
    const arr = [ "supplierMatching", "sampleRequest","sampling","sampleApproval","production","qualityControl","packing","shipped"];

    const field = `trackingStatus.${arr[idx-1]}`; // 0 bases index
    
    const response = await UpdateOrderStatusDate(orderId, selectedDate,  field, orderStatus, idx);
    
  };

    const onSubmit: SubmitHandler<OrderStatusType> = async (data) => {

        try {
            const res = await UpdateOrderStatus(data);
            if (!res) {
                toast.warn("Something went wrong, Please try again later!");
            } else if (res.error) {

                toast.error(res.error);
            } else if (res.success) {
                toast.success(res.message);
                reset();
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            reset();
            setEditForm(false)
        }
    };
    return (
        <div>
            <div
                tabIndex={-1}
                aria-hidden="true"
                className={`${EditForm ? "flex" : "hidden"
                    } bg-gray-900/50 dark:bg-gray-900/80 inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-10 w-full max-w-4xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 mt-15">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 sticky top-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                                Edit Payment Form
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setEditForm(false)}
                            // disabled={isFormSubmitting}
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
                        <form className="p-4 md:p-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Order ID <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="string"
                                        disabled
                                        {...register("orderId")}
                                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                    />
                                </div>
                                <div className="w-full w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Order Status <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                        defaultValue={""}
                                        {...register("orderStatus")}
                                        onChange={(event) => handleSelectChange(event, event.target.selectedIndex)}
                                    >
                                        <option value={orderItem?.orderStatus} disabled hidden>
                                            Choose Order Status
                                        </option>
                                        {DefaultOrderStatus.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center mt-10 gap-10">
                                <button
                                    className="text-white inline-flex items-center border  transition hover:bg-form-strokedark focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-7.5 py-2.5 text-center"
                                    onClick={() => setEditForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center border border-findmyleather bg-findmyleather transition hover:bg-opacity-90 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-7.5 py-2.5 text-center"
                                >
                                    Update
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrderStatus