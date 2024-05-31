import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const CreateInvoices = ({ api }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/generate-invoices');
        setInvoices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [api]);

  return (
    <div>
      <h2>Generated Invoices</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Service Date</th>
              <th>Insurance Company</th>
              <th>Payment Amount</th>
              <th>Balance</th>
              <th>Invoice Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.patientName}</td>
                <td>{invoice.serviceDate}</td>
                <td>{invoice.insuranceCompany}</td>
                <td>{invoice.paymentAmount.toFixed(2)}</td>
                <td>{invoice.balance.toFixed(2)}</td>
                <td>{invoice.invoiceAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/">
        <button>Go to Posting ERA</button>
      </Link>
      <Link to="/update-patient-balance">
        <button>Go to Update Patient Balance</button>
      </Link>
    </div>
  );
};

export default CreateInvoices;
