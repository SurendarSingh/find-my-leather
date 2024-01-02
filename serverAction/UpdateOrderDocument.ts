"use server";
import { toast } from 'react-toastify';
import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { Mongoose, mongo } from "mongoose";
import { OrderType } from '@/lib/order/OrderZodSchema';
import { revalidatePath } from 'next/cache';

export async function UpdateOrder(id: string, field: string, link: string, values: object) {

  try {
    await connectMongoDB();
       const response  = await OrderModel.findOneAndUpdate(
            {orderId: id}, 
            { $set: { values } },
            { new: true },
        )
        
        return {
          success: true,
          message: `Order docuement ${field} updated!`
        };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}