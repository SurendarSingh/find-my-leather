import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import ProgressSteps from "@/components/Stepper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Tracking - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Track = async () => {
  return (
    <>
      <Breadcrumb pageName="Production Tracking" />
      {/* <ErrorPage message="This page is under construction. Please check back later." /> */}
      <div className="text-center rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <ProgressSteps />
      </div>
    </>
  );
};

export default Track;
