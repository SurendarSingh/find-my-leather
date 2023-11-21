export const selection = ["A/B", "C"] as const;
export const shippingTerms = ["FOB"] as const;
export const shippingMethod = ["Sea"] as const;
export const complianceCertificates = ["LWG"] as const;
export const paymentTerms = ["CAD"] as const;
export const orderStatus = [
  "Supplier Matching",
  "Sample Request",
  "Sampling",
  "Sample Approval",
  "Production",
  "Quality Control",
  "Packing",
  "Shipped",
  "Delivered",
] as const;

export const orderDetailsFields = [
  "-_id",
  "orderId",
  "rfqDate",
  "article",
  "colour",
  "size",
  "thickness",
  "selection",
  "estimatedShipmentDate",
  "shippingTerms",
  "shippingMethod",
  "complianceCertificates",
  "specialRequirement",
  "paymentTerms",
  "quantity",
  "pricePerSqFt",
  "totalOrderValue",
  "expectedDeliveryDate",
  "orderStatus",
];
