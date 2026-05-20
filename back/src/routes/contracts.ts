export interface VerbReq {
  query: { kinds?: string; tenses?: string; registers?: string; polarities?: string };
}

export interface AdjectiveReq {
  query: { polarities?: string; registers?: string };
}

export interface NumberReq {
  query: { min?: string; max?: string };
}

export interface CheckAnswerReq {
  body: { userAnswer: string; expectedAnswer?: string; expectedAnswers?: string[] };
}
