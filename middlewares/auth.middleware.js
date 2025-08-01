const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.log('Authenticated user:', req.user);
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Role-based access control middleware
exports.restrictTo = (...roles) => {
  const allowedRoles = roles.map(role => role.toLowerCase()); 

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userRole = req.user.role.toLowerCase(); 
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log('Access granted for role:', req.user.role);
    next();
  };
};

