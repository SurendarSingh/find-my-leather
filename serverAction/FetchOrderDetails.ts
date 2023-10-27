"use server";

import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/UserModel";
import getErrorMessage from "@/lib/getErrorMessage";

export async function FetchOrderDetails(userId: string | null | undefined) {
  try {
    if (!userId) {
      return { success: false, error: "User Details not found" };
    }

    // await connectMongoDB();

    // const userOrderDetails = await UserModel.find()

    // Sample order details
    const userOrderDetails = [
      {
        name: "Leather 1",
        price: 0.0,
        invoiceDate: `Jan 13,2023`,
        status: "Unpaid",
        orderStatus: "order-draft",
      },
      {
        name: "Leather 2",
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: "Paid",
        orderStatus: "running",
      },
      {
        name: "Leather 3",
        price: 99.0,
        invoiceDate: `Jan 13,2023`,
        status: "Paid",
        orderStatus: "shipped",
      },
      {
        name: "Leather 4",
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: "Paid",
        orderStatus: "completed",
      },
      {
        name: "Leather 5",
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: "Unpaid",
        orderStatus: "cancelled",
      },
    ];

    // Group the order details by order status
    const groupedOrders = userOrderDetails.reduce((acc: any, order) => {
      const orderStatus = order.orderStatus;
      if (!acc[orderStatus]) {
        acc[orderStatus] = [];
      }
      acc[orderStatus].push(order);
      return acc;
    }, {});

    return {
      success: true,
      data: groupedOrders,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
      message: getErrorMessage(error),
    };
  }
}