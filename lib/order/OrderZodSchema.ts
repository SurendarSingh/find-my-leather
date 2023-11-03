import * as z from "zod";
import {
  complianceCertificates,
  orderStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "./DefaultOrderValues";

export const OrderSchema = z.object({
  orderId: z.string().trim(),
  rfqDate: z.date(),
  article: z.string().trim(),
  colour: z.string().trim(),
  size: z.number(),
  thickness: z.number(),
  selection: z.enum(selection),
  estimatedShipmentDate: z.date(),
  shippingTerms: z.enum(shippingTerms),
  shippingMethod: z.enum(shippingMethod),
  complianceCertificates: z.enum(complianceCertificates),
  specialRequirement: z.string().trim().optional(),
  paymentTerms: z.enum(paymentTerms),
  quantity: z.number(),
  pricePerSqFt: z.number(),
  totalOrderValue: z.number(),
  supplier: z.string().trim(),
  expectedDeliveryDate: z.date(),
  orderStatus: z.enum(orderStatus),
});

export type OrderType = z.infer<typeof OrderSchema>;
