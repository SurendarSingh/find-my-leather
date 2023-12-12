import { connectMongoDB } from "@/lib/MongoDB";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import OrderModel from "@/lib/order/OrderModel";
import { OrderType } from "@/lib/order/OrderZodSchema";
import { orderDetailsFields as defaultOrderDetailsFields } from "@/lib/order/DefaultOrderValues";

const sampleOrderData: OrderType[] = [];

export async function FetchOrderDetails() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }
    
    // Create a new array for orderDetailsFields to avoid mutation
    const orderDetailsFields = [...defaultOrderDetailsFields];

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
        .exec();
    } else if (session.user?.role === "customer") {
      userOrderDetails = await OrderModel.find(
        { customerId: session.user.id },
        orderDetailsFieldsString
      )
        .exec();
    } else {
      userOrderDetails = sampleOrderData;
    }
    
    return {
      success: true,
      data: userOrderDetails,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
