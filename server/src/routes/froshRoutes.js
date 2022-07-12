const express = require('express');

const FroshController = require('../controllers/FroshController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');

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
router.post('/register', checkLoggedIn, FroshController.registerFrosh);

module.exports = router;
