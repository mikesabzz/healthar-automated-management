import React, { useState } from 'react';
import axios from 'axios';
// Client module

const ChargeCreditCards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChargeCreditCards = async () => {
    try {
      setLoading(true);
      // Make a POST request to the backend API endpoint for charging credit cards
    //   const response = await axios.post('/api/charge-credit-cards');
    //   console.log(response.data); // Log the response from the server
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error); // Set error state with error message
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Charge Credit Cards</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleChargeCreditCards} disabled={loading}>
        {loading ? 'Charging Credit Cards...' : 'Charge Credit Cards'}
      </button>
    </div>
  );
};

export default ChargeCreditCards;
