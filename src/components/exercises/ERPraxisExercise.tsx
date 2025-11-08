import React, { useState } from 'react';
import { CheckCircle, XCircle, Target } from 'lucide-react';

interface ERPracticeExercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: 'Grundkonzepte' | 'Kardinalitäten' | 'Schwache Entitäten' | 'ISA-Beziehungen' | 'Diagramm-Erstellung';
  points: number;
}

export const ERPraxisExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const exercises: ERPracticeExercise[] = [
    {
      id: 'basic-entities',
      title: 'Entitätstypen identifizieren',
      description: 'Erkenne Entitätstypen in einem realen Szenario',
      scenario: 'Eine Bibliothek verwaltet Bücher, Leser und Ausleihen. Jedes Buch hat eine ISBN, einen Titel und einen Autor. Jeder Leser hat eine Lesernummer, einen Namen und eine Adresse. Bei jeder Ausleihe wird das Datum und die Rückgabefrist festgehalten.',
      question: 'Welche Entitätstypen sind in diesem Szenario vorhanden?',
      options: [
        'Buch, Leser, Ausleihe',
        'ISBN, Titel, Autor, Lesernummer, Name, Adresse',
        'Buch, Leser, Ausleihe, Datum, Rückgabefrist',
        'Bibliothek, Buch, Leser, Ausleihe'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Hauptentitätstypen sind Buch, Leser und Ausleihe. ISBN, Titel, etc. sind Attribute, nicht Entitätstypen.',
      difficulty: 'Einfach',
      category: 'Grundkonzepte',
      points: 10
    },
    {
      id: 'cardinality-1-n',
      title: '1:N Beziehungen erkennen',
      description: 'Bestimme die Kardinalität einer Beziehung',
      scenario: 'Ein Professor kann mehrere Vorlesungen halten. Jede Vorlesung wird von genau einem Professor gehalten.',
      question: 'Wie ist die Kardinalität zwischen Professor und Vorlesung?',
      options: [
        '1:N (Ein Professor zu vielen Vorlesungen)',
        'N:1 (Viele Vorlesungen zu einem Professor)',
        '1:1 (Ein Professor zu einer Vorlesung)',
        'N:M (Viele Professoren zu vielen Vorlesungen)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Ein Professor (1) kann mehrere Vorlesungen (N) halten. Die Beziehung ist 1:N von Professor zu Vorlesung.',
      difficulty: 'Einfach',
      category: 'Kardinalitäten',
      points: 15
    },
    {
      id: 'cardinality-n-m',
      title: 'N:M Beziehungen verstehen',
      description: 'Erkenne viele-zu-viele Beziehungen',
      scenario: 'Studenten können mehrere Kurse belegen. Kurse können von mehreren Studenten belegt werden.',
      question: 'Welche Kardinalität hat die Beziehung zwischen Student und Kurs?',
      options: [
        'N:M (Viele Studenten zu vielen Kursen)',
        '1:N (Ein Student zu vielen Kursen)',
        'N:1 (Viele Studenten zu einem Kurs)',
        '1:1 (Ein Student zu einem Kurs)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Da Studenten mehrere Kurse belegen können und Kurse von mehreren Studenten belegt werden, ist es eine N:M Beziehung.',
      difficulty: 'Einfach',
      category: 'Kardinalitäten',
      points: 15
    },
    {
      id: 'weak-entities',
      title: 'Schwache Entitätstypen erkennen',
      description: 'Identifiziere schwache Entitätstypen',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung gehört zu genau einem Studenten und hat eine Prüfungsnummer. Ohne den Studenten kann die Prüfung nicht identifiziert werden.',
      question: 'Welcher Entitätstyp ist schwach?',
      options: [
        'Prüfung (abhängig von Student)',
        'Student (unabhängig)',
        'Prüfungsnummer (ist ein Attribut)',
        'Keiner ist schwach'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Prüfung ist ein schwacher Entitätstyp, da sie nur in Kombination mit Student eindeutig identifiziert werden kann.',
      difficulty: 'Mittel',
      category: 'Schwache Entitäten',
      points: 20
    },
    {
      id: 'isa-relationships',
      title: 'ISA-Beziehungen verstehen',
      description: 'Erkenne Spezialisierung und Generalisierung',
      scenario: 'Es gibt Angestellte der Universität. Professoren sind Angestellte mit zusätzlichen Attributen wie Rang und Büro. Assistenten sind Angestellte mit einem Fachbereich.',
      question: 'Wie würdest du die Beziehung zwischen Angestellter, Professor und Assistent modellieren?',
      options: [
        'ISA-Beziehung: Professor ISA Angestellter, Assistent ISA Angestellter',
        'Normale Beziehungen zwischen drei Entitätstypen',
        'Schwache Entitätstypen',
        'N:M Beziehungen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! ISA-Beziehungen modellieren Vererbung. Professor und Assistent sind spezialisierte Angestellte.',
      difficulty: 'Mittel',
      category: 'ISA-Beziehungen',
      points: 25
    },
    {
      id: 'participation-constraints',
      title: 'Participation Constraints',
      description: 'Verstehe totale und partielle Partizipation',
      scenario: 'Jeder Student muss mindestens einen Kurs belegen. Nicht jeder Kurs muss von einem Studenten belegt werden.',
      question: 'Wie sind die Participation Constraints?',
      options: [
        'Student: total, Kurs: partiell',
        'Student: partiell, Kurs: total',
        'Beide: total',
        'Beide: partiell'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Jeder Student MUSS einen Kurs belegen (total), aber nicht jeder Kurs muss belegt werden (partiell).',
      difficulty: 'Mittel',
      category: 'Kardinalitäten',
      points: 20
    },
    {
      id: 'relationship-attributes',
      title: 'Beziehungsattribute',
      description: 'Erkenne Attribute von Beziehungen',
      scenario: 'Studenten belegen Kurse. Bei jeder Belegung wird eine Note und das Semester der Belegung gespeichert.',
      question: 'Wo gehören Note und Semester hin?',
      options: [
        'Als Attribute der Beziehung "belegt"',
        'Als Attribute des Entitätstyps "Student"',
        'Als Attribute des Entitätstyps "Kurs"',
        'Als separate Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Note und Semester beschreiben die Beziehung zwischen Student und Kurs, nicht die Entitätstypen selbst.',
      difficulty: 'Mittel',
      category: 'Grundkonzepte',
      points: 20
    },
    {
      id: 'recursive-relationships',
      title: 'Rekursive Beziehungen',
      description: 'Verstehe Beziehungen eines Entitätstyps mit sich selbst',
      scenario: 'Personen können andere Personen als Mentoren haben. Eine Person kann mehrere Mentees haben und selbst ein Mentee sein.',
      question: 'Wie modelliert man diese Beziehung?',
      options: [
        'Rekursive Beziehung mit Rollennamen "Mentor" und "Mentee"',
        'Zwei separate Entitätstypen "Mentor" und "Mentee"',
        'N:M Beziehung zwischen "Person" und "Person"',
        'Schwache Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Rekursive Beziehungen verbinden einen Entitätstyp mit sich selbst. Rollennamen unterscheiden die Rollen.',
      difficulty: 'Schwer',
      category: 'Grundkonzepte',
      points: 25
    },
    {
      id: 'ternary-relationships',
      title: 'Ternäre Beziehungen',
      description: 'Verstehe Beziehungen zwischen drei Entitätstypen',
      scenario: 'Professoren bewerten Studenten in Kursen. Ein Professor kann mehrere Studenten in verschiedenen Kursen bewerten.',
      question: 'Wie viele Entitätstypen sind an der Beziehung beteiligt?',
      options: [
        '3: Professor, Student, Kurs',
        '2: Professor, Student',
        '4: Professor, Student, Kurs, Bewertung',
        '1: Bewertung'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Beziehung "bewertet" verbindet drei Entitätstypen: Professor, Student und Kurs.',
      difficulty: 'Schwer',
      category: 'Grundkonzepte',
      points: 30
    },
    {
      id: 'composite-keys',
      title: 'Zusammengesetzte Schlüssel',
      description: 'Verstehe zusammengesetzte Primärschlüssel',
      scenario: 'Ein Student kann mehrere Prüfungen in verschiedenen Kursen ablegen. Jede Prüfung wird durch Student-ID und Kurs-ID eindeutig identifiziert.',
      question: 'Wie ist der Primärschlüssel der Prüfung?',
      options: [
        'Zusammengesetzt: {Student-ID, Kurs-ID}',
        'Einfach: Prüfungs-ID',
        'Einfach: Student-ID',
        'Einfach: Kurs-ID'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Da die Kombination aus Student-ID und Kurs-ID eindeutig ist, ist der Primärschlüssel zusammengesetzt.',
      difficulty: 'Schwer',
      category: 'Grundkonzepte',
      points: 25
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
      case 'Grundkonzepte': return 'text-blue-600 bg-blue-100';
      case 'Kardinalitäten': return 'text-purple-600 bg-purple-100';
      case 'Schwache Entitäten': return 'text-orange-600 bg-orange-100';
      case 'ISA-Beziehungen': return 'text-pink-600 bg-pink-100';
      case 'Diagramm-Erstellung': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ER-Modell: Praxisfälle</h1>
        <p className="text-gray-600">Löse realistische ER-Modellierungsaufgaben</p>
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
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(exercise.category)}`}>
                  {exercise.category}
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
