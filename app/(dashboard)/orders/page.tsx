import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderPage from "@/components/OrderPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Orders = async () => {
  return (
    <>
      <Breadcrumb pageName="Order Detials" />
      <OrderPage />
    </>
  );
};

export default Orders;
