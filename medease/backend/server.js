const express = require('express');
const dbConnection = require('./db');
// const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Welcome to my MedEase!');
});
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
const userRoutes = require('./routes');
app.use(express.json());
app.use('/api/users', userRoutes);


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