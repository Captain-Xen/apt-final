/*
 * Author: K.Palmer
 * File Name: jwt.js
 * Description: This contains functions for generating and verifying JWT tokens using the jsonwebtoken library and dotenv for environment variables. 
 * The generateToken function creates a token with user information and an expiration frame, while the verifyToken function checks the validity of a token.
 */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // token keeps generating equal signs for some reason, find work around to remove it
    const base64UrlToken = token.replace(/=+$/, '');
    return base64UrlToken;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
