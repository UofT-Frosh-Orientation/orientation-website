// All the attributes of the objects correspond to their input type... except:
// These must be included, even if the input type does not require this info
//
// isRequiredInput: if the field can be undefined before submission
// hasRestrictedInput (optional): replaces symbols like +-/{},etc. with ''
// errorMessage: The message to show if the field is missing but is required
// onChanged(value, disableFields): disable/enable fields based on a value (dependancies)
// className: the class name applied around the child form input component
// noEdit: if set, this field CANNOT be modified AFTER the frosh registers
//         Note: noEdit does not work for checkboxes
// validation(value): if set, return true for a valid input, return a string as the error message. The check will fail if a string is returned.
// isBold: field.type of label! (bolds the label)

// checking for Aa-Zz characters and 1-50 character length
const textValidation = (value) => {
  if (value.length >= 1 && value.length <= 50) {
    if (/^[A-Za-z ]*$/.test(value)) {
      return true;
    } else {
      return 'Please use Aa-Zz characters';
    }
  } else {
    return 'Please ensure that your name is between 1 and 50 characters';
  }
};

const textLengthValidation = (value) => {
  if (value.length > 50) {
    return 'Please try to use 50 characters or less';
  } else {
    return true;
  }
};

const phoneNumberValidation = (value) => {
  if (value.length > 5 && value.length < 16) return true;
  else return 'Please enter a valid phone number';
};

let allergiesList = [];

