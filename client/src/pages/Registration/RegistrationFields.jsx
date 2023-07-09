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
    if (/^[A-Za-z]*$/.test(value)) {
      return true;
    } else {
      return 'Please use Aa-Zz characters';
    }
  } else {
    return 'Please ensure that your full name is between 1 and 50 characters';
  }
};

const textLengthValidation = (value) => {
  if (value.length > 50) {
    return 'Please try to use 50 characters or less';
  } else {
    return true;
  }
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
      // noEdit: true,
    },
    firstName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John',
      label: 'First Name',
      className: 'half-width-input',
      isRequiredInput: true,
      // noEdit: true,
    },
    lastName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Doe',
      label: 'Last Name',
      className: 'half-width-input',
      isRequiredInput: true,
      // noEdit: true,
    },
    preferredName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'Joey',
      label: 'Preferred Name',
      localStorageKey: 'registration-preferred-name',
    },
  },
  General: {
    legalName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John Doe',
      label: 'Legal Name',
      isRequiredInput: true,
      noEdit: true,
      errorMessage: 'Please enter your full name',
      localStorageKey: 'registration-full-name',
      validation: textLengthValidation,
    },
    pronouns: {
      type: 'dropdown',
      label: 'What are your pronouns?',
      values: ['He/Him', 'They/Them', 'She/Her', 'Other', 'Prefer not to say'],
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
      placeholder: 'doejon11',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: true,
      errorMessage: 'Please enter your UtorID',
      localStorageKey: 'registration-utorid',
      className: 'half-width-input',
      validation: (value) => {
        if (value !== undefined && value.toString().length <= 9 && value.toString().length >= 7) {
          return true;
        } else {
          return 'Your UtorID should be 7-9 characters long';
        }
      },
      isUtorID: true,
    },
    discipline: {
      type: 'dropdown',
      label: 'Discipline',
      values: [
        'Chemical',
        'Civil',
        'Electrical & Computer',
        'Engineering Science',
        'Industrial',
        'Materials',
        'Mechanical',
        'Mineral',
        'Track One (Undeclared)',
      ],
      className: 'half-width-input',
      initialSelectedIndex: 0,
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-discipline',
    },
    shirtSize: {
      type: 'dropdown',
      label: 'T-shirt Size',
      values: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      initialSelectedIndex: 1,
      className: 'half-width-input',
      isRequiredInput: true,
      noEdit: true,
      localStorageKey: 'registration-shirtSize',
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
      localStorageKey: 'registration-phoneNumberCountryCode',
      className: 'small-width-input',
      inputTitle: 'Country Code',
      maxLength: 3,
      noEdit: false,
      validation: (value) => {
        if (/^[+0-9]*$/.test(value)) {
          if (value.length <= 3) {
            return true;
          } else {
            return 'Must be at most 3 characters';
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
      validation: textLengthValidation,
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
      validation: textLengthValidation,
    },
    emergencyContactNumber: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency Contact Phone Number',
      placeholder: '(416) 123-4567',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      errorMessage: 'Please enter a valid phone number',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'half-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
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
      ],
      isRequiredInput: true,
      noEdit: false,
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
      localStorageKey: 'registration-accessibility',
      onChanged: (value, disableField) => {
        if (value !== '' && value !== undefined) {
          disableField(false, 'accommodation', 'HealthSafety');
        } else {
          disableField(true, 'accommodation', 'HealthSafety');
        }
      },
    },
    accommodation: {
      type: 'radio',
      label: 'Would you like us to reach out to you about how we can best accommodate you?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      isRequiredInput: false,
      localStorageKey: 'registration-accommodation',
    },
  },
  ExtraEvents: {
    attendingScunt: {
      type: 'radio',
      label:
        'Would you like to participate in Havenger Scunt? (It will take place on the evening of Wednesday, September 6th)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-scunt',
      noEdit: false,
      isRequiredInput: true,
    },
    summerLocationLabel: {
      type: 'label',
      label: 'Where will you be located for the majority of the summer?',
    },
    summerLocationCity: {
      type: 'text',
      inputType: 'text',
      label: 'City',
      placeholder: 'Toronto',
      isRequiredInput: true,
      noEdit: false,
      localStorageKey: 'registration-summerLocationCity',
      errorMessage: 'Please enter your city',
      className: 'half-width-input',
      validation: textLengthValidation,
    },
    summerLocationCountry: {
      type: 'text',
      inputType: 'text',
      label: 'Country (2 character code)',
      placeholder: 'CA',
      hasRestrictedInput: true,
      isRequiredInput: true,
      noEdit: false,
      localStorageKey: 'registration-summerLocationCountry',
      errorMessage: 'Please enter your country',
      className: 'half-width-input',
      validation: (value) => {
        if (/^[A-Z]*$/.test(value) && value.length === 2) {
          return true;
        } else {
          return 'Please use the 2 letter country code';
        }
      },
    },
    moveToToronto: {
      type: 'dropdown',
      label:
        'If you are not in the GTA (Greater Toronto Area) already, approximately when are you planning to move to Toronto?',
      values: ['Already in Toronto', 'July', 'August', 'September'],
      initialSelectedIndex: 0,
      isRequiredInput: false,
      noEdit: false,
      localStorageKey: 'registration-moveToToronto',
    },
    photograph: {
      type: 'radio',
      label: 'Are you okay with being photographed during Frosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'commuterProgramInformation', 'Misc');
        } else {
          disableField(true, 'commuterProgramInformation', 'Misc');
          disableField(true, 'commuterProgramOther', 'Misc');
          disableField(true, 'commuterProgramStop', 'Misc');
        }
      },
      localStorageKey: 'registration-commuter',
    },
    commuterProgramInformation: {
      type: 'dropdown',
      label: 'What is you main method of commuting to campus?',
      values: ['Car', 'Subway', 'Bus', 'Go Train', 'Walking', 'Biking', 'Other'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-photograph',
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
