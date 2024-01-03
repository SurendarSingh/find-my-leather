import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderHistory from "@/components/DataTable/OrderHistory";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { FetchCustomerList } from "@/serverAction/FetchCustomerList";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const History = async () => {
  const FetchedUserOrderDetails = await FetchOrderDetails();
  

  return (
    <>
      <Breadcrumb pageName="Order History" />
      {FetchedUserOrderDetails.success &&
      FetchedUserOrderDetails.data != undefined ? (
        <OrderHistory 
          UserOrderDetails={FetchedUserOrderDetails.data}
        />
      ) : (
        <ErrorPage message={FetchedUserOrderDetails.error} />
      )}
      {/* <ErrorPage message="This page is under construction. Please check back later." /> */}
    </>
  );
};

export default History;
