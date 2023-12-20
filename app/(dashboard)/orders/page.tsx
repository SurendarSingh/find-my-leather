import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderTable from "@/components/DataTable/OrderTable";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const NewOrderPage = async () => {
  const FetchedUserOrderDetails = await FetchOrderDetails();

  return (
    <>
      <Breadcrumb pageName="Order Detials" />
      {FetchedUserOrderDetails.success &&
      FetchedUserOrderDetails.data != undefined ? (
        <OrderTable
          UserOrderDetails={JSON.parse(FetchedUserOrderDetails.data)}
        />
      ) : (
        <ErrorPage message={FetchedUserOrderDetails.error} />
      )}
    </>
  );
};

export default NewOrderPage;
