const express = require('express');
const dotenv = require('dotenv');
const appointmentRoutes = require('./routes/aptRoutes');
const db = require('./database/dbConnection');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/appointments', appointmentRoutes);

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
