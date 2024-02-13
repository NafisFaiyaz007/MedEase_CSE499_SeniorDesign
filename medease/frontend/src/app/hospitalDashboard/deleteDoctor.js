// DeleteDoctor.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";

const DeleteDoctor = ({
  doctorList,
  selectedDoctor,
  handleDoctorSelection,
  handleDeleteDoctor,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Delete Doctor</h2>
      {/* List of Doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {doctorList.map((doctor) => (
          <div
            key={doctor.id}
            className={`bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105`}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {doctor.name}
            </h3>
            {/* Delete Button */}
            <button
              onClick={() => hospitalFunction.handleDoctorSelection(doctor)}
              className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
            >
              Delete Doctor
            </button>
          </div>
        ))}
      </div>
      {/* Delete Button */}
      {selectedDoctor && (
        <button
          onClick={hospitalFunction.handleDeleteDoctor}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          Delete Selected Doctor
        </button>
      )}
    </div>
  );
};

export default DeleteDoctor;
