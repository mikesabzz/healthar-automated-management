import React, { useState } from 'react';
import axios from 'axios';

const SendingMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessages = async () => {
    try {
      setLoading(true);
      // Make a POST request to the backend API endpoint for sending messages
      const response = await axios.post('/api/send-messages');
      console.log(response.data); // Log the response from the server
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error); // Set error state with error message
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Messages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSendMessages} disabled={loading}>
        {loading ? 'Sending Messages...' : 'Send Messages'}
      </button>
    </div>
  );
};

export default SendingMessages;
