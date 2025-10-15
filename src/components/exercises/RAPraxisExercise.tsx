import React, { useState } from 'react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  schema: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
}

export const RAPraxisExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const exercises: Exercise[] = [
    {
      id: 'basic-projection',
      title: 'Grundlegende Projektion',
      description: 'Einfache Projektion und Selektion kombinieren',
      schema: 'Student(studID, Name, Alter, Semester)',
      question: 'Welche Anfrage findet die Namen aller Studenten, die älter als 20 sind?',
      options: [
        'π_Name(σ_Alter > 20(Student))',
        'σ_Alter > 20(π_Name(Student))',
        'π_Name,Alter(σ_Alter > 20(Student))',
        'σ_Name(π_Alter > 20(Student))'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Zuerst wird die Selektion σ_Alter > 20 angewendet, um Studenten über 20 zu filtern, dann die Projektion π_Name, um nur die Namen zu behalten.',
      difficulty: 'Einfach'
    },
    {
      id: 'join-basics',
      title: 'Natural Join Grundlagen',
      description: 'Zwei Relationen mit Natural Join verbinden',
      schema: 'Student(studID, Name, Semester), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      question: 'Welche Anfrage findet alle Studenten mit ihren belegten Kursen?',
      options: [
        'Student ⋈ Belegt ⋈ Kurs',
        'Student × Belegt × Kurs',
        'Student ∪ Belegt ∪ Kurs',
        'Student ∩ Belegt ∩ Kurs'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Natural Join (⋈) verbindet die Relationen über gleichnamige Attribute (studID und courseID).',
      difficulty: 'Einfach'
    },
    {
      id: 'selection-order',
      title: 'Reihenfolge der Operatoren',
      description: 'Wichtige Regel: Selektion vor Join für bessere Performance',
      schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      question: 'Welche Anfrage ist effizienter für "Studenten, die Kurse mit mehr als 5 ECTS belegen"?',
      options: [
        'π_Name(Student ⋈ Belegt ⋈ σ_ECTS > 5(Kurs))',
        'π_Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))',
        'σ_ECTS > 5(π_Name(Student ⋈ Belegt ⋈ Kurs))',
        'π_Name(Student ⋈ σ_ECTS > 5(Belegt ⋈ Kurs))'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Selektion σ_ECTS > 5 sollte vor dem Join angewendet werden, um nur relevante Kurse zu betrachten und die Performance zu verbessern.',
      difficulty: 'Mittel'
    },
    {
      id: 'grouping-aggregation',
      title: 'Gruppierung und Aggregation',
      description: 'γ-Operator für Gruppierung und Zählung verwenden',
      schema: 'Belegt(studID, courseID, Note)',
      question: 'Welche Anfrage zählt die Anzahl der belegten Kurse pro Student?',
      options: [
        'γ_studID; COUNT(courseID)(Belegt)',
        'π_studID, COUNT(courseID)(Belegt)',
        'σ_COUNT(courseID)(Belegt)',
        'Belegt ÷ courseID'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Der γ-Operator gruppiert nach studID und zählt die courseIDs pro Gruppe. π ist für Projektion, σ für Selektion, ÷ für Division.',
      difficulty: 'Mittel'
    },
    {
      id: 'division-operator',
      title: 'Relationale Division',
      description: 'Schwieriger Operator: Finde Tupel, die mit ALLEN Tupeln einer anderen Relation kombiniert werden können',
      schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      question: 'Welche Anfrage findet Studenten, die ALLE Kurse mit 6 ECTS belegen?',
      options: [
        'π_studID,Name(Student ⋈ (Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))))',
        'π_studID,Name(Student ⋈ σ_ECTS = 6(Belegt ⋈ Kurs))',
        'π_studID,Name(σ_ECTS = 6(Student ⋈ Belegt ⋈ Kurs))',
        'Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Division Belegt ÷ π_courseID(σ_ECTS = 6(Kurs)) findet Studenten, die mit ALLEN 6-ECTS-Kursen kombiniert werden können. Dann wird mit Student gejoint und die Namen projiziert.',
      difficulty: 'Schwer'
    },
    {
      id: 'outer-join',
      title: 'Outer Join vs Natural Join',
      description: 'Unterschied zwischen verschiedenen Join-Typen verstehen',
      schema: 'Student(studID, Name), Belegt(studID, courseID)',
      question: 'Welche Anfrage zeigt ALLE Studenten, auch die ohne belegte Kurse?',
      options: [
        'Student ⟕ Belegt',
        'Student ⋈ Belegt',
        'Student ⋉ Belegt',
        'Student ⋊ Belegt'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Left Outer Join (⟕) behält alle Tupel der linken Relation (Student) bei, auch die ohne Partner in der rechten Relation (Belegt).',
      difficulty: 'Mittel'
    },
    {
      id: 'semi-join',
      title: 'Semi-Join Anwendung',
      description: 'Semi-Join für effiziente Filterung verwenden',
      schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      question: 'Welche Anfrage findet Studenten, die MINDESTENS einen Kurs mit mehr als 5 ECTS belegen?',
      options: [
        'π_studID,Name(Student ⋈ (Belegt ⋉ σ_ECTS > 5(Kurs)))',
        'π_studID,Name(Student ⋈ σ_ECTS > 5(Belegt ⋈ Kurs))',
        'π_studID,Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))',
        'Student ⋉ σ_ECTS > 5(Kurs)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Der Semi-Join Belegt ⋉ σ_ECTS > 5(Kurs) findet Belegungen, die mit Kursen über 5 ECTS kombiniert werden können, dann wird mit Student gejoint.',
      difficulty: 'Schwer'
    },
    {
      id: 'complex-query',
      title: 'Komplexe Anfrage',
      description: 'Mehrere Operatoren in der richtigen Reihenfolge kombinieren',
      schema: 'Student(studID, Name, Semester), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS), Prüfung(studID, courseID, Note)',
      question: 'Welche Anfrage findet Studenten im 3. Semester, die in mindestens einem Kurs eine Note besser als 2.0 haben?',
      options: [
        'π_studID,Name(σ_Semester = 3(Student) ⋈ σ_Note < 2.0(Prüfung))',
        'π_studID,Name(σ_Semester = 3 ∧ Note < 2.0(Student ⋈ Prüfung))',
        'σ_Semester = 3(π_studID,Name(Student ⋈ σ_Note < 2.0(Prüfung)))',
        'π_studID,Name(Student ⋈ σ_Semester = 3 ∧ Note < 2.0(Prüfung))'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Zuerst werden Studenten im 3. Semester und Prüfungen mit Note < 2.0 gefiltert, dann gejoint und die Namen projiziert.',
      difficulty: 'Schwer'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === exercises[currentExercise].correctAnswer) {
      setScore(score + 1);
    }
    
    setCompletedExercises(prev => new Set([...prev, currentExercise]));
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetExercise = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedExercises(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-green-100 text-green-800';
      case 'Mittel': return 'bg-yellow-100 text-yellow-800';
      case 'Schwer': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentEx = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Praxisfälle: Relationale Algebra</h1>
      <p className="text-gray-600 mb-8">
        Lerne die relationale Algebra durch realistische Anwendungsfälle mit steigendem Schwierigkeitsgrad.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Fall {currentExercise + 1} von {exercises.length}: {currentEx.title}
            </h2>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentEx.difficulty)}`}>
                {currentEx.difficulty}
              </span>
              <div className="text-sm text-gray-600">
                Score: {score}/{completedExercises.size}
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{currentEx.description}</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Schema:</h3>
          <p className="font-mono text-blue-700">{currentEx.schema}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">{currentEx.question}</h3>
          <div className="space-y-2">
            {currentEx.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  showResult
                    ? index === currentEx.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-mono text-sm">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">Erklärung:</h4>
            <p className="text-blue-700">{currentEx.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Zurücksetzen
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={prevExercise}
              disabled={currentExercise === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vorherige
            </button>
            {currentExercise < exercises.length - 1 ? (
              <button
                onClick={nextExercise}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Nächster Fall
              </button>
            ) : (
              <div className="px-4 py-2 bg-green-500 text-white rounded">
                Alle Fälle abgeschlossen!
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Fortschritt:</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {currentExercise + 1} von {exercises.length} Fällen bearbeitet
          </p>
        </div>
      </div>
    </div>
  );
};
