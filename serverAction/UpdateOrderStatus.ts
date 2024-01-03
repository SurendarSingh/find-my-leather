"use server";
import { toast } from 'react-toastify';
import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { Mongoose, mongo } from "mongoose";
import { OrderStatusType } from '@/lib/order/OrderZodSchema';
import { revalidatePath } from 'next/cache';

export async function UpdateOrderStatus(data: OrderStatusType) {

  try {
    await connectMongoDB();
      const response = await OrderModel.updateOne(
        {orderId: data.orderId},
        { $set: { orderStatus: data.orderStatus } }
      )
        revalidatePath("/track");
        return {
          success: true,
          message: `Order Status Updated Successfully!`
        };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}