const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const registerHospitalFabric = require('../fabric/registerHospital');
const registerUser = require('../fabric/registerUser');

const generateUuid = () => {
  return crypto.randomUUID();
};

const registerHospital = async (req, res) => {
  let conn;
  conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    const { name, email, phone, address, userType, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    // Save user to the database
    const uuid = generateUuid();
    const [results] = await conn.execute(query, [name, email, userType, hashedPassword, uuid]);
    //Insert into patients table
    const query2 = `INSERT INTO hospitals (user_id, phone_number, address) VALUES (?, ?, ?)`;

    const [results2] = await conn.execute(query2, [results.insertId, phone, address]);
    await registerHospitalFabric.registerHospital(uuid)
    // Handle successful insertion
    // res.json({ userId: results.insertId, message: 'User Hospital created successfully' });
    await conn.commit();
    res.json({ message: `Hospital account for ${name} created successfully` });
  } catch (error) {
    await conn.rollback()
    res.status(500).json({ error: 'Error creating hospital account' });
  }
};

const registerDoctor = async (req, res) => {
  const adminUUID = req.session.user.UUID;
  let conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    const { name, email, degree, specialization, designation, dateOfBirth, phone, address, userType, password, hospital_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    // Save user to the database
    const uuid = generateUuid();
    const [results] = await conn.execute(query, [name, email, userType, hashedPassword, uuid]);
    //Insert into patients table
    const query2 = `INSERT INTO doctors (user_id, dateOfBirth, phone_number, address, degree, specialization, designation, hospital_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const [results2] = await conn.execute(query2, [results.insertId, dateOfBirth, phone, address, degree, specialization, designation, hospital_id]);
    await registerUser.registerUserFunction(uuid, name, adminUUID);
    await conn.commit();
    // Handle successful insertion
    res.json({ message: `Doctor account for ${name} created successfully` });
  } catch (error) {
    await conn.rollback()
    res.status(500).json({ error: 'Error creating doctor account' });
  }
};

const registerDoctorByHospital = async (req, res) => {
  const adminUUID = req.session.user.UUID;
  let conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    const { name, email, degree, specialization, designation, dateOfBirth, phone, address, userType, password } = req.body;
      const [hospitalID] = await conn.execute("SELECT hospital_id FROM hospitals WHERE user_id = ?", [req.session.user.userId]);
      const hospital_id = hospitalID[0].hospital_id
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    // Save user to the database
    const uuid = generateUuid();
    const [results] = await conn.execute(query, [name, email, userType, hashedPassword, uuid]);
    //Insert into patients table
    const query2 = `INSERT INTO doctors (user_id, dateOfBirth, phone_number, address, degree, specialization, designation, hospital_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const [results2] = await conn.execute(query2, [results.insertId, dateOfBirth, phone, address, degree, specialization, designation, hospital_id]);
    await registerUser.registerUserFunction(uuid, name, adminUUID);
    await conn.commit();
    // Handle successful insertion
    res.json({ message: `Doctor account for ${name} created successfully` });
  } catch (error) {
    await conn.rollback()
    res.status(500).json({ error: 'Error creating doctor account' });
  }
};

const registerPatient = async (req, res) => {
  let conn;

  try {
    conn = await connection.getConnection();

    // Start a transaction
    await conn.beginTransaction();

    const { name, email, dateOfBirth, gender, phone, address, userType, password, hospital_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // First query: Insert user
    const query = `INSERT INTO users (name, email, userType, password, UUID) VALUES (?, ?, ?, ?, ?)`;
    const uuid = generateUuid();
    const [results] = await conn.execute(query, [name, email, userType, hashedPassword, uuid]);

    if (!results.insertId) {
      throw new Error('Failed to insert user');
    }

    // Second query: Insert patient
    const query2 = `INSERT INTO patients (user_id, dateOfBirth, gender, phone_number, address, hospital_id, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')`;
    const [results2] = await conn.execute(query2, [results.insertId, dateOfBirth, gender, phone, address, hospital_id]);

    // If both queries are successful, commit the transaction
    await conn.commit();
    res.json({ message: 'User Patient created successfully' });
  } catch (error) {
    // If any error occurs, rollback any changes made during the transaction
    await conn.rollback();
    console.error('Transaction failed:', error);
    res.status(500).send({ error: 'Failed to sign up', details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
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
    // console.log(req.session);
    req.session.user = {
      name: user[0].name,
      userType: user[0].userType,
      userId: user[0].id,
      UUID: user[0].UUID,
    }
    console.log(req.session)
    // console.log(req.session);
    // Generate JWT token
    // const accessToken = jwt.sign({ "userId": user[0].id, "name": user[0].name }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: '1h',
    // });
    // const refreshToken = jwt.sign({ "userId": user[0].id, "name": user[0].name }, process.env.REFRESH_KEY, {
    //   expiresIn: '2h',
    // });
    // res.cookie("accessToken", accessToken, {maxAge: 60000, httpOnly: true});
    // res.cookie("refreshToken", refreshToken, {maxAge: 300000, httpOnly: true, secure: true});
    //req.session.name = req.body.name
    res.status(200).json({ message: 'Login successful', userType: user[0].userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const checkSession = (req, res, next) => {
  // Check if the session does exist
  if (req.session.user) {
    // Session is valid, perhaps do something or simply continue
    next();  // Continue to the next middleware or route handler
  } else {
    // Session is invalid or not present, send an unauthorized response
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
      // res.clearCookie('accessToken');
      res.json({ success: true, message: 'Logout successful' });
    }
  });
}
const userInfo = (req, res) => {
  res.json(req.session.user); // Assuming user information is stored in session.user
}
// Middleware to check and verify the JWT
const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  // const token = req.headers.authorization;
  // const token = req.cookie.accessToken;
  console.log(req.session)
  // if (!token) {
  //   return res.status(401).json({ message: 'Unauthorized - No token provided' });
  // }
  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
  //   if (err) {
  //     // Handle expired access token here
  //     if (err.message === 'jwt expired') {
  //       try {
  //         // Get the refresh token from the cookie
  //         const refreshToken = req.cookies.refreshToken;

  //         // If refresh token is missing, unauthorized
  //         if (!refreshToken) {
  //           return res.status(401).json({ message: 'Unauthorized - Refresh token required' });
  //         }

  //         // Verify and decode the refresh token
  //         jwt.verify(refreshToken, process.env.REFRESH_KEY, (refreshErr, refreshUser) => {
  //           if (refreshErr) {
  //             // If refresh token is invalid, unauthorized
  //             return res.status(403).json({ message: 'Forbidden - Invalid refresh token' });
  //           }

  //           // Refresh token is valid, generate a new access token
  //           const newAccessToken = jwt.sign({ userId: refreshUser.userId, name: refreshUser.name }, process.env.JWT_SECRET_KEY, {
  //             expiresIn: '1h',
  //           });

  //           // Set the new access token in a new cookie (optional)
  //           res.cookie("accessToken", newAccessToken, { maxAge: 60000, httpOnly: true });

  //           // Attach the user information to the request with userId from refresh token
  //           req.userId = refreshUser.userId;
  //           next();
  //         });
  //       } catch (error) {
  //         console.error('Error verifying refresh token:', error);
  //         res.status(500).json({ message: 'Internal Server Error' });
  //       }
  //     } else {
  //       return res.status(403).json({ message: 'Forbidden - Invalid token' });
  //     }
  //   } else {
  //     // Access token is valid, attach user information and continue
  //     req.userId = user.userId;
  //     next();
  //   }
  // });
};
module.exports = {
  registerHospital, registerDoctor, registerPatient, login, checkSession, logout, userInfo, authenticateToken, registerDoctorByHospital
}