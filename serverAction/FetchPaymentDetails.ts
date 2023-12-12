import { connectMongoDB } from "@/lib/MongoDB";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import PaymentModel from "@/lib/payment/PaymentModel";
import { PaymentType } from "@/lib/payment/PaymentZodSchema"; // Assuming you have a Zod schema for payment details
import { paymentDetailsFields as defaultPaymentDetailsFields } from "@/lib/payment/DefaultPaymentValues"; // Assuming default payment fields

const samplePaymentData: PaymentType[] = []; // Assuming PaymentType is defined as per your schema

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
      userPaymentDetails = await PaymentModel.find(
        {
          sellerId: session.user.id,
        },
        paymentDetailsFieldsString
      )
        .exec();
    } else if (session.user?.role === "customer") {
      userPaymentDetails = await PaymentModel.find(
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
