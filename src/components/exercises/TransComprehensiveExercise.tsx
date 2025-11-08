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
  Lock,
  Shield,
  Activity,
  Users
} from 'lucide-react';

interface TransExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  type: 'scenario' | 'timeline' | 'isolation' | 'locking' | 'recovery' | 'acid-analysis';
  scenario: string;
  question: string;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  points: number;
  level: number;
  category: string;
}

interface Transaction {
  id: string;
  operations: string[];
  startTime: number;
  endTime?: number;
  status: 'active' | 'committed' | 'aborted';
}

interface Lock {
  type: 'shared' | 'exclusive';
  resource: string;
  transaction: string;
}

export const TransComprehensiveExercise: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes per exercise
  const [isTimerActive, setIsTimerActive] = useState(false);

  const exercises: TransExercise[] = [
    // Level 1: Grundkonzepte
    {
      id: 'transaction-basics-1',
      title: 'Transaktions-Erkennung',
      description: 'Erkenne Transaktionen in einem Bankenszenario',
      difficulty: 'Einfach',
      type: 'scenario',
      scenario: 'Eine Bank hat folgende Operationen: 1) Kunde überweist 100€ von Konto A zu Konto B, 2) System prüft Kontostand, 3) Geld wird von Konto A abgezogen, 4) Geld wird zu Konto B hinzugefügt, 5) Transaktion wird bestätigt.',
      question: 'Welche dieser Operationen gehören zu einer Transaktion?',
      correctAnswer: [1, 2, 3, 4, 5],
      explanation: 'Alle Operationen gehören zur Transaktion, da sie logisch zusammengehören und als Einheit behandelt werden müssen (Atomicity).',
      hints: ['Transaktionen sind logische Einheiten von Operationen', 'Alle Operationen müssen zusammen ausgeführt werden'],
      points: 15,
      level: 1,
      category: 'Grundlagen'
    },
    {
      id: 'acid-properties-1',
      title: 'ACID-Eigenschaften identifizieren',
      description: 'Identifiziere ACID-Eigenschaften in einem E-Commerce-Szenario',
      difficulty: 'Einfach',
      type: 'acid-analysis',
      scenario: 'Ein Online-Shop verarbeitet eine Bestellung: 1) Artikel wird reserviert, 2) Lagerbestand wird reduziert, 3) Rechnung wird erstellt, 4) Zahlung wird verarbeitet. Bei einem Fehler in Schritt 4 werden alle vorherigen Schritte rückgängig gemacht.',
      question: 'Welche ACID-Eigenschaften werden hier demonstriert?',
      correctAnswer: ['atomicity', 'consistency', 'durability'],
      explanation: 'Atomicity: Alle Schritte werden zusammen ausgeführt oder rückgängig gemacht. Consistency: Lagerbestand und Reservierung bleiben konsistent. Durability: Nach erfolgreichem Abschluss sind alle Änderungen permanent.',
      hints: ['Atomicity = Alles oder Nichts', 'Consistency = Datenbank bleibt gültig', 'Durability = Änderungen sind permanent'],
      points: 20,
      level: 1,
      category: 'ACID'
    },
    {
      id: 'transaction-states-1',
      title: 'Transaktions-Zustände',
      description: 'Verstehe den Lebenszyklus einer Transaktion',
      difficulty: 'Einfach',
      type: 'timeline',
      scenario: 'Eine Transaktion läuft folgende Schritte ab: BEGIN → SELECT → UPDATE → COMMIT',
      question: 'In welcher Reihenfolge durchläuft die Transaktion die Zustände?',
      correctAnswer: ['active', 'partially-committed', 'committed'],
      explanation: 'Active: Während der Ausführung, Partially Committed: Nach allen Operationen, Committed: Nach erfolgreichem COMMIT.',
      hints: ['Active = Transaktion läuft', 'Partially Committed = Alle Operationen ausgeführt', 'Committed = Erfolgreich abgeschlossen'],
      points: 15,
      level: 1,
      category: 'Zustände'
    },

    // Level 2: Isolation und Concurrency
    {
      id: 'isolation-levels-1',
      title: 'Isolation Levels verstehen',
      description: 'Verstehe die verschiedenen Isolation Levels',
      difficulty: 'Mittel',
      type: 'isolation',
      scenario: 'Zwei Transaktionen laufen parallel: T1 liest einen Wert, T2 ändert denselben Wert und committet, T1 liest den Wert erneut.',
      question: 'Bei welchem Isolation Level würde T1 unterschiedliche Werte lesen?',
      correctAnswer: ['read-committed'],
      explanation: 'Bei READ COMMITTED kann T1 unterschiedliche Werte lesen, da T2 zwischen den beiden Lesevorgängen committet hat (Non-Repeatable Read).',
      hints: ['READ COMMITTED erlaubt Non-Repeatable Reads', 'REPEATABLE READ verhindert diese'],
      points: 25,
      level: 2,
      category: 'Isolation'
    },
    {
      id: 'concurrency-problems-1',
      title: 'Concurrency-Probleme erkennen',
      description: 'Erkenne verschiedene Concurrency-Probleme',
      difficulty: 'Mittel',
      type: 'scenario',
      scenario: 'T1 beginnt, liest Kontostand (100€), T2 beginnt, liest Kontostand (100€), T1 addiert 50€ (150€), T2 subtrahiert 30€ (70€), T1 committet, T2 committet.',
      question: 'Welches Concurrency-Problem liegt vor?',
      correctAnswer: 'lost-update',
      explanation: 'Lost Update: Beide Transaktionen haben den ursprünglichen Wert gelesen und ihre Änderungen basierend darauf berechnet. Die Änderung von T1 geht verloren.',
      hints: ['Beide Transaktionen lesen denselben Wert', 'Änderungen überschreiben sich gegenseitig'],
      points: 30,
      level: 2,
      category: 'Concurrency'
    },
    {
      id: 'locking-basics-1',
      title: 'Locking-Mechanismen',
      description: 'Verstehe Shared und Exclusive Locks',
      difficulty: 'Mittel',
      type: 'locking',
      scenario: 'T1 möchte eine Zeile lesen, T2 möchte dieselbe Zeile ändern, T3 möchte dieselbe Zeile lesen.',
      question: 'Welche Locks werden benötigt und in welcher Reihenfolge?',
      correctAnswer: ['T1: S-Lock, T2: X-Lock (wartet), T3: S-Lock (wartet)'],
      explanation: 'T1 bekommt S-Lock für Lesen. T2 braucht X-Lock, muss aber warten bis T1 fertig ist. T3 kann S-Lock bekommen, da S-Locks kompatibel sind.',
      hints: ['S-Locks sind kompatibel', 'X-Locks sind nicht kompatibel', 'X-Lock muss warten bis alle S-Locks freigegeben sind'],
      points: 25,
      level: 2,
      category: 'Locking'
    },

    // Level 3: Erweiterte Konzepte
    {
      id: 'deadlock-detection-1',
      title: 'Deadlock-Erkennung',
      description: 'Erkenne und löse Deadlocks',
      difficulty: 'Schwer',
      type: 'scenario',
      scenario: 'T1 hat Lock auf Ressource A und wartet auf Ressource B. T2 hat Lock auf Ressource B und wartet auf Ressource A.',
      question: 'Wie kann der Deadlock aufgelöst werden?',
      correctAnswer: 'abort-one-transaction',
      explanation: 'Einer der beiden Transaktionen muss abgebrochen werden, um den Deadlock zu lösen. Die andere kann dann fortfahren.',
      hints: ['Deadlock = Zyklus von wartenden Transaktionen', 'Lösung = Eine Transaktion abbrechen'],
      points: 35,
      level: 3,
      category: 'Deadlock'
    },
    {
      id: 'recovery-scenario-1',
      title: 'Recovery-Szenario',
      description: 'Verstehe Recovery nach Systemabsturz',
      difficulty: 'Schwer',
      type: 'recovery',
      scenario: 'System stürzt ab. Im Log stehen: T1: BEGIN, T1: UPDATE A, T1: COMMIT, T2: BEGIN, T2: UPDATE B, T2: UPDATE C (nicht committet).',
      question: 'Welche Transaktionen müssen bei Recovery wiederholt werden?',
      correctAnswer: ['T1'],
      explanation: 'T1 war bereits committet und muss wiederholt werden (Redo). T2 war nicht committet und muss rückgängig gemacht werden (Undo).',
      hints: ['Committed Transaktionen = Redo', 'Nicht committed Transaktionen = Undo'],
      points: 40,
      level: 3,
      category: 'Recovery'
    },
    {
      id: 'isolation-analysis-1',
      title: 'Isolation Level Analyse',
      description: 'Analysiere das Verhalten bei verschiedenen Isolation Levels',
      difficulty: 'Schwer',
      type: 'isolation',
      scenario: 'T1: SELECT COUNT(*) FROM orders WHERE status="pending", T2: INSERT INTO orders (status) VALUES ("pending"), T2: COMMIT, T1: SELECT COUNT(*) FROM orders WHERE status="pending"',
      question: 'Bei welchem Isolation Level würde T1 unterschiedliche Zählungen erhalten?',
      correctAnswer: ['read-committed', 'repeatable-read'],
      explanation: 'Bei READ COMMITTED und REPEATABLE READ kann T1 unterschiedliche Zählungen erhalten (Phantom Read), da T2 eine neue Zeile eingefügt hat.',
      hints: ['Phantom Read = Neue Zeilen erscheinen', 'Nur SERIALIZABLE verhindert Phantom Reads'],
      points: 35,
      level: 3,
      category: 'Isolation'
    }
  ];

  const levelExercises = exercises.filter(ex => ex.level === currentLevel);
  const currentEx = levelExercises[currentExercise];

  useEffect(() => {
    if (currentEx) {
      setTimeLeft(600);
      setIsTimerActive(true);
      setShowHint(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  }, [currentLevel, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      checkAnswer();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const checkAnswer = () => {
    if (!currentEx || !userAnswer) return;

    let correct = false;
    
    if (Array.isArray(currentEx.correctAnswer) && Array.isArray(userAnswer)) {
      correct = currentEx.correctAnswer.every(ans => userAnswer.includes(ans)) && 
                userAnswer.every(ans => currentEx.correctAnswer.includes(ans));
    } else {
      correct = JSON.stringify(userAnswer) === JSON.stringify(currentEx.correctAnswer);
    }

    setIsCorrect(correct);
    setShowExplanation(true);
    setIsTimerActive(false);

    if (correct) {
      setScore(score + currentEx.points);
      setCompletedExercises(prev => new Set([...prev, currentEx.id]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < levelExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setCurrentExercise(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderExerciseContent = () => {
    if (!currentEx) return null;

    switch (currentEx.type) {
      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                'Alle Operationen gehören zur Transaktion',
                'Nur die ersten 3 Operationen',
                'Nur die letzten 3 Operationen',
                'Nur die UPDATE-Operationen',
                'Nur die COMMIT-Operationen'
              ].map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userAnswer?.includes(index + 1) || false}
                    onChange={(e) => {
                      const newAnswer = userAnswer || [];
                      if (e.target.checked) {
                        setUserAnswer([...newAnswer, index + 1]);
                      } else {
                        setUserAnswer(newAnswer.filter((item: number) => item !== index + 1));
                      }
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'acid-analysis':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                { id: 'atomicity', label: 'Atomicity (Atomarität)' },
                { id: 'consistency', label: 'Consistency (Konsistenz)' },
                { id: 'isolation', label: 'Isolation (Isolation)' },
                { id: 'durability', label: 'Durability (Dauerhaftigkeit)' }
              ].map((option) => (
                <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userAnswer?.includes(option.id) || false}
                    onChange={(e) => {
                      const newAnswer = userAnswer || [];
                      if (e.target.checked) {
                        setUserAnswer([...newAnswer, option.id]);
                      } else {
                        setUserAnswer(newAnswer.filter((item: string) => item !== option.id));
                      }
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                'active → partially-committed → committed',
                'active → committed',
                'partially-committed → active → committed',
                'active → failed → aborted'
              ].map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="timeline"
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'isolation':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                'read-uncommitted',
                'read-committed',
                'repeatable-read',
                'serializable'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="isolation"
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option.replace('-', ' ').toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'locking':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                'T1: S-Lock, T2: X-Lock (wartet), T3: S-Lock (wartet)',
                'T1: X-Lock, T2: wartet, T3: wartet',
                'T1: S-Lock, T2: S-Lock, T3: S-Lock',
                'T1: X-Lock, T2: X-Lock, T3: X-Lock'
              ].map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="locking"
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'recovery':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Szenario:</h4>
              <p className="text-blue-700">{currentEx.scenario}</p>
            </div>
            <div className="space-y-3">
              {[
                'T1',
                'T2',
                'T1 und T2',
                'Keine'
              ].map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="recovery"
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unbekannter Übungstyp</div>;
    }
  };

  if (currentLevel > 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Glückwunsch!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Du hast alle umfassenden Transaktions-Übungen erfolgreich abgeschlossen!
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-blue-600">
              Gesamtpunktzahl: {score} Punkte
            </p>
            <p className="text-gray-600 mt-2">
              {completedExercises.size} von {exercises.length} Übungen abgeschlossen
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentLevel(1);
              setCurrentExercise(0);
              setScore(0);
              setCompletedExercises(new Set());
            }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Nochmal spielen
          </button>
        </div>
      </div>
    );
  }

  if (!currentEx) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Übung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-blue-600" />
            Umfassende Transaktions-Übungen
          </h1>
          <div className="flex items-center justify-center gap-6 text-lg text-gray-600">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getLevelColor(currentLevel)}`}></div>
              Level {currentLevel}
            </div>
            <span>Übung {currentExercise + 1} von {levelExercises.length}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentEx.difficulty)}`}>
              {currentEx.difficulty}
            </span>
            <span className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              {score} Punkte
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{currentEx.title}</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{currentEx.category}</span>
              <span className="text-sm font-medium text-blue-600">{currentEx.points} Punkte</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{currentEx.description}</p>
          
          {/* Level Progress */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full ${
                  level <= currentLevel ? getLevelColor(level) : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentEx.question}</h3>
          {renderExerciseContent()}
        </div>

        {/* Hints */}
        {showHint && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Hinweis:</h4>
                <p className="text-yellow-700">{currentEx.hints[0]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            {showHint ? 'Hinweis verstecken' : 'Hinweis anzeigen'}
          </button>
          
          <button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Antwort prüfen
          </button>
        </div>

        {/* Result Modal */}
        {showExplanation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8">
              <div className="text-center">
                {isCorrect ? (
                  <div>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                      Richtig!
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      Du hast {currentEx.points} Punkte erhalten!
                    </p>
                  </div>
                ) : (
                  <div>
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-red-600 mb-4">
                      Nicht ganz richtig
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      Versuche es nochmal!
                    </p>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Erklärung:</h3>
                  <p className="text-gray-700">{currentEx.explanation}</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowExplanation(false);
                      setUserAnswer(null);
                      setIsCorrect(null);
                      setTimeLeft(600);
                      setIsTimerActive(true);
                    }}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Nochmal versuchen
                  </button>
                  <button
                    onClick={() => {
                      setShowExplanation(false);
                      nextExercise();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    {currentExercise < levelExercises.length - 1 || currentLevel < 3 ? 'Nächste Übung' : 'Beenden'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
