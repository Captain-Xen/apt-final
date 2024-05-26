const { verifyToken } = require('../utils/jwt');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    const decoded = verifyToken(token.split(' ')[1]);
    if (!decoded) {
        return res.status(401).send({ message: 'Unauthorized!' });
    }

    req.user = decoded;
    next();
};

module.exports = authenticateToken;
