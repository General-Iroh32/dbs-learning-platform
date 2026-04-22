import type { QuizQuestion } from '../types';

export type RandomSource = () => number;

export function shuffle<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function prepareQuestions(
  questions: readonly QuizQuestion[],
  random: RandomSource = Math.random,
): QuizQuestion[] {
  return shuffle(questions, random).map((question) => ({
    ...question,
    answerOptions: shuffle(question.answerOptions, random),
  }));
}

export function scorePercentage(correctAnswers: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;

  return Math.round((correctAnswers / totalQuestions) * 100);
}
