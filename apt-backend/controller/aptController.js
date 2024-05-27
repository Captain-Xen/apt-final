const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database/dbConnection');
const nodemailer = require('nodemailer');

// Nodemailer 
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
  }
});

const sendConfirmationEmail = (appointment) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: #f4f4f4;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
            }
            .header h2 {
                margin: 0;
                color: #007bff;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ccc;
                font-size: 0.9em;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Appointment Confirmation</h2>
            </div>
            <div class="content">
                <p>Dear ${appointment.first_name} ${appointment.last_name},</p>
                <p>Your appointment for <strong>${appointment.appointment_type}</strong> with ${appointment.doctor_name} has been confirmed.</p>
                <p><strong>Appointment Date:</strong> ${appointment.appointment_date}</p>
                <p><strong>Appointment Time:</strong> ${appointment.appointment_time}</p>
                <p>Thank you for choosing our service!</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Health Plus Associates. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: appointment.email,
        subject: 'Appointment Confirmation',
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);

            // Send the success message back to the client
            res.status(201).json({ message: 'Appointment booked and email sent successfully' });
        }
    });
};

// Register User
exports.registerUser = (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    connection.query('INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)', 
    [username, hashedPassword, email], (error, results) => {
        if (error) {
            return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered successfully');
    });
};

// Register Doctor User
exports.registerDoctorUser = (req, res) => {
  const { username, password, email, doctor_id } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  connection.query('INSERT INTO doctors_users (username, password, email, doctor_id) VALUES (?, ?, ?, ?)', 
  [username, hashedPassword, email, doctor_id], (error, results) => {
      if (error) {
          return res.status(500).send('Error registering doctor user');
      }
      res.status(201).send('Doctor user registered successfully');
  });
};

// Login Doctor User
exports.loginDoctorUser = (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM doctors_users WHERE username = ?', [username], (error, results) => {
      if (error) {
          return res.status(500).send('Error on the server');
      }
      if (results.length === 0) {
          return res.status(404).send('No doctor user found');
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
          return res.status(401).send({ auth: false, token: null });
      }

      const token = jwt.sign({ id: user.id, doctor_id: user.doctor_id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours

      res.status(200).send({ auth: true, token: token });
  });
};


// Get Patients by Doctor
exports.getPatientsByDoctor = (req, res) => {
  const { doctor_id } = req.params;

  connection.query('SELECT * FROM patients WHERE doctor_id = ?', [doctor_id], (error, results) => {
      if (error) {
          return res.status(500).send('Error retrieving patients');
      }
      res.status(200).json(results);
  });
};

// Create E-Prescription
exports.createEPrescription = (req, res) => {
  const { patient_id, doctor_id, prescription } = req.body;
  const date_prescribed = new Date();

  connection.query('INSERT INTO e_prescriptions (patient_id, doctor_id, prescription, date_prescribed) VALUES (?, ?, ?, ?)', 
  [patient_id, doctor_id, prescription, date_prescribed], (error, results) => {
      if (error) {
          return res.status(500).send('Error creating e-prescription');
      }
      res.status(201).send('E-prescription created successfully');
  });
};

// Update E-Prescription
exports.updateEPrescription = (req, res) => {
  const { id } = req.params;
  const { prescription } = req.body;

  connection.query('UPDATE e_prescriptions SET prescription = ? WHERE id = ?', 
  [prescription, id], (error, results) => {
      if (error) {
          return res.status(500).send('Error updating e-prescription');
      }
      res.status(200).send('E-prescription updated successfully');
  });
};

// Cancel (Delete) E-Prescription
exports.cancelEPrescription = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM e_prescriptions WHERE id = ?', [id], (error, results) => {
      if (error) {
          return res.status(500).send('Error canceling e-prescription');
      }
      res.status(200).send('E-prescription canceled successfully');
  });
};

// Check and create default admin user if none exists
exports.createDefaultAdmin = () => {
  const defaultAdmin = {
      username: 'admin',
      password: 'admin123', 
      email: 'admin@healthcare.com'
  };

  const hashedPassword = bcrypt.hashSync(defaultAdmin.password, 8);

  connection.query('SELECT * FROM admin_users', (error, results) => {
      if (error) {
          console.error('Error checking for existing admin users:', error);
          return;
      }

      if (results.length === 0) {
          connection.query(
              'INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)', 
              [defaultAdmin.username, hashedPassword, defaultAdmin.email], 
              (error, results) => {
                  if (error) {
                      console.error('Error creating default admin user:', error);
                  } else {
                      console.log('Default admin user created successfully');
                  }
              }
          );
      } else {
          console.log('Admin user(s) already exist. No default admin user created.');
      }
  });
};

// Login User
exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM admin_users WHERE username = ?', [username], (error, results) => {
        if (error) {
            return res.status(500).send('Error on the server');
        }
        if (results.length === 0) {
            return res.status(404).send('No user found');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours

        res.status(200).send({ auth: true, token: token });
    });
};

// Book Appointment
exports.bookAppointment = (req, res) => {
    const { first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date } = req.body;
    console.log('Request Body:', req.body);  // Log the incoming request

    connection.query('INSERT INTO appointments (first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date], (error, results) => {
        if (error) {
            console.error('Error inserting appointment:', error);  // Log the error
            return res.status(500).send('Error booking appointment');
        }

        // Get doctor name to send in the email
        connection.query('SELECT full_name FROM doctors WHERE id = ?', [doctor_id], (err, docResults) => {
            if (err) {
                console.error('Error retrieving doctor info:', err);  // Log the error
                return res.status(500).send('Error retrieving doctor info');
            }
            const doctor_name = docResults[0].full_name;
            sendConfirmationEmail({ first_name, last_name, email, appointment_type, doctor_name, appointment_time, appointment_date });
            res.status(201).send('Appointment booked and email sent successfully');
        });
    });
};


// Get All Appointments
exports.getAllAppointments = (req, res) => {
    connection.query('SELECT * FROM appointments', (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving appointments');
        }
        res.status(200).json(results);
    });
};

// Get Appointment by ID
exports.getAppointmentById = (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM appointments WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving appointment');
        }
        if (results.length === 0) {
            return res.status(404).send('Appointment not found');
        }
        res.status(200).json(results[0]);
    });
};

// Update Appointment
exports.updateAppointment = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date } = req.body;

    connection.query('UPDATE appointments SET first_name = ?, last_name = ?, phone_number = ?, email = ?, appointment_type = ?, doctor_id = ?, appointment_time = ?, appointment_date = ? WHERE id = ?', 
    [first_name, last_name, phone_number, email, appointment_type, doctor_id, appointment_time, appointment_date, id], (error, results) => {
        if (error) {
            return res.status(500).send('Error updating appointment');
        }
        res.status(200).send('Appointment updated successfully');
    });
};

// Delete Appointment
exports.deleteAppointment = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM appointments WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error deleting appointment');
        }
        res.status(200).send('Appointment deleted successfully');
    });
};