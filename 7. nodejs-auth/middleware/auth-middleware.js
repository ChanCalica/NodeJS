const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log(authHeader);
  // console.log('auth middleware is called');
  const token = authHeader && authHeader.split(' ')[1];
  // const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Please log in to get access.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // req.userId = decoded.userId;
    // req.username = decoded.username;
    // req.role = decoded.role;
    // console.log(decoded);

    req.userInfo = decoded;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Invalid token. Please log in to get access.',
    });
  }
};

module.exports = authMiddleware;
