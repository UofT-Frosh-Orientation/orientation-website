const express = require('express');

const ScuntController = require('../controllers/ScuntController');

const router = express.Router();

router.post('/login/discord', ScuntController.login);

module.exports = router;
