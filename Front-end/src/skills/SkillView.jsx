import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SkillView = () => {
  const [skills, setSkills] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${API_URL}/skills/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(res.data);
      } catch (err) {
        console.error('Failed to fetch skills:', err.response?.data?.message || err.message);
      }
    };

    fetchSkills();
  }, [token]);

  if (!skills) return <p className="text-center mt-10">Loading your skills...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Skills</h2>
      <div className="space-y-3">
        <p><strong>Teach:</strong> {skills.teach}</p>
        <p><strong>Learn:</strong> {skills.learn}</p>
        <p><strong>Bio:</strong> {skills.bio}</p>
      </div>
    </div>
  );
};

export default SkillView;
