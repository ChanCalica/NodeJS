const Image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinary-helper');
const fs = require('fs');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    const { imageUrl, publicId } = await uploadToCloudinary(req.file.path);
    const newImage = await Image.create({
      imageUrl,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    // await newImage.save();

    // Delete the uploaded file in uploads folder if upload in cloudinary is successful
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: newImage,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again.',
    });
  }
};

const fetchImages = async (req, res) => {
  try {
    // const images = await Image.find({ uploadedBy: req.userInfo.userId });
    const images = await Image.find({});
    if (images) {
      return res.status(200).json({
        success: true,
        images,
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again.',
    });
  }
};

module.exports = { uploadImage, fetchImages };
