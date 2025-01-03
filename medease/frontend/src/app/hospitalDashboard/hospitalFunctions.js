import axios from "axios";

export const handleApproveAdmission = (admission) => {
  // Implement logic to approve the admission
  console.log("Approving admission:", admission);
  // You may want to make an API call or update the state accordingly
};

export const handleRejectAdmission = (admission) => {
  // Implement logic to reject the admission
  console.log("Rejecting admission:", admission);
  // You may want to make an API call or update the state accordingly
};

// Sample data for the list of doctors (replace with actual data)
export const doctorList = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  // Add more doctors as needed
];
// hospitalFunctions.js
export const fetchDoctorList = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/hospital/doctors", { credentials: "include" }); // Adjust the endpoint based on your server
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor list:', error);
    return [];
  }
};
export const fetchPatientList = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/hospital/patients", { credentials: "include" }); // Adjust the endpoint based on your server
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient list:", error);
    return [];
  }
};

export const fetchUnregisteredPatients = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/hospital/pendingPatients", { credentials: "include" }); // Adjust the endpoint based on your server
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient list:", error);
    return [];
  }
};

export const handleApproveRegistration = async (patient) => {
  try {
    const response = await fetch("http://localhost:8000/api/users/hospital/registerIntoBlockchain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientUserID: patient.id, patientUUID: patient.UUID, patientName: patient.name }), credentials: "include"
    }); // Adjust the endpoint based on your server
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient list:", error);
    return [];
  }
};


export const handleDoctorSelection = (doctor) => {
  // Implement logic to handle doctor selection
};

export const handleDeleteDoctor = () => {
  // Implement logic to delete the selected doctor
};
export const handleDeleteSelectedPatient = async () => {
  if (selectedPatient) {
    // Call the provided handleDeletePatient function
    await handleDeletePatient(selectedPatient);
    // Update patient list after deletion
    const updatedPatients = patientList.filter(
      (patient) => patient.id !== selectedPatient.id
    );
    setPatientList(updatedPatients);
    // Reset selectedPatient after deletion
    setSelectedPatient(null);
  }
};


export const handleDoctorFormChange = (e) => {
  // Implement logic to handle form change
};

export const handleCreateDoctor = async (doctorForm, handleOnSubmitModal) => {
  try {
    //doctorForm.userType = 3;
    // Send a POST request to your backend API to create a new doctor
    const response = await axios.post("http://localhost:8000/api/users/registerDoctor2", { ...doctorForm }, {withCredentials:true});

    // Handle success - clear the form and display a success message
    console.log("Doctor created successfully:", response.data);
    handleOnSubmitModal(response.data.message)
    // setDoctorForm({
    //   name: "",
    //   email: "",
    //   degree: "",
    //   specialization: "",
    //   phoneNumber: "",
    //   hospital: "",
    //   designation: "",
    //   dateOfBirth: "",
    // });
    // Optionally, you can display a success message to the user
  } catch (error) {
    // Handle error - display an error message to the user
    handleOnSubmitModal(error.response.data.error)
    console.error("Error creating doctor:", error);
    // Optionally, you can display an error message to the user
  }
};

export const handleBedsCounterIncrement = () => {
  // Implement logic to increment beds counter
};

export const handleBedsCounterDecrement = () => {
  // Implement logic to decrement beds counter
};

export const getBedsCount = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/getBedsCount", { method: "GET", credentials: "include" }); // Adjust the endpoint based on your server
    const data = await response.json();
    console.log(data[0].beds)
    return data[0].beds;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
export const handleTransferPatient = async (selectedPatient, newHospitalID) => {
  console.log(selectedPatient)
  if (selectedPatient) {
    try {
      const response = await fetch("http://localhost:8000/api/users/hospital/transferPatient", { method: "POST", headers: { 'Content-Type': 'application/json' }, credentials: "include", body: JSON.stringify({ newHospitalID: newHospitalID, patientID: selectedPatient }), }); // Adjust the endpoint based on your server
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    } catch (error) {
      console.error("Error while transferring patient: " + error);
      console.log("eeroorr")
      return [];
    }
  }
};

export const fetchAnalytics = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users/hospital/analytics", { method: "GET", headers: { 'Content-Type': 'application/json' }, credentials: "include", }); // Adjust the endpoint based on your server
    const data = await response.json();
    if (response.ok) {
      console.log(data.totalPatients)
      return data;
    }
  } catch (error) {
    console.error("Error while transferring patient: " + error);
    console.log("eeroorr")
    return [];
  }
};