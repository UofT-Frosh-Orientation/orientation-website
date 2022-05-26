const bcrypt = require('bcryptjs');

const FroshServices = require('../services/FroshServices');

const FroshController = {
  async registerFrosh(req, res, next) {
    let froshData = req.body;
    try {
      await FroshServices.validateNewFrosh(froshData);
      const froshGroup = await FroshServices.getNewFroshGroup(froshData.discipline, froshData.pronouns);
      console.log(froshGroup);
      froshData.froshGroup = froshGroup;
      froshData.accountCreatedAt = new Date(Date.now());
      froshData.lastUpdatedAt = new Date(Date.now());
      const password = FroshServices.hashPassword(froshData.password);
      console.log(`Password: ${password}`);
      froshData.password = password;
      await FroshServices.saveNewFrosh(froshData);
      res.status(200).send({'message': "Successfully registered new frosh!"});
    } catch (e) {
      next(e)
    }
  },

//   async froshReset(req, res, next) {
// 	console.log(req.query.resetPasswordToken);
// 	console.log('here');
// 	const frosh = await FroshServices.resetPassTokenFindFrosh(req.query.resetPasswordToken);
// 	console.log('frosh with token');
// 	console.log(frosh);
// 	if(frosh){
// 		res.status(200).send({
// 			message: 'password reset link good'
// 		});
// 	}else {
// 		res.status(200).send({
// 			errorMessage: 'Password link is invalid or has expired'
// 		});
// 	}
//   },

//   async updateFroshPassViaEmail(req, res, next) {
// 	console.log(req.body);
// 	const frosh = await FroshServices.resetPassTokenFindFrosh(req.body.resetPasswordToken);

// 	console.log('frosh to update password');
// 	console.log(frosh);

// 	console.log(`current frosh email is ${frosh.email} and the pass is ${frosh.password}`);
// 	if(frosh){
// 		//update password
// 		const password = req.body.password1;
// 		console.log(req.body.password1)
// 		bcrypt.genSalt(10, (err, salt) => {
// 			bcrypt.hash(req.body.password1, salt, async (err, hash) => {
// 				frosh.password = hash;
// 				await frosh.save();
// 				console.log("new password saved");
// 				res.status(200).send({
// 					message: 'Password Updated'
// 				});
// 			});
// 		});
// 	} else {
// 		res.status(404).json('No user exists in db to update');
// 	}
//   },
}

module.exports = FroshController;
