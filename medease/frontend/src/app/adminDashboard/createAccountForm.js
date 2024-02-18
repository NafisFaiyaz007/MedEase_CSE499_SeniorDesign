import React, { useState } from "react";
import axios from "axios";

const CreateAccountForm = () => {
  const [selectedAccountType, setSelectedAccountType] = useState("doctor");
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(true);

  const handleCreateAccountModalClose = () => {
    setShowCreateAccountModal(false);
  };

  const handleCreateAccountSubmit = async (formData) => {
    // Implement logic to handle form submission (e.g., send data to server)
    try {
      let uType = 5;
      if (selectedAccountType.toLocaleLowerCase() === "hospital") uType = 2;
      else if (selectedAccountType.toLowerCase() === "doctor") uType = 3;
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        {
          ...formData,
          userType: uType,
        }
      );

      console.log(response.data);
      // Handle success or redirect to login page
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }

    console.log(
      `Form submitted for ${selectedAccountType} with data:`,
      formData
    );
    // Close the modal after submission
    setShowCreateAccountModal(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Extract form data and pass it to the submit handler
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        handleCreateAccountSubmit(data);
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="accountType"
          className="block text-sm font-medium text-gray-700"
        >
          Account Type
        </label>
        <select
          id="accountType"
          name="accountType"
          className="mt-1 p-2 w-full text-black border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setSelectedAccountType(e.target.value)}
          value={selectedAccountType}
        >
          <option value="doctor">Doctor</option>
          <option value="hospital">Hospital</option>
        </select>
      </div>

      {selectedAccountType === "doctor" && (
        <>
          {/* Render doctor fields */}
          <div className="mb-4">
            {/* Add labels and input fields for doctor */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {selectedAccountType === "hospital"
                  ? "Hospital"
                  : selectedAccountType === "doctor"
                  ? "Doctor"
                  : "Pharmacy"}{" "}
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-2 w-full text-black border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="degree"
                className="block text-sm font-medium text-gray-700"
              >
                {selectedAccountType === "hospital"
                  ? "Hospital"
                  : selectedAccountType === "doctor"
                  ? "Doctor"
                  : "Pharmacy"}{" "}
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
              >
                specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital
              </label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700"
              >
                designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="age"
                id="age"
                name="age"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="hospital_id"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital ID
              </label>
              <input
                type="text"
                id="hospital_id"
                name="hospital_id"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div> */}
          </div>
        </>
      )}

      {selectedAccountType === "hospital" && (
        <>
          {/* Render hospital fields */}
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="hospital_id"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital_id
              </label>
              <input
                type="text"
                id="hospital_id"
                name="hospital_id"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="user_id"
                className="block text-sm font-medium text-gray-700"
              >
                User_id
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_no"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_no"
                name="phone_no"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Add labels and input fields for hospital */}
          </div>
        </>
      )}

      {/* Add common form fields here */}
      {/* ... (rest of your form fields) */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCreateAccountModalClose}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-300 focus:outline-none transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
