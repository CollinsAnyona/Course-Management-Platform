const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.log('✅ Authenticated user:', req.user);
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Role-based access control middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.log('User role from token:', req.user.role);
    next();
  };
};
