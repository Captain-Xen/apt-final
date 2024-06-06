const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const aptController = require('./controller/aptController'); // check if admin user exists, if not, create admin
const connection = require('./database/dbConnection'); 

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:4200', 
    optionsSuccessStatus: 200, 
  };

// Middleware for parsing request bodies
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const aptRoutes = require('./routes/aptRoutes');
app.use('/api/v1', aptRoutes);

// Call createDefaultAdmin after DB connection
connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Check and create default admin user if none exists
    aptController.createDefaultAdmin();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
