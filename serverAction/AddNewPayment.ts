"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import PaymentModel from "@/lib/payment/PaymentModel";
import { PaymentSchema, PaymentType } from "@/lib/payment/PaymentZodSchema";

export async function AddNewPayment(data: PaymentType) {
  
  const parsedData = {
    orderId: data.orderId,
    article: data.article,
    sellerId: data.sellerId,
    orderDate: new Date(data.orderDate),
    invoiceNumber: data.invoiceNumber,
    invoiceDate: new Date(data.invoiceDate),
    invoiceQuantity: parseInt(data.invoiceQuantity),
    totalInvoiceAmount: parseInt(data.totalInvoiceAmount),
    dateOfShipment: data.dateOfShipment,
    totalPaidAmount: data.totalPaidAmount,
    totalDueAmount: parseInt(data.totalDueAmount.toString()),
    dueDate: new Date(data.dueDate),
    modeOfPayment: data.modeOfPayment,
    paymentStatus: data.paymentStatus

  };
  
  try {
    await connectMongoDB();
    
    const newPayment = await PaymentModel.create(parsedData);

    const savedPayment = await newPayment.save();

    return {
      success: true,
      message: "Payment created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
