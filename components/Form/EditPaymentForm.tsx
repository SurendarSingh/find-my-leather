"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { InviteNewCustomer } from "@/serverAction/InviteNewCustomer";
import getErrorMessage from "@/lib/getErrorMessage";
import {
    InviteCustomerSchema,
    InviteCustomerType,
} from "@/lib/user/UserSchema";
import { OrderSchema, OrderType, PaymentType, paymentSchema } from "@/lib/order/OrderZodSchema";
import { complianceCertificates, DefaultOrderStatus, paymentTerms, selection, shippingMethod, shippingTerms } from "@/lib/order/DefaultOrderValues";
import { UpdateOrder } from "@/serverAction/UpdateOrderDocument";
import { UpdatePayment } from "@/serverAction/UpdatePayment";
import { modeOfPayment, paymentStatus } from "@/lib/payment/DefaultPaymentValues";
import moment from "moment";

const EditPaymentForm = ({
    addPaymentForm,
    setAddPaymentForm,
    orderItem
}: {
    addPaymentForm: boolean;
    setAddPaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
    orderItem: PaymentType
}) => {
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PaymentType>({
        resolver: zodResolver(paymentSchema),
    });

    console.log("err", errors);
    

useEffect(() => {
    if (orderItem) {
        setValue("orderId", orderItem?.orderId);
        setValue("article", orderItem?.article)
        setValue("invoiceQuantity", orderItem?.quantity)
        setValue("totalInvoiceAmount", orderItem?.totalOrderValue)
        setValue("estimatedShipmentDate", orderItem?.estimatedShipmentDate)
        setValue("expectedDeliveryDate", orderItem?.expectedDeliveryDate.toISOString().substring(0, 10))
        setValue("orderStatus", orderItem?.orderStatus)
        setValue("pricePerSqFt", orderItem?.pricePerSqFt)
        setValue("quantity", orderItem?.quantity)
        setValue("totalOrderValue", orderItem?.totalOrderValue)
        setValue("invoiceNumber", orderItem?.invoiceNumber)
        if(orderItem?.invoiceDate) {setValue("invoiceDate", orderItem?.invoiceDate.toISOString().substring(0, 10))}
        if(orderItem?.paymentDueDate) {setValue("paymentDueDate", orderItem?.paymentDueDate.toISOString().substring(0, 10))}
        setValue("totalPaidAmount", orderItem?.totalPaidAmount)
        setValue("modeOfPayment", orderItem?.modeOfPayment)
        setValue("paymentStatus", orderItem?.paymentStatus)
    }
}, [orderItem])
    
    const onSubmit: SubmitHandler<PaymentType> = async (data) => {

        try {
            const res = await UpdatePayment(data);
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
        } finally{
            reset();
            setAddPaymentForm(false)
        } 
    };

    return (
        <div
            tabIndex={-1}
            aria-hidden="true"
            className={`${addPaymentForm ? "flex" : "hidden"
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
                            onClick={() => setAddPaymentForm(false)}
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
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Article <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Product Name"
                                    disabled
                                    {...register("article")}
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Expected Delivery Date <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    className="w-full rounded border-2 border-st roke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                    placeholder="Enter Expected Delivery Date"  
                                    {...register("expectedDeliveryDate")}
                                    disabled
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Order Status <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                    defaultValue={""}
                                    {...register("orderStatus")}
                                    disabled
                                >
                                    <option value="" disabled hidden>
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

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Price Per Sq.feet <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter your Price"
                                    {...register("pricePerSqFt")}
                                    disabled
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Total Order Value <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("totalOrderValue")}
                                    disabled
                                    placeholder="Enter Total Order Value"
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Invoice Number <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("invoiceNumber")}
                                    placeholder="Enter your Invoice Number"
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                                <ErrorMessage>{errors.invoiceNumber?.message}</ErrorMessage>
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Invoice Date <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("invoiceDate", {
                                        valueAsDate: true,
                                    })}
                                    placeholder="Enter Invoice Date"
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Total Paid Amount <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("totalPaidAmount", {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Enter your Total Paid Amount"
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                                <ErrorMessage>{errors.totalPaidAmount?.message}</ErrorMessage>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Due Date <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register("paymentDueDate", {
                                        valueAsDate: true,
                                      })}
                                      defaultValue={""}
                                    placeholder="Enter Due Date"
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                />
                                <ErrorMessage>{errors.paymentDueDate?.message}</ErrorMessage>
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Mode Of Payment <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                    defaultValue={""}
                                    {...register("modeOfPayment")}
                                >
                                    <option value="" disabled hidden>
                                        Choose Mode of Payment
                                    </option>
                                    {modeOfPayment.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                    <ErrorMessage>{errors.modeOfPayment?.message}</ErrorMessage>
                                </select>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Payment Status <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                    defaultValue={""}
                                    {...register("paymentStatus")}
                                >
                                    <option value="" disabled hidden>
                                        Choose Payment Status
                                    </option>
                                    {paymentStatus.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                    <ErrorMessage>{errors.paymentStatus?.message}</ErrorMessage>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-center mt-10 gap-10">
                            <button
                                className="text-white inline-flex items-center border  transition hover:bg-form-strokedark focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-7.5 py-2.5 text-center"
                                onClick={() => setAddPaymentForm(false)}
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
    );
};

export default EditPaymentForm;
