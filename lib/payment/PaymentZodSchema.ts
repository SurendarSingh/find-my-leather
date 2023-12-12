import * as z from "zod";
import { paymentStatus } from "./DefaultPaymentValues"; 

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

export const PaymentSchema = z.object({
      orderId: trimmedString,
      // customerId: trimmedString,
      sellerId: trimmedString,
      article: trimmedString,
      orderDate: nonNullDate,
      invoiceNumber: positiveNumber,
      invoiceDate: nonNullDate,
      invoiceQuantity: trimmedString,
      totalInvoiceAmount: trimmedString,
      dateOfShipment: nonNullDate,
      totalPaidAmount: positiveNumber,
      totalDueAmount: positiveNumber,
      dueDate: nonNullDate,
      modeOfPayment: trimmedString,
      paymentStatus: nonEmptyEnum(paymentStatus),
});

export type PaymentType = z.infer<typeof PaymentSchema>;
