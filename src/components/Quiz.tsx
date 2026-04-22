import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import type { QuizData, AnswerOption } from '../types';
import { prepareQuestions, scorePercentage } from '../domain/quizEngine';

interface QuizProps {
  quizData: QuizData;
  title: string;
  description: string;
}

export const Quiz: React.FC<QuizProps> = ({ quizData, title, description }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState(() => prepareQuestions(quizData.questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (currentQuestion.answerOptions[answerIndex].isCorrect) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex((index) => index + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(prepareQuestions(quizData.questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const getOptionClasses = (index: number, option: AnswerOption) => {
    let classes = 'quiz-option w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:bg-gray-100 disabled:cursor-default';
    
    if (isAnswered) {
      if (option.isCorrect) {
        classes += ' correct';
      } else if (index === selectedAnswer) {
        classes += ' incorrect';
      }
    } else if (index === selectedAnswer) {
      classes += ' selected';
    }
    
    return classes;
  };

  if (shuffledQuestions.length === 0 || !currentQuestion) {
    return <p role="alert">Für dieses Quiz sind derzeit keine Fragen verfügbar.</p>;
  }

  if (isFinished) {
    const percentage = scorePercentage(score, shuffledQuestions.length);

    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz beendet!</h2>
          <p className="text-lg mb-6">
            Du hast {score} von {shuffledQuestions.length} Fragen richtig beantwortet.
          </p>
          <p className="text-lg mb-6" aria-live="polite">
            Ergebnis: {percentage} Prozent
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Quiz erneut starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Frage {currentQuestionIndex + 1} von {shuffledQuestions.length}
          </p>
          <h2 className="text-xl font-semibold mt-1">{currentQuestion.question}</h2>
          <p className="text-sm text-blue-500 mt-2 italic flex items-center">
            <Lightbulb className="mr-1 w-4 h-4" />
            Tipp: {currentQuestion.hint}
          </p>
        </div>
        
        <div className="space-y-3" id="quiz-options">
          {currentQuestion.answerOptions.map((option, index) => (
            <button
              type="button"
              key={option.text}
              className={getOptionClasses(index, option)}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              aria-pressed={selectedAnswer === index}
            >
              {option.text}
              {isAnswered && (
                <div className={`rationale ${option.isCorrect ? 'correct' : 'incorrect'} mt-2`}>
                  {option.rationale}
                </div>
              )}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLastQuestion ? 'Quiz beenden' : 'Nächste Frage'}
          </button>
        )}
      </div>
    </div>
  );
};
