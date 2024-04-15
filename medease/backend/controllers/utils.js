const connection = require('../db');

const getPatientList = async (req, res) => {
    const doctorUUID = req.session.user.UUID;
    const userID = req.session.user.userId;
    // console.log(doctorUUID, userID)
    const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
    const [doctorID] = await connection.execute(query1, [userID]);
    const query2 = "SELECT name, phone_number, email, dateOfBirth, gender, UUID FROM Patients_Doctors INNER JOIN patients on Patients_Doctors.patient_id = patients.patient_id INNER JOIN users ON patients.user_id = users.id WHERE doctor_id =?";
    const [patients] = await connection.execute(query2, [doctorID[0].doctor_id]);
    // console.log(patients)
    // patients.forEach(patient => {
    //     console.log(patient.email);
    // });
    res.json(patients)
}
const registerUnderDoctor = async (req, res) => {
    // console.log(req);
    const patientUserID = req.session.user.userId;
    const doctorID = req.body.doctor_id;
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
    const userID = req.session.user.id;
    const time = req.body.startTime;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        const [doctorID] = await connection.execute(query1, [userID]);
        const query2 = "INSERT INTO `AppointmentSlots`(`doctor_id`, `start_time`, `available`) VALUES (?, ?, 1)";
        const [results] = await connection.execute(query2, [doctorID, time]);
        res.json({ message: "Appointment time published successfully" });
    }catch{
        res.status(500).json({ error: 'Failed to set appointment time' });
    }
}

const viewSchedule = async (req, res) => {
    const userID = req.session.user.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        const [doctorID] = await connection.execute(query1, [userID]);
        const query2 = "SELECT * FROM `appointments` WHERE `doctor_id`= (?)";
        const [results] = await connection.execute(query2, [doctorID]);
        res.send(results);
    }catch{
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
}
module.exports = { getPatientList, registerUnderDoctor, getReports, setAvailability, viewSchedule};