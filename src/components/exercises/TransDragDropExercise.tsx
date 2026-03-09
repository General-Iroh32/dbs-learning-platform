import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Target,
  Clock,
  Trophy,
  AlertCircle
} from 'lucide-react';

interface DragItem {
  id: string;
  content: string;
  type: 'operation' | 'state' | 'property' | 'concept' | 'scenario';
  category: string;
  correctPosition?: string;
}

interface DropZone {
  id: string;
  title: string;
  description: string;
  accepts: string[];
  items: DragItem[];
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  question: string;
  dropZones: DropZone[];
  allItems: DragItem[];
  explanation: string;
  hints: string[];
  points: number;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
}

export const TransDragDropExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const [allItems, setAllItems] = useState<DragItem[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'acid-properties',
      title: 'ACID-Eigenschaften zuordnen',
      description: 'Ordne die ACID-Eigenschaften ihren Definitionen zu',
      scenario: 'Du lernst die Grundlagen von Transaktionen und musst die ACID-Eigenschaften verstehen.',
      question: 'Ziehe jede ACID-Eigenschaft zu ihrer korrekten Definition.',
      dropZones: [
        {
          id: 'atomicity',
          title: 'Atomarität',
          description: 'Alle Operationen werden vollständig ausgeführt oder gar nicht',
          accepts: ['atomicity'],
          items: []
        },
        {
          id: 'consistency',
          title: 'Konsistenz',
          description: 'Datenbank bleibt in konsistentem Zustand',
          accepts: ['consistency'],
          items: []
        },
        {
          id: 'isolation',
          title: 'Isolation',
          description: 'Transaktionen beeinflussen sich nicht gegenseitig',
          accepts: ['isolation'],
          items: []
        },
        {
          id: 'durability',
          title: 'Dauerhaftigkeit',
          description: 'Änderungen sind dauerhaft gespeichert',
          accepts: ['durability'],
          items: []
        }
      ],
      allItems: [
        {
          id: 'atomicity-item',
          content: 'Atomicity',
          type: 'property',
          category: 'atomicity',
          correctPosition: 'atomicity'
        },
        {
          id: 'consistency-item',
          content: 'Consistency',
          type: 'property',
          category: 'consistency',
          correctPosition: 'consistency'
        },
        {
          id: 'isolation-item',
          content: 'Isolation',
          type: 'property',
          category: 'isolation',
          correctPosition: 'isolation'
        },
        {
          id: 'durability-item',
          content: 'Durability',
          type: 'property',
          category: 'durability',
          correctPosition: 'durability'
        }
      ],
      explanation: 'ACID steht für Atomicity (Atomarität), Consistency (Konsistenz), Isolation (Isolation) und Durability (Dauerhaftigkeit). Diese vier Eigenschaften gewährleisten die Zuverlässigkeit von Transaktionen.',
      hints: [
        'Atomicity bedeutet "Alles oder Nichts"',
        'Consistency hält die Datenbank in einem gültigen Zustand',
        'Isolation verhindert Interferenz zwischen Transaktionen',
        'Durability stellt sicher, dass Änderungen permanent sind'
      ],
      points: 20,
      difficulty: 'Einfach'
    },
    {
      id: 'acid-scenarios',
      title: 'ACID-Szenarien zuordnen',
      description: 'Ordne die Szenarien den passenden ACID-Eigenschaften zu',
      scenario: 'Verschiedene Situationen in der Datenbank zeigen unterschiedliche ACID-Eigenschaften.',
      question: 'Ziehe jedes Szenario zu der ACID-Eigenschaft, die es am besten beschreibt.',
      dropZones: [
        {
          id: 'atomicity',
          title: 'Atomarität',
          description: 'Alles oder Nichts',
          accepts: ['atomicity'],
          items: []
        },
        {
          id: 'consistency',
          title: 'Konsistenz',
          description: 'Gültiger Zustand',
          accepts: ['consistency'],
          items: []
        },
        {
          id: 'isolation',
          title: 'Isolation',
          description: 'Keine Interferenz',
          accepts: ['isolation'],
          items: []
        },
        {
          id: 'durability',
          title: 'Dauerhaftigkeit',
          description: 'Permanente Speicherung',
          accepts: ['durability'],
          items: []
        }
      ],
      allItems: [
        {
          id: 'rollback-item',
          content: 'Rollback bei Fehler',
          type: 'scenario',
          category: 'atomicity',
          correctPosition: 'atomicity'
        },
        {
          id: 'constraint-item',
          content: 'Fremdschlüssel-Constraint',
          type: 'scenario',
          category: 'consistency',
          correctPosition: 'consistency'
        },
        {
          id: 'concurrent-item',
          content: 'Gleichzeitige Transaktionen',
          type: 'scenario',
          category: 'isolation',
          correctPosition: 'isolation'
        },
        {
          id: 'commit-item',
          content: 'COMMIT nach Änderung',
          type: 'scenario',
          category: 'durability',
          correctPosition: 'durability'
        }
      ],
      explanation: 'Diese Szenarien zeigen, wie ACID-Eigenschaften in der Praxis wirken: Rollback zeigt Atomarität, Constraints zeigen Konsistenz, gleichzeitige Transaktionen zeigen Isolation, und COMMIT zeigt Dauerhaftigkeit.',
      hints: [
        'Rollback bedeutet, dass Änderungen rückgängig gemacht werden',
        'Constraints sorgen für Datenintegrität',
        'Gleichzeitige Transaktionen müssen isoliert werden',
        'COMMIT macht Änderungen permanent'
      ],
      points: 25,
      difficulty: 'Mittel'
    },
    {
      id: 'transaction-states',
      title: 'Transaktions-Zustände',
      description: 'Ordne die Transaktions-Zustände in der richtigen Reihenfolge',
      scenario: 'Eine Transaktion durchläuft verschiedene Zustände während ihrer Ausführung.',
      question: 'Ziehe die Transaktions-Zustände in die korrekte Reihenfolge.',
      dropZones: [
        {
          id: 'state-1',
          title: '1. Zustand',
          description: 'Erster Zustand',
          accepts: ['active'],
          items: []
        },
        {
          id: 'state-2',
          title: '2. Zustand',
          description: 'Zweiter Zustand',
          accepts: ['partially-committed'],
          items: []
        },
        {
          id: 'state-3',
          title: '3. Zustand',
          description: 'Dritter Zustand',
          accepts: ['committed', 'failed'],
          items: []
        },
        {
          id: 'state-4',
          title: '4. Zustand',
          description: 'Vierter Zustand',
          accepts: ['aborted'],
          items: []
        }
      ],
      allItems: [
        {
          id: 'active-item',
          content: 'Active',
          type: 'state',
          category: 'active',
          correctPosition: 'state-1'
        },
        {
          id: 'partially-committed-item',
          content: 'Partially Committed',
          type: 'state',
          category: 'partially-committed',
          correctPosition: 'state-2'
        },
        {
          id: 'committed-item',
          content: 'Committed',
          type: 'state',
          category: 'committed',
          correctPosition: 'state-3'
        },
        {
          id: 'failed-item',
          content: 'Failed',
          type: 'state',
          category: 'failed',
          correctPosition: 'state-3'
        },
        {
          id: 'aborted-item',
          content: 'Aborted',
          type: 'state',
          category: 'aborted',
          correctPosition: 'state-4'
        }
      ],
      explanation: 'Die korrekte Reihenfolge ist: Active → Partially Committed → (Committed oder Failed) → (bei Failed) Aborted. Eine Transaktion beginnt im Active-Zustand und endet entweder mit Committed oder Aborted.',
      hints: [
        'Active ist der Startzustand',
        'Partially Committed kommt nach der Ausführung aller Operationen',
        'Committed und Failed sind alternative Endzustände',
        'Aborted folgt auf Failed'
      ],
      points: 25,
      difficulty: 'Mittel'
    },
    {
      id: 'isolation-levels',
      title: 'Isolation Levels',
      description: 'Ordne die Isolation Levels nach steigender Isolation',
      scenario: 'Verschiedene Isolation Levels bieten unterschiedliche Grade der Isolation zwischen Transaktionen.',
      question: 'Ziehe die Isolation Levels in aufsteigender Reihenfolge der Isolation.',
      dropZones: [
        {
          id: 'level-1',
          title: 'Niedrigste Isolation',
          description: 'Erlaubt die meisten Concurrency-Probleme',
          accepts: ['read-uncommitted'],
          items: []
        },
        {
          id: 'level-2',
          title: 'Zweite Stufe',
          description: 'Standard in den meisten DBMS',
          accepts: ['read-committed'],
          items: []
        },
        {
          id: 'level-3',
          title: 'Dritte Stufe',
          description: 'Verhindert Non-Repeatable Reads',
          accepts: ['repeatable-read'],
          items: []
        },
        {
          id: 'level-4',
          title: 'Höchste Isolation',
          description: 'Vollständige Isolation',
          accepts: ['serializable'],
          items: []
        }
      ],
      allItems: [
        {
          id: 'read-uncommitted-item',
          content: 'READ UNCOMMITTED',
          type: 'concept',
          category: 'read-uncommitted',
          correctPosition: 'level-1'
        },
        {
          id: 'read-committed-item',
          content: 'READ COMMITTED',
          type: 'concept',
          category: 'read-committed',
          correctPosition: 'level-2'
        },
        {
          id: 'repeatable-read-item',
          content: 'REPEATABLE READ',
          type: 'concept',
          category: 'repeatable-read',
          correctPosition: 'level-3'
        },
        {
          id: 'serializable-item',
          content: 'SERIALIZABLE',
          type: 'concept',
          category: 'serializable',
          correctPosition: 'level-4'
        }
      ],
      explanation: 'Die Isolation Levels in aufsteigender Reihenfolge sind: READ UNCOMMITTED (niedrigste), READ COMMITTED, REPEATABLE READ, und SERIALIZABLE (höchste). Höhere Levels bieten bessere Isolation aber schlechtere Performance.',
      hints: [
        'READ UNCOMMITTED erlaubt Dirty Reads',
        'READ COMMITTED ist der Standard',
        'REPEATABLE READ verhindert Non-Repeatable Reads',
        'SERIALIZABLE bietet vollständige Isolation'
      ],
      points: 30,
      difficulty: 'Schwer'
    },
    {
      id: 'concurrency-problems',
      title: 'Concurrency Probleme',
      description: 'Ordne die Concurrency-Probleme ihren Beschreibungen zu',
      scenario: 'Bei gleichzeitiger Ausführung von Transaktionen können verschiedene Probleme auftreten.',
      question: 'Ziehe jedes Concurrency-Problem zu seiner korrekten Beschreibung.',
      dropZones: [
        {
          id: 'dirty-read',
          title: 'Dirty Read',
          description: 'Lesen von uncommitted Daten',
          accepts: ['dirty-read'],
          items: []
        },
        {
          id: 'non-repeatable-read',
          title: 'Non-Repeatable Read',
          description: 'Verschiedene Werte bei wiederholtem Lesen',
          accepts: ['non-repeatable-read'],
          items: []
        },
        {
          id: 'phantom-read',
          title: 'Phantom Read',
          description: 'Neue Zeilen erscheinen zwischen Lesevorgängen',
          accepts: ['phantom-read'],
          items: []
        },
        {
          id: 'lost-update',
          title: 'Lost Update',
          description: 'Änderungen gehen durch Überschreiben verloren',
          accepts: ['lost-update'],
          items: []
        }
      ],
      allItems: [
        {
          id: 'dirty-read-item',
          content: 'Dirty Read',
          type: 'concept',
          category: 'dirty-read',
          correctPosition: 'dirty-read'
        },
        {
          id: 'non-repeatable-read-item',
          content: 'Non-Repeatable Read',
          type: 'concept',
          category: 'non-repeatable-read',
          correctPosition: 'non-repeatable-read'
        },
        {
          id: 'phantom-read-item',
          content: 'Phantom Read',
          type: 'concept',
          category: 'phantom-read',
          correctPosition: 'phantom-read'
        },
        {
          id: 'lost-update-item',
          content: 'Lost Update',
          type: 'concept',
          category: 'lost-update',
          correctPosition: 'lost-update'
        }
      ],
      explanation: 'Concurrency-Probleme entstehen durch gleichzeitige Transaktionen: Dirty Read (uncommitted Daten), Non-Repeatable Read (verschiedene Werte), Phantom Read (neue Zeilen), und Lost Update (überschriebene Änderungen).',
      hints: [
        'Dirty Read: T1 ändert, T2 liest, T1 rollback',
        'Non-Repeatable Read: Verschiedene Werte bei SELECT',
        'Phantom Read: Neue Zeilen erscheinen',
        'Lost Update: Beide Transaktionen ändern denselben Wert'
      ],
      points: 25,
      difficulty: 'Mittel'
    }
  ];

  useEffect(() => {
    if (currentExercise < exercises.length) {
      setDropZones(exercises[currentExercise].dropZones);
      setAllItems(exercises[currentExercise].allItems);
      setShowResult(false);
      setIsCorrect(null);
      setShowHint(false);
      setTimeLeft(300);
      setIsTimerActive(true);
    }
  }, [currentExercise]);

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

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZoneId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const dropZone = dropZones.find(zone => zone.id === dropZoneId);
    if (!dropZone) return;

    // Check if item can be dropped in this zone
    if (!dropZone.accepts.includes(draggedItem.category)) {
      return;
    }

    // Remove item from all zones first
    const updatedZones = dropZones.map(zone => ({
      ...zone,
      items: zone.items.filter(item => item.id !== draggedItem.id)
    }));

    // Add item to the target zone
    const finalZones = updatedZones.map(zone => 
      zone.id === dropZoneId 
        ? { ...zone, items: [...zone.items, draggedItem] }
        : zone
    );

    setDropZones(finalZones);
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    let correct = 0;
    let total = 0;

    dropZones.forEach(zone => {
      zone.items.forEach(item => {
        total++;
        if (item.correctPosition === zone.id) {
          correct++;
        }
      });
    });

    const isCorrectAnswer = correct === total && total === allItems.length;
    setIsCorrect(isCorrectAnswer);
    setShowResult(true);
    setIsTimerActive(false);

    if (isCorrectAnswer) {
      setScore(score + exercises[currentExercise].points);
    }
  };

  const resetExercise = () => {
    setDropZones(exercises[currentExercise].dropZones);
    setAllItems(exercises[currentExercise].allItems);
    setShowResult(false);
    setIsCorrect(null);
    setShowHint(false);
    setTimeLeft(300);
    setIsTimerActive(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
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

  if (currentExercise >= exercises.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Glückwunsch!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Du hast alle Drag & Drop Übungen erfolgreich abgeschlossen!
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-blue-600">
              Gesamtpunktzahl: {score} Punkte
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentExercise(0);
              setScore(0);
            }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Nochmal spielen
          </button>
        </div>
      </div>
    );
  }

  const currentEx = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-blue-600" />
            Transaktions Drag & Drop
          </h1>
          <div className="flex items-center justify-center gap-6 text-lg text-gray-600">
            <span>Übung {currentExercise + 1} von {exercises.length}</span>
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

        {/* Exercise Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentEx.title}</h2>
          <p className="text-gray-600 mb-4">{currentEx.scenario}</p>
          <p className="text-lg font-medium text-gray-800 mb-4">{currentEx.question}</p>
          
          {showHint && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Hinweis:</h4>
                  <p className="text-yellow-700">{currentEx.hints[0]}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drag and Drop Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Drop Zones */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Zielbereiche</h3>
            {dropZones.map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 min-h-[120px] transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone.id)}
              >
                <h4 className="font-semibold text-gray-800 mb-2">{zone.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{zone.description}</p>
                <div className="min-h-[60px] flex flex-wrap gap-2">
                  {zone.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Available Items */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Verfügbare Elemente</h3>
            <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
              <div className="grid grid-cols-1 gap-3">
                {allItems
                  .filter(item => !dropZones.some(zone => zone.items.some(zoneItem => zoneItem.id === item.id)))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 cursor-move hover:border-blue-400 hover:shadow-md transition-all"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      <div className="font-medium text-gray-800">{item.content}</div>
                      <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            {showHint ? 'Hinweis verstecken' : 'Hinweis anzeigen'}
          </button>
          
          <button
            onClick={resetExercise}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Zurücksetzen
          </button>
          
          <button
            onClick={checkAnswer}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Prüfen
          </button>
        </div>

        {/* Result Modal */}
        {showResult && (
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
                    onClick={resetExercise}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Weiter
                  </button>
                  <button
                    onClick={nextExercise}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    {currentExercise < exercises.length - 1 ? 'Nächste Übung' : 'Beenden'}
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
