const express = require('express');
const FroshController = require('../controllers/FroshController');

const router = express.Router();

router.post('/register', FroshController.registerFrosh);

module.exports = router;
