"use client";

import getErrorMessage from '@/lib/getErrorMessage';
import { paymentStatus } from '@/lib/payment/DefaultPaymentValues';
import { PaymentSchema, PaymentType } from '@/lib/payment/PaymentZodSchema';
import { AddNewPayment } from '@/serverAction/AddNewPayment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const AddNewPaymentForm = ({ UserOrderDetails, sellerId }: any) => {

    const [userOrderData, setUserOrderData] = useState(UserOrderDetails);
    const [payment, setpayment] = useState({
        orderId: "",
        article: "",
        orderDate: "",
        invoiceNumber: "",
        invoiceDate: "",
        invoiceQuantity: "",
        totalInvoiceAmount: "",
        dateOfShipment: "",
        totalPaidAmount: "",
        totalDueAmount: "",
        dueDate: "",
        modeOfPayment: "",
        paymentStatus: "",
    })
    const {
        reset,
        formState: { errors },
      } = useForm<PaymentType>({
        resolver: zodResolver(PaymentSchema),
      });
    useEffect(() => {
        
    },[]);
    const initialValues = {
        orderId: "",
        article: "",
        orderDate: "",
        invoiceNumber: "",
        invoiceDate: "",
        invoiceQuantity: "",
        totalInvoiceAmount: "",
        dateOfShipment: "",
        totalPaidAmount: "",
        totalDueAmount: "",
        dueDate: "",
        modeOfPayment: "",
        paymentStatus: "",
        
    };
    const handleIdChange = (event: any) => {
        setpayment(userOrderData.filter((item: any) => item.orderId == event.target.value)[0])
    }
    
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        New Payment Form
                    </h3>
                </div>
                <Formik
                    // enableReinitialize
                    initialValues={initialValues}
                    onSubmit={async (values: any, {resetForm}) => {
                        try {     
                            const newData = {sellerId, ...values};
                            const res = await AddNewPayment(newData);
                            if (!res) {
                                toast.warn("Something went wrong, Please try again later!");
                            } else if (res.error) {
                                toast.error(res.error);
                            } else if (res.success) {
                                resetForm();
                                toast.success(res.message);
                            }   
                        } catch (error) {
                            toast.error(getErrorMessage(error));
                        }
                    }}
                >
                    {({ handleSubmit, handleChange, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row items-center">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Order ID <span className="text-meta-1">*</span>
                                            </label>
                                            <select name='orderId' onChange={(event) => {
                                                handleChange(event);
                                                handleIdChange(event)
                                            }} className="p-2 bg-white dark:bg-gray-700 rounded-md font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather">
                                                <option defaultChecked value="all">Select</option>
                                                {userOrderData.map((order: any, index: any) => (
                                                    <option key={index}>
                                                        {order.orderId}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Article <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='article'
                                                    onChange={handleChange}
                                                    value={values.article}
                                                    type="text"
                                                    placeholder="Enter Article"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Order Date <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='orderDate'
                                                    onChange={handleChange}
                                                    value={values.orderDate}
                                                    type="date"
                                                    step="0.01"
                                                    placeholder="Enter Size"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Invoice No. <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='invoiceNumber'
                                                    onChange={handleChange}
                                                    value={values.invoiceNumber}
                                                    type="text"
                                                    placeholder="Enter Invoice No."
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Invoice Date <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='invoiceDate'
                                                    onChange={handleChange}
                                                    value={values.invoiceDate}
                                                    type="date"
                                                    step="0.01"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Invoice Quantity <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='invoiceQuantity'
                                                    onChange={handleChange}
                                                    value={values.invoiceQuantity}
                                                    type="text"
                                                    placeholder="Enter Invoice Quantity"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Total Invoice Amount <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='totalInvoiceAmount'
                                                    onChange={handleChange}
                                                    value={values.totalInvoiceAmount}
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter Total Invoice Amount"

                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Date of Shipment <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='dateOfShipment'
                                                    onChange={handleChange}
                                                    value={values.dateOfShipment}
                                                    type="date"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Total Paid Amount<span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='totalPaidAmount'
                                                    onChange={handleChange}
                                                    value={values.totalPaidAmount}
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter Total Paid Amount"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Total Due Amount <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='totalDueAmount'
                                                    onChange={handleChange}
                                                    value={values.totalDueAmount}
                                                    type="text"
                                                    placeholder="Enter Total Due Amount"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Due Date <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='dueDate'
                                                    onChange={handleChange}
                                                    value={values.dueDate}
                                                    type="date"
                                                    step="0.01"
                                                    placeholder="Enter Due Date "
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Mode of Payment <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    name='modeOfPayment'
                                                    onChange={handleChange}
                                                    value={values.modeOfPayment}
                                                    type="text"
                                                    placeholder="Enter Mode of Payment"
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                />
                                            </div>

                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Payment Status <span className="text-meta-1">*</span>
                                                </label>
                                                <select
                                                    name='paymentStatus'
                                                    onChange={handleChange}
                                                    value={values.paymentStatus}
                                                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                                                    // disabled={!isFormEnabled}
                                                    defaultValue={""}
                                                // {...register("orderStatus")}
                                                >
                                                    <option value="" disabled hidden>
                                                        Choose Payment Status
                                                    </option>
                                                    {paymentStatus.map((item) => (
                                                        <option key={item} value={item}>
                                                            {item}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center">
                                            <button
                                                className="flex w-full md:w-1/2 items-center justify-center rounded gap-3.5 cursor-pointer bg-findmyleather p-3 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-default disabled:text-body disabled:bg-whiter dark:disabled:bg-strokedark"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </>
    )
}

export default AddNewPaymentForm;