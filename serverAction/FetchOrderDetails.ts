"use server";

import { connectMongoDB } from "@/lib/MongoDB";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import OrderModel from "@/lib/order/OrderModel";
import { OrderType } from "@/lib/order/OrderZodSchema";
import { DefaultOrderDetailsFields } from "@/lib/order/DefaultOrderValues";

const sampleOrderData: OrderType[] = [];

export async function FetchOrderDetails() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }

    if (session.user?.role === "seller") {
      DefaultOrderDetailsFields.push("customerId");
    }

    if (session.user?.role === "customer") {
      DefaultOrderDetailsFields.push("sellerId");
    }

    const DefaultOrderDetailsFieldsString = DefaultOrderDetailsFields.join(" ");

    await connectMongoDB();

    let userOrderDetails;

    if (session.user?.role === "seller") {
      userOrderDetails = await OrderModel.find(
        {
          sellerId: session.user.id,
        },
        DefaultOrderDetailsFieldsString
      )
        .populate("customerId", "name email _id")
        .exec();
    } else if (session.user?.role === "customer") {
      userOrderDetails = await OrderModel.find(
        { customerId: session.user.id },
        DefaultOrderDetailsFieldsString
      )
        .populate("sellerId", "name email _id")
        .exec();
    } else {
      userOrderDetails = sampleOrderData;
    }

    return {
      success: true,
      data: JSON.stringify(userOrderDetails),
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
