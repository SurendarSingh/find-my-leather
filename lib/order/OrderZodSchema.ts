import * as z from "zod";
import {
  complianceCertificates,
  DefaultOrderStatus,
  DefaultTrackingStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "./DefaultOrderValues";
import { modeOfPayment, paymentStatus } from "../payment/DefaultPaymentValues";

const trimmedString = z
  .string()
  .trim()
  .refine((value) => value !== "", "This field is required");
const positiveNumber = z.number().min(1, "Must be greater than 0");
const nonEmptyEnum = (values: readonly [string, ...string[]]) =>
  z.enum(values).refine((value) => value !== null, "This field is required");
const nonNullDate = z
  .date()
  .refine((value) => value !== null, "This field is required");

export const OrderSchema = z.object({
  orderId: trimmedString,
  customerId: trimmedString,
  sellerId: trimmedString,
  rfqDate: nonNullDate,
  article: trimmedString,
  colour: trimmedString,
  size: positiveNumber,
  thickness: positiveNumber,
  selection: nonEmptyEnum(selection),
  estimatedShipmentDate: nonNullDate,
  shippingTerms: nonEmptyEnum(shippingTerms),
  shippingMethod: nonEmptyEnum(shippingMethod),
  complianceCertificates: nonEmptyEnum(complianceCertificates),
  specialRequirement: z.string().trim().optional(),
  paymentTerms: nonEmptyEnum(paymentTerms),
  quantity: positiveNumber,
  pricePerSqFt: positiveNumber,
  totalOrderValue: positiveNumber,
  expectedDeliveryDate: nonNullDate,
  orderStatus: nonEmptyEnum(DefaultOrderStatus)
});

export const paymentSchema = z.object({
  orderId: trimmedString,
  article: trimmedString,
  expectedDeliveryDate: nonNullDate,
  orderStatus: nonEmptyEnum(DefaultOrderStatus),
  estimatedShipmentDate: nonNullDate,
  pricePerSqFt: positiveNumber,
  totalOrderValue: positiveNumber,
  invoiceNumber: trimmedString,
  invoiceDate: nonNullDate,
  invoiceQuantity: positiveNumber,
  totalInvoiceAmount: positiveNumber,
  totalPaidAmount: positiveNumber,
  paymentDueDate: nonNullDate,
  modeOfPayment: nonEmptyEnum(modeOfPayment),
  paymentStatus: nonEmptyEnum(paymentStatus),
  quantity: positiveNumber,
})

export const orderStatusSchema = z.object({
  orderId: trimmedString,
  orderStatus: nonEmptyEnum(DefaultOrderStatus)
})

export type OrderStatusType = z.infer<typeof orderStatusSchema>;
export type PaymentType = z.infer<typeof paymentSchema>;
export type OrderType = z.infer<typeof OrderSchema>;


