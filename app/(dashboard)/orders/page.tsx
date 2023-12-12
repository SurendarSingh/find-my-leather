import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderTable from "@/components/DataTable/OrderTable";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Orders = async () => {
  const FetchedUserOrderDetails = await FetchOrderDetails();
 
  if(FetchedUserOrderDetails.success && FetchedUserOrderDetails.data != undefined){
    return (
      <>
      <Breadcrumb pageName="Order Detials" />     
      <OrderTable UserOrderDetails = {FetchedUserOrderDetails.data}/>  
    </>
  );
}
};

export default Orders;
