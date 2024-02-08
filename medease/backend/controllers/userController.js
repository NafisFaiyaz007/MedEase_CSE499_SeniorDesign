const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 const registerUser = async (req, res) => {
    try {
      const { name, email, dateOfBirth, sex, phone, address, userType, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const values = [name, email, dateOfBirth, sex, phone, address, userType, hashedPassword];
  
      // Remove undefined or null values to handle optional fields
      const validValues = values.filter(value => value !== undefined && value !== null);

      const placeholders = validValues.map(() => '?').join(', ');
  
      // const query = `INSERT INTO users (${fields.join(', ')}) VALUES (${placeholders})`;
      const query = `INSERT INTO users (
        ${Object.entries({
          name: name,
          email: email,
          dateOfBirth: dateOfBirth,
          sex: sex,
          phone: phone,
          address: address,
          userType: userType,
          password: hashedPassword,
        })
          .filter(([key, value]) => value !== undefined && value !== null)
          .map(([key]) => key)
          .join(', ')}
      ) VALUES (
        ${Object.entries({
          name: name,
          email: email,
          dateOfBirth: dateOfBirth,
          sex: sex,
          phone: phone,
          address: address,
          userType: userType,
          password: hashedPassword,
        })
          .filter(([key, value]) => value !== undefined && value !== null)
          .map(([key, value]) => value)
          .map(() => '?')
          .join(', ')}
      )`;
  
      // Save user to the database
      const [results] = await connection.execute(query, validValues);
  
      // Handle successful insertion
      res.json({ userId: results.insertId, message: 'User created successfully' });
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
  
      // Generate JWT token
      const token = jwt.sign({ userId: user[0].id, name: user[0].name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      //req.session.name = user[0].name;
      res.json({ token, userType: user[0].userType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const logout = (req, res) => {
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
  }
  module.exports = {
    registerUser, login, logout
  }