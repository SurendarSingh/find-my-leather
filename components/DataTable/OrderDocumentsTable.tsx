"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaDownload, FaEye, FaEdit } from "react-icons/fa";
import { storage } from "@/lib/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import OrderModel from "@/lib/order/OrderModel";
import { UpdateOrder } from "@/serverAction/UpdateOrder";

const OrderDocuments = ({ UserOrderDetails }: any) => {
  const [tableData, setableData] = useState(UserOrderDetails);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    orderId: string,
    field: string
  ) => {
    if (e.target.files) {
      handleEdit(field, orderId, e.target.files[0]);
    } else {
      console.log("[Err]", "Emplty file");
    }
  };

  function getDocumentLink(
    orderId: string,
    fieldName: string,
    file: File
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (file) {
        const pathName = `documents/${orderId}/${fieldName}/${
          orderId + fieldName
        }.pdf`;
        const storageRef = ref(storage, pathName);
        await uploadBytes(storageRef, file).catch((err) => {
          reject(err);
        });
        const link = getDownloadURL(ref(storage, pathName));
        resolve(link);
      } else {
        reject("File Upload has empty file");
      }
    });
  }

  const handleEdit = async (field: string, id: string, file: File) => {
    const documentLink: string = await getDocumentLink(id, field, file);
    console.log("[Download link]", documentLink);
    const response = await UpdateOrder(id, `documents.${field}`, documentLink);

    if (response.success) {
      window.location.reload();
    }
  };

  function renderDocument(documents: any, id: any) {
    return (
      <>
        {Object?.keys(documents).map((key) => {
          return (
            <>
              <td className="">
                {documents && documents[key] ? (
                  <div className="flex flex-col items-center justify-center p-2">
                    <a target="_blank" href={documents[key]} className="p-2">
                      <FaEye />
                    </a>
                    <a
                      download
                      type="application/octet-stream"
                      href={documents[key]}
                      className="p-1"
                    >
                      {" "}
                      <FaDownload />
                    </a>
                    <label htmlFor="editFile" className="p-2">
                      <FaEdit />
                      <input
                        id="editFile"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(event) => handleFileUpload(event, id, key)}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <label htmlFor="uploadFile">
                      <FaUpload className="file-upload-label cursor-pointer" />
                      <input
                        id="uploadFile"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(event) => handleFileUpload(event, id, key)}
                      />
                    </label>
                  </div>
                )}
              </td>
            </>
          );
        })}
      </>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Article
            </th>
            <th scope="col" className="px-6 py-3">
              Purchase Order
            </th>
            <th scope="col" className="px-6 py-3">
              Supplier Confirmation Order
            </th>
            <th scope="col" className="px-6 py-3">
              QC Report
            </th>
            <th scope="col" className="px-6 py-3">
              Invoice
            </th>
            <th scope="col" className="px-6 py-3">
              Packing List
            </th>
            <th scope="col" className="px-6 py-3">
              Quality Certificate
            </th>
            <th scope="col" className="px-6 py-3">
              LWG Certificate
            </th>
            <th scope="col" className="px-6 py-3">
              Other docs
            </th>
            <th scope="col" className="px-6 py-3">
              Shipping Bill
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((order: any) => (
            <>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.orderId}
                </th>
                <td className="px-6 py-4">{order.article}</td>
                {renderDocument(order?.documents, order.orderId)}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDocuments;
