import React, { useState, useEffect } from 'react';
import { TreePine, Hash, Layers, Zap, Database, Target, Trophy, CheckCircle, XCircle, RotateCcw, Calculator, Play, Pause } from 'lucide-react';

interface SpecializedExercise {
  id: string;
  title: string;
  description: string;
  type: 'b-tree-insertion' | 'b-tree-deletion' | 'hash-collision' | 'bloom-filter' | 'index-calculation' | 'performance-analysis';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  scenario: string;
  question: string;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  points: number;
  interactive?: boolean;
}

interface BTreeNode {
  id: string;
  keys: number[];
  children?: BTreeNode[];
  isLeaf: boolean;
  parent?: string;
  level: number;
}

export const PhysSpecializedExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [bTreeNodes, setBTreeNodes] = useState<BTreeNode[]>([]);

  const exercises: SpecializedExercise[] = [
    {
      id: 'b-tree-insertion-basic',
      title: 'B+-Baum Einfügung: Grundlagen',
      description: 'Simuliere das Einfügen in einen B+-Baum der Ordnung 2',
      type: 'b-tree-insertion',
      difficulty: 'Einfach',
      scenario: 'Ein B+-Baum der Ordnung 2 (max 2 Schlüssel pro Knoten) hat die Struktur: Wurzel [20], Blätter [10,15] und [25,30].',
      question: 'Füge den Wert 12 ein. Welche Schritte werden ausgeführt?',
      correctAnswer: ['12 wird in Blatt [10,15] eingefügt', 'Blatt wird zu [10,12,15]', 'Split: [10,12] und [15]', 'Wurzel wird zu [12,20]'],
      explanation: 'Da das Blatt [10,15] voll ist, wird es gesplittet. Der mittlere Wert (12) wandert in die Wurzel.',
      hints: ['Prüfe, ob das Zielblatt voll ist', 'Bei Split: mittlerer Wert nach oben', 'Aktualisiere die Wurzel'],
      points: 15,
      interactive: true
    },
    {
      id: 'b-tree-insertion-complex',
      title: 'B+-Baum Einfügung: Komplex',
      description: 'Simuliere das Einfügen mit mehreren Splits',
      type: 'b-tree-insertion',
      difficulty: 'Schwer',
      scenario: 'Ein B+-Baum der Ordnung 2 hat die Struktur: Wurzel [50], Level 1: [20,30] und [60,70], Level 2: [10,15], [25,35], [55,65], [75,80].',
      question: 'Füge den Wert 22 ein. Beschreibe alle Schritte bis zur finalen Struktur.',
      correctAnswer: ['22 wird in Blatt [25,35] eingefügt', 'Blatt wird zu [22,25,35]', 'Split: [22,25] und [35]', 'Elternknoten [20,30] wird zu [20,25,30]', 'Split: [20,25] und [30]', 'Wurzel wird zu [25,50]'],
      explanation: 'Mehrere Splits sind nötig, da sowohl das Blatt als auch der Elternknoten voll sind.',
      hints: ['Verfolge den Pfad von der Wurzel', 'Prüfe jeden Knoten auf Vollständigkeit', 'Split kann sich nach oben fortsetzen'],
      points: 25,
      interactive: true
    },
    {
      id: 'b-tree-deletion',
      title: 'B+-Baum Löschung',
      description: 'Simuliere das Löschen aus einem B+-Baum',
      type: 'b-tree-deletion',
      difficulty: 'Schwer',
      scenario: 'Ein B+-Baum der Ordnung 2 hat die Struktur: Wurzel [20], Blätter [10,15] und [25,30].',
      question: 'Lösche den Wert 15. Welche Schritte werden ausgeführt?',
      correctAnswer: ['15 wird aus Blatt [10,15] entfernt', 'Blatt wird zu [10]', 'Merge mit Nachbarblatt [25,30]', 'Ergebnis: [10,25,30]'],
      explanation: 'Nach dem Löschen muss das Blatt mit einem Nachbarn zusammengeführt werden, um die Mindestanzahl von Schlüsseln zu gewährleisten.',
      hints: ['Prüfe Mindestanzahl von Schlüsseln', 'Merge mit Nachbarblatt', 'Aktualisiere Elternknoten'],
      points: 20,
      interactive: true
    },
    {
      id: 'hash-collision-linear',
      title: 'Hash-Kollision: Lineares Sondieren',
      description: 'Löse Kollisionen mit linearem Sondieren',
      type: 'hash-collision',
      difficulty: 'Mittel',
      scenario: 'Eine Hash-Tabelle mit 7 Slots verwendet h(k) = k mod 7. Füge die Werte 14, 8, 21, 2, 9 ein.',
      question: 'Wo wird jeder Wert gespeichert? Verwende lineares Sondieren für Kollisionen.',
      correctAnswer: {
        '14': 0, '8': 1, '21': 0, '2': 2, '9': 2
      },
      explanation: '14→0, 8→1, 21→0 (Kollision) →1 (Kollision) →2, 2→2 (Kollision) →3, 9→2 (Kollision) →3 (Kollision) →4',
      hints: ['Berechne h(k) = k mod 7', 'Bei Kollision: nächster freier Slot', 'Verwende lineares Sondieren'],
      points: 18
    },
    {
      id: 'hash-collision-quadratic',
      title: 'Hash-Kollision: Quadratisches Sondieren',
      description: 'Löse Kollisionen mit quadratischem Sondieren',
      type: 'hash-collision',
      difficulty: 'Schwer',
      scenario: 'Eine Hash-Tabelle mit 11 Slots verwendet h(k) = k mod 11. Füge die Werte 22, 1, 13, 11, 24 ein.',
      question: 'Wo wird jeder Wert gespeichert? Verwende quadratisches Sondieren: h(k,i) = (h(k) + i²) mod 11',
      correctAnswer: {
        '22': 0, '1': 1, '13': 2, '11': 0, '24': 2
      },
      explanation: '22→0, 1→1, 13→2, 11→0 (Kollision) →1 (Kollision) →4, 24→2 (Kollision) →3 (Kollision) →6',
      hints: ['Berechne h(k) = k mod 11', 'Bei Kollision: h(k,i) = (h(k) + i²) mod 11', 'i = 1, 2, 3, ...'],
      points: 22
    },
    {
      id: 'bloom-filter-analysis',
      title: 'Bloom-Filter Analyse',
      description: 'Analysiere die Eigenschaften eines Bloom-Filters',
      type: 'bloom-filter',
      difficulty: 'Schwer',
      scenario: 'Ein Bloom-Filter mit 10 Bits und 3 Hash-Funktionen wird für 5 Elemente verwendet: {A, B, C, D, E}.',
      question: 'Berechne die Wahrscheinlichkeit für False Positives nach dem Einfügen aller Elemente.',
      correctAnswer: '0.237',
      explanation: 'P(FP) = (1 - e^(-kn/m))^k = (1 - e^(-3*5/10))^3 = (1 - e^(-1.5))^3 ≈ 0.237',
      hints: ['Verwende die Formel: P(FP) = (1 - e^(-kn/m))^k', 'k = 3, n = 5, m = 10', 'e^(-1.5) ≈ 0.223'],
      points: 25
    },
    {
      id: 'index-calculation',
      title: 'Index-Größe berechnen',
      description: 'Berechne die Größe eines B+-Baum Index',
      type: 'index-calculation',
      difficulty: 'Mittel',
      scenario: 'Ein B+-Baum Index auf eine Tabelle mit 1 Million Datensätzen. Jeder Schlüssel ist 8 Bytes, jeder Zeiger 8 Bytes, Ordnung n = 100.',
      question: 'Wie viele Ebenen hat der Index und wie groß ist er?',
      correctAnswer: {
        levels: 3,
        size: '2.4 MB'
      },
      explanation: 'Blätter: 1M/100 = 10K Blätter. Level 1: 10K/100 = 100 Knoten. Level 2: 100/100 = 1 Wurzel. Größe: (10K + 100 + 1) * 100 * 16 Bytes = 2.4 MB',
      hints: ['Berechne Anzahl Blätter: n_datensätze / n_ordnung', 'Berechne Ebenen: log_n(anzahl_blätter)', 'Größe = anzahl_knoten * n * (schlüssel + zeiger)'],
      points: 20
    },
    {
      id: 'performance-analysis',
      title: 'Performance-Analyse',
      description: 'Analysiere die Performance verschiedener Index-Strategien',
      type: 'performance-analysis',
      difficulty: 'Schwer',
      scenario: 'Eine Tabelle mit 10M Datensätzen wird mit verschiedenen Abfragen verwendet: 1) SELECT * WHERE id = 123456, 2) SELECT * WHERE name LIKE "John%"',
      question: 'Welche Index-Strategie ist für beide Abfragen optimal?',
      correctAnswer: 'Primärindex auf id (B+-Baum) + Sekundärindex auf name (B+-Baum)',
      explanation: 'B+-Baum auf id für Gleichheitssuche, B+-Baum auf name für Präfix-Suche. Hash-Index ist für LIKE-Abfragen ungeeignet.',
      hints: ['Analysiere die Abfragemuster', 'Gleichheitssuche vs. Präfix-Suche', 'Wähle passende Index-Typen'],
      points: 25
    }
  ];

  const [currentExerciseData, setCurrentExerciseData] = useState<SpecializedExercise>(exercises[0]);

  useEffect(() => {
    setCurrentExerciseData(exercises[currentExercise]);
    initializeExercise();
  }, [currentExercise]);

  const initializeExercise = () => {
    setUserAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    
    if (currentExerciseData.type === 'b-tree-insertion' || currentExerciseData.type === 'b-tree-deletion') {
      initializeBTree();
    }
  };

  const initializeBTree = () => {
    // Initialize a simple B+-tree structure
    const leaf1: BTreeNode = {
      id: 'leaf1',
      keys: [10, 15],
      isLeaf: true,
      parent: 'root',
      level: 1
    };
    
    const leaf2: BTreeNode = {
      id: 'leaf2',
      keys: [25, 30],
      isLeaf: true,
      parent: 'root',
      level: 1
    };
    
    const root: BTreeNode = {
      id: 'root',
      keys: [20],
      children: [leaf1, leaf2],
      isLeaf: false,
      level: 0
    };
    
    setBTreeNodes([root, leaf1, leaf2]);
  };

  const renderBTree = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">B+-Baum Struktur:</h4>
        <div className="font-mono text-sm">
          {bTreeNodes.map(node => (
            <div key={node.id} className="mb-2">
              <span className="font-bold">{node.id}:</span> [{node.keys.join(', ')}]
              {node.children && (
                <span className="text-gray-600 ml-2">→ {node.children.join(', ')}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHashTable = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Hash-Tabelle (7 Slots):</h4>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="border-2 border-gray-300 p-2 text-center min-h-[40px]">
              <div className="text-xs text-gray-500">Slot {i}</div>
              <div className="font-mono text-sm">
                {userAnswer && userAnswer[i] ? userAnswer[i] : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBloomFilter = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Bloom-Filter (10 Bits):</h4>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className={`border-2 p-2 text-center ${
              userAnswer && userAnswer[i] ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInteractiveExercise = () => {
    switch (currentExerciseData.type) {
      case 'b-tree-insertion':
      case 'b-tree-deletion':
        return renderBTree();
      case 'hash-collision':
        return renderHashTable();
      case 'bloom-filter':
        return renderBloomFilter();
      default:
        return null;
    }
  };

  const renderCalculationExercise = () => {
    if (currentExerciseData.type === 'index-calculation') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="font-semibold text-yellow-800">Berechnung:</p>
            <p className="text-yellow-700 mt-2">
              Verwende die gegebenen Parameter und berechne die Anzahl der Ebenen und die Gesamtgröße des Index.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Anzahl Ebenen:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={userAnswer?.levels || ''}
                onChange={(e) => setUserAnswer(prev => ({ ...prev, levels: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Größe (MB):</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={userAnswer?.size || ''}
                onChange={(e) => setUserAnswer(prev => ({ ...prev, size: e.target.value }))}
                placeholder="z.B. 2.4 MB"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const checkAnswer = () => {
    const exercise = exercises[currentExercise];
    let correct = false;
    
    if (exercise.type === 'b-tree-insertion' || exercise.type === 'b-tree-deletion') {
      // For B+-tree exercises, check if the answer matches the expected steps
      correct = Array.isArray(userAnswer) && 
                userAnswer.length === exercise.correctAnswer.length &&
                userAnswer.every((step, index) => step === exercise.correctAnswer[index]);
    } else if (exercise.type === 'hash-collision') {
      // For hash collision exercises, check the slot assignments
      correct = JSON.stringify(userAnswer) === JSON.stringify(exercise.correctAnswer);
    } else if (exercise.type === 'bloom-filter') {
      // For bloom filter exercises, check the bit pattern
      correct = JSON.stringify(userAnswer) === JSON.stringify(exercise.correctAnswer);
    } else if (exercise.type === 'index-calculation') {
      // For calculation exercises, check the numerical results
      correct = userAnswer?.levels === exercise.correctAnswer.levels && 
                userAnswer?.size === exercise.correctAnswer.size;
    } else if (exercise.type === 'performance-analysis') {
      // For performance analysis, check the strategy selection
      correct = userAnswer === exercise.correctAnswer;
    }
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prev: number) => prev + exercise.points);
      setCompletedExercises((prev: Set<string>) => new Set([...prev, exercise.id]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'b-tree-insertion':
      case 'b-tree-deletion':
        return <TreePine className="w-5 h-5" />;
      case 'hash-collision':
      case 'bloom-filter':
        return <Hash className="w-5 h-5" />;
      case 'index-calculation':
        return <Calculator className="w-5 h-5" />;
      case 'performance-analysis':
        return <Zap className="w-5 h-5" />;
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Spezialisierte Übungen: Physischer Entwurf</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-500" />
              <span className="font-semibold">Punkte: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="text-blue-500" />
              <span className="font-semibold">Übung {currentExercise + 1} von {exercises.length}</span>
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
      </div>

      {/* Current Exercise */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{currentExerciseData.title}</h2>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentExerciseData.difficulty)}`}>
              {currentExerciseData.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 flex items-center">
              {getTypeIcon(currentExerciseData.type)}
              <span className="ml-1">{currentExerciseData.type.replace('-', ' ')}</span>
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

        {/* Interactive Visualization */}
        {currentExerciseData.interactive && renderInteractiveExercise()}

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentExerciseData.question}</h3>
          
          {currentExerciseData.type === 'index-calculation' ? (
            renderCalculationExercise()
          ) : currentExerciseData.type === 'performance-analysis' ? (
            <div className="space-y-3">
              {[
                'Primärindex auf id (Hash) + Sekundärindex auf name (B+-Baum)',
                'Primärindex auf id (B+-Baum) + Sekundärindex auf name (B+-Baum)',
                'Nur Primärindex auf id (B+-Baum)',
                'Hash-Indizes auf beide Attribute'
              ].map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    userAnswer === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="mr-3"
                  />
                  <span className="flex-1">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Beschreibe deine Lösung..."
              value={userAnswer || ''}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          )}
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
            <RotateCcw className="inline w-4 h-4 mr-2" />
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
                <div className="flex items-center space-x-1">
                  {getTypeIcon(exercise.type)}
                  {exercise.interactive && <Play className="w-3 h-3 text-blue-500" />}
                </div>
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
