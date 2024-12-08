import { useState, useContext } from "react";
import { TrashIcon, EyeIcon, SearchIcon } from "@heroicons/react/solid";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInvoiceContext } from "@/context/InvoiceContext";
const InvoiceHistory = ({ invoices, loading, error, fetchInvoices }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { startEditingInvoice } = useInvoiceContext();
  const token = user?.token;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const Base_URL = import.meta.env.VITE_API_URL;
  const handleDelete = async (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`${Base_URL}/invoices/${_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete invoice");

        // Refresh invoice list after deletion
        fetchInvoices();
        console.log(`Invoice ${_id} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting invoice: ${error.message}`);
      }
    }
  };

  const handleView = (_id) => {
    navigate(`/invoice/${_id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  // Calculate the current invoices to display
  const currentInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  return (
    <div className="p-6 m-4 sm:m-5 rounded-md bg-gray-100 w-full">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Invoice History
      </h2>
      <p className="text-sm text-gray-600 sm:ml-4 mt-2 sm:mt-0">
        We automatically save invoices that you created recently to your
        device. This is useful when you need to quickly make an edit to an
        invoice.
      </p>
    </div>
  
    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex space-x-4 w-full sm:w-auto">
        <button
          onClick={() => navigate("/invoice")}
          className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base w-full sm:w-auto h-10 sm:h-12 rounded-lg shadow-md hover:bg-orange-600 transition duration-200 ease-in-out overflow-hidden text-ellipsis whitespace-nowrap"
        >
          New
        </button>
        <button className="bg-white text-gray-800 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base w-full sm:w-auto h-10 sm:h-12 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out overflow-hidden text-ellipsis whitespace-nowrap">
          Export
        </button>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <SearchIcon className="w-6 h-6 text-gray-600" />
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
        />
      </div>
    </div>
  
    {/* Table */}
    {error && <p className="text-red-500 mt-4">{error}</p>}
    {loading ? (
      <p className="text-gray-500 mt-4">Loading...</p>
    ) : (
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg w-full">
        {/* Mobile View - Stacked layout */}
        <div className="block sm:hidden w-full">
          {currentInvoices.map((invoice) => (
            <div
              key={invoice._id}
              className="border-t border-gray-200 p-4 space-y-2 w-full"
            >
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">Customer:</span>
                <span className="text-gray-800">{invoice.company.name}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">
                  Reference:
                </span>
                <span className="text-gray-800">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">Date:</span>
                <span className="text-gray-800">
                  {formatDate(invoice.invoiceDate)}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">Due Date:</span>
                <span className="text-gray-800">
                  {formatDate(invoice.dueDate)}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">Total:</span>
                <span className="text-gray-800">{invoice.total}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <button
                  onClick={() => handleView(invoice._id)}
                  className="text-blue-500 hover:underline"
                >
                  <EyeIcon className="w-4 h-4 inline-block mr-1" /> View
                </button>
                <button
                  onClick={() => handleDelete(invoice._id)}
                  className="text-red-500 hover:underline"
                >
                  <TrashIcon className="w-4 h-4 inline-block mr-1" /> Delete
                </button>
                <button
                  onClick={() => startEditingInvoice(invoice._id)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Large Screens - Table Layout */}
        <div className="hidden sm:block w-full">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Reference
                </th>
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="px-2 py-1 text-left text-xs sm:text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr key={invoice._id} className="border-t">
                  <td className="px-2 py-1 text-xs sm:text-sm text-gray-800">
                    {invoice.company.name}
                  </td>
                  <td className="px-2 py-1 text-xs sm:text-sm text-gray-800">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-2 py-1 text-xs sm:text-sm text-gray-800">
                    {formatDate(invoice.invoiceDate)}
                  </td>
                  <td className="px-2 py-1 text-xs sm:text-sm text-gray-800">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-2 py-1 text-xs sm:text-sm text-gray-800">
                    {invoice.total}
                  </td>
                  <td className="px-2 py-1  text-xs sm:text-sm text-gray-800">
                    <button
                      onClick={() => handleView(invoice._id)}
                      className="text-blue-500 hover:underline mr-2 "
                    >
                      <EyeIcon className="w-4 h-4 inline-block mr-1" /> View
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)}
                      className="text-red-500 hover:underline mr-2"
                    >
                      <TrashIcon className="w-4 h-4 inline-block mr-1" />{" "}
                      Delete
                    </button>
                    <button
                      onClick={() => startEditingInvoice(invoice._id)}
                      className="text-green-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  
    {/* Pagination Controls */}
    <div className="flex mt-4 justify-center items-center p-4 rounded-lg shadow-md">
      <button
        className={`bg-gray-800 text-white p-2 rounded-l-lg transition-all duration-200 
              ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-700"}`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
  
      <button
        className={`bg-customOrange text-white p-2 rounded-r-lg transition-all duration-200 
              ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-orange-700"}`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  
  );
};

export default InvoiceHistory;