export const fields = {
  EditFieldsOnly: {
    emailLabel: {
      type: 'label',
      label:
        'Please ensure your email is correct, if changed. An incorrect email can get you locked out of your account!',
      isBold: true,
    },
    email: {
      type: 'text',
      inputType: 'text',
      placeholder: 'john.doe@email.com',
      label: 'Email',
      isRequiredInput: true,
      noEdit: false,
    },
    firstName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John',
      label: 'First Name',
      className: 'half-width-input',
      isRequiredInput: true,
      noEdit: true,
    },
    lastName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Doe',
      label: 'Last Name',
      className: 'half-width-input',
      isRequiredInput: true,
      noEdit: true,
    },
    preferredName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Joey',
      label: 'Preferred Name',
      localStorageKey: 'registration-preferred-name',
      noEdit: false,
    },
  },
  General: {
    // legalName: {
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: 'John Doe',
    //   label: 'Legal Name',
    //   isRequiredInput: true,
    //   noEdit: true,
    //   errorMessage: 'Please enter your full name',
    //   localStorageKey: 'registration-full-name',
    //   validation: textLengthValidation,
    // },
    firstName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John',
      label: 'First Name',
      isRequiredInput: true,
      noEdit: true,
      className: 'half-width-input',
      errorMessage: 'Please enter your first name',
      localStorageKey: 'registration-first-name',
      validation: textValidation,
    },
    lastName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Doe',
      label: 'Last Name',
      isRequiredInput: true,
      noEdit: true,
      className: 'fill-remaining-width-input',
      errorMessage: 'Please enter your last name',
      localStorageKey: 'registration-last-name',
      validation: textValidation,
    },
    preferredName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John',
      label: 'Preferred Name',
      isRequiredInput: true,
      noEdit: true,
      errorMessage: 'Please enter your preferred name. This can be the same as your first name.',
      localStorageKey: 'registration-pref-name',
      validation: textValidation,
    },
    pronouns: {
      type: 'dropdown',
      label: 'What are your pronouns?',
      values: ['He/Him', 'She/Her', 'They/Them', 'Other', 'Prefer Not to Say'],
      isRequiredInput: true,
      initialSelectedIndex: 4,
      noEdit: true,
      className: 'half-width-input',
      onChanged: (value, disableField) => {
        if (value === 'Other') {
          disableField(false, 'pronounOther', 'General');
        } else {
          disableField(true, 'pronounOther', 'General');
        }
      },
      localStorageKey: 'registration-pronouns',
    },
    pronounOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Pronoun',
      isRequiredInput: false,
      noEdit: true,
      errorMessage: 'Please enter a pronoun',
      className: 'fill-remaining-width-input',
      localStorageKey: 'registration-other-pronoun',
      validation: textLengthValidation,
    },
    birthDate: {
      type: 'text',
      inputType: 'date',
      label: 'Birthday',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: true,
      errorMessage: 'Please enter a valid date',
      localStorageKey: 'registration-birthdate',
      className: 'half-width-input',
      validation: (value) => {
        if (
          value !== undefined &&
          value.split('-')[0] !== undefined &&
          parseInt(value.split('-')[0]) >= 1920 &&
          parseInt(value.split('-')[0]) <= 2020
        ) {
          return true;
        } else {
          return 'Please ensure your birthday is between 1920 and 2020';
        }
      },
    },
    utorid: {
      type: 'text',
      inputType: 'text',
      label: 'UtorID',
      placeholder: 'doejohn25',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: true,
      errorMessage: 'Please enter your UtorID',
      localStorageKey: 'registration-utorid',
      className: 'half-width-input',
      validation: (value) => {
        if (value !== undefined && value.toString().length >= 5 && value.toString().length <= 9) {
          return true;
        } else {
          return 'Your UtorID should be between 5 and 9 characters long';
        }
      },
      isUtorID: true,
    },
    discipline: {
      type: 'dropdown',
      label: 'Discipline',
      values: [
        'Chemical',
        'Industrial',
        'Mechanical',
        'Civil',
        'Mineral',
        'Electrical & Computer',
        'Materials',
        'Track One (Undeclared)',
        'Engineering Science',
      ],
      className: 'half-width-input',
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-discipline',
    },
    phoneNumberLabel: {
      type: 'label',
      label: 'Phone Number',
      isRequiredInput: true,
    },
    phoneNumberCountryCode: {
      type: 'text',
      inputType: 'text',
      placeholder: '+1',
      hasRestrictedInput: false,
      isRequiredInput: true,
      localStorageKey: 'registration-phoneNumberCountryCode',
      className: 'small-width-input',
      inputTitle: 'Country Code',
      maxLength: 4,
      noEdit: false,
      errorMessage: 'Please enter an area code',
      validation: (value) => {
        if (/^[+0-9]*$/.test(value)) {
          if (value.length <= 4) {
            return true;
          } else {
            return 'Must be at most 4 characters';
          }
        } else {
          return 'Must contain characters 0-9 or +';
        }
      },
    },
    phoneNumber: {
      type: 'text',
      inputType: 'text',
      placeholder: '(416) 123-4567',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please enter a valid phone number',
      localStorageKey: 'registration-phoneNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
      validation: phoneNumberValidation,
    },
    emergencyContactName: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency Contact Full Name',
      placeholder: 'Jane Doe',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please enter a valid name',
      localStorageKey: 'registration-emergencyContactName',
      className: 'full-width-input',
      validation: textValidation,
    },
    emergencyContactRelationship: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency Contact Relationship',
      placeholder: 'Parent / Guardian',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please enter an emergency contact relationship',
      localStorageKey: 'registration-emergencyContactRelationship',
      className: 'half-width-input',
      validation: textValidation,
    },
    emergencyContactNumberLabel: {
      type: 'label',
      label: 'Emergency Contact Phone Number',
      isRequiredInput: true,
    },
    emergencyContactCountryCode: {
      type: 'text',
      inputType: 'text',
      placeholder: '+1',
      hasRestrictedInput: false,
      isRequiredInput: true,
      localStorageKey: 'registration-emergencyContactNumberCountryCode',
      className: 'small-width-input',
      inputTitle: 'Country Code',
      maxLength: 4,
      noEdit: false,
      errorMessage: 'Please enter an area code',
      validation: (value) => {
        if (/^[+0-9]*$/.test(value)) {
          if (value.length <= 4) {
            return true;
          } else {
            return 'Must be at most 4 characters';
          }
        } else {
          return 'Must contain characters 0-9 or +';
        }
      },
    },
    emergencyContactNumber: {
      type: 'text',
      inputType: 'text',
      placeholder: '(416) 123-4567',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please enter a valid phone number',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
      validation: phoneNumberValidation,
    },
  },
  HealthSafety: {
    medicalInfo: {
      type: 'radio',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      label: 'Medical Conditions',
      placeholder: '',
      isRequiredInput: true,
      noEdit: false,
      localStorageKey: 'registration-medicalInfo',
      className: 'half-width-input',
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'specficMedicalInfo', 'HealthSafety');
          disableField(false, 'medication', 'HealthSafety');
        } else {
          disableField(true, 'specficMedicalInfo', 'HealthSafety');
          disableField(true, 'medication', 'HealthSafety');
        }
      },
    },
    specficMedicalInfo: {
      type: 'text',
      inputType: 'text',
      label: 'Specific Medical Conditions',
      placeholder: 'Respiratory Conditions',
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-specificMedicalInfo',
      className: 'half-width-input',
      validation: textLengthValidation,
    },
    medication: {
      type: 'text',
      inputType: 'text',
      label: 'Medication (e.g. Epi-Pen, inhaler, ...)',
      placeholder: 'Carries 2 Inhalers',
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-medication',
      className: 'half-width-input',
      validation: textLengthValidation,
    },
    allergies: {
      type: 'checkbox',
      label: 'Do you have any of the following dietary restrictions or allergies?',
      values: [
        'Lactose Intolerance/Dairy-Free',
        'Gluten Intolerance/Allergy',
        'Vegetarian',
        'Vegan',
        'Kosher',
        'Nut Allergy',
        'No Pork & Pork by-products',
        'No Red meat',
        'Other',
        'None',
      ],
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please choose None if you do not have any allergies or dietary restrictions',
      localStorageKey: 'registration-allergies',
      onChanged: (values, disableField) => {
        if (values.includes('Other')) {
          disableField(false, 'allergiesOther', 'HealthSafety');
        } else {
          disableField(true, 'allergiesOther', 'HealthSafety');
        }
      },
    },
    allergiesOther: {
      type: 'text',
      inputType: 'textArea',
      label: 'If you have any other restrictions not listed above, please list them here.',
      placeholder: 'Allergic to berries',
      hasRestrictedInput: true,
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-allergiesMore',
      isDisabled: true, // to initially set to disabled until 'Other' is clicked
      validation: (value) => {
        if (value.length > 100) {
          return 'Please use less than 100 characters';
        } else {
          return true;
        }
      },
    },
    accessibility: {
      type: 'text',
      inputType: 'textArea',
      label:
        "Do you have any accessibility requirements or accommodations you'd like to share with us?",
      placeholder:
        'I would like to be able to access a quiet space to relax when the activities get overwhelming',
      hasRestrictedInput: true,
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-accessibility',
      onChanged: (value, disableField) => {
        if (value !== '' && value !== undefined) {
          disableField(false, 'accommodation', 'HealthSafety');
        } else {
          disableField(true, 'accommodation', 'HealthSafety');
        }
      },
      validation: (value) => {
        if (value.length > 100) {
          return 'Please use less than 100 characters';
        } else {
          return true;
        }
      },
    },
    accommodation: {
      type: 'radio',
      label: 'Would you like us to reach out to you about how we can best accommodate you?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-accommodation',
      isDisabled: true,
    },
  },
  ExtraEvents: {
    shirtSize: {
      type: 'dropdown',
      label: 'T-shirt Size',
      values: ['S', 'M', 'L', 'XL', '2XL'],
      initialSelectedIndex: 1,
      className: 'half-width-input',
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-shirtSize',
    },
    attendingScunt: {
      type: 'radio',
      label:
        'Would you like to participate in SKULE™ Hunt? (It will take place on the evening of Wednesday, September 2nd)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-scunt',
      noEdit: true, // Edit this to be false for most of registration, will only be true on the Tuesday before scunt
      isRequiredInput: true,
    },
    scuntInfo: {
      type: 'label',
      label:
        "SKULE™ Hunt is a scavenger hunt around the city of Toronto! Don't miss out on one of the most popular F!rosh Week events! It's an exciting night of challenges for all comfort levels.",
      isSub: true,
    },
    attendingRetreat: {
      type: 'radio',
      label:
        'Would you like to attend an overnight retreat on September 5th-6th at Hart House Farms? (At an additional cost)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-attendingRetreat',
    },
    priceInfo: {
      type: 'label',
      label:
        'The price of a F!rosh Retreat ticket is $110 CAD. Answering "Yes" to this question will not add the retreat cost to your payment or guarantee you a spot at the retreat. Please see the retreat page linked on your profile for details about the payment process.',
      isSub: true,
    },
    summerLocationQuery: {
      type: 'radio',
      label:
        'Will you be based in Toronto or the GTA over the summer?  (Or would you be available for events?)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: false,
      localStorageKey: 'registration-summerLocationQuery',
    },
    moveToToronto: {
      type: 'dropdown',
      label:
        'If you are not in the GTA (Greater Toronto Area) already, approximately when are you planning to move to Toronto?',
      values: ['Already in Toronto', 'July', 'August', 'September'],
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: false,
      localStorageKey: 'registration-moveToToronto',
    },
    photograph: {
      type: 'radio',
      label: 'Do you give consent to be photographed during F!rosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-photograph',
    },
    bursaryRequested: {
      type: 'radio',
      label: 'Would you like to request a bursary or financial aid for your Frosh Week ticket?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-bursary',
    },
    bursaryInfo: {
      type: 'label',
      label:
        'The price of a F!rosh Week ticket is $135 CAD. We will be making bursary decisions after F!rosh Week and will refund the amount to the students after the decisions. Our team will reach out to you for more details regarding the bursary program. Bursaries range from partial to complete settlement of the ticket price.',
      isSub: true,
    },
    marketing: {
      type: 'checkbox',
      label: 'How did you hear about F!rosh Week?',
      values: ['Instagram', 'First Year News Feed', 'Word of Mouth', 'Discord', 'Other'],
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-marketing',
      onChanged: (values, disableField) => {
        if (values.includes('Other')) {
          disableField(false, 'marketingOther', 'ExtraEvents');
        } else {
          disableField(true, 'marketingOther', 'ExtraEvents');
        }
      },
    },
    marketingOther: {
      type: 'text',
      inputType: 'textArea',
      label:
        'If you heard about F!rosh Week through a different method not listed above, please list it here.',
      placeholder: 'Facebook',
      hasRestrictedInput: true,
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-marketingMore',
      isDisabled: true, // to initially set to disabled until 'Other' is clicked
      // validation: (value) => {
      //   if (value.length > 100) {
      //     return 'Please use less than 100 characters';
      //   } else {
      //     return true;
      //   }
      // },
    },
  },
};
export const terms = `
F!rosh Week is collecting your information to help us deliver some of our programming. 
Notably, we're asking for your contact information so that we can be in contact over the 
summer and help prepare you for F!rosh Week and the school year. Your contact information information will not be shared 
with anyone but those within the F!rosh Week organization who will be contacting you, and 
you won't be contacted by anyone in any capacity outside of their roles in F!rosh Week. 
All private information will 
be disposed of at the end of the school year.
`;
