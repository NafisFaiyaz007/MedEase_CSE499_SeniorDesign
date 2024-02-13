// CreateDoctorForm.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";
import { useState, useEffect } from "react";

const CreateDoctorForm = ({
  // doctorForm,
  handleDoctorFormChange,
  handleCreateDoctor,
}) => {
  const [doctorForm, setDoctorForm] = useState({
    doctorName: "",
    specialization: "",
  });
  return (
    <div className="space-y-10 w-80">
      <h2 className="text-xl font-semibold text-white mb-4">Create Doctor</h2>
      <form className="flex flex-col space-y-2">
        <label htmlFor="doctorName" className="text-white">
          Doctor Name
        </label>
        <input
          type="text"
          id="doctorName"
          name="doctorName"
          value={doctorForm.doctorName}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="degree" className="text-white">
          {" "}
          {/* New field: Degree */}
          Degree
        </label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={doctorForm.degree}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="specialization" className="text-white">
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={doctorForm.specialization}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="phoneNumber" className="text-white">
          {" "}
          {/* New field: Phone Number */}
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={doctorForm.phoneNumber}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="hospital" className="text-white">
          {" "}
          {/* New field: Hospital */}
          Hospital
        </label>
        <input
          type="text"
          id="hospital"
          name="hospital"
          value={doctorForm.hospital}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="designation" className="text-white">
          {" "}
          {/* New field: Designation */}
          Designation
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={doctorForm.designation}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="age" className="text-white">
          {" "}
          {/* New field: Age */}
          Age
        </label>
        <input
          type="text"
          id="age"
          name="age"
          value={doctorForm.age}
          onChange={handleDoctorFormChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <button
          type="button"
          onClick={hospitalFunction.handleCreateDoctor}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctorForm;
