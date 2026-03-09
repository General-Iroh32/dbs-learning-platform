import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  BookOpen, 
  Target,
  Clock,
  AlertTriangle,
  RefreshCw,
  Zap,
  Brain,
  Star,
  TrendingUp
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'ACID' | 'Isolation' | 'Concurrency' | 'Locking' | 'Deadlock' | 'Recovery' | 'Performance' | 'Grundlagen';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  points: number;
  hints: string[];
  relatedConcepts: string[];
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  grade: string;
  timeUsed: number;
  categories: {
    [key: string]: {
      total: number;
      correct: number;
      points: number;
    };
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export const TransQuiz: React.FC = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  const quizQuestions: QuizQuestion[] = [
    // ACID Questions
    {
      id: 'acid-1',
      question: 'Was bedeutet die ACID-Eigenschaft "Atomicity"?',
      options: [
        'Alle Operationen werden vollständig ausgeführt oder gar nicht',
        'Die Datenbank bleibt in einem konsistenten Zustand',
        'Transaktionen beeinflussen sich nicht gegenseitig',
        'Änderungen sind dauerhaft gespeichert'
      ],
      correctAnswer: 0,
      explanation: 'Atomicity (Atomarität) stellt sicher, dass alle Operationen einer Transaktion als eine logische Einheit behandelt werden - entweder alle oder keine.',
      category: 'ACID',
      difficulty: 'Einfach',
      points: 5,
      hints: ['Denke an "Alles oder Nichts"', 'Entweder alle Operationen oder gar keine'],
      relatedConcepts: ['Transaction', 'Rollback', 'Commit']
    },
    {
      id: 'acid-2',
      question: 'Welche ACID-Eigenschaft verhindert, dass Transaktionen uncommitted Daten lesen können?',
      options: [
        'Atomicity',
        'Consistency',
        'Isolation',
        'Durability'
      ],
      correctAnswer: 2,
      explanation: 'Isolation verhindert, dass Transaktionen uncommitted Daten anderer Transaktionen lesen können (Dirty Read Problem).',
      category: 'ACID',
      difficulty: 'Einfach',
      points: 5,
      hints: ['Isolation = Abgeschlossenheit', 'Verhindert Interferenz zwischen Transaktionen'],
      relatedConcepts: ['Dirty Read', 'Isolation Levels', 'Concurrency']
    },
    {
      id: 'acid-3',
      question: 'In einem Banking-System wird eine Überweisung von 1000€ durchgeführt. Welche ACID-Eigenschaft verhindert, dass das Geld "verloren" geht?',
      options: [
        'Atomicity - verhindert teilweise Ausführung',
        'Consistency - hält Kontostände konsistent',
        'Isolation - verhindert Interferenz',
        'Durability - speichert Änderungen permanent'
      ],
      correctAnswer: 0,
      explanation: 'Atomicity verhindert, dass nur eine der beiden Konten aktualisiert wird. Entweder werden beide Konten korrekt aktualisiert oder gar keine Änderung.',
      category: 'ACID',
      difficulty: 'Mittel',
      points: 8,
      hints: ['Überweisung = Zwei Operationen: Abziehen und Hinzufügen', 'Beide müssen zusammen ausgeführt werden'],
      relatedConcepts: ['Banking', 'Money Transfer', 'Two-Phase Commit']
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
      category: 'Isolation',
      difficulty: 'Mittel',
      points: 7,
      hints: ['Non-Repeatable Read = Verschiedene Werte bei wiederholtem Lesen', 'READ COMMITTED erlaubt diese'],
      relatedConcepts: ['Non-Repeatable Read', 'Concurrency Problems', 'Isolation Levels']
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
      category: 'Isolation',
      difficulty: 'Mittel',
      points: 8,
      hints: ['Phantom Read = Neue Zeilen erscheinen', 'SERIALIZABLE = Höchste Isolation'],
      relatedConcepts: ['Phantom Read', 'Serializable', 'Concurrency Control']
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
      category: 'Concurrency',
      difficulty: 'Mittel',
      points: 8,
      hints: ['Beide Transaktionen lesen denselben Wert', 'Änderungen überschreiben sich gegenseitig'],
      relatedConcepts: ['Lost Update', 'Concurrency Control', 'Locking']
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
      category: 'Concurrency',
      difficulty: 'Einfach',
      points: 6,
      hints: ['READ UNCOMMITTED = Niedrigste Isolation', 'Dirty Read = Lesen uncommitted Daten'],
      relatedConcepts: ['Dirty Read', 'READ UNCOMMITTED', 'Isolation Levels']
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
      category: 'Locking',
      difficulty: 'Einfach',
      points: 6,
      hints: ['Shared = Teilen', 'Exclusive = Ausschließlich', 'Mehrere Leser erlaubt'],
      relatedConcepts: ['Shared Lock', 'Exclusive Lock', 'Lock Compatibility']
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
      category: 'Locking',
      difficulty: 'Mittel',
      points: 8,
      hints: ['Escalation = Aufstieg', 'Viele kleine Locks zu einem großen', 'Vereinfacht die Verwaltung'],
      relatedConcepts: ['Lock Escalation', 'Performance', 'Lock Management']
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
      category: 'Deadlock',
      difficulty: 'Mittel',
      points: 8,
      hints: ['Deadlock = Zyklus von wartenden Transaktionen', 'Lösung = Eine Transaktion abbrechen'],
      relatedConcepts: ['Deadlock Resolution', 'Transaction Abort', 'Wait-For Graph']
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
      category: 'Deadlock',
      difficulty: 'Schwer',
      points: 10,
      hints: ['Deadlock = Vier Bedingungen', 'Alle müssen gleichzeitig erfüllt sein', 'Coffman-Bedingungen'],
      relatedConcepts: ['Coffman Conditions', 'Deadlock Prevention', 'Resource Allocation']
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
      category: 'Recovery',
      difficulty: 'Mittel',
      points: 8,
      hints: ['WAL = Write-Ahead Logging', 'Log vor Daten', 'Recovery ermöglichen'],
      relatedConcepts: ['WAL', 'Recovery', 'Durability', 'Logging']
    },
    {
      id: 'recovery-2',
      question: 'Nach einem Systemabsturz: Welche Transaktionen müssen wiederholt werden (Redo)?',
      options: [
        'T1 und T2',
        'Nur T1',
        'Nur T2',
        'Keine'
      ],
      correctAnswer: 1,
      explanation: 'Nur T1 muss wiederholt werden (Redo), da es bereits committet war. T2 muss rückgängig gemacht werden (Undo).',
      category: 'Recovery',
      difficulty: 'Schwer',
      points: 10,
      hints: ['Redo = Wiederholen', 'Nur committed Transaktionen', 'Undo = Rückgängig machen'],
      relatedConcepts: ['Redo', 'Undo', 'Recovery', 'Transaction States']
    },

    // Performance Questions
    {
      id: 'performance-1',
      question: 'Welche Strategie bietet den besten Kompromiss zwischen Isolation und Performance?',
      options: [
        'SERIALIZABLE für alle Transaktionen',
        'READ UNCOMMITTED für alle Transaktionen',
        'Angepasste Isolation Levels je nach Anforderung',
        'Keine Isolation verwenden'
      ],
      correctAnswer: 2,
      explanation: 'Angepasste Isolation Levels je nach Anforderung bieten den besten Kompromiss. Kritische Transaktionen erhalten höhere Isolation, weniger kritische niedrigere.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 10,
      hints: ['Tradeoff = Kompromiss', 'Nicht alle Transaktionen brauchen höchste Isolation', 'Angepasste Strategien'],
      relatedConcepts: ['Performance Tuning', 'Isolation Levels', 'Tradeoffs']
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
      category: 'Grundlagen',
      difficulty: 'Schwer',
      points: 12,
      hints: ['Verteilte Transaktionen = Mehrere Systeme', '2PC = Zwei Phasen', 'Konsistenz über Systeme'],
      relatedConcepts: ['Distributed Transactions', '2PC', 'Consistency', 'Coordination']
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startQuiz = () => {
    // Shuffle questions and answer options
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Shuffle questions
    const shuffledQuestions = shuffleArray(quizQuestions);
    
    // Shuffle answer options for each question
    const questionsWithShuffledOptions = shuffledQuestions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));

    setShuffledQuestions(questionsWithShuffledOptions);
    setIsQuizStarted(true);
    setIsTimerActive(true);
    setTimeLeft(1200);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setQuizResult(null);
    setSelectedAnswer(null);
  };

  const finishQuiz = () => {
    setIsTimerActive(false);
    calculateResult();
    setShowResult(true);
  };

  const calculateResult = () => {
    let correctAnswers = 0;
    let earnedPoints = 0;
    const totalPoints = shuffledQuestions.reduce((sum, q) => sum + q.points, 0);
    const categories: { [key: string]: { total: number; correct: number; points: number } } = {};

    shuffledQuestions.forEach(question => {
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

    const percentage = (correctAnswers / shuffledQuestions.length) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    // Analyze strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    Object.entries(categories).forEach(([category, stats]) => {
      const categoryPercentage = (stats.correct / stats.total) * 100;
      if (categoryPercentage >= 80) {
        strengths.push(category);
      } else if (categoryPercentage < 60) {
        weaknesses.push(category);
        recommendations.push(`Vertiefe dein Wissen in ${category}`);
      }
    });

    if (percentage >= 80) {
      recommendations.push('Ausgezeichnet! Du beherrschst die Transaktionskonzepte sehr gut.');
    } else if (percentage >= 60) {
      recommendations.push('Gut! Arbeite an den schwächeren Bereichen für bessere Ergebnisse.');
    } else {
      recommendations.push('Übe mehr mit den Grundlagen und arbeite dich schrittweise vor.');
    }

    setQuizResult({
      totalQuestions: shuffledQuestions.length,
      correctAnswers,
      totalPoints,
      earnedPoints,
      percentage,
      grade,
      timeUsed: 1200 - timeLeft,
      categories,
      strengths,
      weaknesses,
      recommendations
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Transaktions-Wissens-Quiz
            </h1>
            <p className="text-xl text-gray-600">
              Teste dein Wissen über Transaktionen in Datenbanksystemen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz-Details</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• {shuffledQuestions.length} Fragen</li>
                <li>• 20 Minuten Zeitlimit</li>
                <li>• Multiple Choice Format</li>
                <li>• Verschiedene Schwierigkeitsgrade</li>
                <li>• Detaillierte Auswertung</li>
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
                <li>• Performance-Optimierung</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startQuiz}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center gap-3 mx-auto"
            >
              <Zap className="w-6 h-6" />
              Quiz starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz abgeschlossen!
            </h1>
            <div className={`inline-block px-6 py-3 rounded-full text-2xl font-bold ${getGradeColor(quizResult.grade)}`}>
              Note: {quizResult.grade}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {quizResult.correctAnswers}/{quizResult.totalQuestions}
              </div>
              <div className="text-blue-800">Richtige Antworten</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {quizResult.earnedPoints}/{quizResult.totalPoints}
              </div>
              <div className="text-green-800">Punkte erreicht</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {quizResult.percentage.toFixed(1)}%
              </div>
              <div className="text-purple-800">Prozent</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Stärken
              </h3>
              <div className="space-y-2">
                {quizResult.strengths.length > 0 ? (
                  quizResult.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      {strength}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Keine besonderen Stärken identifiziert</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Verbesserungsbereiche
              </h3>
              <div className="space-y-2">
                {quizResult.weaknesses.length > 0 ? (
                  quizResult.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-center gap-2 text-red-700">
                      <XCircle className="w-4 h-4" />
                      {weakness}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Keine Schwächen identifiziert</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Empfehlungen
            </h3>
            <ul className="space-y-2 text-blue-700">
              {quizResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategorien-Übersicht</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(quizResult.categories).map(([category, stats]) => (
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
                setQuizResult(null);
                startQuiz();
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Quiz wiederholen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Transaktions-Wissens-Quiz
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Frage {currentQuestion + 1} von {shuffledQuestions.length}</span>
            <span>{currentQ.points} Punkte</span>
            <span className="capitalize">{currentQ.category}</span>
            <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(currentQ.difficulty)}`}>
              {currentQ.difficulty}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ.question}
          </h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
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
            {shuffledQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[shuffledQuestions[index].id] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {currentQuestion === shuffledQuestions.length - 1 ? (
            <button
              onClick={finishQuiz}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Quiz beenden
            </button>
          ) : (
            <button
              onClick={() => {
                if (selectedAnswer !== null) {
                  setAnswers(prev => ({ ...prev, [currentQ.id]: selectedAnswer }));
                }
                setCurrentQuestion(Math.min(shuffledQuestions.length - 1, currentQuestion + 1));
                setSelectedAnswer(answers[shuffledQuestions[Math.min(shuffledQuestions.length - 1, currentQuestion + 1)].id] ?? null);
              }}
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
