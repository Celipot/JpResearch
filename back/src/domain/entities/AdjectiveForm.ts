export enum AdjectiveForm {
  PRESENT_AFFIRMATIVE = 'present_affirmative',
  PRESENT_NEGATIVE = 'present_negative',
  PRESENT_AFFIRMATIVE_POLITE = 'present_affirmative_polite',
  PRESENT_NEGATIVE_POLITE = 'present_negative_polite',
}

export class AdjectiveFormUtils {
  private static readonly FORMS = [
    AdjectiveForm.PRESENT_AFFIRMATIVE,
    AdjectiveForm.PRESENT_NEGATIVE,
    AdjectiveForm.PRESENT_AFFIRMATIVE_POLITE,
    AdjectiveForm.PRESENT_NEGATIVE_POLITE,
  ];

  static getRandomForm(): AdjectiveForm {
    const randomIndex = Math.floor(Math.random() * this.FORMS.length);
    return this.FORMS[randomIndex];
  }
}
