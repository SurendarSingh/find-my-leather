export const paymentStatus =[
    "Pending",
    "Paid"
  ] as const;

  export const paymentDetailsFields = [
    "article",
    "sellerId",
    "orderId",
    "orderDate",
    "invoiceNumber",
    "invoiceDate",
    "invoiceQuantity",
    "totalInvoiceAmount",
    "dateOfShipment",
    "totalPaidAmount",
    "totalDueAmount",
    "dueDate",
    "modeOfPayment",
    "paymentStatus",
  ];