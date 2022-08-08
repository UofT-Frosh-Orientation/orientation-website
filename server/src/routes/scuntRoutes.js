const express = require('express');

const ScuntController = require('../controllers/ScuntController');

const router = express.Router();

router.put('/login/discord', ScuntController.login);

module.exports = router;
