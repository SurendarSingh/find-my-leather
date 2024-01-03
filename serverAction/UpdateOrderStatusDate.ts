"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { revalidatePath } from "next/cache";

export async function UpdateOrderStatusDate(orderId: string, selectedDate: Date,  field: string, orderStatus: string, lastIdx: number) {
  const status = {
    "Supplier Matching": "supplierMatching",
    "Sample Request" : "sampleRequest",
    "Sampling":"sampling" ,
    "Sample Approval" : "sampleApproval",
    "Production" : "production",
    "Quality Control" : "qualityControl",
    "Packing" : "packing",
    "Shipped": "shipped"
} 


const findIndex = Object.keys(status).indexOf(orderStatus?.toString())
const keys = Object.values(status);
  let updatedTrackingStatus = {}
  for(let i = findIndex+1; i < lastIdx; i++){
    updatedTrackingStatus = {
      ...updatedTrackingStatus,
      [`trackingStatus.${keys[i]}`]: new Date()
    }
  }
  
  try {
    await connectMongoDB();
    const response = await OrderModel.findOneAndUpdate(
      { orderId: orderId },
      { $set: updatedTrackingStatus },
      { new: true }
    );
    revalidatePath("/track");
    return {
      success: true,
      message: `Order Status updated!`,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
