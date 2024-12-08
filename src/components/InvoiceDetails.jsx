import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const InvoiceDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Base_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (authLoading || !user?.token) return;

    const fetchInvoiceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${Base_URL}/invoices/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.message || "Failed to fetch data");
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id, user?.token, authLoading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const downloadPdf = async () => {
    const invoiceElement = document.getElementById("invoice-content");

    if (!invoiceElement) return;

    // Use a higher scale for better quality
    const canvas = await html2canvas(invoiceElement, {
      scale: 2, // This doubles the resolution
    });

    // Get the high-resolution image data
    const imgData = canvas.toDataURL("image/png");

    // Create PDF with correct dimensions based on higher resolution
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST"); // 'FAST' is quicker and less quality-intensive; change to 'SLOW' if needed
    pdf.save("invoice.pdf");
  };
  if (error) return <p className="text-red-500">{error}</p>;
  if (loading || authLoading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <>
      <div className="flex justify-between m-10 items-center bg-gray-100 shadow-md p-4  mb-3 rounded-md max-w-3xl mx-auto">
        <div className="text-lg font-semibold text-gray-700">
          Invoice Actions
        </div>
        <div className="flex gap-4">
          <button
            onClick={downloadPdf}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Download as PDF
          </button>
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Print Invoice
          </button>
        </div>
      </div>

      <div id={"invoice-content"}>
        <div className="max-w-4xl  mx-auto bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">
            Invoice Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">From</h3>
              <p>{data.company?.name}</p>
              <p>{data.company?.address}</p>
              <p>
                {data.company?.city}, {data.company?.country}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Bill To</h3>
              <p>{data.client?.companyName}</p>
              <p>{data.client?.address}</p>
              <p>
                {data.client?.city}, {data.client?.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Invoice Number
              </h3>
              <p>{data.invoiceNumber}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Invoice Date
              </h3>
              <p>{formatDate(data.invoiceDate)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Subject</h3>
              <p>{data.subject}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Due Date</h3>
              <p>{formatDate(data.invoiceDate)}</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.customFields?.map((item, index) => (
              <div key={index} className="border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.label}
                </h3>
                <p className="text-gray-600">{item.value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 bg-gray-200 p-2 text-gray-600 font-semibold text-center">
              <p>Item Name</p>
              <p>Quantity</p>
              <p>Rate</p>
              <p>Tax Amount</p>
            </div>

            <div className="divide-y divide-gray-200">
              {data.items?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-2 text-center"
                >
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.rate} {data.currency}</p>
             
                  <p>{item.taxAmount} {data.currency}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <div className="w-full md:w-1/2 pt-4">
              <div className="flex justify-between mb-2 text-lg">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span>{data.subtotal} {data.currency}</span>
              </div>
              <div className="flex justify-between mb-2 text-lg">
                <span className="font-semibold text-gray-700">
                  Total (after tax):
                </span>
                <span>{data.total} {data.currency}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Notes:</h3>
            <p>{data.notes}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
