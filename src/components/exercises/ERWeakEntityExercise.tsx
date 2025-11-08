import React, { useState } from 'react';
import { Box, Key, Link, CheckCircle, XCircle, AlertTriangle, BookOpen, Target } from 'lucide-react';

interface WeakEntityExercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  points: number;
  diagram?: string; // Mermaid diagram code
}

export const ERWeakEntityExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const exercises: WeakEntityExercise[] = [
    {
      id: 'basic-weak-entity',
      title: 'Schwache Entitätstypen erkennen',
      description: 'Identifiziere schwache Entitätstypen in einem Szenario',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung gehört zu genau einem Studenten und hat eine Prüfungsnummer. Ohne den Studenten kann die Prüfung nicht eindeutig identifiziert werden.',
      question: 'Welcher Entitätstyp ist schwach und warum?',
      options: [
        'Prüfung - kann nur in Kombination mit Student identifiziert werden',
        'Student - kann nur in Kombination mit Prüfung identifiziert werden',
        'Prüfungsnummer - ist ein Attribut, kein Entitätstyp',
        'Keiner ist schwach - alle haben eigene Identität'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Prüfung ist ein schwacher Entitätstyp, da sie nur in Kombination mit dem Studenten eindeutig identifiziert werden kann. Die Prüfungsnummer ist ein Teilschlüssel.',
      difficulty: 'Einfach',
      points: 15
    },
    {
      id: 'weak-entity-identification',
      title: 'Identifikation schwacher Entitätstypen',
      description: 'Verstehe die Identifikation schwacher Entitätstypen',
      scenario: 'Ein Unternehmen hat Abteilungen und Mitarbeiter. Jeder Mitarbeiter gehört zu genau einer Abteilung und hat eine Mitarbeiternummer. Die Mitarbeiternummer ist nur innerhalb der Abteilung eindeutig.',
      question: 'Wie wird ein Mitarbeiter eindeutig identifiziert?',
      options: [
        'Durch die Kombination aus Abteilungs-ID und Mitarbeiternummer',
        'Nur durch die Mitarbeiternummer',
        'Nur durch die Abteilungs-ID',
        'Durch einen automatisch generierten Schlüssel'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Da die Mitarbeiternummer nur innerhalb der Abteilung eindeutig ist, wird der Mitarbeiter durch die Kombination aus Abteilungs-ID und Mitarbeiternummer identifiziert.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'partial-key',
      title: 'Teilschlüssel verstehen',
      description: 'Verstehe den Unterschied zwischen Teilschlüssel und Primärschlüssel',
      scenario: 'Ein Student kann mehrere Hausarbeiten schreiben. Jede Hausarbeit gehört zu genau einem Studenten und hat eine Hausarbeitsnummer. Die Hausarbeitsnummer ist nur für den jeweiligen Studenten eindeutig.',
      question: 'Was ist der Teilschlüssel der Hausarbeit?',
      options: [
        'Hausarbeitsnummer (gestrichelt unterstrichen)',
        'Student-ID (normal unterstrichen)',
        'Die Kombination aus Student-ID und Hausarbeitsnummer',
        'Ein automatisch generierter Schlüssel'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Hausarbeitsnummer ist der Teilschlüssel (gestrichelt unterstrichen), da sie nur in Kombination mit dem Studenten eindeutig ist.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'identifying-relationship',
      title: 'Identifizierende Beziehungen',
      description: 'Verstehe identifizierende Beziehungen',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Die Beziehung zwischen Student und Prüfung ist identifizierend, da die Prüfung ohne den Studenten nicht existieren kann.',
      question: 'Wie wird die identifizierende Beziehung dargestellt?',
      options: [
        'Mit einer doppelten Linie zwischen Student und Prüfung',
        'Mit einer einfachen Linie zwischen Student und Prüfung',
        'Mit einer gestrichelten Linie zwischen Student und Prüfung',
        'Mit einer gepunkteten Linie zwischen Student und Prüfung'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Identifizierende Beziehungen werden mit einer doppelten Linie dargestellt, um zu zeigen, dass der schwache Entitätstyp von der Beziehung abhängt.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'cardinality-weak-entity',
      title: 'Kardinalität bei schwachen Entitätstypen',
      description: 'Verstehe die Kardinalität bei schwachen Entitätstypen',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung gehört zu genau einem Studenten.',
      question: 'Welche Kardinalität hat die Beziehung zwischen Student und Prüfung?',
      options: [
        '1:N (Ein Student zu vielen Prüfungen)',
        'N:1 (Viele Prüfungen zu einem Studenten)',
        '1:1 (Ein Student zu einer Prüfung)',
        'N:M (Viele Studenten zu vielen Prüfungen)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Beziehung ist 1:N, da ein Student mehrere Prüfungen haben kann, aber jede Prüfung zu genau einem Studenten gehört.',
      difficulty: 'Einfach',
      points: 15
    },
    {
      id: 'complex-weak-entity',
      title: 'Komplexe schwache Entitätstypen',
      description: 'Verstehe komplexere Szenarien mit schwachen Entitätstypen',
      scenario: 'Ein Projekt hat mehrere Aufgaben. Jede Aufgabe gehört zu genau einem Projekt und hat eine Aufgaben-ID. Die Aufgaben-ID ist nur innerhalb des Projekts eindeutig. Zusätzlich kann eine Aufgabe mehrere Unteraufgaben haben, die wiederum nur innerhalb der Aufgabe eindeutig sind.',
      question: 'Welche Entitätstypen sind schwach?',
      options: [
        'Aufgabe (abhängig von Projekt) und Unteraufgabe (abhängig von Aufgabe)',
        'Nur Aufgabe (abhängig von Projekt)',
        'Nur Unteraufgabe (abhängig von Aufgabe)',
        'Keiner ist schwach'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Sowohl Aufgabe als auch Unteraufgabe sind schwache Entitätstypen. Aufgabe ist abhängig von Projekt, Unteraufgabe ist abhängig von Aufgabe.',
      difficulty: 'Schwer',
      points: 25
    },
    {
      id: 'weak-entity-attributes',
      title: 'Attribute schwacher Entitätstypen',
      description: 'Verstehe die Attribute schwacher Entitätstypen',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung hat eine Prüfungsnummer (Teilschlüssel), ein Datum und eine Note.',
      question: 'Welche Attribute hat die Prüfung?',
      options: [
        'Prüfungsnummer (Teilschlüssel), Datum, Note',
        'Student-ID (Primärschlüssel), Prüfungsnummer, Datum, Note',
        'Nur Prüfungsnummer (Teilschlüssel)',
        'Prüfungs-ID (Primärschlüssel), Datum, Note'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Prüfung hat Prüfungsnummer als Teilschlüssel (gestrichelt unterstrichen) sowie Datum und Note als normale Attribute.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'relational-mapping-weak',
      title: 'Relationale Abbildung schwacher Entitätstypen',
      description: 'Verstehe die Abbildung schwacher Entitätstypen in relationale Schemata',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung gehört zu genau einem Studenten und hat eine Prüfungsnummer, ein Datum und eine Note.',
      question: 'Wie wird die Prüfung in einem relationalen Schema abgebildet?',
      options: [
        'Prüfung(Student-ID, Prüfungsnummer, Datum, Note) mit zusammengesetztem Primärschlüssel',
        'Prüfung(Prüfungs-ID, Student-ID, Datum, Note) mit einfachem Primärschlüssel',
        'Zwei separate Tabellen: Student und Prüfung',
        'Eine einzige Tabelle mit allen Attributen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Schwache Entitätstypen werden mit dem Primärschlüssel des starken Entitätstyps und dem Teilschlüssel als zusammengesetztem Primärschlüssel abgebildet.',
      difficulty: 'Schwer',
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

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Schwache Entitätstypen</h1>
        <p className="text-gray-600">Lerne schwache Entitätstypen und ihre Besonderheiten</p>
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
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
              {currentExerciseData.points} Punkte
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{currentExerciseData.description}</p>

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

      {/* Key Concepts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Wichtige Konzepte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Schwache Entitätstypen</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Abhängig von einem starken Entitätstyp</li>
              <li>• Können nicht allein identifiziert werden</li>
              <li>• Haben Teilschlüssel (gestrichelt unterstrichen)</li>
              <li>• Werden mit doppelten Rechtecken dargestellt</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Identifizierende Beziehungen</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Verbinden schwache mit starken Entitätstypen</li>
              <li>• Werden mit doppelten Linien dargestellt</li>
              <li>• Haben immer Kardinalität 1:N</li>
              <li>• Totale Partizipation des schwachen Entitätstyps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
