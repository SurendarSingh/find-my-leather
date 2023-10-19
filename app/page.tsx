import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
