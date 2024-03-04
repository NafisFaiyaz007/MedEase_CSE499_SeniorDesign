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
    const response = await fetch("http://localhost:8000/api/doctors"); // Adjust the endpoint based on your server
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor list:', error);
    return [];
  }
};

export const handleDoctorSelection = (doctor) => {
  // Implement logic to handle doctor selection
};

export const handleDeleteDoctor = () => {
  // Implement logic to delete the selected doctor
};



export const handleDoctorFormChange = (e) => {
  // Implement logic to handle form change
};

export const handleCreateDoctor = async (doctorForm) => {
  try {
    console.log(doctorForm);
    // Send a POST request to your backend API to create a new doctor
    const response = await axios.post("http://localhost:8000/api/users/registerDoctor", {...doctorForm});

    // Handle success - clear the form and display a success message
    console.log("Doctor created successfully:", response.data);
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
