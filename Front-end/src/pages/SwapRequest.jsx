import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SwapRequestForm = ({ recipientId }) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/swap/request`,
        { to: recipientId, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Swap request sent!');
      setMessage('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };

  return (
    <form onSubmit={handleSendRequest} className="bg-white p-4 shadow rounded">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Swap Request
      </button>
    </form>
  );
};

export default SwapRequestForm;
