/*
 * Author: Khalil Palmer
 * File Name: dbConnection.js
 * Description: This file allows you to establish a connection to the MySQL database using the mysql2 library and dotenv for environment variables.
 */

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connecting to the database...');
});

module.exports = connection;
