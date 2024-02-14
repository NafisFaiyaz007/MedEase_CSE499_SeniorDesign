// CreateDoctorForm.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";

// const handleCreateDoctor = () => {
//   hospitalFunction.handleCreateDoctor(doctorForm);
//   // Add any other logic you want to execute on button click
// };
const CreateDoctorForm = () => {
  async function handleSubmit(e) {
    e.preventDefault();
      // Extract form data and pass it to the submit handler
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      data["userType"] = 3;
    console.log(data);
    hospitalFunction.handleCreateDoctor(data);
  }
  return (
    <div className="space-y-10 w-80">
      <h2 className="text-xl font-semibold text-white mb-4">Create Doctor</h2>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-white">
          Doctor Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          //value={doctorForm.name}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="email" className="text-white">
          Doctor Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          //value={doctorForm.email}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="dateOfBirth" className="text-white">
          {" "}
          {/* New field: Age */}
          Date Of Birth
        </label>
        <input
          type="text"
          id="dateOfBirth"
          name="dateOfBirth"
          //value={doctorForm.dateOfBirth}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="address" className="text-white">
          {" "}
          {/* New field: Age */}
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          //value={doctorForm.address}
          //onchange={handleChange}
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
          //value={doctorForm.degree}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="specialization" className="text-white">
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          //value={doctorForm.specialization}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="phone" className="text-white">
          {" "}
          {/* New field: Phone Number */}
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          //value={doctorForm.phone}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <label htmlFor="hospital_id" className="text-white">
          {" "}
          {/* New field: Hospital */}
          Hospital
        </label>
        <input
          type="text"
          id="hospital_id"
          name="hospital_id"
          //value={doctorForm.hospital_id}
          //onchange={handleChange}
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
          //value={doctorForm.designation}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        
        <label htmlFor="password" className="text-white">
            Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          //value={doctorForm.password}
          //onchange={handleChange}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
        <button
          type="submit"
          // onClick={handleCreateDoctor}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctorForm;
