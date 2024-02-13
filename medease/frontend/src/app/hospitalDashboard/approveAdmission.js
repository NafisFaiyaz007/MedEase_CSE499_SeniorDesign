// ApproveAdmission.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";
import { useState, useEffect } from "react";



const ApproveAdmission = ({
//   admissionsToApprove,
  handleApproveAdmission,
  handleRejectAdmission,
}) => {
     const [admissionsToApprove, setAdmissionsToApprove] = useState([
       // Dummy data, replace with actual admissions data
       { patientName: "John Doe", reason: "Emergency", date: "2023-12-20" },
       { patientName: "Jane Smith", reason: "Surgery", date: "2023-12-21" },
       // Add more admissions as needed
     ]);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        Approve Admissions
      </h2>

      {/* List of Admissions to Approve */}
      {admissionsToApprove.length > 0 ? (
        <ul className="space-y-4">
          {admissionsToApprove.map((admission, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {admission.patientName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Reason: {admission.reason}
                </p>
                <p className="text-sm text-gray-500">Date: {admission.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
                  onClick={() => hospitalFunction.handleApproveAdmission(admission)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                  onClick={() => hospitalFunction.handleRejectAdmission(admission)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-center">No admissions to approve.</p>
      )}
    </div>
  );
};

export default ApproveAdmission;
