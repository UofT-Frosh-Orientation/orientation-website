const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const User = require('../models/UserModel');

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter(req, file, callback) {
    if (file.mimetype == 'application/pdf') {
      callback(null, true);
    } else {
      console.log('Only PDF files are accepted!');
      callback(null, false);
    }
  },
}).single('waiver');

router.post('/upload-waiver', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        console.log('File too large');
        return res.status(400).send('File is too large. Maximum size is 1MB.');
      }
      console.log('An error occurred while uploading the  file.');
      return res.status(400).send('An error occurred while uploading the file.');
    } else if (err) {
      console.log('An unknown error occurred.');
      return res.status(400).send('An unknown error occurred.');
    }

    if (!req.file) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }

    try {
      const userId = req.user._id;
      const user = await User.findById(userId); // get user frm DB

      if (!req.user) {
        console.log('User not found.');
        return res.status(404).send('User not found.');
      }

      // do file processing here
      const firstName = req.user.firstName
        ? req.user.firstName.replace(/\s+/g, '_')
        : 'unknown_firstname';
      const lastName = req.user.lastName
        ? req.user.lastName.replace(/\s+/g, '_')
        : 'unknown_lastname';
      const filename = `${firstName}_${lastName}_Retreat_Waiver${path.extname(
        req.file.originalname,
      )}`;

      if (!user.waiver) {
        user.waiver = {};
      }

      if (user.attendingRetreat === null || user.attendingRetreat === undefined) {
        user.attendingRetreat = true;
      }

      // save to MongoDB
      user.waiver = {
        filename,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      await user.save();

      res.status(200).send('File uploaded and saved successfully.');
    } catch (error) {
      console.error(error);
      console.log('Error saving file.');
      res.status(500).send('Error saving file.');
    }
  });
});

router.get('/view-waiver', async (req, res) => {
  try {
    if (!req.user) {
      console.log('User not authenticated.');
      return res.status(401).send('User not authenticated.');
    }

    const userId = req.user._id;
    const user = await User.findById(userId); // get user from DB

    if (!user) {
      console.log('User not found.');
      return res.status(404).send('User not found.');
    }

    if (!user.waiver) {
      console.log('No waiver found for this user.');
      return res.status(404).send('No waiver found for this user.');
    }
    const { filename, data, contentType } = user.waiver;

    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Content-Type', contentType);
    res.send(data);
  } catch (error) {
    console.error(error);
    console.log('Error retrieving file.');
    res.status(500).send('Error retrieving file.');
  }
});

module.exports = router;
