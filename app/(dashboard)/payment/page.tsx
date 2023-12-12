import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import PaymentTable from "@/components/DataTable/PaymentTable";
import { FetchCustomerList } from "@/serverAction/FetchCustomerList";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { FetchPaymentDetails } from "@/serverAction/FetchPaymentDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Payment = async () => {
  const userOrderDetails = await FetchOrderDetails();
  const res = await FetchCustomerList();
  const paymentDetails = await FetchPaymentDetails();
  

  console.log('====================================');
  console.log(res);
  console.log('====================================');;
  

  return (
    <>
      <Breadcrumb pageName="Payment Details" />
      { res && res.data && 
        <PaymentTable
          UserOrderDetails={userOrderDetails.data}
          sellerId={res.data.sellerId}
          UserPaymentDetails={paymentDetails.data}
        />}
      {/* <ErrorPage message="This page is under construction. Please check back later." /> */}
    </>
  );
};

export default Payment;
