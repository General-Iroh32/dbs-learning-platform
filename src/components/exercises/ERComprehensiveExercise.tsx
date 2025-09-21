import React, { useState, useEffect } from 'react';
import { Box, List, Link, Key, Users, GitBranch, RefreshCw, Network, CheckCircle, XCircle, ArrowRight, Trophy, BookOpen, Target } from 'lucide-react';

interface ERExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  type: 'drag-drop' | 'cardinality' | 'diagram-creation' | 'relationship-mapping' | 'weak-entities' | 'isa-relationships';
  scenario: string;
  question: string;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  points: number;
}

interface DragDropItem {
  name: string;
  type: 'entity' | 'attribute' | 'relationship';
  isKey?: boolean;
  isMultiValued?: boolean;
  isComposite?: boolean;
  isDerived?: boolean;
}

interface CardinalityQuestion {
  entity1: string;
  entity2: string;
  relationship: string;
  correctCardinality: {
    entity1: string;
    entity2: string;
  };
  explanation: string;
}

export const ERComprehensiveExercise: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const exercises: ERExercise[] = [
    // Level 1: Grundkonzepte
    {
      id: 'basic-entities',
      title: 'Entitätstypen erkennen',
      description: 'Erkenne Entitätstypen in einem Szenario',
      difficulty: 'Einfach',
      type: 'drag-drop',
      scenario: 'Eine Universität hat Studenten, die Kurse belegen. Professoren halten Vorlesungen in verschiedenen Räumen.',
      question: 'Welche der folgenden Begriffe sind Entitätstypen?',
      correctAnswer: ['Student', 'Kurs', 'Professor', 'Raum'],
      explanation: 'Entitätstypen sind Substantive, die Objekte der realen Welt repräsentieren. "Student", "Kurs", "Professor" und "Raum" sind alle Entitätstypen.',
      hints: ['Entitätstypen sind meist Substantive', 'Sie repräsentieren Objekte, nicht Eigenschaften'],
      points: 10
    },
    {
      id: 'basic-attributes',
      title: 'Attribute identifizieren',
      description: 'Unterscheide Attribute von Entitätstypen',
      difficulty: 'Einfach',
      type: 'drag-drop',
      scenario: 'Ein Student hat eine Matrikelnummer, einen Namen und ein Geburtsdatum. Ein Kurs hat einen Titel und ECTS-Punkte.',
      question: 'Welche der folgenden Begriffe sind Attribute?',
      correctAnswer: ['Matrikelnummer', 'Name', 'Geburtsdatum', 'Titel', 'ECTS-Punkte'],
      explanation: 'Attribute beschreiben Eigenschaften von Entitätstypen. Sie sind meist Adjektive oder beschreibende Substantive.',
      hints: ['Attribute beschreiben Eigenschaften', 'Sie gehören zu Entitätstypen'],
      points: 10
    },
    {
      id: 'basic-relationships',
      title: 'Beziehungstypen erkennen',
      description: 'Erkenne Beziehungstypen zwischen Entitätstypen',
      difficulty: 'Einfach',
      type: 'drag-drop',
      scenario: 'Studenten belegen Kurse. Professoren halten Vorlesungen. Studenten wohnen in Wohnheimen.',
      question: 'Welche der folgenden Begriffe sind Beziehungstypen?',
      correctAnswer: ['belegt', 'hält', 'wohnt'],
      explanation: 'Beziehungstypen sind meist Verben, die eine Verbindung zwischen Entitätstypen beschreiben.',
      hints: ['Beziehungstypen sind meist Verben', 'Sie verbinden Entitätstypen'],
      points: 10
    },

    // Level 2: Kardinalitäten
    {
      id: 'cardinality-1-1',
      title: '1:1 Beziehungen',
      description: 'Bestimme die Kardinalität einer 1:1 Beziehung',
      difficulty: 'Einfach',
      type: 'cardinality',
      scenario: 'Jeder Student hat genau einen Studentenausweis. Jeder Studentenausweis gehört zu genau einem Studenten.',
      question: 'Wie ist die Kardinalität zwischen Student und Studentenausweis?',
      correctAnswer: { entity1: '1', entity2: '1' },
      explanation: '1:1 Beziehung bedeutet: Jeder Student hat höchstens einen Studentenausweis und jeder Studentenausweis gehört zu höchstens einem Studenten.',
      hints: ['"genau einen" deutet auf 1:1 hin', 'Beide Seiten haben die Kardinalität 1'],
      points: 15
    },
    {
      id: 'cardinality-1-n',
      title: '1:N Beziehungen',
      description: 'Bestimme die Kardinalität einer 1:N Beziehung',
      difficulty: 'Einfach',
      type: 'cardinality',
      scenario: 'Ein Professor kann mehrere Kurse halten. Jeder Kurs wird von genau einem Professor gehalten.',
      question: 'Wie ist die Kardinalität zwischen Professor und Kurs?',
      correctAnswer: { entity1: '1', entity2: 'N' },
      explanation: '1:N Beziehung bedeutet: Ein Professor kann mehrere Kurse halten (N), aber jeder Kurs wird von höchstens einem Professor gehalten (1).',
      hints: ['"mehrere" deutet auf N hin', '"genau einem" deutet auf 1 hin'],
      points: 15
    },
    {
      id: 'cardinality-n-m',
      title: 'N:M Beziehungen',
      description: 'Bestimme die Kardinalität einer N:M Beziehung',
      difficulty: 'Mittel',
      type: 'cardinality',
      scenario: 'Studenten können mehrere Kurse belegen. Kurse können von mehreren Studenten belegt werden.',
      question: 'Wie ist die Kardinalität zwischen Student und Kurs?',
      correctAnswer: { entity1: 'N', entity2: 'M' },
      explanation: 'N:M Beziehung bedeutet: Ein Student kann mehrere Kurse belegen (N) und ein Kurs kann von mehreren Studenten belegt werden (M).',
      hints: ['Beide Seiten können "mehrere" haben', 'Das ist die häufigste Beziehungsart'],
      points: 20
    },

  ];

  const [currentExerciseData, setCurrentExerciseData] = useState<ERExercise>(exercises[0]);
  const [dragDropItems, setDragDropItems] = useState<DragDropItem[]>([]);
  const [dropZones, setDropZones] = useState<{ [key: string]: DragDropItem[] }>({
    entity: [],
    attribute: [],
    relationship: []
  });

  useEffect(() => {
    setCurrentExerciseData(exercises[currentExercise]);
    initializeExercise();
  }, [currentExercise]);

  const initializeExercise = () => {
    const exercise = exercises[currentExercise];
    
    if (exercise.type === 'drag-drop') {
      const allItems: DragDropItem[] = [
        { name: 'Student', type: 'entity' },
        { name: 'Kurs', type: 'entity' },
        { name: 'Professor', type: 'entity' },
        { name: 'Raum', type: 'entity' },
        { name: 'Matrikelnummer', type: 'attribute', isKey: true },
        { name: 'Name', type: 'attribute' },
        { name: 'Geburtsdatum', type: 'attribute' },
        { name: 'Titel', type: 'attribute' },
        { name: 'ECTS-Punkte', type: 'attribute' },
        { name: 'belegt', type: 'relationship' },
        { name: 'hält', type: 'relationship' },
        { name: 'wohnt', type: 'relationship' },
        { name: 'Prüfung', type: 'entity' },
        { name: 'Prüfungsnummer', type: 'attribute', isKey: true },
        { name: 'Note', type: 'attribute' }
      ];
      
      // Filter items based on exercise
      let filteredItems: DragDropItem[] = [];
      if (exercise.id === 'basic-entities') {
        filteredItems = allItems.filter(item => 
          ['Student', 'Kurs', 'Professor', 'Raum', 'Matrikelnummer', 'Name', 'Titel', 'ECTS-Punkte', 'belegt', 'hält'].includes(item.name)
        );
      } else if (exercise.id === 'basic-attributes') {
        filteredItems = allItems.filter(item => 
          ['Student', 'Kurs', 'Matrikelnummer', 'Name', 'Geburtsdatum', 'Titel', 'ECTS-Punkte', 'belegt', 'hält'].includes(item.name)
        );
      } else if (exercise.id === 'basic-relationships') {
        filteredItems = allItems.filter(item => 
          ['Student', 'Kurs', 'Professor', 'belegt', 'hält', 'wohnt', 'Matrikelnummer', 'Name'].includes(item.name)
        );
      }
      
      setDragDropItems(filteredItems.sort(() => Math.random() - 0.5));
    }
    
    setDropZones({ entity: [], attribute: [], relationship: [] });
    setUserAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('text/plain');
    
    try {
      const item: DragDropItem = JSON.parse(itemData);
      
      // Check if item is already in a drop zone
      const isAlreadyPlaced = Object.values(dropZones).flat().some(placedItem => placedItem.name === item.name);
      
      if (!isAlreadyPlaced) {
        setDropZones(prev => ({
          ...prev,
          [category]: [...prev[category], item]
        }));
        
        setDragDropItems(prev => prev.filter(i => i.name !== item.name));
      }
    } catch (error) {
      console.error('Error parsing dropped item:', error);
    }
  };

  const removeFromDropZone = (item: DragDropItem, category: string) => {
    setDropZones(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i.name !== item.name)
    }));
    
    setDragDropItems(prev => [...prev, item]);
  };

  const checkAnswer = () => {
    const exercise = exercises[currentExercise];
    let correct = false;
    
    if (exercise.type === 'drag-drop') {
      const correctItems = exercise.correctAnswer;
      const userItems = Object.values(dropZones).flat().map(item => item.name);
      
      // Check if all correct items are present and no extra items
      const hasAllCorrect = correctItems.every(item => userItems.includes(item));
      const hasNoExtra = userItems.every(item => correctItems.includes(item));
      correct = hasAllCorrect && hasNoExtra;
      
      console.log('Drag-drop check:', { correctItems, userItems, hasAllCorrect, hasNoExtra, correct });
    } else if (exercise.type === 'cardinality') {
      const correctAnswer = exercise.correctAnswer;
      const userAnswerObj = userAnswer || {};
      
      correct = userAnswerObj.entity1 === correctAnswer.entity1 && 
                userAnswerObj.entity2 === correctAnswer.entity2;
      
      console.log('Cardinality check:', { correctAnswer, userAnswer: userAnswerObj, correct });
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
      // Alle Übungen abgeschlossen
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

  const renderDragDropExercise = () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-bold">Szenario:</p>
        <p>{currentExerciseData.scenario}</p>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Verfügbare Elemente:</h3>
        <div className="flex flex-wrap gap-2">
          {dragDropItems.map((item, index) => (
            <div
              key={`source-${index}`}
              className="draggable inline-block bg-gray-200 text-gray-800 p-2 m-1 rounded-md shadow-sm cursor-grab hover:bg-gray-300"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-center text-blue-600 flex items-center justify-center">
            <Box className="mr-2" />
            Entitätstypen
          </h3>
          <div
            className="drop-zone p-4 bg-white rounded-lg min-h-[150px] border-2 border-dashed border-gray-300"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'entity')}
          >
            {dropZones.entity.map((item, index) => (
              <div
                key={`entity-${index}`}
                className={`inline-block p-2 m-1 rounded-md shadow-sm cursor-pointer hover:opacity-75 ${
                  isCorrect === null ? 'bg-gray-200' : 
                  item.type === 'entity' ? 'bg-green-100' : 'bg-red-100'
                }`}
                onClick={() => removeFromDropZone(item, 'entity')}
                title="Klicken zum Entfernen"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-center text-green-600 flex items-center justify-center">
            <List className="mr-2" />
            Attribute
          </h3>
          <div
            className="drop-zone p-4 bg-white rounded-lg min-h-[150px] border-2 border-dashed border-gray-300"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'attribute')}
          >
            {dropZones.attribute.map((item, index) => (
              <div
                key={`attribute-${index}`}
                className={`inline-block p-2 m-1 rounded-md shadow-sm cursor-pointer hover:opacity-75 ${
                  isCorrect === null ? 'bg-gray-200' : 
                  item.type === 'attribute' ? 'bg-green-100' : 'bg-red-100'
                }`}
                onClick={() => removeFromDropZone(item, 'attribute')}
                title="Klicken zum Entfernen"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-center text-red-600 flex items-center justify-center">
            <Link className="mr-2" />
            Beziehungen
          </h3>
          <div
            className="drop-zone p-4 bg-white rounded-lg min-h-[150px] border-2 border-dashed border-gray-300"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'relationship')}
          >
            {dropZones.relationship.map((item, index) => (
              <div
                key={`relationship-${index}`}
                className={`inline-block p-2 m-1 rounded-md shadow-sm cursor-pointer hover:opacity-75 ${
                  isCorrect === null ? 'bg-gray-200' : 
                  item.type === 'relationship' ? 'bg-green-100' : 'bg-red-100'
                }`}
                onClick={() => removeFromDropZone(item, 'relationship')}
                title="Klicken zum Entfernen"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardinalityExercise = () => {
    const exercise = exercises[currentExercise];
    const cardinalityData = exercise as any;
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Szenario:</p>
          <p>{currentExerciseData.scenario}</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{currentExerciseData.question}</h3>
          
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-center">
              <div className="w-24 h-16 bg-blue-100 rounded-lg flex items-center justify-center font-semibold text-sm">
                {cardinalityData.entity1 || 'Entität 1'}
              </div>
              <div className="mt-2">
                <select 
                  className="border rounded px-2 py-1"
                  value={userAnswer?.entity1 || ''}
                  onChange={(e) => setUserAnswer(prev => ({ ...prev, entity1: e.target.value }))}
                >
                  <option value="">Wähle...</option>
                  <option value="1">1</option>
                  <option value="N">N</option>
                  <option value="M">M</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-16 bg-red-100 rounded-lg flex items-center justify-center font-semibold text-sm">
                {cardinalityData.relationship || 'Beziehung'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-16 bg-blue-100 rounded-lg flex items-center justify-center font-semibold text-sm">
                {cardinalityData.entity2 || 'Entität 2'}
              </div>
              <div className="mt-2">
                <select 
                  className="border rounded px-2 py-1"
                  value={userAnswer?.entity2 || ''}
                  onChange={(e) => setUserAnswer(prev => ({ ...prev, entity2: e.target.value }))}
                >
                  <option value="">Wähle...</option>
                  <option value="1">1</option>
                  <option value="N">N</option>
                  <option value="M">M</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderExercise = () => {
    switch (currentExerciseData.type) {
      case 'drag-drop':
        return renderDragDropExercise();
      case 'cardinality':
        return renderCardinalityExercise();
      default:
        return <div>Übungstyp wird noch implementiert...</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">ER-Modell: Interaktive Übungen</h1>
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
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentExerciseData.difficulty)}`}>
            {currentExerciseData.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{currentExerciseData.description}</p>
        <p className="text-sm text-gray-500 mb-6">Wert: {currentExerciseData.points} Punkte</p>

        {renderExercise()}

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
                {completedExercises.has(exercise.id) && (
                  <CheckCircle className="text-green-500" size={16} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
