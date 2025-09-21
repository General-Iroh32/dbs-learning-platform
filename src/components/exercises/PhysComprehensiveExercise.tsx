import React, { useState, useEffect } from 'react';
import { Database, TreePine, Hash, Layers, Zap, Target, Trophy, BookOpen, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface PhysExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  type: 'multiple-choice' | 'drag-drop' | 'calculation' | 'scenario' | 'diagram';
  scenario: string;
  question: string;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  points: number;
  category: 'Indexierung' | 'Speicherstrukturen' | 'Performance' | 'Optimierung' | 'B+-Bäume' | 'Hashing';
}

interface DragItem {
  id: string;
  name: string;
  type: string;
  description: string;
}

export const PhysComprehensiveExercise: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const exercises: PhysExercise[] = [
    // Level 1: Grundkonzepte
    {
      id: 'index-basics',
      title: 'Index-Grundlagen',
      description: 'Verstehe die Grundlagen von Datenbankindizes',
      difficulty: 'Einfach',
      type: 'multiple-choice',
      scenario: 'Eine Tabelle "Studenten" mit 1 Million Datensätzen hat einen Primärschlüssel "Matrikelnummer" und wird häufig nach "Nachname" abgefragt.',
      question: 'Welche Art von Index sollte für "Nachname" erstellt werden?',
      correctAnswer: 1,
      explanation: 'Ein Sekundärindex auf "Nachname" ist optimal, da er häufig abgefragt wird und nicht der Primärschlüssel ist.',
      hints: ['Sekundärindizes werden auf häufig abgefragte Attribute erstellt', 'Primärindizes sind bereits auf Primärschlüsseln vorhanden'],
      points: 10,
      category: 'Indexierung'
    },
    {
      id: 'b-tree-properties',
      title: 'B+-Baum Eigenschaften',
      description: 'Erkenne die wichtigsten Eigenschaften von B+-Bäumen',
      difficulty: 'Einfach',
      type: 'multiple-choice',
      scenario: 'Ein B+-Baum der Ordnung 3 wird für einen Primärindex verwendet.',
      question: 'Welche Aussage über B+-Bäume ist korrekt?',
      correctAnswer: 2,
      explanation: 'B+-Bäume sind selbstausgleichend und alle Blätter sind auf der gleichen Höhe, was konstante Suchzeiten garantiert.',
      hints: ['B+-Bäume sind ausgeglichene Bäume', 'Alle Blätter sind auf gleicher Höhe'],
      points: 10,
      category: 'B+-Bäume'
    },
    {
      id: 'hashing-basics',
      title: 'Hashing Grundlagen',
      description: 'Verstehe die Vor- und Nachteile von Hashing',
      difficulty: 'Einfach',
      type: 'multiple-choice',
      scenario: 'Eine Hash-Tabelle wird für schnelle Gleichheitssuchen verwendet.',
      question: 'Was ist ein Hauptvorteil von Hashing?',
      correctAnswer: 0,
      explanation: 'Hashing bietet konstante Zugriffszeit O(1) für Gleichheitssuchen, ist aber nicht für Bereichsabfragen geeignet.',
      hints: ['Hashing ist sehr schnell für exakte Suche', 'Aber nicht gut für Bereichsabfragen'],
      points: 10,
      category: 'Hashing'
    },

    // Level 2: Anwendungen
    {
      id: 'index-selection',
      title: 'Index-Auswahl',
      description: 'Wähle den richtigen Index für verschiedene Abfragen',
      difficulty: 'Mittel',
      type: 'scenario',
      scenario: 'Eine Tabelle "Bestellungen" mit Spalten (ID, KundeID, Datum, Betrag) wird mit folgenden Abfragen verwendet: 1) SELECT * WHERE KundeID = 123, 2) SELECT * WHERE Datum BETWEEN "2023-01-01" AND "2023-12-31", 3) SELECT * WHERE Betrag > 1000',
      question: 'Welche Indizes würdest du erstellen?',
      correctAnswer: ['KundeID (Hash-Index)', 'Datum (B+-Baum)', 'Betrag (B+-Baum)'],
      explanation: 'KundeID braucht Hash-Index für Gleichheitssuche, Datum und Betrag brauchen B+-Bäume für Bereichsabfragen.',
      hints: ['Gleichheitssuche → Hash-Index', 'Bereichsabfrage → B+-Baum'],
      points: 15,
      category: 'Indexierung'
    },
    {
      id: 'b-tree-insertion',
      title: 'B+-Baum Einfügung',
      description: 'Simuliere das Einfügen in einen B+-Baum',
      difficulty: 'Mittel',
      type: 'calculation',
      scenario: 'Ein B+-Baum der Ordnung 2 hat folgende Struktur: Wurzel [20], Blätter [10,15] und [25,30]. Füge den Wert 12 ein.',
      question: 'Was passiert beim Einfügen von 12?',
      correctAnswer: 'Das Blatt [10,15] wird zu [10,12,15], dann gesplittet zu [10,12] und [15], der Wurzelknoten wird zu [12,20].',
      explanation: 'Da das Blatt [10,15] voll ist (Ordnung 2 = max 2 Schlüssel), wird es gesplittet und der mittlere Wert (12) wandert in den Elternknoten.',
      hints: ['Prüfe, ob das Blatt voll ist', 'Bei Split: mittlerer Wert nach oben'],
      points: 20,
      category: 'B+-Bäume'
    },
    {
      id: 'clustering-benefits',
      title: 'Clustering Vorteile',
      description: 'Verstehe die Vorteile von Clustering',
      difficulty: 'Mittel',
      type: 'multiple-choice',
      scenario: 'Eine Tabelle "Artikel" wird häufig nach "Kategorie" gruppiert abgefragt.',
      question: 'Welche Clustering-Strategie wäre am besten?',
      correctAnswer: 2,
      explanation: 'Clustering nach "Kategorie" gruppiert verwandte Artikel physisch zusammen, was I/O-Operationen reduziert.',
      hints: ['Clustering gruppiert verwandte Daten', 'Wähle das Attribut, nach dem häufig gruppiert wird'],
      points: 15,
      category: 'Optimierung'
    },

    // Level 3: Performance
    {
      id: 'query-optimization',
      title: 'Query Optimization',
      description: 'Optimiere eine komplexe Abfrage',
      difficulty: 'Schwer',
      type: 'scenario',
      scenario: 'SELECT s.Name, k.Titel FROM Studenten s JOIN Kurse k ON s.KursID = k.ID WHERE s.Semester = 3 AND k.ECTS > 5',
      question: 'Welche Indizes würdest du für optimale Performance erstellen?',
      correctAnswer: ['Studenten.Semester (B+-Baum)', 'Kurse.ECTS (B+-Baum)', 'Studenten.KursID (Hash-Index)'],
      explanation: 'Semester und ECTS für WHERE-Klauseln, KursID für JOIN-Operation. B+-Bäume für Bereichsabfragen, Hash für Gleichheit.',
      hints: ['Analysiere WHERE-Klauseln', 'Berücksichtige JOIN-Bedingungen', 'Wähle passende Index-Typen'],
      points: 25,
      category: 'Performance'
    },
    {
      id: 'partitioning-strategy',
      title: 'Partitionierungsstrategie',
      description: 'Wähle die richtige Partitionierungsstrategie',
      difficulty: 'Schwer',
      type: 'multiple-choice',
      scenario: 'Eine Tabelle "Logs" mit 100 Millionen Einträgen wird hauptsächlich nach Datum abgefragt und alte Daten werden regelmäßig archiviert.',
      question: 'Welche Partitionierungsstrategie ist optimal?',
      correctAnswer: 1,
      explanation: 'Zeitbasierte Partitionierung nach Datum ist optimal, da Abfragen meist nach Zeiträumen erfolgen und alte Daten einfach archiviert werden können.',
      hints: ['Analysiere die Abfragemuster', 'Berücksichtige Wartungsanforderungen'],
      points: 20,
      category: 'Optimierung'
    },
    {
      id: 'buffer-management',
      title: 'Buffer Management',
      description: 'Verstehe Buffer Management Strategien',
      difficulty: 'Schwer',
      type: 'multiple-choice',
      scenario: 'Ein Datenbanksystem hat begrenzten Hauptspeicher und muss entscheiden, welche Seiten im Buffer gehalten werden.',
      question: 'Welche Strategie ist für einen OLTP-Workload am besten?',
      correctAnswer: 2,
      explanation: 'LRU (Least Recently Used) ist für OLTP optimal, da häufig verwendete Seiten im Buffer bleiben und selten verwendete ausgelagert werden.',
      hints: ['OLTP = viele kleine Transaktionen', 'LRU behält häufig verwendete Daten'],
      points: 20,
      category: 'Performance'
    },

    // Level 4: Spezialisierte Konzepte
    {
      id: 'composite-index',
      title: 'Zusammengesetzte Indizes',
      description: 'Optimiere Abfragen mit zusammengesetzten Indizes',
      difficulty: 'Schwer',
      type: 'scenario',
      scenario: 'Eine Tabelle "Bestellungen" wird mit folgenden Abfragen verwendet: 1) WHERE KundeID = 123 AND Datum > "2023-01-01", 2) WHERE Datum BETWEEN "2023-01-01" AND "2023-12-31"',
      question: 'Welcher zusammengesetzte Index ist optimal?',
      correctAnswer: '(KundeID, Datum)',
      explanation: 'Der Index (KundeID, Datum) kann beide Abfragen effizient unterstützen, da KundeID als führender Schlüssel fungiert.',
      hints: ['Führender Schlüssel ist wichtig', 'Wähle das selektivste Attribut zuerst'],
      points: 25,
      category: 'Indexierung'
    },
    {
      id: 'bloom-filter',
      title: 'Bloom-Filter Anwendung',
      description: 'Verstehe den Einsatz von Bloom-Filtern',
      difficulty: 'Schwer',
      type: 'multiple-choice',
      scenario: 'Ein System muss schnell prüfen, ob ein Benutzername bereits existiert, bevor eine teure Datenbankabfrage durchgeführt wird.',
      question: 'Welche Datenstruktur ist hier optimal?',
      correctAnswer: 2,
      explanation: 'Bloom-Filter bieten schnelle Existenzprüfung mit möglichen False Positives, aber nie False Negatives - perfekt für diese Anwendung.',
      hints: ['Bloom-Filter sind probabilistisch', 'Gut für Existenzprüfung', 'Kann False Positives haben'],
      points: 20,
      category: 'Hashing'
    }
  ];

  const [currentExerciseData, setCurrentExerciseData] = useState<PhysExercise>(exercises[0]);
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [dropZones, setDropZones] = useState<{ [key: string]: DragItem[] }>({
    'indexes': [],
    'structures': [],
    'optimizations': []
  });

  useEffect(() => {
    setCurrentExerciseData(exercises[currentExercise]);
    initializeExercise();
  }, [currentExercise]);

  const initializeExercise = () => {
    const exercise = exercises[currentExercise];
    
    if (exercise.type === 'drag-drop') {
      const allItems: DragItem[] = [
        { id: 'primary-index', name: 'Primärindex', type: 'index', description: 'Index auf Primärschlüssel' },
        { id: 'secondary-index', name: 'Sekundärindex', type: 'index', description: 'Index auf andere Attribute' },
        { id: 'b-tree', name: 'B+-Baum', type: 'structure', description: 'Ausgeglichener Baum' },
        { id: 'hash-table', name: 'Hash-Tabelle', type: 'structure', description: 'Direkte Adressierung' },
        { id: 'clustering', name: 'Clustering', type: 'optimization', description: 'Physikalische Gruppierung' },
        { id: 'partitioning', name: 'Partitionierung', type: 'optimization', description: 'Aufteilung großer Tabellen' }
      ];
      
      setDragItems(allItems.sort(() => Math.random() - 0.5));
    }
    
    setDropZones({ indexes: [], structures: [], optimizations: [] });
    setUserAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswer(answerIndex);
  };

  const checkAnswer = () => {
    const exercise = exercises[currentExercise];
    let correct = false;
    
    if (exercise.type === 'multiple-choice') {
      correct = userAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'scenario') {
      // For scenario questions, we'll implement specific logic
      correct = true; // Placeholder
    }
    
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      setScore(prev => prev + exercise.points);
      setCompletedExercises(prev => new Set([...prev, exercise.id]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const resetExercise = () => {
    initializeExercise();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Indexierung': return 'text-blue-600 bg-blue-100';
      case 'Speicherstrukturen': return 'text-purple-600 bg-purple-100';
      case 'Performance': return 'text-orange-600 bg-orange-100';
      case 'Optimierung': return 'text-pink-600 bg-pink-100';
      case 'B+-Bäume': return 'text-green-600 bg-green-100';
      case 'Hashing': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderMultipleChoice = () => {
    const options = [
      'Hash-Index auf Nachname',
      'Sekundärindex auf Nachname',
      'Clustered Index auf Nachname',
      'Kein Index nötig'
    ];

    return (
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              userAnswer === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={index}
              checked={userAnswer === index}
              onChange={() => handleAnswerSelect(index)}
              className="mr-3"
            />
            <span className="flex-1">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  const renderScenario = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="font-semibold text-yellow-800">Lösung:</p>
          <p className="text-yellow-700 mt-2">
            Analysiere die Abfragemuster und wähle die passenden Index-Typen aus.
            Überlege dir, welche Attribute für Gleichheitssuche und welche für Bereichsabfragen verwendet werden.
          </p>
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="Beschreibe deine Index-Strategie..."
          value={userAnswer || ''}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      </div>
    );
  };

  const renderExercise = () => {
    switch (currentExerciseData.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'scenario':
        return renderScenario();
      default:
        return <div>Übungstyp wird noch implementiert...</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Physischer Entwurf: Umfassende Übungen</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-500" />
              <span className="font-semibold">Punkte: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="text-blue-500" />
              <span className="font-semibold">Level {currentLevel}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Übung {currentExercise + 1} von {exercises.length}</span>
          <span>{Math.round(((currentExercise + 1) / exercises.length) * 100)}% abgeschlossen</span>
        </div>
      </div>

      {/* Current Exercise */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{currentExerciseData.title}</h2>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentExerciseData.difficulty)}`}>
              {currentExerciseData.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentExerciseData.category)}`}>
              {currentExerciseData.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{currentExerciseData.description}</p>
        <p className="text-sm text-gray-500 mb-6">Wert: {currentExerciseData.points} Punkte</p>

        {/* Scenario */}
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 mb-6">
          <p className="font-bold text-blue-800 mb-2">Szenario:</p>
          <p className="text-blue-700">{currentExerciseData.scenario}</p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentExerciseData.question}</h3>
          {renderExercise()}
        </div>

        {/* Hint Button */}
        {!showHint && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowHint(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              💡 Tipp anzeigen
            </button>
          </div>
        )}

        {showHint && (
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-800 mb-2">Tipp:</h4>
            <p className="text-yellow-700">{currentExerciseData.hints[0]}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={checkAnswer}
            disabled={isCorrect !== null}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {isCorrect === null ? 'Antwort prüfen' : 'Bereits geprüft'}
          </button>
          
          <button
            onClick={resetExercise}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            <RefreshCw className="inline w-4 h-4 mr-2" />
            Zurücksetzen
          </button>
        </div>

        {/* Result */}
        {isCorrect !== null && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center">
                {isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                <span className="font-semibold">
                  {isCorrect ? 'Richtig!' : 'Falsch!'}
                </span>
              </div>
              <p className="mt-2">{currentExerciseData.explanation}</p>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={nextExercise}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {currentExercise < exercises.length - 1 ? 'Nächste Übung' : 'Alle Übungen abgeschlossen!'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercise List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Übungsübersicht</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                index === currentExercise 
                  ? 'border-blue-500 bg-blue-50' 
                  : completedExercises.has(exercise.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCurrentExercise(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{exercise.title}</span>
                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{exercise.points} Punkte</span>
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(exercise.category)}`}>
                  {exercise.category}
                </span>
              </div>
              {completedExercises.has(exercise.id) && (
                <div className="mt-2 text-center">
                  <CheckCircle className="text-green-500 mx-auto" size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

