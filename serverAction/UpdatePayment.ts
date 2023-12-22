"use server";
import { toast } from 'react-toastify';
import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { Mongoose, mongo } from "mongoose";
import { PaymentType } from '@/lib/order/OrderZodSchema';
import { revalidatePath } from 'next/cache';

export async function UpdatePayment(data: PaymentType) {

  try {
    await connectMongoDB();
       const response  = await OrderModel.findOneAndUpdate(
            {orderId: data.orderId}, 
            data
        )
        revalidatePath("/payment");
        return {
          success: true,
          message: `Payment Updated Successfully!`
        };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}