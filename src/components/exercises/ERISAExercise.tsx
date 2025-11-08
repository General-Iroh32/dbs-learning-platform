import React, { useState } from 'react';
import { GitBranch, CheckCircle, XCircle, AlertTriangle, BookOpen, Target, Users } from 'lucide-react';

interface ISAExercise {
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

export const ERISAExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const exercises: ISAExercise[] = [
    {
      id: 'basic-isa',
      title: 'ISA-Beziehungen erkennen',
      description: 'Identifiziere ISA-Beziehungen in einem Szenario',
      scenario: 'Es gibt Angestellte der Universität. Professoren sind Angestellte mit zusätzlichen Attributen wie Rang und Büro. Assistenten sind Angestellte mit einem Fachbereich.',
      question: 'Wie würdest du die Beziehung zwischen Angestellter, Professor und Assistent modellieren?',
      options: [
        'ISA-Beziehung: Professor ISA Angestellter, Assistent ISA Angestellter',
        'Normale Beziehungen zwischen drei Entitätstypen',
        'Schwache Entitätstypen',
        'N:M Beziehungen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! ISA-Beziehungen modellieren Vererbung. Professor und Assistent sind spezialisierte Angestellte mit zusätzlichen Attributen.',
      difficulty: 'Einfach',
      points: 15
    },
    {
      id: 'isa-cardinality',
      title: 'Kardinalität von ISA-Beziehungen',
      description: 'Verstehe die Kardinalität von ISA-Beziehungen',
      scenario: 'Jeder Professor ist genau ein Angestellter. Nicht jeder Angestellte ist ein Professor.',
      question: 'Welche Kardinalität hat die ISA-Beziehung zwischen Professor und Angestellter?',
      options: [
        '[1,1] zu [0,1] (Jeder Professor zu höchstens einem Angestellten)',
        '[0,1] zu [1,1] (Höchstens ein Professor zu jedem Angestellten)',
        '[1,1] zu [1,1] (Jeder Professor zu genau einem Angestellten)',
        '[0,1] zu [0,1] (Höchstens ein Professor zu höchstens einem Angestellten)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Jeder Professor gehört zu genau einem Angestellten [1,1], aber nicht jeder Angestellte ist ein Professor [0,1].',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'isa-attributes',
      title: 'Attribute in ISA-Beziehungen',
      description: 'Verstehe die Vererbung von Attributen',
      scenario: 'Angestellte haben Personalnummer und Name. Professoren erben diese Attribute und haben zusätzlich Rang und Büro. Assistenten erben Personalnummer und Name und haben zusätzlich Fachbereich.',
      question: 'Welche Attribute hat ein Professor?',
      options: [
        'Personalnummer, Name, Rang, Büro (geerbt + spezifisch)',
        'Nur Rang und Büro (nur spezifische Attribute)',
        'Nur Personalnummer und Name (nur geerbte Attribute)',
        'Alle Attribute aller Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Professoren erben die Attribute des Supertyps (Personalnummer, Name) und haben zusätzlich ihre spezifischen Attribute (Rang, Büro).',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'disjoint-specialization',
      title: 'Disjunkte Spezialisierung',
      description: 'Verstehe disjunkte vs. überlappende Spezialisierung',
      scenario: 'Ein Angestellter kann entweder Professor oder Assistent sein, aber nicht beides gleichzeitig.',
      question: 'Wie wird diese Spezialisierung dargestellt?',
      options: [
        'Mit einem gemeinsamen ISA-Symbol (disjunkt)',
        'Mit separaten ISA-Symbolen (überlappend)',
        'Mit einer N:M Beziehung',
        'Mit schwachen Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Disjunkte Spezialisierung wird mit einem gemeinsamen ISA-Symbol dargestellt, da ein Angestellter nur zu einer spezialisierten Gruppe gehören kann.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'overlapping-specialization',
      title: 'Überlappende Spezialisierung',
      description: 'Verstehe überlappende Spezialisierung',
      scenario: 'Ein Angestellter kann sowohl Professor als auch Administrator sein (z.B. ein Professor, der auch Verwaltungsaufgaben übernimmt).',
      question: 'Wie wird diese Spezialisierung dargestellt?',
      options: [
        'Mit separaten ISA-Symbolen (überlappend)',
        'Mit einem gemeinsamen ISA-Symbol (disjunkt)',
        'Mit einer N:M Beziehung',
        'Mit schwachen Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Überlappende Spezialisierung wird mit separaten ISA-Symbolen dargestellt, da ein Angestellter zu mehreren spezialisierten Gruppen gehören kann.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'total-specialization',
      title: 'Totale Spezialisierung',
      description: 'Verstehe totale vs. partielle Spezialisierung',
      scenario: 'Jeder Angestellte muss entweder Professor oder Assistent sein. Es gibt keine Angestellten, die weder Professor noch Assistent sind.',
      question: 'Wie wird die totale Spezialisierung dargestellt?',
      options: [
        'Mit einer doppelten Linie am ISA-Symbol',
        'Mit einer einfachen Linie am ISA-Symbol',
        'Mit einer gestrichelten Linie am ISA-Symbol',
        'Mit einer gepunkteten Linie am ISA-Symbol'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Totale Spezialisierung wird mit einer doppelten Linie am ISA-Symbol dargestellt, um zu zeigen, dass jeder Supertyp zu einem Subtyp gehören muss.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'partial-specialization',
      title: 'Partielle Spezialisierung',
      description: 'Verstehe partielle Spezialisierung',
      scenario: 'Es gibt Angestellte, die weder Professor noch Assistent sind (z.B. Verwaltungspersonal).',
      question: 'Wie wird die partielle Spezialisierung dargestellt?',
      options: [
        'Mit einer einfachen Linie am ISA-Symbol',
        'Mit einer doppelten Linie am ISA-Symbol',
        'Mit einer gestrichelten Linie am ISA-Symbol',
        'Mit einer gepunkteten Linie am ISA-Symbol'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Partielle Spezialisierung wird mit einer einfachen Linie am ISA-Symbol dargestellt, da nicht jeder Supertyp zu einem Subtyp gehören muss.',
      difficulty: 'Mittel',
      points: 20
    },
    {
      id: 'complex-isa',
      title: 'Komplexe ISA-Hierarchien',
      description: 'Verstehe mehrstufige ISA-Hierarchien',
      scenario: 'Es gibt Angestellte, die in Professoren und Assistenten unterteilt sind. Professoren können zusätzlich in Vollzeit- und Teilzeitprofessoren unterteilt werden.',
      question: 'Wie viele ISA-Ebenen gibt es?',
      options: [
        'Zwei Ebenen: Angestellter → Professor/Assistent, Professor → Vollzeit/Teilzeit',
        'Eine Ebene: Angestellter → Professor/Assistent/Vollzeit/Teilzeit',
        'Drei Ebenen: Angestellter → Professor/Assistent → Vollzeit/Teilzeit',
        'Keine ISA-Beziehungen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Es gibt zwei Ebenen: Erst Angestellter zu Professor/Assistent, dann Professor zu Vollzeit/Teilzeit.',
      difficulty: 'Schwer',
      points: 25
    },
    {
      id: 'isa-relationships',
      title: 'Beziehungen in ISA-Hierarchien',
      description: 'Verstehe Beziehungen in ISA-Hierarchien',
      scenario: 'Professoren können Vorlesungen halten. Assistenten können Übungen leiten. Beide sind Angestellte.',
      question: 'Wer kann an der Beziehung "hält Vorlesung" teilnehmen?',
      options: [
        'Nur Professoren (Subtypen erben Beziehungen)',
        'Nur Angestellte (Supertyp)',
        'Sowohl Professoren als auch Assistenten',
        'Niemand'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Subtypen erben Beziehungen vom Supertyp. Da nur Professoren Vorlesungen halten, ist die Beziehung auf den Subtyp beschränkt.',
      difficulty: 'Schwer',
      points: 25
    },
    {
      id: 'relational-mapping-isa',
      title: 'Relationale Abbildung von ISA-Beziehungen',
      description: 'Verstehe die Abbildung von ISA-Beziehungen in relationale Schemata',
      scenario: 'Angestellte haben Personalnummer und Name. Professoren haben zusätzlich Rang und Büro. Assistenten haben zusätzlich Fachbereich.',
      question: 'Wie werden ISA-Beziehungen abgebildet?',
      options: [
        'Partitionierung: Angestellter(Personalnummer, Name), Professor(Personalnummer, Rang, Büro), Assistent(Personalnummer, Fachbereich)',
        'Hauptklassen: Nur Professor(Personalnummer, Name, Rang, Büro) und Assistent(Personalnummer, Name, Fachbereich)',
        'Vollständige Redundanz: Alle Attribute in allen Tabellen',
        'Eine Tabelle: Angestellter(Personalnummer, Name, Typ, Rang, Büro, Fachbereich)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Partitionierungsvariante ist am häufigsten: Supertyp mit gemeinsamen Attributen, Subtypen mit spezifischen Attributen und Fremdschlüssel zum Supertyp.',
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ISA-Beziehungen</h1>
        <p className="text-gray-600">Lerne Spezialisierung und Generalisierung im ER-Modell</p>
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
            <h4 className="font-semibold text-blue-800 mb-2">ISA-Beziehungen</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Modellieren Vererbung (Spezialisierung/Generalisierung)</li>
              <li>• Werden mit Dreiecken dargestellt</li>
              <li>• Kardinalität immer [1,1] zu [0,1]</li>
              <li>• Subtypen erben Attribute und Beziehungen</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Spezialisierung</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Disjunkt vs. Überlappend</li>
              <li>• Total vs. Partiell</li>
              <li>• Gemeinsame vs. separate ISA-Symbole</li>
              <li>• Doppelte vs. einfache Linien</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
