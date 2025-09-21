import React, { useState, useEffect } from 'react';

interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'scenario';
  category: 'anomalies' | 'functional-dependencies' | 'normalization' | 'decomposition';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export const TestPreparationMode: React.FC = () => {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [testStarted, setTestStarted] = useState(false);

  const testQuestions: TestQuestion[] = [
    {
      id: '1',
      type: 'multiple-choice',
      category: 'anomalies',
      difficulty: 'easy',
      question: 'Welche Art von Anomalie tritt auf, wenn ein Professor umzieht und sein Büro in mehreren Tupeln geändert werden muss?',
      options: ['Einfügeanomalie', 'Änderungsanomalie', 'Löschanomalie', 'Redundanzanomalie'],
      correctAnswer: 'Änderungsanomalie',
      explanation: 'Eine Änderungsanomalie tritt auf, wenn eine Information an mehreren Stellen geändert werden muss, was zu Inkonsistenzen führen kann.',
      points: 2
    },
    {
      id: '2',
      type: 'true-false',
      category: 'functional-dependencies',
      difficulty: 'medium',
      question: 'Die funktionale Abhängigkeit {A} → {B} bedeutet, dass A eindeutig B bestimmt.',
      correctAnswer: 'true',
      explanation: 'Richtig! Eine funktionale Abhängigkeit A → B bedeutet, dass für jeden Wert von A genau ein Wert von B existiert.',
      points: 3
    },
    {
      id: '3',
      type: 'fill-blank',
      category: 'normalization',
      difficulty: 'medium',
      question: 'Eine Relation ist in der _____ Normalform, wenn sie in 2NF ist und keine transitiven Abhängigkeiten hat.',
      correctAnswer: 'dritten',
      explanation: 'Die dritte Normalform (3NF) verbietet transitive Abhängigkeiten zwischen Nicht-Schlüsselattributen.',
      points: 3
    },
    {
      id: '4',
      type: 'scenario',
      category: 'decomposition',
      difficulty: 'hard',
      question: 'Gegeben: R(A,B,C) mit FDs {A} → {B} und {B} → {C}. Ist die Zerlegung in R1(A,B) und R2(B,C) verlustfrei?',
      options: ['Ja', 'Nein'],
      correctAnswer: 'Ja',
      explanation: 'Ja, die Zerlegung ist verlustfrei, da das gemeinsame Attribut B einen Superschlüssel für R2 bildet (B → C).',
      points: 5
    },
    {
      id: '5',
      type: 'multiple-choice',
      category: 'functional-dependencies',
      difficulty: 'hard',
      question: 'Welche der folgenden Armstrong-Axiome wird verwendet, um aus {A} → {B} und {B} → {C} die FD {A} → {C} abzuleiten?',
      options: ['Reflexivität', 'Erweiterung', 'Transitivität', 'Vereinigung'],
      correctAnswer: 'Transitivität',
      explanation: 'Das Transitivitätsaxiom besagt: Wenn A → B und B → C, dann A → C.',
      points: 4
    },
    {
      id: '6',
      type: 'true-false',
      category: 'normalization',
      difficulty: 'easy',
      question: 'Eine Relation in BCNF ist automatisch auch in 3NF.',
      correctAnswer: 'true',
      explanation: 'Richtig! BCNF ist eine strengere Form der 3NF. Jede BCNF-Relation ist auch in 3NF.',
      points: 2
    },
    {
      id: '7',
      type: 'fill-blank',
      category: 'anomalies',
      difficulty: 'medium',
      question: 'Eine _____ tritt auf, wenn neue Daten nicht eingefügt werden können, ohne andere irrelevante Daten zu speichern.',
      correctAnswer: 'Einfügeanomalie',
      explanation: 'Eine Einfügeanomalie verhindert das Einfügen neuer Daten, wenn nicht alle erforderlichen Felder ausgefüllt werden können.',
      points: 3
    },
    {
      id: '8',
      type: 'scenario',
      category: 'decomposition',
      difficulty: 'hard',
      question: 'Eine Zerlegung ist abhängigkeitsbewahrend, wenn:',
      options: [
        'Alle FDs in den neuen Relationen überprüfbar sind',
        'Die ursprüngliche Relation durch Join rekonstruierbar ist',
        'Keine redundanten FDs existieren',
        'Alle Attribute in den neuen Relationen vorkommen'
      ],
      correctAnswer: 'Alle FDs in den neuen Relationen überprüfbar sind',
      explanation: 'Abhängigkeitsbewahrung bedeutet, dass alle ursprünglichen FDs in den neuen Relationen überprüft werden können, ohne die Tabellen zu joinen.',
      points: 5
    }
  ];

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      finishTest();
    }
  }, [timeLeft, testStarted]);

  const startTest = () => {
    setQuestions(testQuestions.sort(() => Math.random() - 0.5));
    setTestStarted(true);
    setTimeLeft(60 * 60);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
    }
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const finishTest = () => {
    let totalScore = 0;
    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      if (userAnswer === q.correctAnswer || 
          (Array.isArray(q.correctAnswer) && q.correctAnswer.includes(userAnswer))) {
        totalScore += q.points;
      }
    });
    setScore(totalScore);
    setTestCompleted(true);
  };

  const resetTest = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResult(false);
    setTestCompleted(false);
    setScore(0);
    setTimeLeft(60 * 60);
    setTestStarted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'anomalies': return '⚠️';
      case 'functional-dependencies': return '🔗';
      case 'normalization': return '📊';
      case 'decomposition': return '✂️';
      default: return '❓';
    }
  };

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">DBS5 Testvorbereitung</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Testmodus</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-3">Testdetails:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {testQuestions.length} Fragen</li>
                <li>• 60 Minuten Zeit</li>
                <li>• Verschiedene Schwierigkeitsgrade</li>
                <li>• Alle Themengebiete abgedeckt</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Themengebiete:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Anomalien</li>
                <li>• Funktionale Abhängigkeiten</li>
                <li>• Normalformen</li>
                <li>• Zerlegungen</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">💡 Tipps für den Test:</h3>
            <ul className="text-sm space-y-1">
              <li>• Lies jede Frage sorgfältig durch</li>
              <li>• Überlege dir die Antwort, bevor du sie auswählst</li>
              <li>• Nutze die Erklärungen zum Lernen</li>
              <li>• Zeitmanagement ist wichtig</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={startTest}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600"
            >
              Test starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    const maxScore = testQuestions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Test abgeschlossen!</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </div>
            <h2 className="text-3xl font-semibold mb-2">
              {percentage >= 80 ? 'Sehr gut!' : percentage >= 60 ? 'Gut!' : 'Weiter üben!'}
            </h2>
            <p className="text-xl text-gray-600">
              Du hast {score} von {maxScore} Punkten erreicht ({percentage}%)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-700">Punkte erreicht</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{testQuestions.length}</div>
              <div className="text-sm text-blue-700">Fragen beantwortet</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{formatTime(60 * 60 - timeLeft)}</div>
              <div className="text-sm text-purple-700">Zeit benötigt</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-4"
            >
              Test wiederholen
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">DBS5 Testvorbereitung</h2>
            <p className="text-gray-600">Frage {currentQuestion + 1} von {questions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-600">Verbleibende Zeit</div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-2xl">{getCategoryIcon(currentQ.category)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
            {currentQ.difficulty}
          </span>
          <span className="text-sm text-gray-600">{currentQ.points} Punkte</span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    showResult
                      ? option === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : userAnswers[currentQ.id] === option && option !== currentQ.correctAnswer
                        ? 'border-red-500 bg-red-100 text-red-800'
                        : 'border-gray-200 bg-gray-50'
                      : userAnswers[currentQ.id] === option
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'true-false' && (
            <div className="space-y-3">
              {['true', 'false'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    showResult
                      ? option === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : userAnswers[currentQ.id] === option && option !== currentQ.correctAnswer
                        ? 'border-red-500 bg-red-100 text-red-800'
                        : 'border-gray-200 bg-gray-50'
                      : userAnswers[currentQ.id] === option
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option === 'true' ? 'Wahr' : 'Falsch'}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'fill-blank' && (
            <div>
              <input
                type="text"
                value={userAnswers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                disabled={showResult}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Deine Antwort..."
              />
            </div>
          )}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            userAnswers[currentQ.id] === currentQ.correctAnswer 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <h4 className="font-semibold mb-2">
              {userAnswers[currentQ.id] === currentQ.correctAnswer ? '✅ Richtig!' : '❌ Falsch!'}
            </h4>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            ← Vorherige
          </button>
          
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswers[currentQ.id]}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Antwort prüfen
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {currentQuestion === questions.length - 1 ? 'Test beenden' : 'Nächste Frage →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
