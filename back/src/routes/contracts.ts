export interface VerbReq {
  query: { kinds?: string };
}

export interface NumberReq {
  query: { min?: string; max?: string };
}

export interface CheckAnswerReq {
  body: { userAnswer: string; expectedAnswer?: string; expectedAnswers?: string[] };
}
