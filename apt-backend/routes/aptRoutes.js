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
router.get('/doctors', aptController.getAllDoctors); // Route to get all doctors
router.get('/doctors/:id',  aptController.getDoctorById); // Route to get a specific doctor by ID
router.post('/doctors/search',  aptController.searchDoctors);

// Appointment routes
router.post('/appointments', aptController.bookAppointment);
router.get('/appointments', aptController.getAllAppointments);
router.get('/appointments/:id', authenticateToken, aptController.getAppointmentById);
router.put('/appointments/:id', authenticateToken, aptController.updateAppointment);
router.delete('/appointments/:id', authenticateToken, aptController.deleteAppointment);

// Patient routes
router.get('/patients', aptController.getAllPatients); 
router.get('/patients/:id', authenticateToken, aptController.getPatientById); 

// Patient routes for doctors
router.get('/patients/doctor/:doctor_id', authenticateToken, aptController.getPatientsByDoctor);

// Route to get upcoming appointments for a doctor
router.get('/doctors/:doctor_id/upcoming-appointments', authenticateToken, aptController.getUpcomingAppointmentsForDoctor);

// E-Prescription routes
router.post('/e-prescriptions', authenticateToken, aptController.createEPrescription);
router.put('/e-prescriptions/:id', authenticateToken, aptController.updateEPrescription);
router.delete('/e-prescriptions/:id', authenticateToken, aptController.cancelEPrescription);

// Review routes
router.get('/reviews', aptController.getAllReviews);
router.post('/reviews', aptController.createReview);

module.exports = router;
