import React, { useState, useEffect } from 'react';

interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'scenario' | 'calculation';
  category: 'query-execution' | 'logical-optimization' | 'join-algorithms' | 'cost-optimization';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export const DBS9TestPreparationMode: React.FC = () => {
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
      category: 'query-execution',
      difficulty: 'easy',
      question: 'In welcher Reihenfolge werden SQL-Klauseln tatsächlich ausgeführt?',
      options: [
        'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
        'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
        'FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY',
        'WHERE → FROM → GROUP BY → HAVING → SELECT → ORDER BY'
      ],
      correctAnswer: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
      explanation: 'Die korrekte Ausführungsreihenfolge ist: FROM (Tabellen laden) → WHERE (Filtern) → GROUP BY (Gruppieren) → HAVING (Gruppen filtern) → SELECT (Projektion) → ORDER BY (Sortieren).',
      points: 2
    },
    {
      id: '2',
      type: 'true-false',
      category: 'logical-optimization',
      difficulty: 'medium',
      question: 'Selektionen sollten so früh wie möglich im Anfrageplan ausgeführt werden, um Zwischenergebnisse zu reduzieren.',
      correctAnswer: 'true',
      explanation: 'Richtig! Das "pushing selections" ist eine wichtige Heuristik - Selektionen werden so weit wie möglich nach unten im Anfragebaum verschoben.',
      points: 3
    },
    {
      id: '3',
      type: 'scenario',
      category: 'join-algorithms',
      difficulty: 'medium',
      question: 'Welcher Join-Algorithmus ist optimal für zwei große Tabellen (je 10.000 Blöcke), die bereits auf den Join-Attributen sortiert sind?',
      options: ['Nested Loop Join', 'Hash Join', 'Sort-Merge Join', 'Index Nested Loop Join'],
      correctAnswer: 'Sort-Merge Join',
      explanation: 'Sort-Merge Join ist optimal, da beide Tabellen bereits sortiert sind und keine zusätzlichen Sortierungskosten anfallen. Die Kosten sind nur b1 + b2.',
      points: 4
    },
    {
      id: '4',
      type: 'multiple-choice',
      category: 'cost-optimization',
      difficulty: 'hard',
      question: 'Welche Faktoren dominieren die Kosten in einem Kostenmodell für Datenbankoperationen?',
      options: [
        'CPU-Zeit und Speicherzugriff',
        'Netzwerkkommunikation und Parallelisierung',
        'Festplattenzugriff (I/O)',
        'Aktueller Query-Load'
      ],
      correctAnswer: 'Festplattenzugriff (I/O)',
      explanation: 'Festplattenzugriff dominiert die Kosten, da I/O-Operationen um Größenordnungen langsamer sind als CPU-Operationen.',
      points: 3
    },
    {
      id: '5',
      type: 'scenario',
      category: 'join-algorithms',
      difficulty: 'hard',
      question: 'Für eine kleine Tabelle (100 Blöcke) und eine große Tabelle (50.000 Blöcke) mit einem Index auf dem Join-Attribut der großen Tabelle, welcher Algorithmus ist optimal?',
      options: ['Nested Loop Join', 'Hash Join', 'Sort-Merge Join', 'Index Nested Loop Join'],
      correctAnswer: 'Index Nested Loop Join',
      explanation: 'Index Nested Loop Join ist optimal, da die kleine Tabelle als äußere Relation verwendet wird und die große Tabelle einen Index auf dem Join-Attribut hat.',
      points: 5
    },
    {
      id: '6',
      type: 'true-false',
      category: 'logical-optimization',
      difficulty: 'easy',
      question: 'Joins sind kommutativ und assoziativ.',
      correctAnswer: 'true',
      explanation: 'Richtig! Joins sind sowohl kommutativ (R ⋈ S = S ⋈ R) als auch assoziativ ((R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)).',
      points: 2
    },
    {
      id: '7',
      type: 'multiple-choice',
      category: 'query-execution',
      difficulty: 'medium',
      question: 'Was ist der Hauptunterschied zwischen WHERE und HAVING?',
      options: [
        'WHERE filtert vor der Gruppierung, HAVING nach der Gruppierung',
        'WHERE filtert nach der Gruppierung, HAVING vor der Gruppierung',
        'Es gibt keinen Unterschied',
        'WHERE ist für Joins, HAVING für Aggregationen'
      ],
      correctAnswer: 'WHERE filtert vor der Gruppierung, HAVING nach der Gruppierung',
      explanation: 'WHERE filtert einzelne Zeilen vor der Gruppierung, während HAVING ganze Gruppen nach der Gruppierung filtert.',
      points: 3
    },
    {
      id: '8',
      type: 'scenario',
      category: 'cost-optimization',
      difficulty: 'hard',
      question: 'Welche PostgreSQL-Befehle werden verwendet, um Ausführungspläne zu analysieren?',
      options: [
        'SHOW PLAN und ANALYZE',
        'EXPLAIN und EXPLAIN ANALYZE',
        'DESCRIBE und SHOW',
        'DEBUG und TRACE'
      ],
      correctAnswer: 'EXPLAIN und EXPLAIN ANALYZE',
      explanation: 'EXPLAIN zeigt den geplanten Ausführungsplan, EXPLAIN ANALYZE führt die Anfrage aus und zeigt reale Ausführungszeiten.',
      points: 4
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
    // Shuffle questions
    const shuffledQuestions = testQuestions.sort(() => Math.random() - 0.5);
    
    // Shuffle answer options for multiple-choice and scenario questions
    const questionsWithShuffledOptions = shuffledQuestions.map(question => {
      if (question.type === 'multiple-choice' || question.type === 'scenario') {
        const shuffledOptions = question.options ? [...question.options].sort(() => Math.random() - 0.5) : [];
        return {
          ...question,
          options: shuffledOptions
        };
      }
      return question;
    });
    
    setQuestions(questionsWithShuffledOptions);
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
      case 'query-execution': return '⚡';
      case 'logical-optimization': return '🧠';
      case 'join-algorithms': return '🔗';
      case 'cost-optimization': return '💰';
      default: return '❓';
    }
  };

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">DBS9 Testvorbereitung</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Testmodus - Anfrageoptimierung</h2>
          
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
                <li>• SQL-Ausführungsreihenfolge</li>
                <li>• Logische Anfrageoptimierung</li>
                <li>• Join-Algorithmen</li>
                <li>• Kostenbasierte Optimierung</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">💡 Tipps für den Test:</h3>
            <ul className="text-sm space-y-1">
              <li>• Verstehe die SQL-Ausführungsreihenfolge</li>
              <li>• Kenne die verschiedenen Join-Algorithmen</li>
              <li>• Verstehe die Kostenfaktoren</li>
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
            <h2 className="text-xl font-semibold">DBS9 Testvorbereitung</h2>
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

          {currentQ.type === 'scenario' && currentQ.options && (
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
