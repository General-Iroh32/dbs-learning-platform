import React, { useState } from 'react';
import { CheckCircle, XCircle, Target, Database, TreePine, Hash, Layers, Zap } from 'lucide-react';

interface PhysPracticeExercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: 'Indexierung' | 'Speicherstrukturen' | 'Performance' | 'Optimierung' | 'B+-Bäume' | 'Hashing';
  points: number;
}

export const PhysPraxisExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const exercises: PhysPracticeExercise[] = [
    {
      id: 'index-selection-1',
      title: 'Index-Auswahl für E-Commerce',
      description: 'Wähle den optimalen Index für eine Online-Shop Datenbank',
      scenario: 'Ein Online-Shop hat eine Tabelle "Produkte" mit 1 Million Einträgen. Die häufigsten Abfragen sind: 1) Suche nach Produktname (LIKE "%keyword%"), 2) Filter nach Kategorie, 3) Sortierung nach Preis, 4) Suche nach Produkt-ID.',
      question: 'Welche Indizes würdest du für optimale Performance erstellen?',
      options: [
        'Nur Primärindex auf Produkt-ID',
        'Primärindex + B+-Baum auf Kategorie + Hash-Index auf Produktname',
        'Primärindex + B+-Baum auf Preis + B+-Baum auf Kategorie + Volltextindex auf Produktname',
        'Alle Spalten indizieren'
      ],
      correctAnswer: 2,
      explanation: 'B+-Bäume auf Preis und Kategorie für Sortierung/Filterung, Volltextindex auf Produktname für LIKE-Abfragen. Hash-Index ist für LIKE-Abfragen ungeeignet.',
      difficulty: 'Mittel',
      category: 'Indexierung',
      points: 15
    },
    {
      id: 'b-tree-insertion',
      title: 'B+-Baum Einfügung simulieren',
      description: 'Simuliere das Einfügen in einen B+-Baum',
      scenario: 'Ein B+-Baum der Ordnung 2 (max 2 Schlüssel pro Knoten) hat die Struktur: Wurzel [50], Blätter [10,20] und [60,70,80]. Füge den Wert 25 ein.',
      question: 'Was passiert beim Einfügen von 25?',
      options: [
        '25 wird einfach in das Blatt [10,20] eingefügt',
        'Das Blatt [10,20] wird gesplittet zu [10] und [20,25], Wurzel wird [20,50]',
        'Das Blatt [60,70,80] wird gesplittet, da es voll ist',
        'Der gesamte Baum wird neu aufgebaut'
      ],
      correctAnswer: 1,
      explanation: 'Da das Blatt [10,20] voll ist (Ordnung 2), wird es gesplittet. Der mittlere Wert (20) wandert in die Wurzel, die zu [20,50] wird.',
      difficulty: 'Mittel',
      category: 'B+-Bäume',
      points: 20
    },
    {
      id: 'hashing-vs-btree',
      title: 'Hashing vs. B+-Baum',
      description: 'Wähle die richtige Datenstruktur für verschiedene Anwendungen',
      scenario: 'Ein Datenbanksystem muss verschiedene Abfragemuster unterstützen: 1) Exakte Suche nach Benutzer-ID, 2) Bereichsabfrage nach Zeitstempel, 3) Sortierung nach Name, 4) Gleichheitssuche nach E-Mail.',
      question: 'Welche Kombination von Datenstrukturen ist optimal?',
      options: [
        'Hash-Tabellen für alle Attribute',
        'B+-Bäume für alle Attribute',
        'Hash-Tabellen für ID und E-Mail, B+-Bäume für Zeitstempel und Name',
        'Nur Primärindex verwenden'
      ],
      correctAnswer: 2,
      explanation: 'Hash-Tabellen für Gleichheitssuche (ID, E-Mail), B+-Bäume für Bereichsabfragen und Sortierung (Zeitstempel, Name).',
      difficulty: 'Einfach',
      category: 'Speicherstrukturen',
      points: 12
    },
    {
      id: 'clustering-strategy',
      title: 'Clustering-Strategie für Analytics',
      description: 'Optimiere eine Tabelle für analytische Abfragen',
      scenario: 'Eine Tabelle "Verkäufe" mit 100 Millionen Einträgen wird hauptsächlich für analytische Abfragen verwendet. Die häufigsten Abfragen gruppieren nach Region und Zeitraum.',
      question: 'Welche Clustering-Strategie ist optimal?',
      options: [
        'Clustering nach Verkaufs-ID (Primärschlüssel)',
        'Clustering nach Region, dann nach Datum',
        'Kein Clustering, nur Indizes verwenden',
        'Clustering nach Verkaufsbetrag'
      ],
      correctAnswer: 1,
      explanation: 'Clustering nach Region und Datum gruppiert verwandte Daten physisch zusammen, was I/O-Operationen für analytische Abfragen minimiert.',
      difficulty: 'Mittel',
      category: 'Optimierung',
      points: 18
    },
    {
      id: 'partitioning-strategy',
      title: 'Partitionierungsstrategie',
      description: 'Wähle die richtige Partitionierungsstrategie',
      scenario: 'Eine Tabelle "Logs" mit 500 Millionen Einträgen wird täglich um 1 Million neue Einträge erweitert. Alte Logs (älter als 1 Jahr) werden archiviert. Abfragen erfolgen meist nach Zeiträumen.',
      question: 'Welche Partitionierungsstrategie ist optimal?',
      options: [
        'Horizontale Partitionierung nach Log-Level',
        'Zeitbasierte Partitionierung nach Monat',
        'Hash-basierte Partitionierung nach Log-ID',
        'Keine Partitionierung nötig'
      ],
      correctAnswer: 1,
      explanation: 'Zeitbasierte Partitionierung nach Monat ermöglicht effiziente Abfragen nach Zeiträumen und einfache Archivierung alter Daten.',
      difficulty: 'Mittel',
      category: 'Optimierung',
      points: 16
    },
    {
      id: 'composite-index',
      title: 'Zusammengesetzte Indizes',
      description: 'Optimiere Abfragen mit zusammengesetzten Indizes',
      scenario: 'Eine Tabelle "Bestellungen" wird mit folgenden Abfragen verwendet: 1) WHERE KundeID = 123 AND Status = "versendet", 2) WHERE Datum BETWEEN "2023-01-01" AND "2023-12-31" AND Status = "versendet", 3) WHERE KundeID = 123 ORDER BY Datum DESC',
      question: 'Welche zusammengesetzten Indizes würdest du erstellen?',
      options: [
        '(KundeID, Status) und (Datum, Status)',
        '(Status, KundeID) und (Status, Datum)',
        '(KundeID, Datum, Status) und (Datum, Status)',
        'Nur einzelne Indizes auf KundeID, Datum und Status'
      ],
      correctAnswer: 0,
      explanation: '(KundeID, Status) für Abfrage 1, (Datum, Status) für Abfrage 2. Die Reihenfolge ist wichtig: selektivste Attribute zuerst.',
      difficulty: 'Schwer',
      category: 'Indexierung',
      points: 22
    },
    {
      id: 'buffer-management',
      title: 'Buffer Management',
      description: 'Verstehe Buffer Management Strategien',
      scenario: 'Ein OLTP-System mit vielen kleinen Transaktionen hat begrenzten Hauptspeicher. Die Datenbank muss entscheiden, welche Seiten im Buffer gehalten werden.',
      question: 'Welche Buffer Management Strategie ist optimal?',
      options: [
        'FIFO (First In, First Out)',
        'LRU (Least Recently Used)',
        'LFU (Least Frequently Used)',
        'Zufällige Auswahl'
      ],
      correctAnswer: 1,
      explanation: 'LRU ist für OLTP optimal, da häufig verwendete Seiten im Buffer bleiben und selten verwendete ausgelagert werden.',
      difficulty: 'Mittel',
      category: 'Performance',
      points: 14
    },
    {
      id: 'query-optimization',
      title: 'Query Optimization',
      description: 'Optimiere eine komplexe JOIN-Abfrage',
      scenario: 'SELECT s.Name, k.Titel, b.Note FROM Studenten s JOIN Kurse k ON s.KursID = k.ID JOIN Belegungen b ON s.ID = b.StudentID AND k.ID = b.KursID WHERE s.Semester = 3 AND k.ECTS > 5 ORDER BY b.Note DESC',
      question: 'Welche Indizes würdest du für optimale Performance erstellen?',
      options: [
        'Nur Primärindizes auf ID-Spalten',
        'Studenten.Semester, Kurse.ECTS, Belegungen.Note (alle B+-Bäume)',
        'Studenten.KursID (Hash), Kurse.ECTS (B+-Baum), Belegungen.(StudentID, KursID) (zusammengesetzt)',
        'Alle Spalten indizieren'
      ],
      correctAnswer: 2,
      explanation: 'Hash-Index für Gleichheitssuche (KursID), B+-Baum für Bereichsabfrage (ECTS), zusammengesetzter Index für JOIN-Bedingung und Sortierung.',
      difficulty: 'Schwer',
      category: 'Performance',
      points: 25
    },
    {
      id: 'bloom-filter',
      title: 'Bloom-Filter Anwendung',
      description: 'Verstehe den praktischen Einsatz von Bloom-Filtern',
      scenario: 'Ein System muss vor einer teuren Datenbankabfrage prüfen, ob ein Benutzername bereits existiert. False Positives sind akzeptabel, False Negatives nicht.',
      question: 'Welche Datenstruktur ist hier optimal?',
      options: [
        'Hash-Tabelle mit allen Benutzernamen',
        'B+-Baum mit allen Benutzernamen',
        'Bloom-Filter mit Benutzernamen',
        'Normale Tabelle mit Index'
      ],
      correctAnswer: 2,
      explanation: 'Bloom-Filter bieten schnelle Existenzprüfung mit möglichen False Positives, aber nie False Negatives - perfekt für diese Anwendung.',
      difficulty: 'Schwer',
      category: 'Hashing',
      points: 20
    },
    {
      id: 'index-maintenance',
      title: 'Index-Wartung',
      description: 'Verstehe die Auswirkungen von Index-Wartung',
      scenario: 'Eine Tabelle mit 10 Millionen Datensätzen hat 15 verschiedene Indizes. Jeden Tag werden 100.000 neue Datensätze eingefügt und 50.000 gelöscht.',
      question: 'Welche Strategie ist für die Index-Wartung optimal?',
      options: [
        'Alle Indizes sofort aktualisieren',
        'Indizes nur bei Bedarf aktualisieren',
        'Batch-Updates für Indizes verwenden',
        'Indizes deaktivieren und nur nachts aktualisieren'
      ],
      correctAnswer: 2,
      explanation: 'Batch-Updates reduzieren die Anzahl der Index-Updates und verbessern die Performance bei hohem Datenvolumen.',
      difficulty: 'Mittel',
      category: 'Performance',
      points: 16
    },
    {
      id: 'storage-optimization',
      title: 'Speicher-Optimierung',
      description: 'Optimiere die Speichernutzung einer Datenbank',
      scenario: 'Eine Datenbank mit 1 TB Daten hat 200 GB freien Speicherplatz. Die Performance ist langsam, besonders bei analytischen Abfragen.',
      question: 'Welche Optimierungsstrategie ist am effektivsten?',
      options: [
        'Mehr Indizes erstellen',
        'Tabellen komprimieren',
        'Partitionierung implementieren',
        'Buffer-Größe erhöhen'
      ],
      correctAnswer: 1,
      explanation: 'Tabellenkomprimierung reduziert I/O-Operationen und verbessert die Cache-Effizienz, besonders bei analytischen Workloads.',
      difficulty: 'Mittel',
      category: 'Optimierung',
      points: 18
    },
    {
      id: 'concurrent-access',
      title: 'Concurrent Access',
      description: 'Optimiere für gleichzeitige Zugriffe',
      scenario: 'Ein System mit 1000 gleichzeitigen Benutzern hat Performance-Probleme bei Schreiboperationen. Die Indizes werden häufig aktualisiert.',
      question: 'Welche Optimierung ist am wichtigsten?',
      options: [
        'Mehr Indizes erstellen',
        'Index-Update-Strategien optimieren',
        'Tabellen partitionieren',
        'Buffer-Größe reduzieren'
      ],
      correctAnswer: 1,
      explanation: 'Optimierung der Index-Update-Strategien reduziert Locks und verbessert die Concurrent-Performance bei vielen Schreiboperationen.',
      difficulty: 'Schwer',
      category: 'Performance',
      points: 20
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    const exercise = exercises[currentExercise];
    const isCorrect = selectedAnswer === exercise.correctAnswer;
    
    setShowResult(true);
    
    if (isCorrect && !completedExercises.has(currentExercise)) {
      setScore(prev => prev + exercise.points);
      setCompletedExercises(prev => new Set([...prev, currentExercise]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setShowResult(false);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Indexierung': return <TreePine className="w-4 h-4" />;
      case 'Speicherstrukturen': return <Database className="w-4 h-4" />;
      case 'Performance': return <Zap className="w-4 h-4" />;
      case 'Optimierung': return <Layers className="w-4 h-4" />;
      case 'B+-Bäume': return <TreePine className="w-4 h-4" />;
      case 'Hashing': return <Hash className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Physischer Entwurf: Praxisfälle</h1>
        <p className="text-gray-600">Löse realistische Probleme des physischen Datenbankentwurfs</p>
      </div>

      {/* Progress and Score */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="text-blue-500" />
            <span className="font-semibold">Übung {currentExercise + 1} von {exercises.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <span className="font-semibold">Punkte: {score}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(((currentExercise + 1) / exercises.length) * 100)}% abgeschlossen
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
        ></div>
      </div>

      {/* Current Exercise */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{currentExerciseData.title}</h2>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentExerciseData.difficulty)}`}>
              {currentExerciseData.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentExerciseData.category)} flex items-center`}>
              {getCategoryIcon(currentExerciseData.category)}
              <span className="ml-1">{currentExerciseData.category}</span>
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
          
          <div className="space-y-3">
            {currentExerciseData.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="mr-3"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <button
              onClick={previousExercise}
              disabled={currentExercise === 0}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-semibold"
            >
              ← Zurück
            </button>
            <button
              onClick={resetExercise}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Zurücksetzen
            </button>
          </div>
          
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null || showResult}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {showResult ? 'Bereits geprüft' : 'Antwort prüfen'}
          </button>
        </div>

        {/* Result */}
        {showResult && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentExerciseData.correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center mb-2">
                {selectedAnswer === currentExerciseData.correctAnswer ? 
                  <CheckCircle className="mr-2" /> : 
                  <XCircle className="mr-2" />
                }
                <span className="font-semibold">
                  {selectedAnswer === currentExerciseData.correctAnswer ? 'Richtig!' : 'Falsch!'}
                </span>
              </div>
              <p>{currentExerciseData.explanation}</p>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={nextExercise}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {currentExercise < exercises.length - 1 ? 'Nächste Übung →' : 'Alle Übungen abgeschlossen!'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Übungsübersicht</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                index === currentExercise 
                  ? 'border-blue-500 bg-blue-50' 
                  : completedExercises.has(index)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setCurrentExercise(index);
                setSelectedAnswer(null);
                setShowResult(false);
              }}
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
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(exercise.category)} flex items-center`}>
                  {getCategoryIcon(exercise.category)}
                  <span className="ml-1">{exercise.category}</span>
                </span>
              </div>
              {completedExercises.has(index) && (
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
