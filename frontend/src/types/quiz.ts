export interface QuizQuestion {
  question: string;
  serial_number: number;
  question_id: string;
}

export interface Quiz {
  id: string;
  title: string;
  questionCount: number;
  questions: QuizQuestion[];
}
