const express = require('express');

const UserController = require('../controllers/UserController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');

const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup for a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/NewUser'
 *     responses:
 *       '200':
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success!
 *                 user:
 *                   $ref: '#components/schemas/User'
 */
router.post('/signup', UserController.signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in to your account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@mail.utoronto.ca
 *                 format: email
 *               password:
 *                 type: string,
 *                 description: Password of the user
 *                 example: SecurePassword123!
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#components/schemas/User'
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     responses:
 *       '200':
 *         description: Successfully logged you out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out!
 */
router.post('/logout', UserController.logout);

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Get the info for the currently logged in user
 *     responses:
 *       '200':
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#components/schemas/User'
 *       '403':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please sign in to access this route!
 */
router.get('/info', checkLoggedIn, UserController.getInfo);

router.post('/request-password-reset', UserController.requestPasswordReset);

router.post('/reset-password', UserController.resetPassword);

module.exports = router;
