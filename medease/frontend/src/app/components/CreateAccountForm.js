// components/CreateAccountForm.js
import React from "react";

export const CreateAccountForm = ({ onClose }) => {
  // Implement your Create Account form here
  return (
    <div className="p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
      {/* Add your form fields and logic here */}
      <button
        onClick={onClose}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};
