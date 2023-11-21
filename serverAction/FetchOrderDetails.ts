"use server";

import { connectMongoDB } from "@/lib/MongoDB";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import OrderModel from "@/lib/order/OrderModel";
import { OrderType } from "@/lib/order/OrderZodSchema";
import { orderDetailsFields } from "@/lib/order/DefaultOrderValues";

const sampleOrderData: OrderType[] = [];

export async function FetchOrderDetails() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }

    if (session.user?.role === "seller") {
      orderDetailsFields.push("customerId");
    }

    if (session.user?.role === "customer") {
      orderDetailsFields.push("sellerId");
    }

    const orderDetailsFieldsString = orderDetailsFields.join(" ");

    await connectMongoDB();

    let userOrderDetails;

    if (session.user?.role === "seller") {
      userOrderDetails = await OrderModel.find(
        {
          sellerId: session.user.id,
        },
        orderDetailsFieldsString
      )
        .populate("customerId", "name email -_id")
        .exec();
    } else if (session.user?.role === "customer") {
      userOrderDetails = await OrderModel.find(
        { customerId: session.user.id },
        orderDetailsFieldsString
      )
        .populate("sellerId", "name email -_id")
        .exec();
    } else {
      userOrderDetails = sampleOrderData;
    }

    userOrderDetails = sampleOrderData;

    // Group the order details by order status
    const groupedOrders = userOrderDetails.reduce((acc, order) => {
      const orderStatus = order.orderStatus;
      if (!acc[orderStatus]) {
        acc[orderStatus] = [];
      }
      acc[orderStatus].push(order);
      return acc;
    }, {} as { [orderStatus: string]: OrderType[] });

    return {
      success: true,
      data: groupedOrders,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
