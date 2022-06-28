// All the attributes of the objects correspond to their input type... except:
// These must be included, even if the input type does not require this info
//
// isRequiredInput: if the field can be undefined before submission
// errorMessage: The message to show if the field is missing but is required
// onChanged(value, disableFields): disable/enable fields based on a value (dependancies)
// className: the class name applied around the child form input component
// noEdit: if set, this field CANNOT be modified AFTER the frosh registers
//         Note: noEdit does not work for checkboxes
export const fields = {
  General: {
    // nameLabel: {
    //   type: 'label',
    //   label: "Full Name? (First & Last)",
    //   isRequiredInput: true,
    // },
    // firstName: {
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: 'John',
    //   hasRestrictedInput: true,
    //   isRequiredInput: true,
    //   errorMessage: 'Please enter a valid name',
    //   localStorageKey: 'registration-firstName',
    //   className: "half-width-input",
    // },
    // lastName: {
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: 'Doe',
    //   hasRestrictedInput: true,
    //   isRequiredInput: true,
    //   errorMessage: 'Please enter a valid name',
    //   localStorageKey: 'registration-lastName',
    //   className: "half-width-input",
    // },
    // preferredName: {
    //   type: 'text',
    //   inputType: 'text',
    //   label: 'preferred name?',
    //   placeholder: 'Joey',
    //   hasRestrictedInput: true,
    //   isRequiredInput: false,
    //   errorMessage: '',
    //   localStorageKey: 'registration-preferredName',
    //   className: "half-width-input",
    // },
    pronoun: {
      type: 'dropdown',
      label: 'Pronoun',
      values: ['he/him', 'she/her', 'they/them', 'other'],
      initialSelectedIndex: 0,
      className: 'inline-block-remaining',
      onChanged: (value, disableField) => {
        if (value === 'other') {
          disableField(false, 'pronounOther', 'General');
        } else {
          disableField(true, 'pronounOther', 'General');
        }
      },
    },
    pronounOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Pronoun',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Please enter a pronoun',
      className: 'fill-remaining-width-input',
    },
    birthdate: {
      type: 'text',
      inputType: 'date',
      label: 'Birthday',
      placeholder: '1852-12-25',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid date',
      className: 'half-width-input',
    },
    utorid: {
      type: 'text',
      inputType: 'text',
      label: 'UtorID',
      placeholder: 'doejohn2',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a UtorID',
      localStorageKey: 'registration-utorid',
      className: 'half-width-input',
    },
    discipline: {
      type: 'dropdown',
      label: 'Discipline',
      values: [
        'Chemical',
        'Civil',
        'Electrical & Computer',
        'Engineering',
        'Industrial',
        'Materials',
        'Mechanical',
        'Mineral',
        'Track One (Undeclared)',
      ],
      className: 'inline-block-remaining',
    },
    shirtSize: {
      type: 'dropdown',
      label: 'T-shirt size',
      values: ['S', 'M', 'L', 'XL'],
      initialSelectedIndex: 1,
      className: 'inline-block-remaining',
      noEdit: true,
    },
    // "email":{
    //   "type":"text",
    //   "inputType":"text",
    //   "label":"Email",
    //   "placeholder":"Email",
    //   "hasRestrictedInput":true,
    //   "isRequiredInput":true,
    //   "errorMessage":"Missing field",
    //   "localStorageKey":"registration-email"
    // },
    // "password":{
    //   "type":"text",
    //   "inputType":"password",
    //   "label":"Password",
    //   "placeholder":"Password",
    //   "hasRestrictedInput":true,
    //   "isRequiredInput":true,
    //   "errorMessage":"Missing field"
    // },
    //Format the phone number as asked
    phoneNumberLabel: {
      type: 'label',
      label: 'Phone number?',
      isRequiredInput: true,
    },
    phoneNumberAreaCode: {
      type: 'text',
      inputType: 'text',
      placeholder: '+1',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-phoneNumberAreaCode',
      className: 'small-width-input',
      inputTitle: 'Area Code',
    },
    phoneNumber: {
      type: 'text',
      inputType: 'text',
      placeholder: '(416) 123-45678',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-phoneNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
    },
    instagram: {
      type: 'text',
      inputType: 'text',
      label: 'Instagram handle',
      placeholder: '@bestfrosh',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-instagram',
      isInstagram: true,
    },
    emergencyContactName: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency contact full name (first & last):',
      placeholder: 'Jane Doe',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid name',
      localStorageKey: 'registration-emergencyContactName',
      className: 'half-width-input',
    },
    emergencyContactRelationship: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency contact relationship',
      placeholder: 'Mother',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-emergencyContactRelationship',
      className: 'half-width-input',
    },
    phoneNumberEmergencyLabel: {
      type: 'label',
      label: 'Emergency contact phone number',
      isRequiredInput: true,
    },
    emergencyContactNumberAreaCode: {
      type: 'text',
      inputType: 'text',
      placeholder: '+1',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-emergencyContactNumberAreaCode',
      className: 'small-width-input',
      inputTitle: 'Area Code',
    },
    emergencyContactNumber: {
      type: 'text',
      inputType: 'text',
      placeholder: '(416) 123-45678',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
    },
    residencyLineLabel: {
      type: 'label',
      label: 'Residency address',
      isRequiredInput: true,
    },
    residencyLine1: {
      type: 'text',
      inputType: 'text',
      placeholder: '123 Park Street',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Address',
    },
    residencyLine2: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Unit 123',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Unit',
    },
    residencyCity: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Toronto',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'City',
    },
    residencyProvince: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Ontario',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Province/State',
    },
    residencyPostalCode: {
      type: 'text',
      inputType: 'text',
      placeholder: 'M9R2J0',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Postal Code/Area Code',
    },
    residencyPostalCountry: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Canada',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Country',
    },
    shippingLineLabel: {
      type: 'label',
      label: 'Shipping Address (if same as Residency address, leave blank)',
    },
    shippingLine1: {
      type: 'text',
      inputType: 'text',
      placeholder: '123 Park Street',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Address',
    },
    shippingLine2: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Unit 123',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Unit',
    },
    shippingCity: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Toronto',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'City',
    },
    shippingProvince: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Ontario',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Province/State',
    },
    shippingPostalCode: {
      type: 'text',
      inputType: 'text',
      placeholder: 'M9R2J0',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Postal Code/Area Code',
    },
    shippingPostalCountry: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Canada',
      hasRestrictedInput: true,
      errorMessage: 'Missing field',
      className: 'half-width-input',
      inputTitle: 'Country',
    },
  },
  Misc: {
    medicalInfo: {
      type: 'text',
      inputType: 'textArea',
      label: 'Allergies and/or medical conditions',
      placeholder: 'Nut allergy',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-medicalInfo',
      className: 'half-width-input',
    },
    medication: {
      type: 'text',
      inputType: 'text',
      label: 'Medication (e.g. Epi-Pen, inhaler, ...)',
      placeholder: 'Carries 2 epi-pens',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-medication',
      className: 'half-width-input',
    },
    torontoIslandTrip: {
      type: 'radio',
      label:
        'Would you be interested in a trip to Toronto Islands on one of the evenings during F!rosh Week? (At a small additional cost)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
    },
    scunt: {
      type: 'radio',
      label:
        'Would you like to participate in Havenger Scunt? (It will take place on the evening of Wednesday, September 7th)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
    },
    nightlife: {
      type: 'radio',
      label:
        'Would you be interested in an overnight retreat on September 10th -11th? (at an Additional cost)',
      values: ['Yes', 'No'],
      initialSelectedIndex: -1,
    },
    summerLocation: {
      type: 'text',
      inputType: 'text',
      label: 'Where will you be located for the majority of the summer?',
      placeholder: 'Toronto, Canada',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter your current city and country.',
      localStorageKey: 'registration-medication',
    },
    moveToToronto: {
      type: 'dropdown',
      label:
        'If you are not in the GTA already, approximately when are you planning to move to Toronto?',
      values: [
        'N/A',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      initialSelectedIndex: 0,
    },
    allergies: {
      type: 'checkbox',
      label: 'Please select the following dietary restrictions or allergies if any.',
      values: [
        'Lactose Intolerance',
        'Gluten Intolerance',
        'Vegetarian',
        'Vegan',
        'Kosher',
        'Dairy-Free',
        'Pork',
        'Nuts',
      ],
    },
    allergiesMore: {
      type: 'text',
      inputType: 'text',
      label:
        'If there are any other restrictions not listed above, please write them in the box below.',
      placeholder:
        'If there are any other restrictions not listed above, please write them in the box below.',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter your current city and country.',
      localStorageKey: 'registration-allergies',
    },
    commuterProgram: {
      type: 'radio',
      label:
        'Will you take part in the Commuter Program (you can still sign up via links on Instagram and Frosh week website)?',
      values: ['Yes', 'No', 'Put me on the waitlist'],
      initialSelectedIndex: 1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'areaGTA', 'Misc');
          disableField(false, 'chestnutStay', 'Misc');
        } else {
          disableField(true, 'areaGTA', 'Misc');
          disableField(true, 'chestnutStay', 'Misc');
        }
      },
    },
    areaGTA: {
      type: 'text',
      inputType: 'text',
      label:
        'What area of the GTA do you live in? Please enter your postal code. (This information is used only to pair you with commuters in your area for the purpose of this program)',
      placeholder: 'M5S 3K1',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid postal code.',
      localStorageKey: 'registration-areaGTA',
    },
    chestnutStay: {
      type: 'radio',
      label: 'Would you like to stay up at Chestnut during Frosh week with an additional cost?',
      values: ['Yes', 'No'],
      initialSelectedIndex: -1,
    },
    photograph: {
      type: 'radio',
      label: 'Are you okay with being photographed during Frosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
    },
    accessibility: {
      type: 'text',
      inputType: 'text',
      label: "Do you have any accessibility requirements you'd like to share with us?",
      placeholder:
        'I would like to be able to access a quiet space to relax when the activities get overwhelming',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Please enter a valid postal code.',
      localStorageKey: 'registration-areaGTA',
      onChanged: (value, disableField) => {
        if (value !== '' && value !== undefined) {
          disableField(false, 'accomadation', 'Misc');
        } else {
          disableField(true, 'accomadation', 'Misc');
        }
      },
    },
    accomadation: {
      type: 'radio',
      label: 'Would you like us to reach out to you about how we can best accomodate you?',
      values: ['Yes', 'No'],
      initialSelectedIndex: -1,
    },
  },
};

export const terms = `
F!rosh Week is collecting your information to help us deliver some of our programming. 
Notably, we're asking for your contact information so that we can be in contact over the 
summer and help prepare you for F!rosh Week and the school year. We're asking for your 
address and shipping information as your registration fee goes towards a F!rosh Kit that 
will be sent to you at home. Other information, such as time zone, will help us plan out 
the week to be the best it can be. Your contact information information will not be shared 
with anyone but those within the F!rosh Week organization who will be contacting you, and 
you won't be contacted by anyone in any capacity outside of their roles in F!rosh Week. 
Your address won't be used except for delivery of the Kit. All private information will 
be disposed of at the end of the school year.
`;
