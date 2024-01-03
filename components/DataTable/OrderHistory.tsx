"use client"
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import EditOrderHistory from '../Form/EditOrderHistory'

const OrderHistory = ({ UserOrderDetails }: any) => {
  const [tableData, settableData] = useState(UserOrderDetails)
  const [editForm, setEditForm] = useState(false)
  const [orderItem, setOrderItem] = useState()

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              orderID
            </th>
            <th scope="col" className="px-6 py-3">
              Article
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity (Sq.feet)
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Order Status
            </th>
            <th scope="col" className="px-6 py-3">
              Shipment Date
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3">
              Turn Around Time (TAT)
            </th>
            <th scope="col" className="px-6 py-3">
              Remarks
            </th>
            <th scope="col" className="px-1 py-3 sticky right-0  bg-gray-200 dark:bg-gray-100 dark:text-gray-400">
                  Action
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData?.map((order: any) => (
            <>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {
                  order.paymentStatus === "Paid" && (
                    <>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order?.orderId}
                      </th>
                      <td className="px-6 py-4">
                        {order?.article}
                      </td>
                      <td className="px-6 py-4">
                        {order?.quantity}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order?.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {order?.orderStatus}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order?.estimatedShipmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {order?.paymentStatus}
                      </td>
                      <td className="px-6 py-4">

                      </td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 sticky right-0 bg-gray-200 dark:bg-gray-100" >
                        <button onClick={(key: any) => {
                          setEditForm(true)
                          setOrderItem(order)
                        }}> <FaEdit /> </button>
                      </td>
                    </>
                  )
                }
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {/* <EditOrderHistory
        setEditForm={setEditForm}
        orderItem={orderItem}
      />   */}
    </div>
  )
}

export default OrderHistory