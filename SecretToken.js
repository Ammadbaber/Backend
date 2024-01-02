require("dotenv").config();


const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace this with your actual secret key

function createSecretToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = { createSecretToken };
  