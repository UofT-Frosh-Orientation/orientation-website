const UserServices = require('../services/UserServices');
const passport = require("../services/passport")

const UserController = {
  async signup(req, res, next) {
    try {
      const {email, password, name} = req.body;
      await UserServices.validateUser(email, password, name)
      const user = await UserServices.createUser(email, password, name)
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        return res.status(200).send({message: 'Success!'})
      })
    } catch (e) {
      next (e)
    }
  },

  async login(req, res) {
    console.log(req.user)
   const {_id, __v, hashedPassword, authScopes, ...user } = req.user.toObject();
   res.status(200).send({user})
  }
}

module.exports = UserController
