import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PaymentTable from "@/components/DataTable/PaymentTable";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { FetchCustomerList } from "@/serverAction/FetchCustomerList";
import { FetchPaymentDetails } from "@/serverAction/FetchPaymentDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Payment = async () => {
  const res = await FetchCustomerList();
  const paymentDetails = await FetchPaymentDetails();

  return (
    <>
      <Breadcrumb pageName="Payment Details" />
      { paymentDetails && paymentDetails.data ?
        (
          <PaymentTable
            customerList={res?.data?.customerList}
            UserPaymentDetails={paymentDetails.data}
          />
        ) : (
          <ErrorPage  message={res.error} />
        )
        }
    </>
  );
};

export default Payment;