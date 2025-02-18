const isAdminUser = (req, res, next) => {
  if (req.userInfo.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only admin users can access this resource.',
    });
  }
};

module.exports = isAdminUser;
