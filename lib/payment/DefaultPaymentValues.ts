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
    "paymentDueDate",
    "modeOfPayment",
    "paymentStatus"
  ];

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