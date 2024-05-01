const connection = require('../db');

async function getDoctorUUID(userID) {
    const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
    const [doctorID] = await connection.execute(query1, [userID]);
    return doctorID;
}
const getPatientList = async (req, res) => {
    const doctorUUID = req.session.user.UUID;
    const userID = req.session.user.userId;
    // console.log(doctorUUID, userID)
    try{
    const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
    const [doctorID] = await connection.execute(query1, [userID]);
    const query2 = "SELECT name, phone_number, email, dateOfBirth, gender, UUID FROM Patients_Doctors INNER JOIN patients on Patients_Doctors.patient_id = patients.patient_id INNER JOIN users ON patients.user_id = users.id WHERE doctor_id =?";
    const [patients] = await connection.execute(query2, [doctorID[0].doctor_id]);
    // console.log(patients)
    // patients.forEach(patient => {
    //     console.log(patient.email);
    // });
    res.json(patients)}
    catch{
        res.status(500).json({ error: "No patients found"})
    }
}
const registerUnderDoctor = async (req, res) => {
    // console.log(req);
    const patientUserID = req.session.user.userId;
    const doctorID = req.body.doctor_id;
    try {
        const query1 = "SELECT * FROM `patients` INNER JOIN users ON patients.user_id = users.id WHERE user_id = ?";
        const [result1] = await connection.execute(query1, [patientUserID]);
        const query = "SELECT * FROM `Patients_Doctors` WHERE doctor_id = ? AND patient_id = ?";
        const [result] = await connection.execute(query, [doctorID, result1[0].patient_id]);
        if (!result[0]) {
            try {
                const query1 = "SELECT * FROM `patients` INNER JOIN users ON patients.user_id = users.id WHERE user_id = ?";
                const [result1] = await connection.execute(query1, [patientUserID]);
                const query2 = "INSERT INTO `Patients_Doctors`(`patient_id`, `doctor_id`) VALUES (?, ?)";
                const [results] = await connection.execute(query2, [result1[0].patient_id, doctorID]);
                res.json({ message: "Registration successful" });
            } catch {
                res.status(500).json({ error: 'Failed to register' });
            }
        }
        else
            res.status(500).json({ error: "You are already registered under " });
    }
    catch {
        res.status(500).json({ error: "Failed to register" });
    }
}

const getReports = async (req, res) => {
    // console.log(req);
    const patientUserID = req.body.patientUUID;
    const doctorUUID = req.session.user.UUID;
    
    try {
        const query1 = "SELECT * FROM `patients` INNER JOIN users ON patients.user_id = users.id WHERE user_id = ?";
        const [result1] = await connection.execute(query1, [patientUserID]);
        const query2 = "INSERT INTO `Patients_Doctors`(`patient_id`, `doctor_id`) VALUES (?, ?)";
        const [results] = await connection.execute(query2, [result1[0].patient_id, doctorID]);
        res.json({ message: "Appointment created successfully" });
    }catch{
        res.status(500).json({ error: 'Failed to set appointment' });
    }
    
}

const setAvailability = async (req, res) => {
    const userID = req.session.user.userId;
    // const userID = req.body.id;
    const time = req.body.time;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        const [doctorID] = await connection.execute(query1, [userID]);
        const query2 = "INSERT INTO `AppointmentSlots`(`doctor_id`, `start_time`, `available`) VALUES (?, ?, 1)";
        const [results] = await connection.execute(query2, [doctorID[0].doctor_id, time]);
        res.json({ message: "Appointment time published successfully" });
    }catch{
        res.status(500).json({ error: 'Failed to set appointment time' });
    }
}

const doctorGetAvailableSlots = async (req, res) => {
    // const userID = req.body.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const userID = req.session.user.userId;
        const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        const [doctorID] = await connection.execute(query1, [userID]);
        // console.log(doctorID[0].doctor_id)
        const query2 = "SELECT `AppointmentSlots`.*, doctors.doctor_id FROM`appointmentSlots` INNER JOIN `doctors` ON`appointmentSlots`.doctor_id = `doctors`.doctor_id  WHERE`appointmentSlots`.doctor_id = ? ";
        const [results] = await connection.execute(query2, [doctorID[0].doctor_id]);
        res.send(results);
    }catch{
        res.status(500).json({ error: 'Failed to fetch appointment slots' });
    }
}

const doctorRemoveSlot = async (req, res) => {
    // const userID = req.body.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        // const userID = req.session.user.userId;
        const id = req.body.id;
        // const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        // const [doctorID] = await connection.execute(query1, [userID]);
        // console.log(doctorID[0].doctor_id)
        const query2 = "DELETE FROM `AppointmentSlots` WHERE id = ?";
        const [results] = await connection.execute(query2, [id]);
        res.json({message:"Successfully deleted appointment slot"});
    }catch{
        res.status(500).json({ error: 'Failed to delete appointment slot' });
    }
}

const doctorViewSchedule = async (req, res) => {
    const userID = req.session.user.userId;
    // const userID = req.body.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        const [doctorID] = await connection.execute(query1, [userID]);
        // console.log(doctorID[0].doctor_id)
        const query2 = "SELECT `appointments`.*, doctors.doctor_id, users.name, users.UUID FROM`appointments` INNER JOIN `doctors` ON`appointments`.doctor_id = `doctors`.doctor_id INNER JOIN `patients` ON`appointments`.patient_id = `patients`.patient_id INNER JOIN `users` ON`patients`.`user_id` = `users`.id WHERE`appointments`.doctor_id = ? ";
        const [results] = await connection.execute(query2, [doctorID[0].doctor_id]);
        res.send(results);
    }catch{
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
}

const getBedsCount = async (req, res) => {
    try {
        const userId = req.session.user.userId;
        // const userId = req.body.id;
        // console.log(userId)
        //   const { bedsCounter } = req.body;

        //   // Validate if the bedsCounter is a valid number
        //   if (isNaN(bedsCounter)) {
        //     return res.status(400).json({ error: "Invalid bedsCounter value" });
        //   }


        // Update the bedsCounter in the database
        const query = "SELECT `beds` FROM `hospitals` INNER JOIN users ON hospitals.user_id = users.id WHERE users.id = ?";
        //"UPDATE hospitals SET beds = ? WHERE hospital_id = 1"; // Adjust the WHERE condition based on your actual data
        const [result] = await connection.query(query, [userId])
        res.send(result)//res.json({ message: "Beds counter updated successfully" });
    } catch (error) {
        console.error("Error getting beds count from the database:", error);
        res.status(500).json({ error: "Error getting beds count from the database" });
    }
}
module.exports = { getPatientList, registerUnderDoctor, getReports, setAvailability, doctorViewSchedule, getDoctorUUID, doctorGetAvailableSlots, doctorRemoveSlot, getBedsCount};