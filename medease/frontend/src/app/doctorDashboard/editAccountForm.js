// EditAccountForm.js
import React from "react";
import * as DoctorFunctions from "./doctorFunctions";


const EditAccountForm = ({ doctorInfo, handleEditAccount, handleDeleteAccount, handleEditAccountChange }) => {
  return (
    <div className="space-y-10 w-80">
      <h2 className="text-xl font-semibold text-white mb-4">Edit Account</h2>
      <form className="flex flex-col space-y-2">
        {/* Doctor Information Fields */}
        <label htmlFor="doctorName" className="text-white">
          Doctor Name
        </label>
        <input
          type="text"
          id="doctorName"
          name="doctorName"
          value={doctorInfo.doctorName}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="degree" className="text-white">
          Degree
        </label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={doctorInfo.degree}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="specialization" className="text-white">
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={doctorInfo.specialization}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="phoneNumber" className="text-white">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={doctorInfo.phoneNumber}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="hospital" className="text-white">
          Hospital
        </label>
        <input
          type="text"
          id="hospital"
          name="hospital"
          value={doctorInfo.hospital}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="designation" className="text-white">
          Designation
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={doctorInfo.designation}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        <label htmlFor="age" className="text-white">
          Age
        </label>
        <input
          type="text"
          id="age"
          name="age"
          value={doctorInfo.age}
          onChange={DoctorFunctions.handleEditAccountChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />

        {/* Add more fields as needed */}

        {/* Save Changes Button */}
        <button
          onClick={DoctorFunctions.handleEditAccount}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
        >
          Save Changes
        </button>

        {/* Delete Account Button */}
        <button
          onClick={DoctorFunctions.handleDeleteAccount}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-800 transition duration-300 mt-4"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default EditAccountForm;
