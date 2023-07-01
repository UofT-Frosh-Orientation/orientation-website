// All the attributes of the objects correspond to their input type... except:
// These must be included, even if the input type does not require this info
//
// isRequiredInput: if the field can be undefined before submission
// errorMessage: The message to show if the field is missing but is required
// onChanged(value, disableFields): disable/enable fields based on a value (dependancies)
// className: the class name applied around the child form input component
// noEdit: if set, this field CANNOT be modified AFTER the frosh registers
//         Note: noEdit does not work for checkboxes
// validation(value): if set, return true for a valid input, return a string as the error message. The check will fail if a string is returned.
// isBold: field.type of label! (bolds the label)

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
  Registration: {
    fullName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John Doe',
      label: 'Legal Name',
      isRequiredInput: true,
      errorMessage: 'Please enter your full name',
      localStorageKey: 'registration-full-name',
      validation: (value) => {
        if (value.length >= 1 && value.length <= 50) {
          if (/^[A-Za-z]*$/.test(value)) {
            return true;
          } else {
            return 'Please use Aa-Zz characters';
          }
        } else {
          return 'Please ensure that your full name is between 1 and 50 characters';
        }
      },
    },
    pronouns: {
      type: 'dropdown',
      label: 'What are your pronouns?',
      values: ['He/Him', 'They/Them', 'She/Her', 'Other', 'Prefer not to say'],
      isRequiredInput: true,
      initialSelectedIndex: 0,
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
      hasRestrictedInput: true,
      isRequiredInput: false,
      errorMessage: 'Please enter a pronoun',
      className: 'fill-remaining-width-input',
      localStorageKey: 'registration-other-pronoun',
    },
    birthDate: {
      type: 'text',
      inputType: 'date',
      label: 'Birthday',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid date',
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
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter your UtorID',
      localStorageKey: 'registration-utorid',
      className: 'half-width-input',
      validation: (value) => {
        if (value !== undefined && value.toString().length === 8) {
          return true;
        } else {
          return 'Your UtorID should be 8 characters long';
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
        'ECE',
        'MSE',
        'TrackOne',
        'EngSci',
      ],
      className: 'inline-block-remaining',
      initialSelectedIndex: 0,
      isRequiredInput: true,
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
      hasRestrictedInput: true,
      localStorageKey: 'registration-phoneNumberCountryCode',
      className: 'small-width-input',
      inputTitle: 'Country Code',
      maxLength: 3,
    },
    phoneNumber: {
      type: 'text',
      inputType: 'text',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
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
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid name',
      localStorageKey: 'registration-emergencyContactName',
      className: 'half-width-input',
    },
    emergencyContactRelationship: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency Contact Relationship',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter an emergency contact relationship',
      localStorageKey: 'registration-emergencyContactRelationship',
      className: 'half-width-input',
    },
    emergencyContactNumber: {
      type: 'text',
      inputType: 'text',
      label: 'Emergency Contact Phone Number',
      placeholder: '(416) 123-4567',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter a valid phone number',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
    },
    bursaryRequested: {
      type: 'dropdown',
      label: 'Bursary',
      values: ['Yes', 'No'],
      isRequiredInput: true,
      noEdit: true,
      initialSelectedIndex: null,
      localStorageKey: 'registration-bursaryRequested',
    },
  },
  HealthSafety: {
    medicalInfo: {
      type: 'dropdown',
      values: ['Yes', 'No'],
      initialSelectedIndex: null,
      // inputType: 'textArea',
      label: 'Allergies and/or Medical Conditions',
      placeholder: 'Nut allergy',
      hasRestrictedInput: true,
      isRequiredInput: true,
      localStorageKey: 'registration-medicalInfo',
      className: 'half-width-input',
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'specficMedicalInfo', 'HealthSafety');
        } else {
          disableField(true, 'specficMedicalInfo', 'HealthSafety');
        }
      },
    },
    specficMedicalInfo: {
      type: 'text',
      inputType: 'text',
      label: 'Specific Allergies and/or Medical Conditions',
      placeholder: 'Nut Allergy',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-specificMedicalInfo',
      className: 'half-width-input',
    },
    medication: {
      type: 'text',
      inputType: 'text',
      label: 'Medication (e.g. Epi-Pen, inhaler, ...)',
      placeholder: 'Carries 2 Epi-Pens',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-medication',
      className: 'half-width-input',
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'specficMedicalInfo', 'HealthSafety');
        } else {
          disableField(true, 'specficMedicalInfo', 'HealthSafety');
        }
      },
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
      localStorageKey: 'registration-allergies',
      onChanged: (value, disableField) => {
        if (value === 'other') {
          disableField(false, 'allergiesOther', 'HealthSafety');
        } else {
          disableField(true, 'allergiesOther', 'HealthSafety');
        }
      },
    },
    allergiesOther: {
      type: 'text',
      inputType: 'textarea',
      label: 'If you have any other restrictions not listed above, please list them here.',
      placeholder: 'Allergic to berries',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-allergiesMore',
    },
  },
  Kits: {
    shirtSize: {
      type: 'dropdown',
      label: 'T-shirt Size',
      values: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      initialSelectedIndex: 1,
      className: 'inline-block-remaining',
      isRequiredInput: false,
      noEdit: true,
      localStorageKey: 'registration-shirtSize',
    },
  },
  ExtraEvents: {
    nitelife: {
      type: 'dropdown',
      values: ['Yes', 'No'],
      initialSelectedIndex: null,
      label: 'Would you be interested in attending a carnival with other UofT Departments?',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-nitelife',
      className: 'half-width-input',
    },
    scunt: {
      type: 'dropdown',
      label:
        'Would you like to participate in Havenger Scunt? (It will take place on the evening of Wednesday, September 6th)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-scunt',
      noEdit: false,
      isRequiredInput: true,
    },
    retreat: {
      type: 'dropdown',
      label:
        'Would you like to attend an overnight retreat on September 9th-10th at Hart House Farms (at an additional cost)?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-scunt',
      noEdit: false,
      isRequiredInput: true,
    },
  },
  Misc: {
    summerLocationLabel: {
      type: 'label',
      label: 'Where will you be located for the majority of the summer?',
      isRequiredInput: true,
    },
    summerLocationCity: {
      type: 'text',
      inputType: 'text',
      label: 'City',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-summerLocationCity',
      errorMessage: 'Please enter your city',
      className: 'half-width-input',
    },
    summerLocationCountry: {
      type: 'text',
      inputType: 'text',
      label: 'Country',
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-summerLocationCountry',
      errorMessage: 'Please enter your country',
      className: 'half-width-input',
      validation: (value) => {
        if (/^[A-Z]*$/.test(value)) {
          return true;
        } else {
          return 'Please use capital letters';
        }
      },
    },
    photograph: {
      type: 'dropdown',
      label: 'Are you okay with being photographed during Frosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-photograph',
    },
    accessibility: {
      type: 'text',
      inputType: 'textarea',
      label:
        "Do you have any accessibility requirements or accommodations you'd like to share with us?",
      placeholder: '',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-accessibility',
      onChanged: (value, disableField) => {
        if (value !== '' && value !== undefined) {
          disableField(false, 'accommodation', 'Misc');
        } else {
          disableField(true, 'accommodation', 'Misc');
        }
      },
    },
    accommodation: {
      type: 'radio',
      label: 'Would you like us to reach out to you about how we can best accommodate you?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'accommodationContact', 'HealthSafety');
        } else {
          disableField(true, 'accommodationContact', 'HealthSafety');
        }
      },
      localStorageKey: 'registration-accommodation',
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
