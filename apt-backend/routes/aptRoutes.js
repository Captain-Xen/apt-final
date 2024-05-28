const express = require('express');
const router = express.Router();
const aptController = require('../controller/aptController');
const authenticateToken = require('../middleware/auth');

// Admin routes
router.post('/register', authenticateToken, aptController.registerUser);
router.post('/login', aptController.loginUser);

// Doctor routes
router.post('/register-doctor', aptController.registerDoctorUser);
router.post('/login-doctor', aptController.loginDoctorUser);

// Appointment routes
router.post('/appointments', aptController.bookAppointment); // No authentication needed for booking an appointment
router.get('/appointments', authenticateToken, aptController.getAllAppointments);
router.get('/appointments/:id', authenticateToken, aptController.getAppointmentById);
router.put('/appointments/:id', authenticateToken, aptController.updateAppointment);
router.delete('/appointments/:id', authenticateToken, aptController.deleteAppointment);

// Patient routes for doctors
router.get('/patients/doctor/:doctor_id', authenticateToken, aptController.getPatientsByDoctor);

// E-Prescription routes
router.post('/e-prescriptions', authenticateToken, aptController.createEPrescription);
router.put('/e-prescriptions/:id', authenticateToken, aptController.updateEPrescription);
router.delete('/e-prescriptions/:id', authenticateToken, aptController.cancelEPrescription);

module.exports = router;
