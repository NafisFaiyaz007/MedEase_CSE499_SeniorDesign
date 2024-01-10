const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/message', (req, res) => {
    res.send("get method");
});
router.get('/s', (req, res) => {
    res.send('User routes are working!');
  });
// User creation
router.post('/register', async (req, res) => {
  try {
    const { name, email, dateOfBirth, phone, userType, password  } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const [results] = await connection.execute(
      'INSERT INTO users (Name, Email, dateOfBirth, Phone, userType, Password) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, dateOfBirth, phone, userType, hashedPassword]
    );

    res.json({ userId: results.insertId, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
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

    // Generate JWT token
    const token = jwt.sign({ userId: user[0].id, name: user[0].name }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
    try {
      // Assuming the token is sent in the Authorization header
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
      }
  
      // You may choose to perform additional checks here, such as verifying the token's validity.
  
      // Clear the token on the client-side (e.g., remove from local storage or cookie)
      // Note: You may need to handle this based on your client-side storage method
      // Example for local storage:
      // localStorage.removeItem('token');
  
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Your other routes for user deletion, edit, and logout will go here

module.exports = router;
