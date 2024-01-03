"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { OrderSchema, OrderType } from "@/lib/order/OrderZodSchema";

export async function AddNewOrder(data: OrderType) {
  
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
  
  const findIndex = Object.keys(status).indexOf(data?.orderStatus?.toString())
  const keys = Object.values(status);
  let trackingStatus = {}
  for(let i = 0; i <= findIndex; i++){
    trackingStatus = {
      ...trackingStatus,
      [keys[i]]: new Date()
    }
  }
  
  const result = OrderSchema.safeParse(data);
  

  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error.format()) };
  }

  console.log(result.data);
  try {
    await connectMongoDB();
    
    const newOrder = await OrderModel.create({...result.data, trackingStatus});

    const savedOrder = await newOrder.save();

    return {
      success: true,
      message: "Order created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
