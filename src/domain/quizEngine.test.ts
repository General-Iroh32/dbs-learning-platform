import { describe, expect, it } from 'vitest';
import type { QuizQuestion } from '../types';
import { prepareQuestions, scorePercentage, shuffle } from './quizEngine';

const questions: QuizQuestion[] = [
  {
    question: 'Welche Aussage ist korrekt?',
    hint: 'Denke an Schlüssel.',
    answerOptions: [
      { text: 'A', rationale: 'A ist korrekt.', isCorrect: true },
      { text: 'B', rationale: 'B ist falsch.', isCorrect: false },
    ],
  },
  {
    question: 'Was beschreibt ACID?',
    hint: 'Transaktionseigenschaften.',
    answerOptions: [
      { text: 'C', rationale: 'C ist korrekt.', isCorrect: true },
      { text: 'D', rationale: 'D ist falsch.', isCorrect: false },
    ],
  },
];

describe('shuffle', () => {
  it('returns a deterministic order with an injected random source', () => {
    expect(shuffle([1, 2, 3], () => 0)).toEqual([2, 3, 1]);
  });

  it('does not mutate the input collection', () => {
    const original = [1, 2, 3];
    shuffle(original, () => 0);

    expect(original).toEqual([1, 2, 3]);
  });
});

describe('prepareQuestions', () => {
  it('shuffles cloned questions and answer options without mutating source data', () => {
    const prepared = prepareQuestions(questions, () => 0);

    expect(prepared[0].question).toBe('Was beschreibt ACID?');
    expect(prepared[0].answerOptions.map((answer) => answer.text)).toEqual(['D', 'C']);
    expect(questions[1].answerOptions.map((answer) => answer.text)).toEqual(['C', 'D']);
  });
});

describe('scorePercentage', () => {
  it('rounds the result to a whole percentage', () => {
    expect(scorePercentage(2, 3)).toBe(67);
  });

  it('returns zero for an empty quiz', () => {
    expect(scorePercentage(0, 0)).toBe(0);
  });
});
