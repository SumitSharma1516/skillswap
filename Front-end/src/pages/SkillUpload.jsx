import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SkillUpload = () => {
  const [teach, setTeach] = useState('');
  const [learn, setLearn] = useState('');
  const [bio, setBio] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/skills/upload`,
        { teach, learn, bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Skills uploaded successfully!');
      setTeach('');
      setLearn('');
      setBio('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload skills');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Skills You Can Teach</label>
          <input
            type="text"
            value={teach}
            onChange={(e) => setTeach(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g. Photoshop, JavaScript"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Skills You Want to Learn</label>
          <input
            type="text"
            value={learn}
            onChange={(e) => setLearn(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g. UI Design, React Native"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Short Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Tell others a bit about yourself"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
        >
          Submit Skills
        </button>
      </form>
    </div>
  );
};

export default SkillUpload;
