export enum AdjectiveForm {
  PRESENT_AFFIRMATIVE = 'present_affirmative',
  PRESENT_NEGATIVE = 'present_negative',
}

export class AdjectiveFormUtils {
  private static readonly FORMS = [
    AdjectiveForm.PRESENT_AFFIRMATIVE,
    AdjectiveForm.PRESENT_NEGATIVE,
  ];

  static getRandomForm(): AdjectiveForm {
    const randomIndex = Math.floor(Math.random() * this.FORMS.length);
    return this.FORMS[randomIndex];
  }
}
