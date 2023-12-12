"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";
import UserModel from "@/lib/user/UserModel";
import { revalidatePath } from "next/cache";
import {
  InviteCustomerSchema,
  InviteCustomerType,
} from "@/lib/user/UserSchema";

export async function InviteNewCustomer(data: InviteCustomerType) {
  const result = InviteCustomerSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error.format()) };
  }

  const { customerEmail, customerName } = result.data;

  try {
    const session = await getServerSession(authOptions);
    if(session?.user?.email === customerEmail) { 
      return {
        success: false,
        error: "You cannot invite yourself as a customer.",
      };
    }
    await connectMongoDB();

    let responseMessage = "";

    // Check if the customer already exists
    let newInvitedCustomer = await UserModel.findOne({
      email: customerEmail,
    }).select("_id");

    if (!newInvitedCustomer) {
      // Create new customer
      newInvitedCustomer = new UserModel({
        name: customerName,
        email: customerEmail,
        isPasswordSet: false,
        role: "customer",
        accountCreationMode: "invited",
        invitedBy: session?.user?.id,
        invitedByRole: session?.user?.role,
      });

      // Save customer
      await newInvitedCustomer.save();

      responseMessage = "Customer has been invited.";
    } else {
      responseMessage = "Customer already exists.";
    }

    // Link customer to seller
    const linkCustomerToSeller = await UserModel.updateOne(
      { _id: session?.user?.id },
      { $addToSet: { linkedCustomers: newInvitedCustomer._id } }
    );

    revalidatePath("/orders/new");

    if (linkCustomerToSeller.modifiedCount === 0) {
      return {
        success: false,
        message:
          responseMessage +
          "But Failed to add your customer. Please try again later.",
      };
    }

    return {
      success: true,
      message: responseMessage,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
