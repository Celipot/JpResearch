import { GrammarRule } from './GrammarRule';

export type ExerciseType = 'fill-in-the-blank' | 'multiple-choice' | 'translation';

interface ExerciseParams {
  type: ExerciseType;
  rule: GrammarRule;
  question: string;
  correctAnswers: string[];
  options?: string[];
  explanation: string;
}

export class Exercise {
  readonly type: ExerciseType;
  readonly rule: GrammarRule;
  readonly question: string;
  readonly correctAnswers: string[];
  readonly options?: string[];
  readonly explanation: string;

  constructor(params: ExerciseParams) {
    this.type = params.type;
    this.rule = params.rule;
    this.question = params.question;
    this.correctAnswers = params.correctAnswers;
    this.options = params.options;
    this.explanation = params.explanation;
  }
}
