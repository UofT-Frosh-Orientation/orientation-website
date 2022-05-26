const express = require('express');
const FroshController = require('../controllers/FroshController');

const router = express.Router();

router.post('/register', FroshController.registerFrosh);
// router.get('/reset', FroshController.froshReset);
// router.put('/updatePasswordViaEmail', FroshController.updateFroshPassViaEmail);

module.exports = router;
