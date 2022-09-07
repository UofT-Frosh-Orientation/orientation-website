const express = require('express');

const ScuntController = require('../controllers/ScuntController');

const router = express.Router();

router.post('/login/discord', ScuntController.login);

router.get('/mission/status', ScuntController.getMissionStatus);

router.get('/leaderboard/scores', ScuntController.getLeaderboard);

module.exports = router;
