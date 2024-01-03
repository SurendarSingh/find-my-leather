"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Order } from "@/types/orderType";
import { stat } from "fs";
import { DefaultOrderStatus } from "@/lib/order/DefaultOrderValues";
import PopupModel from "../PopUpModel/popUpModel";

import EditPaymentForm from "../Form/EditPaymentForm";
import { FaEdit } from "react-icons/fa";
import { CustomerList } from "@/types/CustomerListType";
import { useSession } from "next-auth/react";

const PaymentTable = ({
  UserPaymentDetails,
  customerList
}: {
  UserPaymentDetails: any,
  customerList: CustomerList[];
}) => {


  const [orderItem, setOrderItem] = useState();

  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData(UserPaymentDetails);
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session, status } = useSession();
  console.log("role:", session?.user?.role);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderStatusOnChange = (e: any) => {
    if (e.target.value === "all") {
      setTableData(UserPaymentDetails);
    } else {
      setTableData(UserPaymentDetails.filter((order: any) => order.orderStatus === e.target.value));
    }
  }

  const handleCustomerOnChange = (e: any) => {
    if (e.target.value == "all") {
      setTableData(UserPaymentDetails);
    } else {
      setTableData(UserPaymentDetails.filter((payment: any) => payment?.customerId === e.target.value))
    }
  }

  const [addPaymentForm, setAddPaymentForm] = useState(false)

  return (
    <>
      {session?.user?.role === "seller" && (
        <div className="flex py-2 justify-between">
          <div className="dropdown flex gap-5">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-findmyleather ">Order Status</span>
              <select
                onChange={handleOrderStatusOnChange}
                name="orderStatusDropDown"
                className="p-2 bg-white dark:bg-gray-700 rounded-md"
              >
                <option defaultChecked value="all">All</option>
                {DefaultOrderStatus.map((status: any) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-medium text-findmyleather ">Customer Name</span>
              <select
                onChange={handleCustomerOnChange}
                className="p-2 bg-white dark:bg-gray-700 rounded-md"
                defaultValue={""}
              >
                <option defaultChecked value="all">
                  All
                </option>
                {customerList.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col ">
            <span className="text-lg font-medium text-findmyleather">Search</span>
            <form className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-findmyleather block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Order...."
                  required
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-findmyleather rounded-lg border border-green-700 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-findmyleather dark:hover:bg-green-400 dark:focus:ring-green-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
      )

      }


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
              {session?.user?.role == "seller" && (
                <th scope="col" className="px-1 py-3 sticky right-0  bg-gray-200 dark:bg-gray-100 dark:text-gray-400">
                  Action
                </th>
              )
              }

            </tr>
          </thead>
          <tbody>
            {tableData?.filter(item => item.orderId.includes(searchTerm)).map((order: any) => (
              <>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.orderId}
                  </th>
                  <td className="px-6 py-4">
                    {order.article}
                  </td>
                  <td className="px-6 py-4">
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.invoiceNumber ? order.invoiceNumber : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {order.invoiceDate ? new Date(order.invoiceDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4">
                    {order.totalOrderValue}
                  </td>
                  <td className="px-6 py-4">
                    {order.estimatedShipmentDate ? new Date(order.estimatedShipmentDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.totalPaidAmount ? order.totalPaidAmount : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {order.totalPaidAmount ? order.totalOrderValue - order.totalPaidAmount : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {order.paymentDueDate ? new Date(order.paymentDueDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.modeOfPayment ? order.modeOfPayment : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {order.paymentStatus ? order.paymentStatus : "-"}
                  </td>
                  {
                    session?.user?.role === "seller" && (
                      <td className="px-6 py-4 sticky right-0 bg-gray-200 dark:bg-gray-100" >
                        <button onClick={(key: any) => {
                          setAddPaymentForm(true)
                          setOrderItem(order)
                        }}> <FaEdit /> </button>
                      </td>
                    )
                  }
                </tr>
              </>
            ))}

            <EditPaymentForm
              addPaymentForm={addPaymentForm}
              setAddPaymentForm={setAddPaymentForm}
              orderItem={orderItem}
            >
            </EditPaymentForm>
          </tbody>
        </table>
      </div>
    </>
  )
};

export default PaymentTable;