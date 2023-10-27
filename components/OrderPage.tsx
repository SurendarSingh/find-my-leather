import React from "react";
import { authOptions } from "@/lib/NextAuthOption";
import getErrorMessage from "@/lib/getErrorMessage";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ErrorAlert } from "./Alert/Alerts";
import OrderTabs from "./OrderTabs";

const OrderPage = async () => {
  async function getOrderDetails() {
    try {
      const session = await getServerSession(authOptions);

      const userEmail = session?.user?.email;

      const fetchedOrderDetails = await FetchOrderDetails(userEmail);

      if (fetchedOrderDetails.success) {
        return fetchedOrderDetails.data;
      }

      redirect("/");
    } catch (error) {
      ErrorAlert({
        title: "Something went wrong",
        message: getErrorMessage(error),
      });
      redirect("/");
    }
  }

  const userOrderDetails = await getOrderDetails();

  return <OrderTabs userOrderDetails={userOrderDetails} />;
};

export default OrderPage;
