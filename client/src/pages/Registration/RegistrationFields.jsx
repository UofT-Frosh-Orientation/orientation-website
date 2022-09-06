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
  General: {
    legalName: {
      type: 'text',
      inputType: 'text',
      placeholder: 'John Doe',
      label: 'Legal Name',
      isRequiredInput: true,
      errorMessage: 'Please enter your legal name',
      localStorageKey: 'registration-legal-name',
    },
    pronouns: {
      type: 'dropdown',
      label: 'Pronoun',
      values: ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'],
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
      placeholder: '1852-12-25',
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
      placeholder: 'doejohn1',
      hasRestrictedInput: true,
      isRequiredInput: true,
      errorMessage: 'Please enter your UtorID',
      localStorageKey: 'registration-utorid',
      className: 'half-width-input',
      validation: (value) => {
        if (value !== undefined && value.toString().length <= 9 && value.toString().length >= 5) {
          return true;
        } else {
          return 'Your UtorID should be 5 - 9 characters long';
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
      className: 'inline-block-remaining',
      initialSelectedIndex: 0,
      localStorageKey: 'registration-discipline',
    },
    shirtSize: {
      type: 'dropdown',
      label: 'T-shirt size',
      values: ['S', 'M', 'L', 'XL'],
      initialSelectedIndex: 1,
      className: 'inline-block-remaining',
      noEdit: true,
      localStorageKey: 'registration-shirtSize',
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
      maxLength: 3,
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
      maxLength: 3,
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
    bursaryRequested: {
      type: 'radio',
      label:
        'Would you like to be considered for a bursary to cover some or all of your registration cost? Note: if you select yes you will still have to pay in full at this time to be considered registered but you will be contacted later this summer to fill out a bursary application form to become eligable to recieve a partial or full refund of your registration cost on a need basis. If you cannont cover the registration cost at this time please contact us at froshweek@orientation.skule.ca',
      values: ['Yes', 'No'],
      initialSelectedIndex: 1,
      localStorageKey: 'registration-bursaryRequested',
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
      label: 'Medication (Epi-Pen, inhaler, etc.)',
      placeholder: 'Carries 2 Epi-Pens',
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
      localStorageKey: 'registration-allergies',
    },
    allergiesMore: {
      type: 'text',
      inputType: 'text',
      label:
        'If there are any other restrictions not listed above, please write them in the box below.',
      placeholder: 'Allergic to berries',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-allergiesMore',
    },
    photograph: {
      type: 'radio',
      label: 'Are you okay with being photographed during Frosh Week?',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-photograph',
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
      localStorageKey: 'registration-accommodation',
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
      localStorageKey: 'registration-accommodationContact',
    },
    accommodationOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Accommodation Contact Information',
      hasRestrictedInput: true,
      isRequiredInput: false,
      className: 'fill-remaining-width-input',
      localStorageKey: 'registration-accommodationOther',
    },
  },
  Misc: {
    infoLabel: {
      type: 'label',
      label:
        'The following information will be used to help in the planning and coordination some Frosh Week events including Havenger Scunt, Summer Meetups, and Commuter Buddies.',
      isRequiredInput: true,
      isBold: true,
    },
    scunt: {
      type: 'radio',
      label:
        'Would you like to participate in Havenger Scunt? (It will take place on the evening of Wednesday, September 7th)',
      values: ['Yes', 'No'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-scunt',
      noEdit: true,
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
      localStorageKey: 'registration-summerLocation',
    },
    summerLocationOther: {
      type: 'text',
      inputType: 'text',
      label: 'Where will you be located this summer?',
      placeholder: 'Vancouver',
      hasRestrictedInput: true,
      isRequiredInput: false,
      localStorageKey: 'registration-summerLocationOther',
    },
    moveToToronto: {
      type: 'dropdown',
      label: 'Approximately when are you planning to move to Toronto?',
      values: ['N/A', 'May', 'June', 'July', 'August', 'September'],
      initialSelectedIndex: 0,
      localStorageKey: 'registration-moveToToronto',
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
      localStorageKey: 'registration-commuter',
    },
    commuterProgramInformation: {
      type: 'dropdown',
      label: 'What is you main method of commuting to campus?',
      values: ['Car', 'Subway', 'Bus', 'Go Train', 'Walking', 'Biking', 'Other'],
      initialSelectedIndex: 0,
      onChanged: (value, disableField) => {
        if (value === 'Subway' || value === 'Go Train') {
          disableField(false, 'commuterProgramStop', 'Misc');
        } else {
          disableField(true, 'commuterProgramStop', 'Misc');
        }
        if (value === 'Other') {
          disableField(false, 'commuterProgramOther', 'Misc');
        } else {
          disableField(true, 'commuterProgramOther', 'Misc');
        }
      },
      isRequiredInput: false,
      className: 'half-width-input',
      localStorageKey: 'registration-commuterProgramInfo',
    },
    commuterProgramOther: {
      type: 'text',
      inputType: 'text',
      label: 'Other Commuter Option',
      hasRestrictedInput: true,
      isRequiredInput: false,
      className: 'fill-remaining-width-input',
      localStorageKey: 'registration-commuterOther',
    },
    commuterProgramStop: {
      type: 'text',
      inputType: 'text',
      label: 'Which stop do you get on for the subway or go train?',
      isRequiredInput: false,
      localStorageKey: 'registration-commuterProgramStop',
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
