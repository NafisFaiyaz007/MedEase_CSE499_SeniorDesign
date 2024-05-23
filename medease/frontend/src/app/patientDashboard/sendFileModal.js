import React, { useEffect, useState } from "react";
import Modal from "../components/modal";

const SendFileModal = ({ handleClose, currentFile }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [hospitalsList, setHpspitalsList] = useState([]);
  const [activeTab, setActiveTab] = useState('doctors'); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

      // Filtered lists based on search term
    const filteredDoctors = doctorsList.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredHospitals = hospitalsList.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  useEffect(() => {
    // Fetch data from the doctor database here
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/doctors", {
          method: "GET", // or "POST" based on your backend logic
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        // Update the state with the fetched doctors
        setDoctorsList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/hospitals", {
          method: "GET", // or "POST" based on your backend logic
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        // Update the state with the fetched doctors
        setHpspitalsList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    // Call the fetchDoctors function when the component mounts
    fetchDoctors();
    fetchHospitals();
  }, []);

  // Function to handle sending a file to a doctor
  const sendFileToDoctor = async (doctor) => {
    console.log(doctor)
    // Implement sending file logic here
    console.log("Sending file to doctor with ID:", doctor.name + " and file: " + currentFile.fileName);
    try {
      const response = await fetch("http://localhost:8000/api/users/patient/grant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorUUID: doctor.UUID, fileID: currentFile.ID, doctorID: doctor.user_id, fileName: currentFile.fileName}),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
      // Update the state with the fetched doctors
      // setDoctorsList(data);
      
      setModalContent(data)
      setModalIsOpen(true)
      }
      else{
        setModalContent(data.error)
        setModalIsOpen(true)
      }
    } catch (error) {
      console.error("Error granting permission to doctor:", error);
    }
  };
  // Function to handle revoking a file from a doctor
  const revokePermission = async (doctor) => {
    // Implement sending file logic here
    console.log("Revoking file from doctor with ID:", doctor.name + " and file: " + currentFile.fileName);
    try {
      const response = await fetch("http://localhost:8000/api/users/patient/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorUUID: doctor.UUID, fileID: currentFile.ID}),
        credentials: "include",
      });
      const data = await response.json();

      // Update the state with the fetched doctors
      // setDoctorsList(data);
      console.log(data);
      if(response.ok){
        // Update the state with the fetched doctors
        // setDoctorsList(data);
        
        setModalContent(data)
        setModalIsOpen(true)
        }
        else{
          setModalContent(data.error)
          setModalIsOpen(true)
        }
    } catch (error) {
      console.error("Error granting permission to doctor:", error);
    }
  };
