import React,{useEffect} from "react";

const SendFileModal = ({ handleClose, doctorsList }) => {


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
            setAvailableDoctors(data);
          } catch (error) {
            console.error("Error fetching doctors:", error);
          }
        };

        // Call the fetchDoctors function when the component mounts
        fetchDoctors();
      }, []);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>List of Appointed Doctors</h2>
        <ul>
          {doctorsList.map((doctor) => (
            <li key={doctor.id}>{doctor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SendFileModal;