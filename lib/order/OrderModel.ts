import mongoose from "mongoose";
import {
  complianceCertificates,
  modeOfPayment,
  DefaultOrderStatus,
  paymentStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "./DefaultOrderValues";

const OrderModelSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rfqDate: { type: Date, required: true },
    article: { type: String, required: true, trim: true },
    colour: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    thickness: { type: Number, required: true },
    selection: { type: String, enum: selection, required: true },
    estimatedShipmentDate: { type: Date, required: true },
    shippingTerms: { type: String, enum: shippingTerms, required: true },
    shippingMethod: { type: String, enum: shippingMethod, required: true },
    complianceCertificates: {
      type: String,
      enum: complianceCertificates,
      required: true,
    },
    specialRequirement: { type: String, trim: true },
    paymentTerms: { type: String, enum: paymentTerms, required: true },
    quantity: { type: Number, required: true },
    pricePerSqFt: { type: Number, required: true },
    totalOrderValue: { type: Number, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    orderStatus: { type: String, enum: DefaultOrderStatus, required: true },
    invoiceNumber: { type: String, required: true, default:NaN },
    invoiceDate: { type: Date },
    totalPaidAmount: { type: Number, required: true, default:0 },
    // totalDueAmount: { type: Number, required: true },
    paymentDueDate: { type: Date },
    modeOfPayment: { type: String, enum: modeOfPayment},
    paymentStatus: { type: String, enum: paymentStatus, required: true, default:paymentStatus[0] },
    documents:{
        purchaseOrder: { type: String, default: "" },
        supplierConfirmationOrder: { type: String , default: ""},
        qcReport: { type: String , default: ""},
        invoice: { type: String , default: ""},
        packingList: { type: String , default: ""},
        qualityCertificate: { type: String , default: ""},
        lwgCertificate: { type: String , default: ""},
        other: { type: String , default: ""},
        shippingBill: { type: String , default: ""}
    },
    trackingStatus:{
      supplierMatching: { type: Date, default:null },
      sampleRequest: { type: Date, default:null },
      sampling: { type: Date, default:null },
      sampleApproval: { type: Date, default:null },
      production: { type: Date, default:null },
      qualityControl: { type: Date, default:null },
      packing: { type: Date, default:null },
      shipped: { type: Date, default:null },
      delivered: { type: Date, default:null }
    }
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderModelSchema);

export default OrderModel;
