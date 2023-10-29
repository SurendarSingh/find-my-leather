import React from "react";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import OrderTabs from "./OrderTabs";
import ErrorPage from "./ErrorPage";

const OrderPage = async () => {
  const userOrderDetails = await FetchOrderDetails();

  if (!userOrderDetails.success || userOrderDetails.data == undefined) {
    return <ErrorPage message={userOrderDetails.error} />;
  }

  return <OrderTabs userOrderDetails={userOrderDetails.data} />;
};

export default OrderPage;
