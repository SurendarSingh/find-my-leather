import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import ProgressSteps from "@/components/Stepper";
import TrackingDetails from "@/components/TrackingDetails/TrackingDetails";
import { FetchCustomerList } from "@/serverAction/FetchCustomerList";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Tracking - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Track = async () => {
  const res = await FetchCustomerList();
  const userOrderDetails = await FetchOrderDetails();
  
  return (
    <>
      <Breadcrumb pageName="Production Tracking" />
      
      { userOrderDetails?.data ? (
        <TrackingDetails
          customerList={res?.data?.customerList}
          userOrderDetails={JSON.parse(userOrderDetails?.data)}
        />
      ) : (
        <ErrorPage />
      )
      }
    </>
  );
};

export default Track;
