export const selection = ["A/B", "C"] as const;
export const shippingTerms = ["FOB"] as const;
export const shippingMethod = ["Sea"] as const;
export const complianceCertificates = ["LWG"] as const;
export const paymentTerms = ["CAD"] as const;

export const paymentDetailsFields = [
  "-_id",
  "customerId",
  "orderId",
  "article",
  "expectedDeliveryDate",
  "orderStatus",
  "pricePerSqFt",
  "totalOrderValue",
  "invoiceQuantity",
  "invoiceNumber", 
  "invoiceDate",
  "totalInvoiceAmount",
  "totalPaidAmount",
  "estimatedShipmentDate",
  "totalOrderValue",
  "quantity",
  "dueDate",
  "modeOfPayment",
  "paymentStatus"
];

export const DefaultTrackingStatus = [
  "supplierMatching",
  "sampleRequest",
  "sampling" ,
  "sampleApproval",
  "production",
  "qualityControl",
  "packing",
  "shipped"
] as const;

export const paymentStatus = [
  "Unpaid",
  "Pending",
  "Paid"
] as const;

export const modeOfPayment = [
  "Credit Card",
  "Debit Card",
  "UPI",
  "COD",
] as const;

export const DefaultOrderStatus = [
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

export const DefaultOrderDetailsFields = [
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
  "documents",
  "invoiceNumber",
  "paymentStatus",
  "trackingStatus"
];
