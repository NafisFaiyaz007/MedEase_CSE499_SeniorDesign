// ApproveAdmission.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions";
import { useState, useEffect } from "react";
import Modal from "../components/modal";


const PendingRegistration = ({
    //   admissionsToApprove,
    handleApproveAdmission,
    handleRejectAdmission,
}) => {
    const [patientList, setPatientList] = useState([
        // Dummy data, replace with actual admissions data
        //    { patientName: "John Doe", reason: "Emergency", date: "2023-12-20" },
        //    { patientName: "Jane Smith", reason: "Surgery", date: "2023-12-21" },
        // Add more admissions as needed
    ]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        // Fetch doctor list when the component mounts
        const fetchData = async () => {
            const patients = await hospitalFunction.fetchUnregisteredPatients();
            setPatientList(patients);
            console.log(patients)
        };

        fetchData();
    }, []);

    function calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        // If the birth month is greater than the current month or
        // if they are in the same month but the birth day is greater than the current day,
        // then decrement the age by 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Register Patient into Blockchain
            </h2>

            {/* List of Admissions to Approve */}
            {patientList.length > 0 ? (
                <ul className="space-y-4">
                    {patientList.map((patient, index) => (
                        <li
                            key={index}
                            className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    {patient.name}
                                </h3>
                                <h6 className="text-sm text-gray-500 mb-2">
                                    Age: {calculateAge(patient.dateOfBirth)}
                                </h6>
                                <h6 className="text-sm text-gray-500 mb-2">
                                    <b>Phone: </b> {patient.phone_number}
                                </h6>
                                <h6 className="text-sm text-gray-500 mb-2">
                                    <b>Email: </b> {patient.email}
                                </h6>
                                <h6 className="text-sm text-gray-500 mb-2">
                                    <b>Gender: </b> {patient.gender}
                                </h6>
                                <h6 className="text-sm text-gray-500 mb-2">
                                    <b>Address: </b> {patient.address}
                                </h6>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
                                    onClick={() => {setModalContent(hospitalFunction.handleApproveRegistration(patient));
                                                    setModalIsOpen(true);
                                    }}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                                    onClick={() => hospitalFunction.handleRejectAdmission(patient)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white text-center">No Pending Patients.</p>
            )}
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default PendingRegistration;
