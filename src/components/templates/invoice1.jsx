import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useInvoiceContext } from "@/context/InvoiceContext";
const Invoice1 = ({ onAddInvoice }) => {
  const { user } = useContext(AuthContext);
  const { selectedInvoice, isEditMode, updateInvoiceData, stopEditingInvoice } =
    useInvoiceContext();
  const userId = user?.userID || "undifined";
  const Base_URL = import.meta.env.VITE_API_URL;
  const [invoice, setInvoice] = useState({
    company: { name: "", address: "", city: "", country: "" },
    client: { companyName: "", address: "", city: "", country: "" },
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    subject: "",
    items: [{ name: "", quantity: 1, rate: 0, taxAmount: 0 }],
    notes: "",
    customFields: [{ label: "", value: "" }],
    currency: "USD",
    userId,
  });

  useEffect(() => {
    if (isEditMode && selectedInvoice) {
      setInvoice({
        company: { ...selectedInvoice.company },
        currency: selectedInvoice.currency,
        client: { ...selectedInvoice.client },
        invoiceNumber: selectedInvoice.invoiceNumber,
        invoiceDate: selectedInvoice.invoiceDate,
        dueDate: selectedInvoice.dueDate,
        subject: selectedInvoice.subject,
        items: selectedInvoice.items.map((item) => ({ ...item })),
        notes: selectedInvoice.notes,
        customFields: selectedInvoice.customFields.map((field) => ({
          ...field,
        })),
        userId: selectedInvoice.userId,
      });
    }
  }, [isEditMode, selectedInvoice]);
  const { fetchData, loading, error } = useFetch(`${Base_URL}/invoices`, {
    method: "POST",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "invoiceDate" || name === "dueDate") {
      // No need to reformat for the state; it's already in yyyy-MM-dd
      setInvoice((prev) => ({ ...prev, [name]: value }));
    } else {
      setInvoice((prev) => ({ ...prev, [name]: value }));
    }
  };

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    AUD: "A$",
    // Add more currencies as needed
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setInvoice((prev) => ({
      ...prev,
      currency: selectedCurrency,
    }));
  };

  const handleItemChangecu = (index, e) => {
    const { name, value } = e.target;
    setInvoice((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index][name] = value;
      return { ...prev, items: updatedItems };
    });
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    setInvoice((prev) => ({ ...prev, items }));
  };

  const handleCustomFieldChange = (index, e) => {
    const { name, value } = e.target;
    const customFields = [...invoice.customFields];
    customFields[index][name] = value;
    setInvoice((prev) => ({ ...prev, customFields }));
  };
  const addCustomField = () => {
    setInvoice((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const removeCustomField = (index) => {
    const customFields = invoice.customFields.filter((_, i) => i !== index);
    setInvoice((prev) => ({ ...prev, customFields }));
  };
  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, rate: 0, taxAmount: 0 }],
    }));
  };

  const removeItem = (index) => {
    const items = invoice.items.filter((_, i) => i !== index);
    setInvoice((prev) => ({ ...prev, items }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (isEditMode) {
      // Update the existing invoice using a PUT request
      response = await updateInvoiceData(selectedInvoice._id, invoice); // Assuming `updateInvoiceData` returns a response
      if (response) {
        alert("Invoice successfully updated!");
        stopEditingInvoice(); // Reset after updating
      }
    } else {
      // Create a new invoice using a POST request
      response = await fetchData(invoice); // Assuming `fetchData` sends POST for a new invoice
      if (response) {
        alert("Invoice successfully created!");
        onAddInvoice(); // Callback to refresh or update the invoice list
      }
    }
  };

  useEffect(() => {
    const generateInvoiceNumber = () => {
      const datePart = new Date().getFullYear().toString().slice(2); // Last two digits of the year
      const randomPart = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
      return `INV-${datePart}-${randomPart.toString().padStart(4, "0")}`;
    };
    useEffect;
    setInvoice((prev) => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
    }));
  }, []); // Empty dependency array ensures this runs once when component mounts
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 -ml-1 "
      >
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <h2 className="text-2xl md:text-3xl font-semibold text-center text-orange-600 mb-4">
          Invoice
        </h2>

        {/* Company and Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Your Company Information */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              From
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Your Company Name"
              value={invoice.company.name}
              onChange={(e) => handleNestedChange(e, "company")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={invoice.company.address}
              onChange={(e) => handleNestedChange(e, "company")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={invoice.company.city}
              onChange={(e) => handleNestedChange(e, "company")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={invoice.company.country}
              onChange={(e) => handleNestedChange(e, "company")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Client Information */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              Bill To
            </h3>
            <input
              type="text"
              name="companyName"
              placeholder="Client Name"
              value={invoice.client.companyName}
              onChange={(e) => handleNestedChange(e, "client")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Client Address"
              value={invoice.client.address}
              onChange={(e) => handleNestedChange(e, "client")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={invoice.client.city}
              onChange={(e) => handleNestedChange(e, "client")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={invoice.client.country}
              onChange={(e) => handleNestedChange(e, "client")}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              Invoice Number
            </h3>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleChange}
              placeholder="Auto Generated"
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              Invoice Date
            </h3>
            <input
              type="date"
              name="invoiceDate"
              value={invoice.invoiceDate}
              onChange={handleChange}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="mt-1 text-gray-600 text-sm">
              Selected Date: {formatDateForDisplay(invoice.invoiceDate)}
            </p>
          </div>
        </div>

        {/* Subject and Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              Subject
            </h3>
            <input
              type="text"
              name="subject"
              value={invoice.subject}
              onChange={handleChange}
              placeholder="Invoice Subject"
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-700">
              Due Date
            </h3>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate}
              onChange={handleChange}
              className="p-2 text-sm md:text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="mt-1 text-gray-600 text-sm">
              Selected Due Date: {formatDateForDisplay(invoice.dueDate)}
            </p>
          </div>
        </div>
        {/* Custom Fields */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Custom Fields
        </h3>
        <div className="space-y-4">
          {invoice.customFields.map((field, index) => (
            <div key={index} className="flex gap-4">
              {/* Custom Field Label */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Label
                </label>
                <input
                  type="text"
                  name="label"
                  value={field.label}
                  onChange={(e) => handleCustomFieldChange(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Custom Field Value */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Value
                </label>
                <input
                  type="text"
                  name="value"
                  value={field.value}
                  onChange={(e) => handleCustomFieldChange(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Remove Custom Field */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeCustomField(index)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Custom Field Button */}
          <div className="text-center flex justify-start">
            <button
              type="button"
              onClick={addCustomField}
              className="bg-orange-500 text-white p-2 rounded-lg"
            >
              Add Custom Field
            </button>
          </div>
        </div>

        {/* Item List */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
        <div className="space-y-4">
          {invoice.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 "
            >
              {/* Item Name */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Rate */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Rate ({currencySymbols[invoice.currency] || ""})
                </label>
                <input
                  type="number"
                  name="rate"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => handleItemChangecu(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Tax Amount */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Tax Amount ({currencySymbols[invoice.currency] || ""})
                </label>
                <input
                  type="number"
                  name="taxAmount"
                  placeholder="Tax Amount"
                  value={item.taxAmount}
                  onChange={(e) => handleItemChangecu(index, e)}
                  className="p-2 text-lg border-b border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Remove Button */}
              <div className="flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Item Button */}
          <div className="text-center   flex justify-start">
            <button
              type="button"
              onClick={addItem}
              className="bg-orange-500 text-white p-2 rounded-lg"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="mb-4">
          <label className="text-md md:text-lg font-semibold text-gray-700 block mb-2">
            Currency
          </label>
          <select
            value={invoice.currency}
            onChange={handleCurrencyChange}
            className="p-2 text-lg border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>
        {/* Notes and Terms */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Notes</h3>
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            placeholder="Any additional notes..."
            className="p-3 border-b border-gray-300 w-full text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white p-4 rounded-lg w-full text-xl"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Invoice"
              : "Save Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invoice1;
