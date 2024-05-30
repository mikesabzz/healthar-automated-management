import React, { useState } from 'react';
import axios from 'axios';

const UpdatePatientBalance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateBalances = async () => {
    try {
      setLoading(true);
      // Make a POST request to the backend API endpoint for updating patient balances
    //   const response = await axios.post('/api/update-patient-balances');
    //   console.log(response.data); // Log the response from the server
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
    </div>
  );
};

export default UpdatePatientBalance;
