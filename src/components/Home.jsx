import React, { useContext, useEffect, useState } from "react";
import History from "../components/History";
import Invoice from "./templates/invoice1";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInvoices = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/invoices", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch invoices");
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [token]);


  
  return (
    <div className="p-6 m-10">
   
      {/* Flexbox Layout for Invoice and Sidebar */}
      <div className=" ml-4 flex flex-col lg:flex-row space-y-6 lg:space-x-6 lg:space-y-0">
        {/* Left side - Invoice */}
        <div className="lg:w-3/4 w-full">
          <Invoice  invoices={invoices} onAddInvoice={fetchInvoices} />
        </div>

      </div>
      <History
        invoices={invoices}
        loading={loading}
        error={error}
        fetchInvoices={fetchInvoices}
      />
    </div>
    
  );
};

export default Home;
