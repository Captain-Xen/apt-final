// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const appRoutes = require('./routes/aptRoutes');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/api/v1', appRoutes);

// // const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const aptController = require('./controller/aptController'); // check if admin user exists, if not, create admin
const connection = require('./database/dbConnection'); 

dotenv.config();

// Middleware for parsing request bodies
app.use(cors());
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
