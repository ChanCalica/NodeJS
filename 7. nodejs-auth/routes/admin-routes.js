const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to the admin page',
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

module.exports = router;
