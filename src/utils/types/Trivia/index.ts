export interface TriviaConfig {
  rules: string;
  description: string;
  zee_coins: number;
}
export interface TriviaAnswer {
  id: number;
  answer: string;
  media: string | null;
}
export interface TriviaQuestion {
  id: number;
  question: string;
  media: string | null;
  answers: TriviaAnswer[];
}
export interface TriviaResult {
  total_que: number;
  correct_que: number;
  points: number;
}