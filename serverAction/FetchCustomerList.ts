"use server";

import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/UserModel";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";

export async function FetchCustomerList() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }

    // await connectMongoDB();

    // const userOrderDetails = await UserModel.find()

    // Sample order details
    const customerList = [
      {
        name: "Customer 1",
        email: "customer1@findmyleather.com",
        id: "1",
      },
      {
        name: "Customer 2",
        email: "customer2@findmyleather.com",
        id: "2",
      },
      {
        name: "Customer 3",
        email: "customer3@findmyleather.com",
        id: "3",
      },
      {
        name: "Customer 4",
        email: "customer5@findmyleather.com",
        id: "4",
      },
    ];

    const userData = {
      sellerId: session.user?.id,
      customerList: customerList,
    };

    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
