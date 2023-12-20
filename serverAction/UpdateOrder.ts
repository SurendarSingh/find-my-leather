"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";

export async function UpdateOrder(id: string, field: string, link: string) {
  try {
    await connectMongoDB();
    const response = await OrderModel.findOneAndUpdate(
      { orderId: id },
      { $set: { [field]: link } },
      { new: true }
    );
    return {
      success: true,
      message: `Order docuement ${field} updated!`,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
