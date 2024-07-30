const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads/'); //location file is saved
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const firstName = req.user.firstName
      ? req.user.firstName.replace(/\s+/g, '_')
      : 'unknown_firstname';
    const lastName = req.user.lastName
      ? req.user.lastName.replace(/\s+/g, '_')
      : 'unknown_lastname';
    const filename = `${firstName}_${lastName}_Retreat_Waiver${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (file.mimetype == 'application/pdf') {
      callback(null, true);
    } else {
      console.log('only pdf files accepted!');
      callback(null, false);
    }
  },
});

router.post('/upload-waiver', upload.single('waiver'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully.');
});

module.exports = router;
