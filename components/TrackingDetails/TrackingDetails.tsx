"use client"
import { DefaultOrderStatus } from '@/lib/order/DefaultOrderValues'
import React, { useState } from 'react'
import ProgressSteps from '../Stepper'
import { useSession } from 'next-auth/react'

const TrackingDetails = ({ customerList, userOrderDetails }: any) => {

  const [progressData, setProgressData] = useState<any[]>([userOrderDetails[0]]);
  


  // const handleSearchChange = (event: any) => {
  //   setSearchTerm(event.target.value);
  // };
  const { data: session } = useSession();
  const data = userOrderDetails ? userOrderDetails : []

  const handleOrderStatusOnChange = (e: any) => {
    const arr = data.filter((item: any) => item?.orderId.toString() === e.target.value);
    setProgressData(arr)
  }

  const handleCustomerOnChange = (e: any) => {
    const arr = data.filter((item: any) => item?.customerId._id === e.target.value);
    setProgressData(arr)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionEnabled, setSuggestionEnabled] = useState(false);
  const filteredOrders = userOrderDetails.filter((order: any) => order.orderId.startsWith(searchTerm));
  return (

    <div>
      <div className="flex py-2 justify-between">
        <div className="dropdown flex gap-5">
          <div className="flex flex-col">
            <span className="text-lg font-medium text-findmyleather ">Order Id</span>
            <select
              onChange={handleOrderStatusOnChange}
              name="orderStatusDropDown"
              className="p-2 bg-white dark:bg-gray-700 rounded-md"
            >

              {userOrderDetails.map((order: any) => (
                <option value={order.orderId} key={order.orderId}>
                  {order.orderId}
                </option>
              ))}
            </select>
          </div>

          {session?.user?.role === "seller" && (
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
                {customerList.map((customer: any) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        <div className="flex flex-col ">
          <span className="text-lg font-medium text-findmyleather">Search</span>
          <form className="flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                placeholder="Search Order...."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-findmyleather block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Order...."
                required
                value={searchTerm}
                onChange={event => {
                  setSearchTerm(event.target.value);
                  setSuggestionEnabled(true);
                }}
              />
              {
                (suggestionEnabled && searchTerm)&& (
                  <div className='absolute z-10 bg-gray-600 text-white w-full items-center text-center mt-2 rounded-xl p-2'>
                    {filteredOrders.map((order: any) => (
                      <option
                        value={order.orderId}
                        key={order.orderId}
                        className='hover:text-black cursor-pointer hover:bg-stroke hover:rounded-sm'
                        onClick={() => {
                          setProgressData([order]);
                          setSearchTerm(order.orderId);
                          setSuggestionEnabled(false);
                        }}
                      >
                        {order.orderId}
                      </option>
                    ))}
                  </div>
                )
              }

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
      {
        progressData && progressData.length > 0 ? (
          <div className="text-center rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
            {progressData &&
              <ProgressSteps
                data={progressData}
              />
            }
          </div>
        ) : (
          <div className="text-center rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 mt-10">
            <span> No Order is Created </span>
          </div>
        )
      }
    </div>
  )
}

export default TrackingDetails