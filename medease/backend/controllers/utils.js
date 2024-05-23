const connection = require('../db');
const registerUser = require('../fabric/registerUser');

async function getDoctorUserIDfromDoctorID(doctorID) {
    const query1 = "SELECT user_id FROM doctors WHERE doctors.doctor_id = ?";
    const [doctorUserID] = await connection.execute(query1, [doctorID]);
    return doctorUserID[0].user_id;
}
async function getDoctorUUID(userID) {
    const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
    const [doctorID] = await connection.execute(query1, [userID]);
    return doctorID;
}
const getPatientList = async (req, res) => {
    const doctorUUID = req.session.user.UUID;
    const userID = req.session.user.userId;
    // console.log(doctorUUID, userID)
    try {
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
    catch {
        res.status(500).json({ error: "No patients found" })
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
    } catch {
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
    } catch {
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
        const query2 = "SELECT `AppointmentSlots`.*, doctors.doctor_id FROM`appointmentSlots` INNER JOIN `doctors` ON`appointmentSlots`.doctor_id = `doctors`.doctor_id  WHERE`appointmentSlots`.doctor_id = ? AND `available` = 1";
        const [results] = await connection.execute(query2, [doctorID[0].doctor_id]);
        res.send(results);
    } catch (e) {
        console.log(e)
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
        res.json({ message: "Successfully deleted appointment slot" });
    } catch {
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
        const query2 = "SELECT `appointments`.*, doctors.doctor_id, users.name, users.UUID FROM`appointments` INNER JOIN `doctors` ON`appointments`.doctor_id = `doctors`.doctor_id INNER JOIN `patients` ON`appointments`.patient_id = `patients`.patient_id INNER JOIN `users` ON`patients`.`user_id` = `users`.id WHERE`appointments`.doctor_id = ? AND appointments.status = 'pending'";
        const [results] = await connection.execute(query2, [doctorID[0].doctor_id]);
        res.send(results);
    } catch {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
}


const PatientViewDoctorSchedule = async (req, res) => {
    const doctorID = req.params.doctorID;
    // const userID = req.body.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        // const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        // const [doctorID] = await connection.execute(query1, [userID]);
        // // console.log(doctorID[0].doctor_id)
        const query2 = "SELECT `AppointmentSlots`.*, doctors.doctor_id FROM`appointmentSlots` INNER JOIN `doctors` ON`appointmentSlots`.doctor_id = `doctors`.doctor_id  WHERE`appointmentSlots`.doctor_id = ?  AND `available` = 1";
        const [results] = await connection.execute(query2, [doctorID]);
        res.send(results);
    } catch {
        res.status(500).json({ error: 'Failed to fetch appointment slots' });
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

const hospitalGetPatients = async (req, res) => {
    const userID = req.session.user.userId;
    try {
        const query1 = "SELECT hospital_id FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE users.id = ?";
        const [hospitalID] = await connection.execute(query1, [userID]);
        const query2 = "SELECT id, name, phone_number, email, dateOfBirth, gender, address, UUID FROM patients INNER JOIN users ON patients.user_id = users.id WHERE hospital_id =?";
        const [patients] = await connection.execute(query2, [hospitalID[0].hospital_id]);
        // console.log(patients)
        // patients.forEach(patient => {
        //     console.log(patient.email);
        // });
        res.json(patients)
    } catch (error) {
        console.error("Error getting patients info from the database:", error);
        res.status(500).json({ error: "Error getting patient info from the database" });
    }
}

const hospitalGetDoctors = async (req, res) => {
    const userID = req.session.user.userId;
    try {
        const query1 = "SELECT hospital_id FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE users.id = ?";
        const [hospitalID] = await connection.execute(query1, [userID]);
        const query2 = "SELECT id, name, phone_number, email, dateOfBirth, UUID, doctors.* FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE hospital_id =?";
        const [doctors] = await connection.execute(query2, [hospitalID[0].hospital_id]);
        // console.log(patients)
        // patients.forEach(patient => {
        //     console.log(patient.email);
        // });
        res.json(doctors)
    } catch (error) {
        console.error("Error getting doctors info from the database:", error);
        res.status(500).json({ error: "Error getting doctor info from the database" });
    }
}

const transferPatient = async (req, res) => {
    const newHospitalID = req.body.newHospitalID;
    const patientID = req.body.patientID;
    let conn = await connection.getConnection();
    try {
        await conn.beginTransaction()
        const query = "UPDATE `patients` SET `hospital_id`= ? WHERE `user_id`= ?";
        const result = await conn.execute(query, [newHospitalID, patientID])
        if (result[0].affectedRows === 0) {
            return res.status(500).json("Error transferring patient");
        }
        const query2 = "SELECT name FROM users INNER JOIN hospitals ON hospitals.`user_id`= users.id WHERE hospitals.hospital_id = ? AND hospitals.`user_id`= users.id";
        const [hospitalName] = await conn.execute(query2, [newHospitalID])

        const message = `You have been transferred to ${hospitalName[0].name}`;
        await conn.execute("INSERT INTO `Notifications`(`user_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, FALSE, NOW())", [patientID, message]);

        await conn.commit();
        return res.json("Patient transferred successfully");
    } catch {
        await conn.rollback()
        res.status(500).json("Error transferring patient");
    }
}
const hospitalAnalytics = async (req, res) => {
    const userID = req.session.user.userId;
    const queryHospital_id = "SELECT hospital_id FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE users.id = ?";
    const [hospitalID] = await connection.execute(queryHospital_id, [userID]);
    const queryPatients = "SELECT COUNT(*) as totalPatients FROM patients WHERE hospital_id = ?";
    const queryDoctors = "SELECT COUNT(*) as totalDoctors FROM doctors WHERE hospital_id = ? ";
    const queryBeds = "SELECT `beds` FROM `hospitals` WHERE hospital_id = ?"

    let analyticsData = {};

    // Execute the queries in parallel
    Promise.all([
        connection.execute(queryPatients, [hospitalID[0].hospital_id]),
        connection.execute(queryDoctors, [hospitalID[0].hospital_id]),
        connection.execute(queryBeds, [hospitalID[0].hospital_id]),
    ])
        .then((results) => {
            analyticsData = {
                totalPatients: results[0][0][0].totalPatients,
                totalDoctors: results[1][0][0].totalDoctors,
                beds: results[2][0][0].beds,
            };
            res.json(analyticsData);
        })
        .catch((err) => {
            console.error("Error fetching analytics data from MySQL:", err);
            res.status(500).send("Internal Server Error");
        });
}
const hospitalPendingPatients = async (req, res) => {
    const userID = req.session.user.userId;
    try {
        const query1 = "SELECT hospital_id FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE users.id = ?";
        const [hospitalID] = await connection.execute(query1, [userID]);
        const query2 = "SELECT id, name, phone_number, email, dateOfBirth, gender, address, UUID FROM patients INNER JOIN users ON patients.user_id = users.id WHERE hospital_id =? AND status = 'pending'";
        const [patients] = await connection.execute(query2, [hospitalID[0].hospital_id]);
        // console.log(patients)
        // patients.forEach(patient => {
        //     console.log(patient.email);
        // });
        res.json(patients)
    } catch (error) {
        console.error("Error getting patients info from the database:", error);
        res.status(500).json({ error: "Error getting patient info from the database" });
    }
}

const registerPatientToBlockchain = async (req, res) => {
    const userUUID = req.session.user.UUID;
    const patientID = req.body.patientUserID;
    const patientUUID = req.body.patientUUID;
    const patientName = req.body.patientName;
    console.log(patientID)
    try {
        await registerUser.registerUserFunction(patientUUID, patientName, userUUID);
    } catch (error) {
        return res.status(500).json({ error: "Failed to enroll patient to the blockchain" })
    }
    try {
        const query2 = "UPDATE `patients` SET `status`='approved' WHERE `user_id`= ?"
        // "SELECT id, name, phone_number, email, dateOfBirth, gender, address, UUID FROM patients INNER JOIN users ON patients.user_id = users.id WHERE hospital_id =? AND status = 'pending'";
        const result = await connection.execute(query2, [patientID]);
        if (result[0].affectedRows === 0) {
            return res.status(500).json("Error registering patient");
        }
        return res.status(200).json("Patient registered successfully");
    } catch (error) {
        console.error("Error getting patients info from the database:", error);
        res.status(500).json({ error: "Error getting patient info from the database" });
    }
}

const patientBookSlot = async (req, res) => {
    let conn;
    const slot = req.body.slot;
    const userID = req.session.user.userId;
    //Query the user id and appointment time into AvailableSlots table
    conn = await connection.getConnection();
    try {

        // Start a transaction
        await conn.beginTransaction();
        const query = "SELECT * FROM `patients` INNER JOIN users ON patients.user_id = users.id WHERE user_id = ?";
        const [result1] = await conn.execute(query, [userID]);
        const query1 = "SELECT * FROM `Patients_Doctors` WHERE doctor_id = ? AND patient_id = ?";
        const [result] = await conn.execute(query1, [slot.doctor_id, result1[0].patient_id]);
        if (!result[0]) {
            try {
                const query1 = "SELECT * FROM `patients` INNER JOIN users ON patients.user_id = users.id WHERE user_id = ?";
                const [result1] = await conn.execute(query1, [userID]);
                const query2 = "INSERT INTO `Patients_Doctors`(`patient_id`, `doctor_id`) VALUES (?, ?)";
                const [results] = await conn.execute(query2, [result1[0].patient_id, slot.doctor_id]);
                // res.json({ message: "Registration successful" })             

            } catch {
                await conn.rollback();
                res.status(500).json({ error: 'Failed to register' });
            }
        }
        // const userID = req.session.user.userId;

        const query3 = "SELECT patient_id FROM patients INNER JOIN users ON patients.user_id = users.id WHERE users.id = ?";
        const [patientID] = await conn.execute(query3, [userID]);
        // console.log(slot.doctor_id, patientID[0].patient_id, slot.start_time.toString(), slot.id);
        const query4 = "INSERT INTO `appointments`(`doctor_id`, `patient_id`, `appointment_date`, `appointment_slot_id`) VALUES (?, ?, ?, ?)";
        const [results2] = await conn.execute(query4, [slot.doctor_id, patientID[0].patient_id, new Date(slot.start_time).toISOString().slice(0, 19).replace('T', ' '), slot.id]);
        const updateQuery = "UPDATE `AppointmentSlots` SET `available` = 0 WHERE id = ?";
        const [updateResults] = await conn.execute(updateQuery, [slot.id]);
        const doctorUserID = await getDoctorUserIDfromDoctorID(slot.doctor_id);
        console.log(doctorUserID)
        const message = `${req.session.user.name} booked an appointment with you.`;
        await conn.execute("INSERT INTO `Notifications`(`user_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, FALSE, NOW())", [doctorUserID, message]);

        await conn.commit();

        res.json({ message: "Appointment slot booked" });
    } catch (error) {
        await conn.rollback();

        console.log(error)
        res.status(500).json({ error: 'Failed to book appointment' });
    }
}

const getPatientAppointments = async (req, res) => {
    const userID = req.session.user.userId;
    // const userID = req.body.id;
    //Query the user id and appointment time into AvailableSlots table
    try {
        const query1 = "SELECT patient_id FROM patients INNER JOIN users ON patients.user_id = users.id WHERE users.id = ?";
        const [patientID] = await connection.execute(query1, [userID]);
        // console.log(doctorID[0].doctor_id)
        const query2 = `SELECT 
        appointments.*, 
        doctors.doctor_id, 
        users.name,
        h.address,
        u.name AS hospitalName
    FROM 
        appointments
    INNER JOIN 
        doctors ON appointments.doctor_id = doctors.doctor_id 
    INNER JOIN 
        users ON doctors.user_id = users.id 
    INNER JOIN 
        hospitals h ON doctors.hospital_id = h.hospital_id 
    INNER JOIN 
        users u ON h.user_id = u.id 
    WHERE 
        appointments.patient_id = ? AND appointments.status = 'pending';
    `;
        const [results] = await connection.execute(query2, [patientID[0].patient_id]);
        res.send(results);
    } catch {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
}

const completeCheckup = async (req, res) => {

    // const userID = req.body.id;
    const appointmentID = req.params.appointmentID;
    // console.log(req.params)
    //Query the user id and appointment time into AvailableSlots table
    try {
        // const query1 = "SELECT doctor_id FROM doctors INNER JOIN users ON doctors.user_id = users.id WHERE users.id = ?";
        // const [doctorID] = await connection.execute(query1, [userID]);
        const query2 = "UPDATE `appointments` SET `status`='complete' WHERE appointment_id = ?";
        const [results] = await connection.execute(query2, [appointmentID]);
        res.json({ message: "Checkup complete" });
    } catch {
        res.status(500).json({ error: 'Failed to set appointment to complete' });
    }
}

// Fetch notifications for a user
// router.get('/notifications', 
const notifications = async (req, res) => {
    const userId = req.session.user.userId; // Assuming user ID is available in req.user
    try {
        const [notifications] = await connection.execute(
            'SELECT notification_id, message, is_read, created_at FROM Notifications WHERE user_id = ? AND is_read = FALSE  ORDER BY created_at DESC',
            [userId]
        );
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error fetching notifications');
    }
};

// Mark notification as read
// router.post('/notifications/read',
const markAsRead = async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.session.user.userId; // Assuming user ID is available in req.user

    try {
        await connection.execute(
            'UPDATE Notifications SET is_read = TRUE WHERE user_id = ? AND notification_id = ?',
            [userId, notificationId]
        );
        res.send('Notification marked as read');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const sendNotification = async (req, res) => {
    const { message, doctorID } = req.body;
    try {
        connection.execute("INSERT INTO `Notifications`(`user_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, FALSE, NOW())", [doctorID, message]);
        res.json("Access Granted to Doctor");
    } catch (error) {
        res.status(500).send("Failed to send notification");
    }
}
const askPermission = async (req, res) => {
    const { ownerID, fileName } = req.body;
    const message = `${req.session.user.name} has requested access to file ${fileName}`;
    let conn = await connection.getConnection();
    try {
        const [user_id] =await conn.execute("SELECT id FROM users WHERE UUID = ?", [ownerID]);
        console.log(user_id[0].id)
        await conn.execute("INSERT INTO `Notifications`(`user_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, FALSE, NOW())", [user_id[0].id, message]);
        await conn.commit();
        res.json("Request sent to patient.");
    } catch (error) {
        await conn.rollback();
        res.status(500).send("Failed to send notification");
    }
}
const doctorProfile = async (req, res) => {
    // const query = "SELECT * FROM doctors"; // Assuming 'doctors' is your table name
    const userID = req.session.user.userId;
    const query = `SELECT 
    doctors.user_id,
    doctors.doctor_id, 
    doctors.degree, 
    doctors.specialization, 
    doctors.designation, 
    doctors.address,
    doctors.phone_number,
    doctors.dateOfBirth,
    doctors.address,
    hospitals.hospital_id,
    user.name AS name,
    user.UUID AS UUID,
    user.email,
    u.name AS hospitalName,
    hospitals.address AS hospitalAddress
  FROM 
    users user
  INNER JOIN 
    doctors  ON user.id = doctors.user_id 
  INNER JOIN 
    hospitals ON doctors.hospital_id = hospitals.hospital_id 
  INNER JOIN 
    users u ON hospitals.user_id = u.id
  WHERE user.id = ?`;
    try {
      const [doctors] = await connection.execute(query, [userID]);
    //   conso
      res.json(doctors);
    } catch (error) {
      console.error("Error fetching doctors from MySQL:", error);
      res.status(500).send("Internal Server Error");
    }
  };

module.exports = { getPatientList, registerUnderDoctor, getReports, setAvailability, doctorViewSchedule, PatientViewDoctorSchedule, getDoctorUUID, doctorGetAvailableSlots, doctorRemoveSlot, getBedsCount, hospitalGetPatients, hospitalGetDoctors, transferPatient, hospitalAnalytics, hospitalPendingPatients, registerPatientToBlockchain, patientBookSlot, getPatientAppointments, completeCheckup, notifications, markAsRead, askPermission, doctorProfile };