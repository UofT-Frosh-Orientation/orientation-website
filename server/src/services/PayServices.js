// const EmailValidator = require('email-validator');
// const bcrypt = require('bcrypt');
// const FroshModel = require('../models/FroshModel');
// const FroshGroupModel = require('../models/FroshGroupModel');
// const newUserSubscription = require('../subscribers/newUserSubscription');

const stripe = require('stripe')(stripeSecretKey);	
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const EmailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Frosh = require('../models/froshModels');



const PayServices = {
    async validateEmail(froshData) {
        if (!EmailValidator.validate(froshData.email)) {
          throw new Error('INVALID_EMAIL');
        }
        const froshExists = await this.checkFroshExists(froshData.email);
        if (froshExists) {
          throw new Error('DUPLICATE_EMAIL');
        }
      },

    async checkFroshExists(email) {
    return FroshModel.findOne({ email });
    },

    async validateInformation(froshData) {
        if( !froshData.fullName ||
			!froshData.email ||
			!froshData.password || 
			!froshData.phoneNumber || 
			!froshData.birthday ||
			!froshData.utorid ||
			!froshData.preferredPronouns ||
			!froshData.emergencyContactName ||
			!froshData.emergencyContactRelationship ||
			!froshData.emergencyContact ||
			
			!froshData.shippingAddressEn ||
			!froshData.leedurDeliver ||
			!froshData.shirtSize ||
			
			!froshData.timezone ||
			!froshData.meetup ||
			!froshData.takeoffActivity ||
			!froshData.discipline ||
			
			!froshData.mediaConsent ||
			!froshData.terms ){
                throw new Error('FILL_OUT_ALL_REQUIRED_INFORMATION');
				
			}
    },

}