const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const ScuntGameSettingsController = require('../controllers/ScuntGameSettingsController');

const router = express.Router();

router.get(
  '/',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec game controls']),
  ScuntGameSettingsController.getGameSettings,
);

router.post(
  '/',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec game controls']),
  ScuntGameSettingsController.setGameSettings,
);

module.exports = router;
