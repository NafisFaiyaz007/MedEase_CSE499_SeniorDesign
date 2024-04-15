// doctorFunctions.js

export const handleEditAccount = () => {
  // Implement logic for editing the doctor's account
  console.log("Editing account");
  // Add your logic here
};

export const handleSetAvailability = () => {
  // Implement logic for setting doctor's availability
  console.log("Setting availability");
  // Add your logic here
};

export const handleDeleteAccount = () => {
  // Implement logic for deleting the doctor's account
  console.log("Deleting account");
  // Add your logic here
};

export const handleCheckPatientList = () => {
  // Implement logic for checking the patient list
  console.log("Checking patient list");
  // Add your logic here
};

export const handleViewSchedule = () => {
  // Implement logic for viewing the doctor's schedule
  console.log("Viewing schedule");
  // Add your logic here
};

export const handleSetPhysicalAppointment = () => {
  // Implement logic for setting a physical appointment
  console.log("Setting physical appointment");
  // Add your logic here
};

export const handleEditAccountChange = (e) => {
  const { name, value } = e.target;
  setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
};

// pages/doctor/doctorFunctions.js

export const handleDeletePatient = (patientId) => {
  // Implement logic to delete the patient with the given ID
  console.log(`Deleting patient with ID: ${patientId}`);
};

export const handleExaminePatient = (patientId) => {
  // Implement logic to mark the patient as examined
  console.log(`Examining patient with ID: ${patientId}`);
};

export const setPhysicalAppointment = (patientId) => {
  // implement the logic to set plysical appointment with a patient
};

export const handleDateChange = (date) => {
  setSelectedDate(date);
};

export const handleTimeChange = (time) => {
  setSelectedTime(time);
};

export const handleSetAvailabilityDoctor = () => {
  // Implement logic to set the availability with selectedDate and selectedTime
  console.log("Setting availability:", selectedDate, selectedTime);
};

//Function for fetching and opening the document
export const handleViewReport = async (fileID) => {
  try {
    const response = await fetch("http://localhost:8000/api/users/doctor/readFile", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileID: fileID }),
      credentials: "include"
    });
    const data = await response.json();
    console.log(data)
    //setPatientList(data)
    updateReports(data);
    // Update the state with the fetched doctors
    // setAvailableDoctors(data);
  } catch (error) {
    console.error("Error fetching patient:", error);
  }
};

//Function for getting the list of all documents
export const handleGetReports = async (patient, updateReports) => {
  try {
    const response = await fetch("http://localhost:8000/api/users/doctor/getFiles", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientUUID: patient.UUID }),
      credentials: "include"
    });
    const data = await response.json();
    console.log(data)
    //setPatientList(data)
    updateReports(data);
    // Update the state with the fetched doctors
    // setAvailableDoctors(data);
  } catch (error) {
    console.error("Error fetching patient:", error);
  }
}

export const handleCloseModal = () => {
  setSelectedPatient(null);
};
