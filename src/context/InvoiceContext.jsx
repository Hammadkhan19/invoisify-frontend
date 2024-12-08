import React, { createContext, useState, useContext,  } from 'react';

const InvoiceContext = createContext();

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
import { AuthContext } from './AuthContext';
export const InvoiceProvider = ({ children }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const Base_URL = import.meta.env.VITE_API_URL;
  // Function to fetch invoice data
  const fetchInvoiceData = async (invoiceId) => {
    try {
      const response = await fetch(`${Base_URL}/invoices/${invoiceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch invoice data');
      }
      const data = await response.json();
      setSelectedInvoice(data);
      setIsEditMode(true);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  // Function to update invoice data
  const updateInvoiceData = async (invoiceId, updatedData) => {
    console.log("Invoice ID of put:", invoiceId);
    try {
      const response = await fetch(`${Base_URL}/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }
      const updatedInvoice = await response.json();
      setSelectedInvoice(updatedInvoice); // Update context state with new data
      setIsEditMode(false); // Reset edit mode after successful update
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  // Function to start editing an invoice
  const startEditingInvoice = async (invoiceId) => {
    console.log("Invoice ID of edit:", invoiceId); // Check what value is being passed
    if (!invoiceId) {
      console.error("Invoice ID is missing");
      return;
    }
    await fetchInvoiceData(invoiceId); // Fetch data when editing starts
  };  
  
  const stopEditingInvoice = () => {
    setSelectedInvoice(null);
    setIsEditMode(false);
  };

  return (
    <InvoiceContext.Provider
      value={{
        selectedInvoice,
        isEditMode,
        startEditingInvoice,
        stopEditingInvoice,
        updateInvoiceData, // Expose update function
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
