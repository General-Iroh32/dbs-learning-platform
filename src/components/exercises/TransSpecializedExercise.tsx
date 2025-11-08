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
  Shield,
  Lock,
  Users,
  Zap,
  Settings
} from 'lucide-react';

interface SpecializedExercise {
  id: string;
  title: string;
  description: string;
  type: 'acid-deep-dive' | 'isolation-levels' | 'concurrency-control' | 'deadlock-analysis' | 'recovery-procedures' | 'performance-tuning';
  scenario: string;
  question: string;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  points: number;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: string;
  interactiveElements?: {
    type: 'timeline' | 'diagram' | 'simulation' | 'code';
    data: any;
  };
}


export const TransSpecializedExercise: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes per exercise
  const [isTimerActive, setIsTimerActive] = useState(false);

  const exercises: SpecializedExercise[] = [
    // ACID Deep Dive
    {
      id: 'acid-atomicity-deep',
      title: 'Atomicity in verteilten Systemen',
      description: 'Verstehe Atomicity bei verteilten Transaktionen',
      type: 'acid-deep-dive',
      scenario: 'Eine verteilte Transaktion umfasst: 1) Geld von Bank A abheben, 2) Geld zu Bank B überweisen, 3) Rechnung bei Service C erstellen. Bank A und B sind erfolgreich, aber Service C ist nicht verfügbar.',
      question: 'Welche Strategie gewährleistet Atomicity in diesem Fall?',
      correctAnswer: 'two-phase-commit',
      explanation: 'Two-Phase Commit (2PC) koordiniert alle beteiligten Systeme. In Phase 1 werden alle Systeme gefragt, ob sie committen können. In Phase 2 werden alle Systeme zum Commit oder Rollback aufgefordert.',
      hints: [
        'Verteilte Transaktionen benötigen Koordination',
        '2PC hat zwei Phasen: Prepare und Commit',
        'Bei einem Fehler wird Rollback durchgeführt'
      ],
      points: 30,
      difficulty: 'Schwer',
      category: 'ACID',
      interactiveElements: {
        type: 'timeline',
        data: {
          transactions: [
            {
              id: 'T1',
              operations: [
                { type: 'write', resource: 'Bank A', value: 'withdraw 1000€', timestamp: 1 },
                { type: 'write', resource: 'Bank B', value: 'deposit 1000€', timestamp: 2 },
                { type: 'write', resource: 'Service C', value: 'create invoice', timestamp: 3, error: true },
                { type: 'abort', resource: 'all', timestamp: 4 }
              ],
              status: 'aborted'
            }
          ]
        }
      }
    },
    {
      id: 'acid-consistency-deep',
      title: 'Consistency Constraints',
      description: 'Verstehe Consistency in komplexen Szenarien',
      type: 'acid-deep-dive',
      scenario: 'Ein E-Commerce-System hat folgende Constraints: 1) Lagerbestand ≥ 0, 2) Bestellwert = Summe der Artikelpreise, 3) Kunde muss existieren. Eine Transaktion fügt Artikel zur Bestellung hinzu.',
      question: 'Welche Consistency-Regel wird verletzt, wenn der Lagerbestand negativ wird?',
      correctAnswer: 'constraint-violation',
      explanation: 'Die Constraint-Regel "Lagerbestand ≥ 0" wird verletzt. Die Transaktion muss abgebrochen werden, um die Konsistenz zu wahren.',
      hints: [
        'Consistency hält Datenbank-Constraints ein',
        'Constraint-Verletzungen führen zu Rollback',
        'Geschäftsregeln müssen eingehalten werden'
      ],
      points: 25,
      difficulty: 'Mittel',
      category: 'ACID'
    },

    // Isolation Levels Deep Dive
    {
      id: 'isolation-read-uncommitted',
      title: 'READ UNCOMMITTED Analyse',
      description: 'Verstehe die Auswirkungen von READ UNCOMMITTED',
      type: 'isolation-levels',
      scenario: 'T1: UPDATE account SET balance = 1000 WHERE id = 1, T2: SELECT balance FROM account WHERE id = 1, T1: ROLLBACK',
      question: 'Welches Problem tritt bei READ UNCOMMITTED auf?',
      correctAnswer: 'dirty-read',
      explanation: 'T2 liest uncommitted Daten von T1 (Dirty Read). T1 rollbackt später, aber T2 hat bereits die uncommitted Daten gelesen.',
      hints: [
        'READ UNCOMMITTED erlaubt das Lesen uncommitted Daten',
        'Dirty Read = Lesen von Daten, die später rollback werden',
        'Niedrigste Isolation, aber beste Performance'
      ],
      points: 20,
      difficulty: 'Einfach',
      category: 'Isolation'
    },
    {
      id: 'isolation-serializable',
      title: 'SERIALIZABLE Isolation',
      description: 'Verstehe SERIALIZABLE und seine Auswirkungen',
      type: 'isolation-levels',
      scenario: 'T1: SELECT COUNT(*) FROM orders WHERE status="pending", T2: INSERT INTO orders (status) VALUES ("pending"), T2: COMMIT, T1: SELECT COUNT(*) FROM orders WHERE status="pending"',
      question: 'Welches Problem wird bei SERIALIZABLE verhindert?',
      correctAnswer: 'phantom-read',
      explanation: 'SERIALIZABLE verhindert Phantom Reads. T1 würde bei SERIALIZABLE die gleiche Anzahl von Zeilen bei beiden SELECT-Statements sehen.',
      hints: [
        'SERIALIZABLE verhindert alle Concurrency-Probleme',
        'Phantom Read = Neue Zeilen erscheinen zwischen Lesevorgängen',
        'Höchste Isolation, aber schlechteste Performance'
      ],
      points: 25,
      difficulty: 'Mittel',
      category: 'Isolation'
    },

    // Concurrency Control
    {
      id: 'concurrency-optimistic-locking',
      title: 'Optimistic Locking',
      description: 'Verstehe Optimistic Locking vs. Pessimistic Locking',
      type: 'concurrency-control',
      scenario: 'Ein Online-Shop verwendet Optimistic Locking für Artikelreservierungen. Zwei Kunden versuchen gleichzeitig, den letzten Artikel zu kaufen.',
      question: 'Wie funktioniert Optimistic Locking in diesem Fall?',
      correctAnswer: 'version-check-retry',
      explanation: 'Optimistic Locking prüft Versionsnummern. Beide Transaktionen lesen die aktuelle Version, eine committet erfolgreich, die andere erkennt die Versionsänderung und versucht es erneut.',
      hints: [
        'Optimistic Locking = Keine Locks, nur Versionsprüfung',
        'Bei Konflikt: Retry mit neuer Version',
        'Besser für hohe Concurrency, schlechter für häufige Konflikte'
      ],
      points: 30,
      difficulty: 'Schwer',
      category: 'Concurrency'
    },
    {
      id: 'concurrency-pessimistic-locking',
      title: 'Pessimistic Locking',
      description: 'Verstehe Pessimistic Locking Strategien',
      type: 'concurrency-control',
      scenario: 'Ein Banking-System verwendet Pessimistic Locking. T1 möchte Kontostand lesen und ändern, T2 möchte denselben Kontostand lesen.',
      question: 'Welche Lock-Strategie verhindert Lost Updates am effektivsten?',
      correctAnswer: 'exclusive-lock',
      explanation: 'Exclusive Lock verhindert, dass andere Transaktionen die Ressource lesen oder ändern können, bis die aktuelle Transaktion abgeschlossen ist.',
      hints: [
        'Pessimistic Locking = Locks vor Operationen',
        'Exclusive Lock = Nur eine Transaktion kann zugreifen',
        'Verhindert Konflikte, aber kann zu Blocking führen'
      ],
      points: 25,
      difficulty: 'Mittel',
      category: 'Concurrency'
    },

    // Deadlock Analysis
    {
      id: 'deadlock-detection',
      title: 'Deadlock Detection Algorithm',
      description: 'Verstehe Deadlock Detection und Resolution',
      type: 'deadlock-analysis',
      scenario: 'T1 hat Lock auf Ressource A und wartet auf Ressource B. T2 hat Lock auf Ressource B und wartet auf Ressource A. T3 hat Lock auf Ressource C und wartet auf Ressource A.',
      question: 'Welche Transaktionen sind in einem Deadlock-Zyklus?',
      correctAnswer: ['T1', 'T2'],
      explanation: 'T1 und T2 bilden einen Deadlock-Zyklus: T1 → A (hat) → B (wartet), T2 → B (hat) → A (wartet). T3 ist nicht im Zyklus, da es nur auf A wartet.',
      hints: [
        'Deadlock = Zyklus von wartenden Transaktionen',
        'T1 wartet auf T2, T2 wartet auf T1 = Deadlock',
        'T3 wartet nur auf A, ist nicht im Zyklus'
      ],
      points: 35,
      difficulty: 'Schwer',
      category: 'Deadlock',
      interactiveElements: {
        type: 'diagram',
        data: {
          nodes: [
            { id: 'T1', type: 'transaction', locks: ['A'], waits: ['B'] },
            { id: 'T2', type: 'transaction', locks: ['B'], waits: ['A'] },
            { id: 'T3', type: 'transaction', locks: ['C'], waits: ['A'] }
          ],
          edges: [
            { from: 'T1', to: 'T2', type: 'waits-for' },
            { from: 'T2', to: 'T1', type: 'waits-for' }
          ]
        }
      }
    },

    // Recovery Procedures
    {
      id: 'recovery-wal',
      title: 'Write-Ahead Logging (WAL)',
      description: 'Verstehe WAL und Recovery-Verfahren',
      type: 'recovery-procedures',
      scenario: 'System stürzt ab. Log enthält: T1: BEGIN, T1: UPDATE A, T1: COMMIT, T2: BEGIN, T2: UPDATE B, T2: UPDATE C (nicht committet).',
      question: 'Welche Recovery-Operationen sind notwendig?',
      correctAnswer: {
        redo: ['T1'],
        undo: ['T2']
      },
      explanation: 'T1 war committet und muss wiederholt werden (Redo). T2 war nicht committet und muss rückgängig gemacht werden (Undo).',
      hints: [
        'Committed Transaktionen = Redo (wiederholen)',
        'Nicht committed Transaktionen = Undo (rückgängig)',
        'WAL stellt sicher, dass Log vor Daten geschrieben wird'
      ],
      points: 30,
      difficulty: 'Schwer',
      category: 'Recovery'
    },
    {
      id: 'recovery-checkpoint',
      title: 'Checkpoint Recovery',
      description: 'Verstehe Checkpoint-basierte Recovery',
      type: 'recovery-procedures',
      scenario: 'System stürzt ab. Letzter Checkpoint war vor T1. Log: CHECKPOINT, T1: BEGIN, T1: UPDATE, T1: COMMIT, T2: BEGIN, T2: UPDATE (nicht committet).',
      question: 'Welche Transaktionen müssen bei Recovery verarbeitet werden?',
      correctAnswer: 'all-after-checkpoint',
      explanation: 'Alle Transaktionen nach dem letzten Checkpoint müssen verarbeitet werden. Checkpoint markiert einen konsistenten Zustand.',
      hints: [
        'Checkpoint = Konsistenter Zustand der Datenbank',
        'Recovery beginnt ab dem letzten Checkpoint',
        'Alle Transaktionen nach Checkpoint müssen verarbeitet werden'
      ],
      points: 25,
      difficulty: 'Mittel',
      category: 'Recovery'
    },

    // Performance Tuning
    {
      id: 'performance-isolation-tradeoff',
      title: 'Isolation vs. Performance Tradeoff',
      description: 'Verstehe den Tradeoff zwischen Isolation und Performance',
      type: 'performance-tuning',
      scenario: 'Ein E-Commerce-System hat hohe Concurrency-Anforderungen. Viele Benutzer bestellen gleichzeitig, aber doppelte Buchungen müssen verhindert werden.',
      question: 'Welche Isolation Level-Strategie ist optimal?',
      correctAnswer: 'read-committed-with-application-locks',
      explanation: 'READ COMMITTED mit Application-Level Locks bietet gute Performance und verhindert doppelte Buchungen. Höhere Isolation Levels würden die Performance zu stark beeinträchtigen.',
      hints: [
        'Höhere Isolation = Schlechtere Performance',
        'Application-Level Locks können Isolation ergänzen',
        'Tradeoff zwischen Konsistenz und Durchsatz'
      ],
      points: 30,
      difficulty: 'Schwer',
      category: 'Performance'
    }
  ];

  const exerciseTypes = [
    { id: 'all', label: 'Alle', icon: 'Database' },
    { id: 'acid-deep-dive', label: 'ACID Deep Dive', icon: 'Shield' },
    { id: 'isolation-levels', label: 'Isolation Levels', icon: 'Lock' },
    { id: 'concurrency-control', label: 'Concurrency Control', icon: 'Users' },
    { id: 'deadlock-analysis', label: 'Deadlock Analysis', icon: 'AlertTriangle' },
    { id: 'recovery-procedures', label: 'Recovery Procedures', icon: 'RefreshCw' },
    { id: 'performance-tuning', label: 'Performance Tuning', icon: 'Zap' }
  ];

  const filteredExercises = selectedType === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.type === selectedType);

  const currentEx = filteredExercises[currentExercise];

  useEffect(() => {
    if (currentEx) {
      setTimeLeft(600);
      setIsTimerActive(true);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  }, [selectedType, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      checkAnswer();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const checkAnswer = () => {
    if (!currentEx || userAnswer === null) return;

    let correct = false;
    
    if (Array.isArray(currentEx.correctAnswer) && Array.isArray(userAnswer)) {
      correct = currentEx.correctAnswer.every(ans => userAnswer.includes(ans)) && 
                userAnswer.every(ans => currentEx.correctAnswer.includes(ans));
    } else if (typeof currentEx.correctAnswer === 'object' && typeof userAnswer === 'object') {
      correct = JSON.stringify(userAnswer) === JSON.stringify(currentEx.correctAnswer);
    } else {
      correct = userAnswer === currentEx.correctAnswer;
    }

    setIsCorrect(correct);
    setShowExplanation(true);
    setIsTimerActive(false);

    if (correct) {
      setScore(score + currentEx.points);
    }
  };

  const nextExercise = () => {
    if (currentExercise < filteredExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
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

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Database': <Database className="w-5 h-5" />,
      'Shield': <Shield className="w-5 h-5" />,
      'Lock': <Lock className="w-5 h-5" />,
      'Users': <Users className="w-5 h-5" />,
      'AlertTriangle': <AlertTriangle className="w-5 h-5" />,
      'RefreshCw': <RefreshCw className="w-5 h-5" />,
      'Zap': <Zap className="w-5 h-5" />
    };
    return icons[iconName] || <Database className="w-5 h-5" />;
  };

  const renderInteractiveElement = () => {
    if (!currentEx?.interactiveElements) return null;

    switch (currentEx.interactiveElements.type) {
      case 'timeline':
        return (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Transaktions-Timeline</h4>
            <div className="space-y-4">
              {currentEx.interactiveElements.data.transactions.map((tx: any) => (
                <div key={tx.id} className="border-l-4 border-blue-400 pl-4">
                  <div className="font-medium text-blue-800 mb-2">{tx.id}</div>
                  <div className="space-y-2">
                    {tx.operations.map((op: any, index: number) => (
                      <div key={index} className={`flex items-center gap-3 text-sm ${
                        op.error ? 'text-red-600' : 'text-gray-700'
                      }`}>
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {op.timestamp}
                        </span>
                        <span className="capitalize">{op.type}</span>
                        <span>{op.resource}</span>
                        {op.value && <span className="text-gray-500">({op.value})</span>}
                        {op.error && <span className="text-red-500">❌</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'diagram':
        return (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Deadlock-Diagramm</h4>
            <div className="flex items-center justify-center">
              <div className="relative">
                {currentEx.interactiveElements.data.nodes.map((node: any) => (
                  <div
                    key={node.id}
                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-xs font-medium ${
                      node.type === 'transaction' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}
                    style={{
                      left: node.id === 'T1' ? '0px' : node.id === 'T2' ? '100px' : '200px',
                      top: '0px'
                    }}
                  >
                    {node.id}
                  </div>
                ))}
                {currentEx.interactiveElements.data.edges.map((edge: any, index: number) => (
                  <div
                    key={index}
                    className="absolute w-16 h-0.5 bg-red-500"
                    style={{
                      left: edge.from === 'T1' ? '16px' : '116px',
                      top: '32px',
                      transform: 'rotate(45deg)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderQuestionContent = () => {
    if (!currentEx) return null;

    switch (currentEx.type) {
      case 'acid-deep-dive':
        return (
          <div className="space-y-4">
            {[
              'two-phase-commit',
              'three-phase-commit',
              'saga-pattern',
              'event-sourcing'
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        );

      case 'isolation-levels':
        return (
          <div className="space-y-4">
            {[
              'dirty-read',
              'non-repeatable-read',
              'phantom-read',
              'lost-update'
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        );

      case 'concurrency-control':
        return (
          <div className="space-y-4">
            {[
              'version-check-retry',
              'immediate-lock',
              'wait-and-retry',
              'skip-conflict'
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        );

      case 'deadlock-analysis':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">Wähle alle Transaktionen aus, die im Deadlock-Zyklus sind:</p>
            {['T1', 'T2', 'T3'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userAnswer?.includes(option) || false}
                  onChange={(e) => {
                    const newAnswer = userAnswer || [];
                    if (e.target.checked) {
                      setUserAnswer([...newAnswer, option]);
                    } else {
                      setUserAnswer(newAnswer.filter((item: string) => item !== option));
                    }
                  }}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'recovery-procedures':
        return (
          <div className="space-y-4">
            {[
              'all-transactions',
              'all-after-checkpoint',
              'only-committed',
              'only-uncommitted'
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        );

      case 'performance-tuning':
        return (
          <div className="space-y-4">
            {[
              'read-committed-with-application-locks',
              'serializable-isolation',
              'read-uncommitted',
              'no-isolation'
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <div>Unbekannter Übungstyp</div>;
    }
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="text-center">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Keine Übungen gefunden</h2>
          <p className="text-gray-500">Wähle einen anderen Übungstyp aus.</p>
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
            <Settings className="w-10 h-10 text-blue-600" />
            Spezialisierte Transaktions-Übungen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vertiefe dein Verständnis für spezielle Aspekte von Transaktionen
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {exerciseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setCurrentExercise(0);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedType === type.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              {getIcon(type.icon)}
              {type.label}
            </button>
          ))}
        </div>

        {/* Exercise Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
              <p className="text-gray-600 mb-4">{currentEx.description}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentEx.difficulty)}`}>
                {currentEx.difficulty}
              </span>
              <div className="text-lg font-medium text-blue-600 mt-2">{currentEx.points} Punkte</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Übung {currentExercise + 1} von {filteredExercises.length}</span>
            <span className="capitalize">{currentEx.category}</span>
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              {score} Punkte
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Scenario */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Szenario
          </h3>
          <p className="text-gray-700 mb-6">{currentEx.scenario}</p>
          
          {/* Interactive Elements */}
          {renderInteractiveElement()}
          
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{currentEx.question}</h4>
          {renderQuestionContent()}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={checkAnswer}
            disabled={userAnswer === null}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Antwort prüfen
          </button>
        </div>

        {/* Result Modal */}
        {showExplanation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full p-8">
              <div className="text-center mb-6">
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
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Erklärung
                </h3>
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
                  Nächste Übung
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
