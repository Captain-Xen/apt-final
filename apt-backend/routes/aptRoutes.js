const express = require('express');
const router = express.Router();
const aptController = require('../controller/aptController');

router.post('/book', aptController.bookAppointment);
router.get('/all', aptController.getAllAppointments);
router.get('/:id', aptController.getAppointmentById);
router.put('/:id', aptController.updateAppointment);
router.delete('/:id', aptController.deleteAppointment);

module.exports = router;
