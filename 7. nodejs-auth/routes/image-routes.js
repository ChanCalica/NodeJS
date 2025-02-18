const express = require('express');
const { uploadImage, fetchImages } = require('../controllers/image-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/uploadImage-middleware');
const router = express.Router();

router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('image'),
  uploadImage
);

router.get('/get', authMiddleware, fetchImages);

module.exports = router;
