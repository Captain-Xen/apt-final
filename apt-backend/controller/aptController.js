const db = require('../database/dbConnection');
const nodemailer = require('nodemailer');

const bookAppointment = (req, res) => {
  const { id, first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date } = req.body;

  const query = 'INSERT INTO appointments (id, first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    sendConfirmationEmail(email);
    res.status(201).send('Appointment booked successfully');
  });
};

const getAllAppointments = (req, res) => {
  const query = 'SELECT * FROM appointments';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

const getAppointmentById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM appointments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(result);
  });
};

const updateAppointment = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date } = req.body;

  const query = 'UPDATE appointments SET first_name = ?, last_name = ?, phone_number = ?, email = ?, appointment_type = ?, doctor_id = ?, appointment_time = ?, appointment_date = ? WHERE id = ?';
  db.query(query, [first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Appointment updated successfully');
  });
};

const deleteAppointment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM appointments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Appointment deleted successfully');
  });
};

const sendConfirmationEmail = (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const mailOptions = {
    from: 'no-reply@healthplus.com',
    to: email,
    subject: 'Appointment Confirmation',
    text: 'Your appointment has been successfully booked.'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