return (
  <div className="modal fixed top-0 text-gray-800 left-0 w-full h-full flex items-center justify-center">
  <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
  <div className="modal-container bg-gray-200 w-10/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto"> 
    <div className="modal-content py-4 text-left px-6">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-2xl font-bold">List of {activeTab === 'doctors' ? 'Doctors' : 'Hospitals'}</h2>
        <button className="modal-close cursor-pointer z-50" onClick={handleClose}>
          <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M18 1.425L16.575 0 9 7.575 1.425 0 0 1.425 7.575 9 0 16.575 1.425 18 9 10.425 16.575 18 18 16.575 10.425 9z" />
          </svg>
        </button>
      </div>
      <input type="text" placeholder={`Search ${activeTab}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-bar mb-4 w-full" />
      <div className="tab-container space-x-2 py-2">
        <button className={`bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold ${activeTab === 'doctors' ? 'text-blue-700' : 'text-gray-600'}`} onClick={() => setActiveTab('doctors')}>Doctors</button>
        <button className={`bg-white inline-block rounded-t py-2 px-4 font-semibold ${activeTab === 'hospitals' ? 'text-blue-700' : 'text-gray-600'}`} onClick={() => setActiveTab('hospitals')}>Hospitals</button>
      </div>
      <div className="list-container overflow-y-auto max-h-64"> 
        {activeTab === 'doctors' ? (
          <ul className="flex flex-col space-y-2">
            {filteredDoctors.map((doctor) => (
              <li key={doctor.doctor_id} className="flex justify-between items-center bg-white p-2 rounded-md">
                <span>{doctor.degree} {doctor.name} - {doctor.designation}</span>
                <div className="flex space-x-2">
                  <button onClick={() => sendFileToDoctor(doctor)} className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded w-24">Send File</button> 
                  <button onClick={() => revokePermission(doctor)} className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-24">Revoke Access</button> 
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col space-y-2">
            {filteredHospitals.map((hospital) => (
              <li key={hospital.hospital_id} className="flex justify-between items-center bg-white p-2 rounded-md">
                <span>{hospital.name} - {hospital.address}</span>
                <div className="flex space-x-2">
                  <button onClick={() => sendFileToDoctor(hospital)} className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded w-24">Send File</button> 
                  <button onClick={() => revokePermission(hospital)} className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-24">Revoke Access</button> 
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  </div>
</div>


//   <div className="modal fixed top-0 text-gray-800 left-0 w-full h-full flex items-center justify-center">
//   <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
//   <div className="modal-container bg-gray-200 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
//     <div className="modal-content py-4 text-left px-6">
//       <div className="flex justify-between items-center pb-3">
//         <h2 className="text-2xl font-bold">List of {activeTab === 'doctors' ? 'Doctors' : 'Hospitals'}</h2>
//         <button
//           className="modal-close cursor-pointer z-50"
//           onClick={handleClose}
//         >
//           <svg
//             className="fill-current text-black"
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//           >
//             <path d="M18 1.425L16.575 0 9 7.575 1.425 0 0 1.425 7.575 9 0 16.575 1.425 18 9 10.425 16.575 18 18 16.575 10.425 9z" />
//           </svg>
//         </button>
//       </div>
//       <input
//         type="text"
//         placeholder={`Search ${activeTab}`}
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//         className="search-bar"
//       />
//       <div className="tab-container space-x-2 py-2">
//         <button className={`bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold ${activeTab === 'doctors' ? 'text-blue-700' : 'text-gray-600'}`} onClick={() => setActiveTab('doctors')}>Doctors</button>
//         <button className={`bg-white inline-block rounded-t py-2 px-4 font-semibold ${activeTab === 'hospitals' ? 'text-blue-700' : 'text-gray-600'}`} onClick={() => setActiveTab('hospitals')}>Hospitals</button>
//       </div>
//       <div className="list-container">
//         {activeTab === 'doctors' ? (
//           <ul className="flex flex-col sm:flex-row flex-wrap">
//             {filteredDoctors.map((doctor) => (
//               <li
//                 key={doctor.doctor_id}
//                 className="flex justify-between items-center mb-2 px-2 bg-white w-full sm:w-auto"
//               >
//                 <span>{doctor.degree} {doctor.name}- {doctor.designation}</span>
//                 <div className="flex mt-2 sm:mt-0 space-x-2">
//                   <button
//                     onClick={() => sendFileToDoctor(doctor)}
//                     className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Send File
//                   </button>
//                   <button
//                     onClick={() => revokePermission(doctor)}
//                     className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Revoke Access
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <ul className="flex flex-col sm:flex-row flex-wrap">
//             {filteredHospitals.map((hospital) => (
//               <li
//                 key={hospital.hospital_id}
//                 className="flex justify-between items-center mb-2 px-2 bg-white w-full sm:w-auto"
//               >
//                 <span>{hospital.name}- {hospital.address}</span>
//                 <div className="flex mt-2 sm:mt-0 space-x-2">
//                   <button
//                     onClick={() => sendFileToDoctor(hospital)}
//                     className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Send File
//                   </button>
//                   <button
//                     onClick={() => revokePermission(hospital)}
//                     className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Revoke Access
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
//         {modalContent}
//       </Modal>
//     </div>
//   </div>

// </div>

);
};

export default SendFileModal;
