// EditAccount.js
"useClient";
import React, { useState } from "react";

const EditAccountForm = () => {
  // Your EditAccount component code here

  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    email: "john.doe@example.com",
    upcomingAppointments: [
      {
        doctor: "Dr. Smith",
        date: "2023-12-20",
        time: "10:00 AM",
      },
      // Add more appointments as needed
    ],
  });

  const [editAccountForm, setEditAccountForm] = useState({
    editName: "",
    editAge: "",
    editAddress: "",
    editPhoneNumber: "",
    // Add more fields as needed
  });
  const handleEditAccount = () => {
    // Implement logic to edit the account
    console.log("Editing account");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the account
    console.log("Deleting account");
    // You may want to show a confirmation modal and proceed accordingly
  };
  const handleEditAccountChange = (e) => {
    const { name, value } = e.target;
    setEditAccountForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Edit Account
        </h2>
        {/* Edit Account Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="editName" className="text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="editName"
              name="editName"
              // Set the placeholder with the existing name
              placeholder={patientData.name}
              // Implement the onChange handler to update state
              onChange={(e) => handleEditAccountChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="editAge" className="text-gray-700">
              Age
            </label>
            <input
              type="text"
              id="editAge"
              name="editAge"
              placeholder={patientData.age}
              onChange={(e) => handleEditAccountChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="editAddress" className="text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="editAddress"
              name="editAddress"
              placeholder={patientData.address}
              onChange={(e) => handleEditAccountChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="editPhoneNumber" className="text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="editPhoneNumber"
              name="editPhoneNumber"
              placeholder={patientData.phoneNumber}
              onChange={(e) => handleEditAccountChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          {/* Add more fields for other account information (gender, email, etc.) */}
          <div>
            <button
              type="button"
              onClick={handleEditAccount}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-purple-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Delete Account Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>
    );
  };

export default EditAccountForm;
