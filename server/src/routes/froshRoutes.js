const express = require('express');
const FroshController = require('../controllers/FroshController');

const router = express.Router();

router.post('/register', FroshController.registerFrosh);
router.get('/signedIn', FroshController.froshSignedIn);
router.get('/current', FroshController.froshCurrent);
router.post('/edit', FroshController.editFroshData);
router.post('/forgotPassword', FroshController.forgotFroshPassword);

router.get('/initials', FroshController.froshInitials);
router.post('/froshGroups/initAll', FroshController.initFroshGroups);
// router.post('/login', FroshController.login);

module.exports = router;
