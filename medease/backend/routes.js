const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const fileController = require('./controllers/fileController');
const utils = require('./controllers/utils');
const registerAdmin = require('./fabric/registerAdmin');
const registerUser = require('./fabric/registerUser');
const patientFunction = require('./fabric/query');
const doctorFunction = require('./fabric/doctorFunctions');
// const hl = require('./controllers/ipfs');

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



router.post('/upload', upload.single('file'), fileController.uploadFile);

router.get('/get', fileController.getFile);

// Your other routes for user deletion, edit, and logout will go here
//Fabric routes
router.use(userController.checkSession)
//router.use(cookieParser());
router.post('/registerAdmin', registerAdmin.registerAdmin);
router.post('/registerUser', registerUser.registerUserApi);
router.post('/patient/uploadFile', upload.single('file'),patientFunction.uploadFile);
router.post('/patient/readFile', patientFunction.getSingleFile);
router.delete('/patient/deleteFile', patientFunction.deleteFile);
router.post('/patient/getFiles', patientFunction.getAllFiles);
router.post('/patient/grant', patientFunction.grantPermission);
router.post('/patient/revoke', patientFunction.revokePermission);
router.post('/allFiles', patientFunction.getAllDocuments);
router.post('/patient/init', patientFunction.init);
//Doctor Routes
router.post('/doctor/uploadFile', doctorFunction.doctorUploadFile);
router.post('/doctor/getFiles', doctorFunction.doctorGetAllFiles);
router.post('/doctor/readFile', doctorFunction.doctorGetSingleFile);
// Logout route
router.post('/logout', userController.logout);
router.get('/info', userController.userInfo);

router.post('/checkup', upload.single('file'), (req, res) => {
    const data = req.file.buffer;
    console.log(data)
    const bytes = Buffer.from(data, "utf-8");
    console.log(bytes)
})

router.post('/patient/registerUnderDoctor', utils.registerUnderDoctor);
router.post('/doctor/getPatientList', utils.getPatientList);
router.post("/doctor/setAvailability", utils.setAvailability)
router.post("/doctor/viewSchedule", utils.doctorViewSchedule)
router.post("/doctor/getAppointmentSlots", utils.doctorGetAvailableSlots)
router.delete("/doctor/removeAppointmentSlot", utils.doctorRemoveSlot)
router.get("/getBedsCount", utils.getBedsCount)
// router.post('/up', upload.single('file'), hl.up);

  
module.exports = router;
