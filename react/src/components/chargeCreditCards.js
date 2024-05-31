import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const ChargeCreditCards = ({ api }) => {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/api/mockdata');
        setPatients(response.data.filter(patient => patient.creditCard));
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
      }
    };

    fetchPatients();
  }, [api]);

  const handleChargeCards = async () => {
    try {
      setLoading(true);
      const charges = patients.map(patient => ({
        id: patient.id,
        amount: patient.balance // Charge the full balance
      }));
      const response = await api.post('/api/charge-credit-cards', charges);
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Charge Credit Cards</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleChargeCards} disabled={loading}>
        {loading ? 'Charging Cards...' : 'Charge Cards'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.patientName}</td>
              <td>{result.amount.toFixed(2)}</td>
              <td>{result.success ? 'Success' : `Failed: ${result.message}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">
        <button>Go to Posting ERA</button>
      </Link>
      <Link to="/update-patient-balance">
        <button>Go to Update Patient Balance</button>
      </Link>
      <Link to="/generate-invoice">
        <button>Go to Generate Invoices</button>
      </Link>
    </div>
  );
};

export default ChargeCreditCards;
