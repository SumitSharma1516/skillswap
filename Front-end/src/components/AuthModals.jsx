// src/components/AuthModals.js
import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthModals = ({ showLogin, setShowLogin, showRegister, setShowRegister }) => {
  const closeAll = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeAll}
            >
              &times;
            </button>
            <Login closeModal={closeAll} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeAll}
            >
              &times;
            </button>
            <Register closeModal={closeAll} />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModals;
