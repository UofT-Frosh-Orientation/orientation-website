const express = require('express')

const UserController = require('../controllers/UserController');
const passport = require('../services/passport');
const checkLoggedIn = require("../middlewares/checkLoggedIn")
const hasAuthScopes = require("../middlewares/hasAuthScopes")

const router = express.Router()

router.post('/signup', UserController.signup)

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), UserController.getInfo)

router.get('/info', checkLoggedIn, UserController.getInfo)

module.exports = router
