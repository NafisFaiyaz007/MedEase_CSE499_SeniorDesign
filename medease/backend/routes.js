const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const fileController = require('./controllers/fileController')
const multer = require('multer');
const upload = multer(); // first endpoint

router.get('/message', (req, res) => {
    res.send("get method");
});
// User creation
router.post('/registerHospital', userController.registerHospital);
router.post('/registerDoctor', userController.registerDoctor);
router.post('/registerPatient', userController.registerPatient);

// User login
router.post('/login', userController.login);
router.get('/checkSession', userController.checkSession);

// Logout route
router.post('/logout', userController.logout);

router.post('/upload', upload.single('file'), fileController.uploadFile);

router.get('/get', fileController.getFile);

// Your other routes for user deletion, edit, and logout will go here

module.exports = router;
