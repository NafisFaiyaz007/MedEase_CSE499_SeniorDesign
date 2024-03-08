// PrescriptionModal.js
import React from "react";

const PrescriptionModal = ({
  patientDetails,
  onClose,
  onPrescriptionSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle prescription submission logic here
    // You can call onPrescriptionSubmit with the prescription details
    // and close the modal afterward
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
