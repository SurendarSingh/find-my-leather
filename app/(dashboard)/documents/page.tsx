import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import OrderDocuments from "@/components/DataTable/OrderDocumentsTable";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
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
      {FetchedUserOrderDetails.success &&
      FetchedUserOrderDetails.data != undefined ? (
        <OrderDocuments
          UserOrderDetails={JSON.parse(FetchedUserOrderDetails.data)}
        />
      ) : (
        <ErrorPage message={FetchedUserOrderDetails.error} />
      )}
    </>
  );
};

export default Documents;
