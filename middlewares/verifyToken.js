const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token =  req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'surya@9182');
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
