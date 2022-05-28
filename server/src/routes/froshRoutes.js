const express = require('express');
const FroshController = require('../controllers/FroshController');

const router = express.Router();
/**
 * @swagger
 * /frosh/register:
 *   post:
 *     summary: Register a new Frosh.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFrosh'
 *
 */
router.post('/register', FroshController.registerFrosh);
// router.get('/reset', FroshController.froshReset);
// router.put('/updatePasswordViaEmail', FroshController.updateFroshPassViaEmail);

module.exports = router;
