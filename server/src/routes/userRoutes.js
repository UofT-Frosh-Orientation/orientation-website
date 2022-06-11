const express = require('express')

const UserController = require('../controllers/UserController');
const passport = require('../services/passport');

const router = express.Router()

router.post('/signup', UserController.signup)

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), UserController.login)

module.exports = router
