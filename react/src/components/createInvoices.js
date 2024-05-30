import React, { useState } from 'react';
import axios from 'axios';

const CreateInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateInvoices = async () => {
    try {
      setLoading(true);
      // Make a POST request to the backend API endpoint for creating invoices
    //   const response = await axios.post('/api/create-invoices');
    //   console.log(response.data); // Log the response from the server
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error); // Set error state with error message
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Invoices</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCreateInvoices} disabled={loading}>
        {loading ? 'Creating Invoices...' : 'Create Invoices'}
      </button>
    </div>
  );
};

export default CreateInvoices;
