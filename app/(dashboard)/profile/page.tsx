import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Profile = async () => {
  return (
    <>
      <Breadcrumb pageName="My Profile" />
      <ErrorPage message="This page is under construction. Please check back later." />
    </>
  );
};

export default Profile;
