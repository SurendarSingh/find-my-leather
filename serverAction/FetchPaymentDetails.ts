import { connectMongoDB } from "@/lib/MongoDB";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import { paymentDetailsFields as defaultPaymentDetailsFields } from "@/lib/payment/DefaultPaymentValues"; 
import { PaymentType } from "@/lib/order/OrderZodSchema";
import OrderModel from "@/lib/order/OrderModel";

const samplePaymentData: PaymentType[] = []; 

export async function FetchPaymentDetails() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }
    
    // Create a new array for paymentDetailsFields to avoid mutation
    const paymentDetailsFields = [...defaultPaymentDetailsFields];

    if (session.user?.role === "seller") {
      paymentDetailsFields.push("sellerId");
    }

    if (session.user?.role === "customer") {
      paymentDetailsFields.push("customerId");
    }

    const paymentDetailsFieldsString = paymentDetailsFields.join(" ");
    
    await connectMongoDB();
    
    let userPaymentDetails;

    if (session.user?.role === "seller") {
      userPaymentDetails = await OrderModel.find(
        {
          sellerId: session.user.id,
        },
        paymentDetailsFieldsString
      )
        .exec();
    } else if (session.user?.role === "customer") {
      userPaymentDetails = await OrderModel.find(
        { customerId: session.user.id },
        paymentDetailsFieldsString
      )
        .exec();
    } else {
      userPaymentDetails = samplePaymentData;
    }
    
    return {
      success: true,
      data: userPaymentDetails,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
