import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddNewOrderForm from "@/components/Form/AddNewOrder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Order - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const AddNewOrder = async () => {
  return (
    <>
      <Breadcrumb pageName="Add New Order" />
      <AddNewOrderForm />
    </>
  );
};

export default AddNewOrder;
