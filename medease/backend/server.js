const express = require('express');
const dbConnection = require('./db');
// const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
var cors = require('cors')
const port = 8000;

app.use(cors())
app.get('/', (req, res) => {
  res.send('Welcome to my MedEase!');
});
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
const userRoutes = require('./routes');
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production
}));


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

// API endpoint to fetch all doctors
app.get('/api/doctors', async (req, res) => {
  const query = "SELECT * FROM doctors"; // Assuming 'doctors' is your table name

  try {
    const doctors = await executeQuery(query);
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors from MySQL:", error);
    res.status(500).send("Internal Server Error");
  }
});