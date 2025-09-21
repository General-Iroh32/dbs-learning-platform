import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import type { QuizData, AnswerOption } from '../types';

interface QuizProps {
  quizData: QuizData;
  title: string;
  description: string;
}

export const Quiz: React.FC<QuizProps> = ({ quizData, title, description }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowRationale(true);
    
    if (currentQuestion.answerOptions[answerIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz finished
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowRationale(false);
      setIsAnswered(false);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowRationale(false);
      setIsAnswered(false);
    }
  };

  const getOptionClasses = (index: number, option: AnswerOption) => {
    let classes = 'quiz-option p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-100';
    
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

  if (currentQuestionIndex === 0 && score > 0) {
    // Quiz finished, show results
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz beendet!</h2>
          <p className="text-lg mb-6">
            Du hast {score} von {quizData.questions.length} Fragen richtig beantwortet.
          </p>
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Nochmal versuchen
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
            Frage {currentQuestionIndex + 1} von {quizData.questions.length}
          </p>
          <h2 className="text-xl font-semibold mt-1">{currentQuestion.question}</h2>
          <p className="text-sm text-blue-500 mt-2 italic flex items-center">
            <Lightbulb className="mr-1 w-4 h-4" />
            Tipp: {currentQuestion.hint}
          </p>
        </div>
        
        <div className="space-y-3" id="quiz-options">
          {currentQuestion.answerOptions.map((option, index) => (
            <div
              key={index}
              className={getOptionClasses(index, option)}
              onClick={() => handleAnswerSelect(index)}
            >
              {option.text}
              {showRationale && (
                <div className={`rationale ${option.isCorrect ? 'correct' : 'incorrect'} mt-2`}>
                  {option.rationale}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {isAnswered && (
          <button
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
