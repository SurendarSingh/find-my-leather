import React from "react";
import { authOptions } from "@/lib/NextAuthOption";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderTabs from "./OrderTabs";
import getErrorMessage from "@/lib/getErrorMessage";
// import { toast } from "react-toastify";

const OrderPage = async () => {
  async function getOrderDetails() {
    try {
      const session = await getServerSession(authOptions);

      const userEmail = session?.user?.email;

      const fetchedOrderDetails = await FetchOrderDetails(userEmail);

      if (fetchedOrderDetails.error) {
        // toast.error(fetchedOrderDetails.error);
        redirect("/");
      }

      if (fetchedOrderDetails.success) {
        return fetchedOrderDetails.data;
      }
    } catch (error) {
      console.log(getErrorMessage(error));
    }
    return null;
  }

  const userOrderDetails = await getOrderDetails();

  if (!userOrderDetails) {
    // toast.error("Something went wrong, Please try again later!");
    redirect("/");
  }

  return <OrderTabs userOrderDetails={userOrderDetails} />;
};

export default OrderPage;
