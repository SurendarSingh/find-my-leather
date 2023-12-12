import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import PaymentTable from "@/components/DataTable/PaymentTable";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";
import AddNewPaymentForm from '@/components/Form/AddNewPaymentForm';
import { FetchCustomerList } from '@/serverAction/FetchCustomerList';
import { FetchPaymentDetails } from '@/serverAction/FetchPaymentDetails';

const AddNewPayment = async () => {
  const userOrderDetails = await FetchOrderDetails();
  const res = await FetchCustomerList()
  const paymentDetails = await FetchPaymentDetails();
  
  return (
    <>
      <Breadcrumb pageName="Add New Payment" />
      {res.success && res.data && res.data.sellerId ? (
        <AddNewPaymentForm
          UserOrderDetails={userOrderDetails.data}
          customerList={res.data.customerList}
          sellerId={res.data.sellerId}
        />
      ) : (
        <ErrorPage message={res.error} />
      )}
    </>
  );
}

export default AddNewPayment