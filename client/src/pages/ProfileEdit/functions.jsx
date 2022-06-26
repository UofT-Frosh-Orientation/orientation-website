export function getSelectedFroshValues() {
  // This is sample data, the shirtSize cannot be modified, and the initial value is given, it is disabled in RegistrationFields.jsx
  return {
    utorid: 'JamesKokoska',
    shirtSize: 3, //Rememeber indices must match those set in RegistrationFields.jsx
    discipline: 2,
    birthdate: '2000-01-01',
    pronoun: 0,
  };
}

export function submitEdits(froshObject) {
  console.log(froshObject);
}
