export interface ItCompleteConfig {
  rules: string;
  zee_coins: number | string;
  game_url?: string;
}

export interface ItCompleteCategory {
  id: number;
  title: string;
}

export interface ItCompleteAnswer {
  category: string;
  answer: string;
  is_correct: boolean;
}

export interface ItCompleteResult {
  total_categories: number;
  correct_categories: number;
  points: number;
  answers: ItCompleteAnswer[];
}

export interface ItCompleteStartData {
  alphabet_char: string;
  categories: ItCompleteCategory[];
}
