const express = require('express');
const dbConnection = require('./db');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({}, dbConnection);
const authenticateUser = require("./controllers/userController").checkSession;

var cors = require('cors')
const port = 8000;
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60, // Milliseconds in an hour (1 hour)
    expires: new Date(Date.now() + 1000 * 60 * 60)
  }
}));
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin if different
  credentials: true // Allow cookies for withCredentials requests
}));

app.get('/', (req, res) => {
  res.send('Welcome to my MedEase!');
});
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
const userRoutes = require('./routes');
app.use(express.json());
app.use('/api/users', userRoutes);
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true in production
// }));



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
dbConnection
    .getConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Failed to connect to the database: ${err.message}`);
    });

 // API endpoint to fetch analytics data
app.get('/api/analytics', (req, res) => {
  const queryPatients = "SELECT COUNT(*) as totalPatients FROM patients";
  const queryDoctors = "SELECT COUNT(*) as totalDoctors FROM doctors";
  const queryHospitals = "SELECT COUNT(*) as totalHospitals FROM hospitals";

  let analyticsData = {};

  // Execute the queries in parallel
  Promise.all([
    executeQuery(queryPatients),
    executeQuery(queryDoctors),
    executeQuery(queryHospitals),
  ])
    .then((results) => {
      analyticsData = {
        totalPatients: results[0][0].totalPatients,
        totalDoctors: results[1][0].totalDoctors,
        totalHospitals: results[2][0].totalHospitals,
      };

      res.json(analyticsData);
    })
    .catch((err) => {
      console.error("Error fetching analytics data from MySQL:", err);
      res.status(500).send("Internal Server Error");
    });
});

// Function to execute a MySQL query
async function executeQuery(query, params = []) {
  const [results] = await dbConnection.execute(query, params);
  return results;
}

app.use(cookieParser());
// API endpoint to fetch all doctors
app.get('/api/doctors', authenticateUser, async (req, res) => {
  // const query = "SELECT * FROM doctors"; // Assuming 'doctors' is your table name
  const query= "SELECT * FROM doctors INNER JOIN users ON doctors.user_id = users.id";
  try {
    const doctors = await executeQuery(query);
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors from MySQL:", error);
    res.status(500).send("Internal Server Error");
  }
});


// API to fetch users
// Route to fetch users by type
app.get('/api/users/', authenticateUser, async (req, res) => {
  try {
    // // Extract usertype from request params
    // const { usertype } = req.params;

    // // Validate usertype (assuming it's a number)
    // if (!usertype || isNaN(usertype)) {
    //   return res.status(400).json({ error: 'Invalid usertype' });
    // }

    // Query to fetch users based on usertype
    const query = "SELECT * FROM users WHERE userType = 2 OR userType = 3 OR userType = 4";
    const [rows] = await dbConnection.execute(query);

    res.json(rows); // Send the fetched users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to update beds in the hospital
app.put("/api/updateBeds", authenticateUser, async (req, res) => {
  try {
    const userId = req.session.user.userId;
    const { bedsCounter } = req.body;

    // Validate if the bedsCounter is a valid number
    if (isNaN(bedsCounter)) {
      return res.status(400).json({ error: "Invalid bedsCounter value" });
    }

    // Update the bedsCounter in the database
    const query = "UPDATE hospitals INNER JOIN users ON hospitals.user_id = users.id SET beds = ? WHERE users.id = ?";
    const result = await dbConnection.query(query, [bedsCounter, userId]);
    if(result[0].affectedRows === 0){
      return res.status(500).json({ error: "Error updating beds counter" });
    }
    return res.json({ message: "Beds counter updated successfully"});
  } catch (error) {
    console.error("Error updating beds counter:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch patient data
app.get('/api/patients', authenticateUser, async (req, res) => {
  try {
     
     const userId = req.session.user.userId;
    // Query to fetch patient data from MySQL
  const query =
    "SELECT * FROM patients INNER JOIN users ON patients.user_id = users.id WHERE users.id = ?";

    const patients = await executeQuery(query,[userId]);
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients from MySQL:", error);
    res.status(500).send("Internal Server Error");
  }
});




// API endpoint to fetch all hospitals
app.get('/api/hospitals', authenticateUser, async (req, res) => {
  // const query = "SELECT * FROM doctors"; // Assuming 'doctors' is your table name
  const query= "SELECT * FROM hospitals INNER JOIN users ON hospitals.user_id = users.id";
  try {
    const hospitals = await executeQuery(query);
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals from MySQL:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id; // Parse the user ID from request parameters
  const sql = "DELETE FROM users WHERE id = ?"; // SQL query to delete user by ID
  dbConnection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(204).send(); // No content, successful deletion
    }
  });
});