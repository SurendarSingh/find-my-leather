"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Order } from "@/types/orderType";
import { stat } from "fs";
import { orderStatus } from "@/lib/order/DefaultOrderValues";
import PopupModel from "../PopUpModel/popUpModel";
import PopForm from "../PopForm/PopForm";

const PaymentTable = ({ UserOrderDetails, UserPaymentDetails }: any) => {

  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData(UserPaymentDetails);
  }, []);

  const [isOpen, setisOpen] = useState(false);
  const [popUpData, setPopUpData] = useState();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Number
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Date
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total Invoice Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date Of Shipment
              </th>
              <th scope="col" className="px-6 py-3">
                Total Paid Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Total Due Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Mode Of Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((payment: any) => (
              <>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {payment.orderId}
                  </th>
                  <td className="px-6 py-4">
                    {payment.article}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.invoiceDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {payment.invoiceQuantity}
                  </td>
                  <td className="px-6 py-4">
                    {payment.totalInvoiceAmount}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.dateOfShipment).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {payment.totalPaidAmount}
                  </td>
                  <td className="px-6 py-4">
                    {payment.totalDueAmount}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {payment.modeOfPayment}
                  </td>
                  <td className="px-6 py-4">
                    {payment.paymentStatus}
                  </td>
                  <td className="px-6 py-4 sticky right-0 bg-white shadow-body" >
                    <button onClick={(e) => {
                      setPopUpData(payment)
                      setisOpen(prev => !prev)
                    }}> Edit </button>
                  </td>
                </tr>

              </>
            ))}

          </tbody>
        </table>

        {popUpData && <PopupModel  visible={isOpen} setVisible={setisOpen}>
          <PopForm data={popUpData}/>
        </PopupModel>}
      </div>
    </>
  )
};

export default PaymentTable;