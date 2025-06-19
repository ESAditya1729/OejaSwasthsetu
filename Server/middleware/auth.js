const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check presence and format of Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // 2. Basic JWT structure check
  if (!token || token.split('.').length !== 3) {
    console.warn('Malformed JWT received:', token);
    return res.status(401).json({ message: 'Malformed token' });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Ensure token decoded properly and contains expected fields
    if (!decoded || typeof decoded !== 'object' || !decoded.id) {
      throw new Error('Decoded token is invalid');
    }

    // 5. Attach user info to request for downstream use
    req.user = {
      id: decoded.id,
      phone_number: decoded.phone_number,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      role: decoded.role,
    };

    next();
  } catch (err) {
    // 6. Token is expired or invalid
    console.error('JWT auth error:', err.message);
    res.status(401).json({
      message: err.name === 'TokenExpiredError'
        ? 'Token expired'
        : 'Invalid token',
    });
  }
};
