import mongoose from "mongoose";
import { paymentStatus } from "./DefaultPaymentValues"; 

const PaymentModelSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    // customerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    article:{ type: String, required : true },
    orderDate:{ type: Date, required : true },
    invoiceNumber:{ type: String, required : true },
    invoiceDate:{ type: Date, required : true },
    invoiceQuantity:{ type: Number, required : true },
    totalInvoiceAmount:{ type: Number, required : true },
    dateOfShipment:{ type: Date, required : true },
    totalPaidAmount:{ type: Number, required : true },
    totalDueAmount:{ type: Number, required : true },
    dueDate:{ type: Date, required : true },
    modeOfPayment:{ type: String, required : true },
    paymentStatus:{ type: String, enums: paymentStatus,required : true },
  },
  { timestamps: true }
);

const PaymentModel =
  mongoose.models.Payment || mongoose.model("Payment", PaymentModelSchema);

export default PaymentModel;