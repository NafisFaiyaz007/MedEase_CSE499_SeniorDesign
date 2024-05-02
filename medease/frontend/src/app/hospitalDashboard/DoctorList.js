// DeleteDoctor.js
import React, {useState, useEffect} from "react";
import * as hospitalFunction from "./hospitalFunctions";

const DoctorList = ({ handleDoctorSelection, handleDeleteDoctor }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor list when the component mounts
    const fetchData = async () => {
      const doctors = await hospitalFunction.fetchDoctorList();
      setDoctorList(doctors);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
   {/* List of Doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {doctorList.map((doctor) => (
          <div key={doctor.id} className={`bg-white p-6 rounded-md shadow-md `}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Name: {doctor.name}
            </h3>
            <h6 className="text-lg font-thin text-gray-500 mb-2">
              {doctor.designation}
            </h6>
            <h6 className="text-lg font-thin text-gray-500 mb-2">
              ID: {doctor.doctor_id}
            </h6>
            {/* Delete Button */}
            <button
              onClick={() => hospitalFunction.handleDoctorSelection(doctor)}
              className="bg-red-700 font-semibold text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-900 transition duration-300"
            >
              Delete Doctor
            </button>
            {/* <button
              onClick={() => hospitalFunction.handleDoctorSelection(doctor)}
              className="bg-green-700 font-semibold text-white mx-5 px-4 py-2 rounded-md focus:outline-none hover:bg-green-900 transition duration-300"
            >
              View Doctor Profile
            </button> */}
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

export default DoctorList;
