import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import OrderDocuments from "@/components/OrderDocuments/OrderDocuments";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { SignUpUser } from "@/serverAction/SignUpUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Documents - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Documents = async () => {
  const FetchedUserOrderDetails = await FetchOrderDetails();
  
  return (
    <>
      <Breadcrumb pageName="Order Documents" />
      <OrderDocuments UserOrderDetails={FetchedUserOrderDetails.data} />
      {/* <ErrorPage message="This page is under construction. Please check back later." /> */}
    </>
  );
};

export default Documents;
