// CreateDoctorForm.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";

const CreateDoctorForm = () => {
  async function handleSubmit(e) {
    e.preventDefault();
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
    <div className="space-y-10 w-full  max-w-screen-md mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Create Doctor</h2>
      <div className="bg-gray-400 text-black p-6 rounded-md">
        <form  onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-2 gap-4 font-bold">
          {/* Column 1 */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm  text-gray-700"
            >
              Name
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
              className="block text-sm  text-gray-700"
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
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm  text-gray-700"
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
              htmlFor="degree"
              className="block text-sm  text-gray-700"
            >
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
              className="block text-sm  text-gray-700"
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
              htmlFor="dateOfBirth"
              className="block text-sm  text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* ... (other fields in Column 1) */}

          {/* Column 2 */}
          <div className="mb-4">
            <label
              htmlFor="hospital"
              className="block text-sm  text-gray-700"
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
              className="block text-sm  text-gray-700"
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
              htmlFor="hospital_id"
              className="block text-sm  text-gray-700"
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

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm  text-gray-700"
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
              className="block text-sm  text-gray-700"
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
          {/* ... (other fields in Column 2) */}

          {/* Submit button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none transition duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctorForm;
