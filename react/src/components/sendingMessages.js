import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SendingMessages = ({ api }) => {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/api/mockdata');
        setPatients(response.data.filter(patient => patient.phoneNumber));
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
      }
    };

    fetchPatients();
  }, [api]);

  const handleSendMessages = async () => {
    try {
      setLoading(true);
      const messages = patients.map(patient => ({
        id: patient.id,
        phoneNumber: patient.phoneNumber
      }));
      const response = await api.post('/api/send-text-messages', messages);
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Text Messages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSendMessages} disabled={loading}>
        {loading ? 'Sending Messages...' : 'Send Messages'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.patientName}</td>
              <td>{result.phoneNumber}</td>
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
      <Link to="/credit-card-charge">
        <button>Go to Charge Credit Cards</button>
      </Link>
    </div>
  );
};

export default SendingMessages;
