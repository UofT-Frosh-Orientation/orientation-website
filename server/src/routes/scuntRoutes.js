const express = require('express');

const ScuntController = require('../controllers/ScuntController');

const router = express.Router();

router.post('/login/discord', ScuntController.login);

router.get('/mission/status', ScuntController.getMissionStatus);

module.exports = router;
