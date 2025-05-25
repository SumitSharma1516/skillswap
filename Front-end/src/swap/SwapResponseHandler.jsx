import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SwapResponseHandler = ({ requestId }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const respond = async (status) => {
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/swap/respond`,
        { id: requestId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Swap ${status}ed successfully!`);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex gap-2">
      <button
        onClick={() => respond('accepted')}
        disabled={loading}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Accept
      </button>
      <button
        onClick={() => respond('rejected')}
        disabled={loading}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Reject
      </button>
    </div>
  );
};

export default SwapResponseHandler;
