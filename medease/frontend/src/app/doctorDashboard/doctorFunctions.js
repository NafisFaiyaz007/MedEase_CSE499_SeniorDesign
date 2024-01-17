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

 const handleEditAccountChange = (e) => {
   const { name, value } = e.target;
   setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
 };
