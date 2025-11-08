import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  Target,
  Trophy,
  RefreshCw,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface ExamQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: 'ACID' | 'Isolation' | 'Concurrency' | 'Locking' | 'Recovery' | 'Deadlock' | 'Grundlagen';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  timeLimit?: number; // in seconds
}

interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  grade: string;
  timeUsed: number;
  timeLimit: number;
  categories: {
    [key: string]: {
      total: number;
      correct: number;
      points: number;
    };
  };
}

export const TransPruefungExercise: React.FC = () => {
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showResult, setShowResult] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const examQuestions: ExamQuestion[] = [
    // ACID Questions
    {
      id: 'acid-1',
      question: 'Welche ACID-Eigenschaft stellt sicher, dass alle Operationen einer Transaktion entweder vollständig ausgeführt oder gar nicht ausgeführt werden?',
      options: [
        'Atomicity',
        'Consistency',
        'Isolation',
        'Durability'
      ],
      correctAnswer: 0,
      explanation: 'Atomicity (Atomarität) stellt sicher, dass alle Operationen einer Transaktion als eine logische Einheit behandelt werden - entweder alle oder keine.',
      points: 5,
      category: 'ACID',
      difficulty: 'Einfach'
    },
    {
      id: 'acid-2',
      question: 'In einem Banking-System wird eine Überweisung von 1000€ durchgeführt. Welche ACID-Eigenschaft verhindert, dass das Geld "verloren" geht?',
      scenario: 'Konto A: 2000€, Konto B: 500€. Überweisung: 1000€ von A nach B.',
      options: [
        'Atomicity - verhindert teilweise Ausführung',
        'Consistency - hält Kontostände konsistent',
        'Isolation - verhindert Interferenz',
        'Durability - speichert Änderungen permanent'
      ],
      correctAnswer: 0,
      explanation: 'Atomicity verhindert, dass nur eine der beiden Konten aktualisiert wird. Entweder werden beide Konten korrekt aktualisiert oder gar keine Änderung.',
      points: 8,
      category: 'ACID',
      difficulty: 'Mittel'
    },
    {
      id: 'acid-3',
      question: 'Welche ACID-Eigenschaft wird verletzt, wenn eine Transaktion uncommitted Daten einer anderen Transaktion lesen kann?',
      options: [
        'Atomicity',
        'Consistency',
        'Isolation',
        'Durability'
      ],
      correctAnswer: 2,
      explanation: 'Isolation verhindert, dass Transaktionen uncommitted Daten anderer Transaktionen lesen können (Dirty Read Problem).',
      points: 6,
      category: 'ACID',
      difficulty: 'Einfach'
    },

    // Isolation Level Questions
    {
      id: 'isolation-1',
      question: 'Bei welchem Isolation Level können Non-Repeatable Reads auftreten?',
      options: [
        'READ UNCOMMITTED',
        'READ COMMITTED',
        'REPEATABLE READ',
        'SERIALIZABLE'
      ],
      correctAnswer: 1,
      explanation: 'Bei READ COMMITTED können Non-Repeatable Reads auftreten, da zwischen zwei Lesevorgängen andere Transaktionen committen können.',
      points: 7,
      category: 'Isolation',
      difficulty: 'Mittel'
    },
    {
      id: 'isolation-2',
      question: 'Welches Isolation Level verhindert Phantom Reads vollständig?',
      options: [
        'READ UNCOMMITTED',
        'READ COMMITTED',
        'REPEATABLE READ',
        'SERIALIZABLE'
      ],
      correctAnswer: 3,
      explanation: 'Nur SERIALIZABLE verhindert Phantom Reads vollständig, da es die höchste Isolation bietet und alle Concurrency-Probleme verhindert.',
      points: 8,
      category: 'Isolation',
      difficulty: 'Mittel'
    },
    {
      id: 'isolation-3',
      question: 'T1 liest einen Wert, T2 ändert denselben Wert und committet, T1 liest den Wert erneut. Welches Problem liegt vor?',
      scenario: 'T1: SELECT balance FROM account WHERE id=1 (liest 1000€), T2: UPDATE account SET balance=1500 WHERE id=1; COMMIT, T1: SELECT balance FROM account WHERE id=1 (liest 1500€)',
      options: [
        'Dirty Read',
        'Non-Repeatable Read',
        'Phantom Read',
        'Lost Update'
      ],
      correctAnswer: 1,
      explanation: 'Non-Repeatable Read: T1 liest denselben Wert zweimal und erhält unterschiedliche Ergebnisse, da T2 zwischen den Lesevorgängen committet hat.',
      points: 10,
      category: 'Isolation',
      difficulty: 'Schwer'
    },

    // Concurrency Questions
    {
      id: 'concurrency-1',
      question: 'Welches Concurrency-Problem tritt auf, wenn zwei Transaktionen denselben Wert lesen, ändern und schreiben?',
      options: [
        'Dirty Read',
        'Non-Repeatable Read',
        'Phantom Read',
        'Lost Update'
      ],
      correctAnswer: 3,
      explanation: 'Lost Update: Beide Transaktionen lesen denselben Wert, berechnen ihre Änderungen basierend darauf und überschreiben sich gegenseitig.',
      points: 8,
      category: 'Concurrency',
      difficulty: 'Mittel'
    },
    {
      id: 'concurrency-2',
      question: 'Welches Concurrency-Problem kann bei READ UNCOMMITTED auftreten?',
      options: [
        'Dirty Read',
        'Non-Repeatable Read',
        'Phantom Read',
        'Lost Update'
      ],
      correctAnswer: 0,
      explanation: 'Dirty Read kann bei READ UNCOMMITTED auftreten, da uncommitted Daten gelesen werden können.',
      points: 6,
      category: 'Concurrency',
      difficulty: 'Einfach'
    },

    // Locking Questions
    {
      id: 'locking-1',
      question: 'Welche Locks sind kompatibel?',
      options: [
        'Shared Lock und Exclusive Lock',
        'Exclusive Lock und Exclusive Lock',
        'Shared Lock und Shared Lock',
        'Keine Locks sind kompatibel'
      ],
      correctAnswer: 2,
      explanation: 'Shared Locks sind untereinander kompatibel, d.h. mehrere Transaktionen können gleichzeitig lesen. Exclusive Locks sind nicht kompatibel.',
      points: 7,
      category: 'Locking',
      difficulty: 'Einfach'
    },
    {
      id: 'locking-2',
      question: 'Welche Lock-Escalation findet statt, wenn viele Zeilen-Locks auf derselben Tabelle vorhanden sind?',
      options: [
        'Zeilen-Locks zu Tabellen-Lock',
        'Tabellen-Lock zu Datenbank-Lock',
        'Shared Locks zu Exclusive Locks',
        'Exclusive Locks zu Shared Locks'
      ],
      correctAnswer: 0,
      explanation: 'Lock Escalation: Viele Zeilen-Locks werden zu einem Tabellen-Lock zusammengefasst, um die Verwaltung zu vereinfachen.',
      points: 8,
      category: 'Locking',
      difficulty: 'Mittel'
    },

    // Deadlock Questions
    {
      id: 'deadlock-1',
      question: 'Wie kann ein Deadlock aufgelöst werden?',
      options: [
        'Eine der Transaktionen abbrechen',
        'Beide Transaktionen abbrechen',
        'Warten bis sich der Deadlock löst',
        'Deadlocks lösen sich nie auf'
      ],
      correctAnswer: 0,
      explanation: 'Ein Deadlock wird aufgelöst, indem eine der beteiligten Transaktionen abgebrochen wird, damit die andere fortfahren kann.',
      points: 8,
      category: 'Deadlock',
      difficulty: 'Mittel'
    },
    {
      id: 'deadlock-2',
      question: 'Welche Bedingungen müssen für einen Deadlock erfüllt sein?',
      options: [
        'Nur Mutual Exclusion',
        'Nur Hold and Wait',
        'Nur Circular Wait',
        'Alle vier Bedingungen: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait'
      ],
      correctAnswer: 3,
      explanation: 'Alle vier Bedingungen müssen gleichzeitig erfüllt sein: Mutual Exclusion, Hold and Wait, No Preemption und Circular Wait.',
      points: 10,
      category: 'Deadlock',
      difficulty: 'Schwer'
    },

    // Recovery Questions
    {
      id: 'recovery-1',
      question: 'Was bedeutet WAL (Write-Ahead Logging)?',
      options: [
        'Log-Einträge werden vor den Daten geschrieben',
        'Daten werden vor den Log-Einträgen geschrieben',
        'Log und Daten werden gleichzeitig geschrieben',
        'Log-Einträge werden nie geschrieben'
      ],
      correctAnswer: 0,
      explanation: 'Write-Ahead Logging: Log-Einträge müssen vor den entsprechenden Daten auf die Festplatte geschrieben werden, um Recovery zu ermöglichen.',
      points: 8,
      category: 'Recovery',
      difficulty: 'Mittel'
    },
    {
      id: 'recovery-2',
      question: 'Nach einem Systemabsturz: Welche Transaktionen müssen wiederholt werden (Redo)?',
      scenario: 'Log: T1: BEGIN, T1: UPDATE, T1: COMMIT, T2: BEGIN, T2: UPDATE (nicht committet)',
      options: [
        'T1 und T2',
        'Nur T1',
        'Nur T2',
        'Keine'
      ],
      correctAnswer: 1,
      explanation: 'Nur T1 muss wiederholt werden (Redo), da es bereits committet war. T2 muss rückgängig gemacht werden (Undo).',
      points: 9,
      category: 'Recovery',
      difficulty: 'Schwer'
    },

    // Advanced Questions
    {
      id: 'advanced-1',
      question: 'Welches Protokoll wird für verteilte Transaktionen verwendet?',
      options: [
        'Two-Phase Commit (2PC)',
        'Three-Phase Commit (3PC)',
        'Saga Pattern',
        'Event Sourcing'
      ],
      correctAnswer: 0,
      explanation: 'Two-Phase Commit (2PC) ist das Standard-Protokoll für verteilte Transaktionen, um Konsistenz über mehrere Systeme zu gewährleisten.',
      points: 12,
      category: 'Grundlagen',
      difficulty: 'Schwer'
    },
    {
      id: 'advanced-2',
      question: 'Was ist der Hauptnachteil von Two-Phase Commit?',
      options: [
        'Hohe Komplexität',
        'Blocking bei Ausfällen',
        'Schlechte Performance',
        'Alle genannten Nachteile'
      ],
      correctAnswer: 3,
      explanation: '2PC hat alle genannten Nachteile: Hohe Komplexität, Blocking bei Ausfällen (Coordinator-Failure) und schlechte Performance durch Synchronisation.',
      points: 10,
      category: 'Grundlagen',
      difficulty: 'Schwer'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExamStarted && !isExamPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishExam();
    }
    return () => clearInterval(interval);
  }, [isExamStarted, isExamPaused, timeLeft]);

  const startExam = () => {
    setIsExamStarted(true);
    setIsExamPaused(false);
    setTimeLeft(1800);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setExamResult(null);
  };

  const pauseExam = () => {
    setIsExamPaused(!isExamPaused);
  };

  const finishExam = () => {
    setIsExamStarted(false);
    setIsExamPaused(false);
    calculateResult();
    setShowResult(true);
  };

  const calculateResult = () => {
    let correctAnswers = 0;
    let earnedPoints = 0;
    const totalPoints = examQuestions.reduce((sum, q) => sum + q.points, 0);
    const categories: { [key: string]: { total: number; correct: number; points: number } } = {};

    examQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
        earnedPoints += question.points;
      }

      if (!categories[question.category]) {
        categories[question.category] = { total: 0, correct: 0, points: 0 };
      }
      categories[question.category].total++;
      if (isCorrect) {
        categories[question.category].correct++;
        categories[question.category].points += question.points;
      }
    });

    const percentage = (correctAnswers / examQuestions.length) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    setExamResult({
      totalQuestions: examQuestions.length,
      correctAnswers,
      totalPoints,
      earnedPoints,
      percentage,
      grade,
      timeUsed: 1800 - timeLeft,
      timeLimit: 1800,
      categories
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Transaktions-Prüfung
            </h1>
            <p className="text-xl text-gray-600">
              Teste dein Wissen über Transaktionen in Datenbanksystemen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Prüfungsdetails</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• {examQuestions.length} Fragen</li>
                <li>• 30 Minuten Zeitlimit</li>
                <li>• Multiple Choice Format</li>
                <li>• Verschiedene Schwierigkeitsgrade</li>
                <li>• Sofortige Auswertung</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Themengebiete</h3>
              <ul className="space-y-2 text-green-700">
                <li>• ACID-Eigenschaften</li>
                <li>• Isolation Levels</li>
                <li>• Concurrency-Probleme</li>
                <li>• Locking-Mechanismen</li>
                <li>• Deadlock-Behandlung</li>
                <li>• Recovery-Verfahren</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startExam}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Prüfung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult && examResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Prüfung abgeschlossen!
            </h1>
            <div className={`inline-block px-6 py-3 rounded-full text-2xl font-bold ${getGradeColor(examResult.grade)}`}>
              Note: {examResult.grade}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {examResult.correctAnswers}/{examResult.totalQuestions}
              </div>
              <div className="text-blue-800">Richtige Antworten</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {examResult.earnedPoints}/{examResult.totalPoints}
              </div>
              <div className="text-green-800">Punkte erreicht</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {examResult.percentage.toFixed(1)}%
              </div>
              <div className="text-purple-800">Prozent</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Zeitverbrauch</h3>
            <div className="flex items-center justify-between">
              <span>Verwendete Zeit:</span>
              <span className="font-medium">{formatTime(examResult.timeUsed)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Verfügbare Zeit:</span>
              <span className="font-medium">{formatTime(examResult.timeLimit)}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategorien-Übersicht</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(examResult.categories).map(([category, stats]) => (
                <div key={category} className="text-center">
                  <div className="font-medium text-gray-800">{category}</div>
                  <div className="text-sm text-gray-600">
                    {stats.correct}/{stats.total} ({((stats.correct / stats.total) * 100).toFixed(0)}%)
                  </div>
                  <div className="text-sm text-gray-500">{stats.points} Punkte</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setShowResult(false);
                setExamResult(null);
                startExam();
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Prüfung wiederholen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Transaktions-Prüfung
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={pauseExam}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {isExamPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Frage {currentQuestion + 1} von {examQuestions.length}</span>
            <span>{currentQ.points} Punkte</span>
            <span className="capitalize">{currentQ.category}</span>
            <span className="capitalize">{currentQ.difficulty}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ.question}
          </h2>
          
          {currentQ.scenario && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Szenario:</h3>
              <p className="text-blue-700">{currentQ.scenario}</p>
            </div>
          )}

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={index}
                  checked={answers[currentQ.id] === index}
                  onChange={() => setAnswers(prev => ({ ...prev, [currentQ.id]: index }))}
                  className="w-4 h-4 text-blue-600 mt-1"
                />
                <span className="text-gray-700 flex-1">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Vorherige
          </button>
          
          <div className="flex gap-2">
            {examQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[examQuestions[index].id] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {currentQuestion === examQuestions.length - 1 ? (
            <button
              onClick={finishExam}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Prüfung beenden
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nächste
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
