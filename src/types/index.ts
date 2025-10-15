export interface QuizQuestion {
  question: string;
  hint: string;
  answerOptions: AnswerOption[];
}

export interface AnswerOption {
  text: string;
  rationale: string;
  isCorrect: boolean;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface ExerciseItem {
  name: string;
  type: 'entity' | 'attribute' | 'relationship';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  subItems?: NavigationSubItem[];
}

export interface NavigationSubItem {
  id: string;
  label: string;
  type: 'basics' | 'exercise' | 'quiz';
}

export interface ConceptCard {
  title: string;
  description: string;
  icon: string;
}

export interface PDFDocument {
  id: string;
  title: string;
  filename: string;
  description?: string;
}
