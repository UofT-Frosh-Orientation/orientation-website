const FroshServices = require('../services/FroshServices');
const FroshGroupModel = require('../models/FroshGroupModel');

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
  
  async froshSignedIn(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.user.fullName === undefined || req.user.fullName === null) {
			res.send(false);
		}else{
			res.send(true);
		}
	} else {
		res.send(false);
	}
  },

  async froshCurrent(req, res, next) {
	const froshData = req.user
	froshData['__v'] = undefined
	froshData.password = undefined
	froshData['_id'] = undefined
	froshData.resetPasswordToken = undefined
	froshData.resetPasswordExpires = undefined
	res.send(froshData);
  },

  async editFroshData(req, res, next) {
	const response = { editStatus: false, errorMessage: '' };
	const {field, value} = req.body;
	let errors = [];

	console.log(field, value)
	//Check if All required fields are not empty
	if(!field || value === undefined || value === ''){
		errors.push("Make sure the field is complete.");
	}
	//field should be an editable field
	const editableFields = ["fullName", "preferredName", "birthdate", "pronouns", "otherPronouns", "discipline", "utorid", "medicalInfo", "phoneNumber", "instagram", "emergCCName", "emergCCNumber", "emergCCRelation", "streetAddress", "aptSuite", "country", "region", "city", "postalCode", "isResidingInCanada", "timezone", "streetAddress2", "aptSuite2", "country2", "region2", "city2", "postalCode2", "moreAddressInfo", "isPickupPossible", "isDeliverPossible", "shirtSize", "isMeetup", "isScunt", "isMediaConsent", "balance"]
	if (!(editableFields.includes(field))) {
		errors.push("Cannot update invalid field");
	}
	// disable edit for scunt signups
	if (field === "isScunt") {
		errors.push("The deadline to sign up for Havenger Scunt is Sep 1st. If you would like to sign up after this date, email scunt@orientation.skule.ca");
	}

	errors.push(await FroshServices.updateFroshDataField(req.user.email));
	// not sure if the async of updating the frosh data will affect these statements
	if (errors.length > 0) {
        response.errorMessage = errors[0];
	} else {
		response.editStatus = true;
		response.errorMessage = 'Your information is edited!';
	}
	res.send(response);
  },

  async forgotFroshPassword(req, res, next) {
	if(req.body.email === ''){
		res.status(400).send('Email Field must not be blank.');
	}
	console.log(req.body);
	const frosh = await Frosh.findOne({
		email: new RegExp(`^${req.body.email}$`, 'i')
	});
	console.log(frosh);
	console.log('here');
	if(frosh){
		const token = crypto.randomBytes(20).toString('hex');

		frosh.resetPasswordToken = token;
		frosh.resetPasswordExpires= Date.now() + 3600000;
		await frosh.save();
		console.log('new frosh');
		console.log(frosh);
		const webEmail = process.env.EMAIL_ADDRESS;
		const webEmailPassword = process.env.EMAIL_PASSWORD;
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: `${webEmail}`,
				pass: `${webEmailPassword}`
			},
		});

		const mailOptions = {
			from: 'tech@orientation.skule.ca',
			to: `${frosh.email}`,
			subject: 'Link to reset password',
			html: `<center>
						<h1>F!rosh Orientation 2T1</h1>
						<h4>Reset your password by clicking the button below</h4>
						<br>
						<a style="background: #FFC112; color: #6F1E88; text-decoration:none;" href ="https://www.orientation.skule.ca/reset/${token}"> Reset Password </a>
						<br>
						<p> Please stay updated about new events and information on our <a href="https://www.orientation.skule.ca/"> website </a> </p>
						<p> Thanks again! - Frosh Orientation 2T1 Web Team 💜💛 </p>
					</center>`
		}

		transporter.sendMail(mailOptions, (err, response) => {
			if(err) {
				console.error('There was an errror', err);
			}else {
				console.log('Here is the response', response);
				res.status(200).json('recovery email sent');
			}
		})

	}else {
		console.log('no frosh found');
		res.status(200).json('This user does not exist.');
	}
  },


  async froshInitials(req, res, next) {
	const fullName = req.user.fullName
	const names = fullName.toUpperCase().split(' ')
	res.send({
		initials: `${names[0].charAt(0)}${names[names.length-1].charAt(0)}`
	})
  },
  
  async initFroshGroups(req, res, next) {
    try {
		const froshGroupList = await FroshGroupModel.find();
		for(const group of froshGroupList) {
			group.totalNum = 0
			group["They/Them"] = 0
			group["He/Him"] = 0
			group["She/Her"] = 0
			group["Other"] = 0
			group["Chemical Engineering"] = 0
			group["Civil Engineering"] = 0
			group["Computer Engineering"] = 0
			group["Electrical Engineering"] = 0
			group["Engineering Science"] = 0
			group["Industrial Engineering"] = 0
			group["Materials Engineering"] = 0
			group["Mechanical Engineering"] = 0
			group["Mineral Engineering"] = 0
			group["Track One (Undeclared)"] = 0
			group.save()
		}
		res.send({
			status: OK,
			errorMsg: ""
		})
	} catch (err) {
		res.send({
			status: INTERNAL_ERROR,
			errorMsg: "Could not initialize all frosh groups"
		})
	}
  }
}

module.exports = FroshController;
