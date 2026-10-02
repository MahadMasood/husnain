const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'husnain_ecommerce', // Name of the folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'],
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No image uploaded' });
  }
  // req.file.path contains the secure Cloudinary URL
  res.send({ message: 'Image Uploaded', image: req.file.path });
});

router.post('/multiple', upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'No images uploaded' });
  }
  const images = req.files.map(file => file.path);
  res.send({ message: 'Images Uploaded', images });
});

module.exports = router;
