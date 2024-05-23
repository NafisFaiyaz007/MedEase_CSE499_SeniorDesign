// PrescriptionModal.js
import React, { useState, useEffect } from "react";

import { jsPDF } from "jspdf";


const PrescriptionModal = ({
  patientDetails,
  onClose,
  onPrescriptionSubmit,
}) => {

  const [doctor, setDoctor] = useState('');

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/doctorProfile", {
          method: "GET", // or "POST" based on your backend logic
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched doctor data:", data); // Log the fetched data
          setDoctor(data[0]);
        } else {
          console.error("Failed to fetch doctor data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    // Format as "YYYY-MM-DD", you can customize it as needed
    const formattedDate = date.getFullYear() + '-' + 
                          (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                          date.getDate().toString().padStart(2, '0');
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = getCurrentDate(); // Get the current date string

    // Create a PDF document
    const doc = new jsPDF();
    // Add form data to the PDF
    doc.text(`Prescription for: ${patientDetails.name}`, 10, 10);
    doc.text(`Issued by: ${doctor.name}`, 10, 20);
    doc.text(`Date: ${currentDate}`, 10, 30);
    doc.text(`Medication: ${e.target.medication.value}`, 10, 40);
    if (e.target.investigation.value) {
      doc.text(`Investigation: ${e.target.investigation.value}`, 10, 50);
    }
  
    // Generate the PDF as a blob
    const pdfBlob = doc.output('blob');
  
    // Create FormData and append the blob
    const formData = new FormData();

    formData.append('pdf', pdfBlob, `Prescription-${patientDetails.name}-${currentDate}-${doctor.name}.pdf`);
    formData.append('patientUUID', patientDetails.UUID);
    formData.append('medication', e.target.medication.value);
    formData.append('investigation', e.target.investigation.value);
  
    // Optionally, handle form data submission here
    onPrescriptionSubmit(formData);
  
    // Close the modal
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center text-gray-800">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div
          onClick={onClose}
          className="absolute top-0 right-0 p-4 cursor-pointer"
        >
          &times;
        </div>

        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-2xl font-semibold mb-4">
            Write Prescription for {patientDetails.name}
          </h2>

          {/* Prescription Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medication:
              </label>
              <input
                type="text"
                name="medication"
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Investigation:
              </label>
              <input
                type="text"
                name="investigation"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Add more form fields as needed */}
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit Prescription
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
