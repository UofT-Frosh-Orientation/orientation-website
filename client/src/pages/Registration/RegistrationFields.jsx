// All the attributes of the objects correspond to their input type... except:
// These must be included, even if the input type does not require this info
//
// isRequiredInput: if the field can be undefined before submission
// errorMessage: The message to show if the field is missing but is required
// onChanged(value, disableFields): disable/enable fields based on a value (dependancies)
// className: the class name applied around the child form input component
export const fields = {
  General: {
    name: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Best Frosh',
      label: 'Legal Name',
      isRequiredInput: true,
      errorMessage: 'Please enter your legal name',
      className: 'half-width-input',
    },
    preferredname: {
      type: 'text',
      inputType: 'text',
      label: 'Preferred Name',
      hasRestrictedInput: true,
      isRequiredInput: false,
      className: 'fill-remaining-width-input',
    },
    pronoun: {
      type: 'dropdown',
      label: 'Pronoun',
      values: ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'other'],
      initialSelectedIndex: 0,
      className: 'half-width-input',
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
      placeholder: 'froshbest123',
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
        'Computer',
        'Electrical',
        'Engineering Science',
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
    },
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
      placeholder: '(416) 123-4567',
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
      placeholder: 'Parent / Guardian',
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
      placeholder: '(416) 123-4567',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
    },
  },
  SkulePatrol: {
    medicalInfo: {
      type: 'text',
      inputType: 'textArea',
      label: 'Allergies and/or Medical Conditions',
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
      label: 'Medication (Epi-Pen, inhaler, etc.)',
      placeholder: 'Carries 2 epi-pens',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Missing field',
      localStorageKey: 'registration-medication',
      className: 'half-width-input',
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
      placeholder: 'Allergic to berries',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Please enter your current city and country.',
      localStorageKey: 'registration-allergies',
    },
  },
  Misc: {
    scunt: {
      type: 'radio',
      label:
        'Would you like to participate in Havenger Scunt? (It will take place on the evening of Wednesday, September 7th)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
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
      values: ['N/A', 'May', 'June', 'July', 'August', 'September'],
      initialSelectedIndex: 0,
    },
    commuterProgram: {
      type: 'radio',
      label: 'Do you plan to commute to campus for Frosh Week and / or the school year?',
      values: ['Yes', 'No'],
      initialSelectedIndex: -1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'commuterProgramInformation', 'Misc');
        } else {
          disableField(true, 'commuterProgramInformation', 'Misc');
        }
      },
    },
    commuterProgramInformation: {
      type: 'dropdown',
      label: 'How do you plan on commuting to campus?',
      values: ['Car', 'Subway', 'Go Train', 'Walking', 'Biking', 'Other'],
      initialSelectedIndex: 0,
      className: 'inline-block-remaining',
      onChanged: (value, disableField) => {
        if (value === 'Subway' || value === 'Go Train') {
          disableField(false, 'commuterProgramStop', 'Misc');
        } else {
          disableField(true, 'commuterProgramStop', 'Misc');
        }
        if (value === 'Other') {
          disableField(false, 'commuterOther', 'Misc');
        } else {
          disableField(true, 'commuterOther', 'Misc');
        }
      },
      isRequiredInput: false,
    },
    commuterOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Commuter Option',
      hasRestrictedInput: true,
      isRequiredInput: false,
    },
    commuterProgramStop: {
      type: 'text',
      inputType: 'text',
      label: 'Which stop do you get on for the subway or go train?',
      isRequiredInput: false,
    },
  },
  Accomodations: {
    photograph: {
      type: 'radio',
      label: 'Are you okay with being photographed during Frosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
    },
    accessibility: {
      type: 'text',
      inputType: 'text',
      label:
        "Do you have any accessibility requirements or accomodations you'd like to share with us?",
      placeholder:
        'I would like to be able to access a quiet space to relax when the activities get overwhelming',
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Please enter a valid postal code.',
      localStorageKey: 'registration-areaGTA',
      onChanged: (value, disableField) => {
        if (value !== '' && value !== undefined) {
          disableField(false, 'accomadation', 'Accomodations');
        } else {
          disableField(true, 'accomadation', 'Accomodations');
        }
      },
    },
    accomadation: {
      type: 'radio',
      label: 'Would you like us to reach out to you about how we can best accomodate you?',
      values: ['Yes', 'No'],
      initialSelectedIndex: -1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'accomodationContact', 'Accomodations');
        } else {
          disableField(true, 'accomodationContact', 'Accomodations');
        }
      },
    },
    accomodationContact: {
      type: 'dropdown',
      label: 'Accomodation Contact Information',
      values: ['Phone', 'Email', 'Other'],
      initialSelectedIndex: 0,
      className: 'inline-block-remaining',
      onChanged: (value, disableField) => {
        if (value === 'Other') {
          disableField(false, 'accomodationOther', 'Accomodations');
        } else {
          disableField(true, 'accomodationOther', 'Accomodations');
        }
      },
    },
    accomodationOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Accomodation Contact Information',
      hasRestrictedInput: true,
      isRequiredInput: false,
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
