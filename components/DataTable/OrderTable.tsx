"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Order } from "@/types/orderType";
import { stat } from "fs";
import { orderStatus } from "@/lib/order/DefaultOrderValues";

const OrderTable = ({
  UserOrderDetails,
}: any) => {
  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData(UserOrderDetails);
  }, []);
  if (UserOrderDetails !== undefined && tableData !== undefined) {
    const handleOnChange = (e: any) => {
      if (e.target.value === "all") {
        setTableData(UserOrderDetails);
      } else {
        setTableData(UserOrderDetails.filter((order: any) => order.orderStatus === e.target.value));
      }
    }
    return (
      <>
        <div className="py-2">
          <select onChange={handleOnChange} className="p-2 bg-white dark:bg-gray-700 rounded-md">
            <option defaultChecked value="all">All</option>
            {orderStatus.map((status: any) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  orderId
                </th>
                <th scope="col" className="px-6 py-3">
                  rfq
                </th>
                <th scope="col" className="px-6 py-3">
                  Article
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Thickness
                </th>
                <th scope="col" className="px-6 py-3">
                  Selection
                </th>
                <th scope="col" className="px-6 py-3">
                  Estimated
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipping Terms
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipping Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3">
                  Compliance Certificate
                </th>
                <th scope="col" className="px-6 py-3">
                  Special Requirement
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer's Price/Sq.feet
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity (Sq.feet)
                </th>
                <th scope="col" className="px-6 py-3">
                  Expected Delivery Date
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((order: any) => (
                <>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.orderId}
                    </th>
                    <td className="px-6 py-4">
                      {new Date(order.rfqDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.article}
                    </td>
                    <td className="px-6 py-4">
                      {order.colour}
                    </td>
                    <td className="px-6 py-4">
                      {order.size}
                    </td>
                    <td className="px-6 py-4">
                      {order.thickness}
                    </td>
                    <td className="px-6 py-4">
                      {order.selection}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.estimated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.shippingTerms}
                    </td>
                    <td className="px-6 py-4">
                      {order.shippingMethod}
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentTerms}
                    </td>
                    <td className="px-6 py-4">
                      {order.complianceCertificates}
                    </td>
                    <td className="px-6 py-4">
                      {order.specialRequirement}
                    </td>
                    <td className="px-6 py-4">
                      {order.pricePerSqFt}
                    </td>
                    <td className="px-6 py-4">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                    </td>
                  </tr>
                </>
              ))}

            </tbody>
          </table>
        </div>
      </>
    )
  }
};

export default OrderTable;