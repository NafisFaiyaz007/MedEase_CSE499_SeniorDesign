const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateUuid = () => {
  return crypto.randomUUID();
};

const registerHospital = async (req, res) => {
  try {
    const { name, email, phone, address, userType, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    // Save user to the database
    const [results] = await connection.execute(query, [name, email, userType, hashedPassword, generateUuid()]);
    //Insert into patients table
    const query2 = `INSERT INTO hospitals (user_id, phone_number, address) VALUES (?, ?, ?)`;
     
    const [results2] = await connection.execute(query2, [results.insertId, phone, address]);

    // Handle successful insertion
    res.json({ userId: results.insertId, message: 'User Hospital created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { name, email, degree, specialization, designation, dateOfBirth, phone, address, userType, password, hospital_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    // Save user to the database
    const [results] = await connection.execute(query, [name, email, userType, hashedPassword, generateUuid()]);
    //Insert into patients table
    const query2 = `INSERT INTO doctors (user_id, dateOfBirth, phone_number, address, degree, specialization, designation, hospital_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
     
    const [results2] = await connection.execute(query2, [results.insertId, dateOfBirth, phone, address, degree, specialization, designation, hospital_id]);

    // Handle successful insertion
    res.json({ userId: results.insertId, message: 'User Doctor created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 const registerPatient = async (req, res) => {
    try {
      const { name, email, dateOfBirth, gender, phone, address, userType, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const values = [name, email, dateOfBirth, gender, phone, address, userType, hashedPassword];
  
      // Remove undefined or null values to handle optional fields
      // const validValues = values.filter(value => value !== undefined && value !== null);

      // const placeholders = validValues.map(() => '?').join(', ');
  
      // const query = `INSERT INTO users (${fields.join(', ')}) VALUES (${placeholders})`;
      const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
      // Save user to the database
      const [results] = await connection.execute(query, [name, email, userType, hashedPassword, generateUuid()]);
      //Insert into patients table
      const query2 = `INSERT INTO patients (user_id, dateOfBirth, gender, phone_number, address) VALUES (?, ?, ?, ?, ?)`;
       
      const [results2] = await connection.execute(query2, [results.insertId, dateOfBirth, gender, phone, address]);
  
      // Handle successful insertion
      res.json({ userId: results.insertId, message: 'User Patient created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const [user] = await connection.query(
        'SELECT * FROM users WHERE Email = ?',
        [email]
      );
  
      if (user.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      console.log(req.session);
      req.session.user = {
        name: user[0].name,
        userType: user[0].userType
      }
      console.log(req.session);
      // Generate JWT token
      const token = jwt.sign({ userId: user[0].id, name: user[0].name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      //req.session.name = req.body.name
      res.status(200).json({ message: 'Login successful', token, userType: user[0].userType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const checkSession = (req, res) => {
    if (req.session.name) {
      // Session is valid, send appropriate response
      res.json({ loggedIn: true, user: req.session.name });
    } else {
      // Session is invalid or not authenticated, send appropriate response
      res.status(401).json({ loggedIn: false });
    }
  }

  const logout = (req, res) => {
      // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ success: false, message: 'Logout failed' });
    } else {
      // Clear session cookie on the client-side (optional)
      res.clearCookie('your_session_cookie_name');
      res.json({ success: true, message: 'Logout successful' });
    }
  });
  }
  // Middleware to check and verify the JWT
const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    // Attach the user information to the request for further use in route handlers
    req.user = user;
    next();
  });
};
  module.exports = {
    registerHospital, registerDoctor, registerPatient, login, checkSession, logout, authenticateToken
  }