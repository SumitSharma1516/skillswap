import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwapResponseHandler from './SwapResponseHandler';

const API_URL = 'http://localhost:5000/api';

const MySwaps = () => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const res = await axios.get(`${API_URL}/swap/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSent(res.data.sent);
        setReceived(res.data.received);
      } catch (err) {
        console.error('Error fetching swaps:', err.response?.data?.message || err.message);
      }
    };
    fetchSwaps();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Sent Swap Requests</h2>
        {sent.length === 0 ? (
          <p>No sent requests.</p>
        ) : (
          sent.map((req) => (
            <div key={req._id} className="border-b py-2">
              <p><strong>To:</strong> {req.to.username}</p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Received Swap Requests</h2>
        {received.length === 0 ? (
          <p>No received requests.</p>
        ) : (
          received.map((req) => (
            <div key={req._id} className="border-b py-2">
              <p><strong>From:</strong> {req.from.username}</p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Status:</strong> {req.status}</p>
              {req.status === 'pending' && <SwapResponseHandler requestId={req._id} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySwaps;
