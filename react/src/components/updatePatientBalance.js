import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const UpdatePatientBalance = ({ api }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/mockdata');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [api]);

  const handleUpdateBalances = async () => {
    try {
      setLoading(true);
      // Make a POST request to the backend API endpoint for updating patient balances
        const response = await axios.post('/api/update-patient-balances', patients);
        console.log(response.data); // Log the response from the server
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error); // Set error state with error message
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Patient Balances</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleUpdateBalances} disabled={loading}>
        {loading ? 'Updating Balances...' : 'Update Balances'}
      </button>
      <Link to="/">
        <button>Go to Posting ERA</button>
      </Link>
      <Link to="/generate-invoice">
        <button>Go to Invoice</button>
      </Link>
    </div>
  );
};

export default UpdatePatientBalance;
