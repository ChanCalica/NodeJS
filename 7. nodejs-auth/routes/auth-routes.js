const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const router = express.Router();
const {
  register,
  login,
  getUser,
  getUsers,
  deleteUser,
} = require('../controllers/auth-controller');mmm

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUser);
router.get('/user', getUsers);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
