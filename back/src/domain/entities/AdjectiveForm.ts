export enum AdjectiveForm {
  PRESENT_AFFIRMATIVE = 'present_affirmative',
  PRESENT_NEGATIVE = 'present_negative',
}

const FORMS = [AdjectiveForm.PRESENT_AFFIRMATIVE, AdjectiveForm.PRESENT_NEGATIVE];

export function getRandomAdjectiveForm(): AdjectiveForm {
  const randomIndex = Math.floor(Math.random() * FORMS.length);
  return FORMS[randomIndex];
}
