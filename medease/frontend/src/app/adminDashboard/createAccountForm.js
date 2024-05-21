import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAccountForm = ({
  selectedAccountType,
  showCreateAccountModal,
  setShowCreateAccountModal,
  handleOnSubmitModal
}) => {
  //const [selectedAccountType, setSelectedAccountType] = useState("");
  //const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [hospitals, setHospitals] = useState([]);


  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Failed to fetch hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  function getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  }

 const handleCloseModal = () => {
   console.log("Closing modal");
   setShowCreateAccountModal(false);
 };

  const handleOpenModal = () => {
    setShowCreateAccountModal(true);
  };

  const handleCreateAccountSubmit = async (formData) => {
    // Implement logic to handle form submission (e.g., send data to server)
    try {
      let uType;
      let url = ""
      if (selectedAccountType.toLowerCase() === "hospital") {
        uType = 2;
        url = "http://localhost:8000/api/users/registerHospital";
      }
      else if (selectedAccountType.toLowerCase() === "doctor") {
        uType = 3;
        url = "http://localhost:8000/api/users/registerDoctor";
      }
      // console.log(formData);
      const response = await axios.post(
        url,
        {
          ...formData,
          userType: uType,
        }, {withCredentials: true}
      );
      handleOnSubmitModal(response.data.message)
      // Handle success or redirect to login page
    } catch (error) {
      // Handle errors
      handleOnSubmitModal(error.response.data.error)
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

<div>
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
        setShowCreateAccountModal(false);
      }}
    >
      
      <h2 className="text-2xl text-gray-700 font-semibold mb-4">
        Create{" "}
        {selectedAccountType === "hospital"
          ? "Hospital"
          : selectedAccountType === "doctor"
            ? "Doctor"
            : "Pharmacy"}{" "}
        Account
      </h2>
      {selectedAccountType === "doctor" && (
        <>
          {/* Render doctor fields */}
          <div className={`modal ${showCreateAccountModal ? 'block' : 'hidden'}`}>
            <div className="mb-4 text-black grid-cols-2  grid gap-2">
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
                  className="mt-1 p-2 w-full input-field text-black border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
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
                  Specialization
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
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-600 mb-1">
                  Hospital
                </label>
                <select
                  id="hospital_id"
                  name="hospital_id"
                  className="mt-1 p-4 w-full border rounded-lg"
                  required
                >
                  <option value="">Select a Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.hospital_id} value={hospital.hospital_id}>
                      {hospital.name} -- {hospital.address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation
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
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your date of birth"
                  max={getMaxDate()}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {selectedAccountType === "hospital" && (
        <>
          {/* Render hospital fields */}
          <div className={`modal ${showCreateAccountModal ? 'block' : 'hidden'}`}>
            <div className="mb-4 text-black">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hospital Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Add labels and input fields for hospital */}
            </div>
          </div>
        </>
      )}

      {/* Add common form fields here */}
      {/* ... (rest of your form fields) */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCloseModal}
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
    </div>
    
  );
};

export default CreateAccountForm;
