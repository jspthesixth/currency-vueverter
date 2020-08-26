const jwt = require('jsonwebtoken');

const generateWebToken = user => {
  if (!user) return null;

  const userSchema = {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    address: user.address
  };

  return jwt.sign(userSchema, process.env.JWT_SECRET, {
    expiresIn: '1 day'
  });
};

const getUser = user => {
  if (!user) return null;

  return {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    address: user.address
  };
};

module.exports = {
  generateWebToken,
  getUser
};
