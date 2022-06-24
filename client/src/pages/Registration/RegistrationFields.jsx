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
    },
    pronoun: {
      type: 'dropdown',
      label: 'Pronoun',
      values: ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'],
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
      placeholder: 'doejohn123',
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
      errorMessage: 'Please enter a valid phone number',
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
      errorMessage: 'Please enter an emergency contact relationship',
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
      errorMessage: 'Please enter a valid phone number',
      localStorageKey: 'registration-emergencyContactNumber',
      className: 'fill-remaining-width-input',
      isPhoneNumber: true,
      inputTitle: 'Phone Number',
    },
  },
  HealthSafety: {
    medicalInfo: {
      type: 'text',
      inputType: 'textArea',
      label: 'Allergies and/or Medical Conditions',
      placeholder: 'Nut allergy',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-medicalInfo',
      className: 'half-width-input',
    },
    medication: {
      type: 'text',
      inputType: 'text',
      label: 'Medication (EpiPen, inhaler, etc.)',
      placeholder: 'Carries 2 EpiPcd ens',
      hasRestrictedInput: true,
      isRequiredInput: false,
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
      localStorageKey: 'registration-allergies',
    },
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
        "Do you have any accessibility requirements or accommodations you'd like to share with us?",
      placeholder:
        'I would like to be able to access a quiet space to relax when the activities get overwhelming',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-areaGTA',
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
      initialSelectedIndex: 1,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'accommodationContact', 'HealthSafety');
        } else {
          disableField(true, 'accommodationContact', 'HealthSafety');
        }
      },
    },
    accommodationContact: {
      type: 'dropdown',
      label: 'Accommodation Contact Information',
      values: ['Phone', 'Email', 'Other'],
      initialSelectedIndex: 0,
      onChanged: (value, disableField) => {
        if (value === 'Other') {
          disableField(false, 'accommodationOther', 'HealthSafety');
        } else {
          disableField(true, 'accommodationOther', 'HealthSafety');
        }
      },
      className: 'half-width-input',
    },
    accommodationOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Accommodation Contact Information',
      hasRestrictedInput: true,
      isRequiredInput: false,
      className: 'fill-remaining-width-input',
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
      type: 'radio',
      label: 'Do you plan on living in the GTA this summer?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      onChanged: (value, disableField) => {
        if (value === 'Yes') {
          disableField(false, 'moveToToronto', 'Misc');
          disableField(true, 'summerLocationOther', 'Misc');
        } else {
          disableField(true, 'moveToToronto', 'Misc');
          disableField(false, 'summerLocationOther', 'Misc');
        }
      },
    },
    summerLocationOther: {
      type: 'text',
      inputType: 'text',
      label: 'Where will you be located this summer?',
      placeholder: 'Vancouver',
      hasRestrictedInput: true,
      isRequiredInput: false,
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
      initialSelectedIndex: 1,
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
      className: 'half-width-input',
    },
    commuterOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Commuter Option',
      hasRestrictedInput: true,
      isRequiredInput: false,
      className: 'fill-remaining-width-input',
    },
    commuterProgramStop: {
      type: 'text',
      inputType: 'text',
      label: 'Which stop do you get on for the subway or go train?',
      isRequiredInput: false,
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
