import React, { useState } from 'react';

interface FD {
  left: string;
  right: string;
}

interface Relation {
  name: string;
  attributes: string[];
}

export const DecompositionExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedDecomposition, setSelectedDecomposition] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const exercises = [
    {
      title: "Verlustlose Zerlegung",
      description: "Prüfe, ob die gegebene Zerlegung verlustfrei ist.",
      originalRelation: {
        name: "courseOffers",
        attributes: ["empID", "teacher", "rank", "office", "courseID", "title", "ects"]
      },
      fds: [
        { left: "empID", right: "teacher, rank, office" },
        { left: "courseID", right: "title, ects" }
      ],
      decompositions: [
        [
          { name: "instructor", attributes: ["empID", "teacher", "rank", "office"] },
          { name: "course", attributes: ["courseID", "title", "ects", "empID"] }
        ],
        [
          { name: "instructor", attributes: ["empID", "teacher", "rank", "office"] },
          { name: "course", attributes: ["courseID", "title", "ects"] }
        ],
        [
          { name: "instructor", attributes: ["empID", "teacher"] },
          { name: "course", attributes: ["courseID", "title", "ects"] }
        ]
      ],
      correct: 1,
      explanation: "Die zweite Zerlegung ist verlustfrei, da die gemeinsamen Attribute (keine in diesem Fall) einen Superschlüssel für mindestens eine der Relationen bilden. Die ursprüngliche Relation kann durch einen Join rekonstruiert werden."
    },
    {
      title: "Abhängigkeitsbewahrung",
      description: "Prüfe, ob die gegebene Zerlegung abhängigkeitsbewahrend ist.",
      originalRelation: {
        name: "StudentCourse",
        attributes: ["studentID", "courseID", "instructor", "grade"]
      },
      fds: [
        { left: "studentID, courseID", right: "grade" },
        { left: "courseID", right: "instructor" }
      ],
      decompositions: [
        [
          { name: "Enrollment", attributes: ["studentID", "courseID", "grade"] },
          { name: "CourseInstructor", attributes: ["courseID", "instructor"] }
        ],
        [
          { name: "Student", attributes: ["studentID", "courseID"] },
          { name: "Course", attributes: ["courseID", "instructor", "grade"] }
        ],
        [
          { name: "Enrollment", attributes: ["studentID", "courseID"] },
          { name: "Course", attributes: ["courseID", "instructor"] },
          { name: "Grade", attributes: ["studentID", "grade"] }
        ]
      ],
      correct: 0,
      explanation: "Die erste Zerlegung ist abhängigkeitsbewahrend, da alle ursprünglichen FDs in den neuen Relationen überprüft werden können, ohne die Tabellen zu joinen."
    },
    {
      title: "Verlustlose und abhängigkeitsbewahrende Zerlegung",
      description: "Finde eine Zerlegung, die sowohl verlustfrei als auch abhängigkeitsbewahrend ist.",
      originalRelation: {
        name: "Employee",
        attributes: ["empID", "name", "deptID", "deptName", "salary"]
      },
      fds: [
        { left: "empID", right: "name, deptID, salary" },
        { left: "deptID", right: "deptName" }
      ],
      decompositions: [
        [
          { name: "Employee", attributes: ["empID", "name", "deptID", "salary"] },
          { name: "Department", attributes: ["deptID", "deptName"] }
        ],
        [
          { name: "Employee", attributes: ["empID", "name", "salary"] },
          { name: "Department", attributes: ["deptID", "deptName"] }
        ],
        [
          { name: "Employee", attributes: ["empID", "name"] },
          { name: "Department", attributes: ["deptID", "deptName", "salary"] }
        ]
      ],
      correct: 0,
      explanation: "Die erste Zerlegung ist sowohl verlustfrei (gemeinsames Attribut 'deptID' ist Schlüssel für Department) als auch abhängigkeitsbewahrend (alle FDs können in den jeweiligen Relationen überprüft werden)."
    }
  ];

  const handleDecompositionSelect = (index: number) => {
    setSelectedDecomposition(index);
    setShowResult(true);
    setIsCorrect(index === exercises[currentExercise].correct);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedDecomposition(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowExplanation(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedDecomposition(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowExplanation(false);
    }
  };

  const resetExercise = () => {
    setSelectedDecomposition(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  const current = exercises[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Zerlegungen - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <span className="text-sm text-gray-600">
            Übung {currentExercise + 1} von {exercises.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Ursprüngliche Relation: {current.originalRelation.name}</h3>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Attribute:</h4>
            <p className="font-mono bg-gray-100 p-2 rounded">
              {current.originalRelation.attributes.join(', ')}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Funktionale Abhängigkeiten:</h4>
            <div className="space-y-1">
              {current.fds.map((fd, index) => (
                <div key={index} className="font-mono bg-gray-100 p-2 rounded text-sm">
                  {`{${fd.left}} → {${fd.right}}`}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Wähle die beste Zerlegung:</h3>
          
          <div className="space-y-4 mb-6">
            {current.decompositions.map((decomp, index) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  showResult
                    ? index === current.correct
                      ? 'border-green-500 bg-green-100'
                      : index === selectedDecomposition && !isCorrect
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => handleDecompositionSelect(index)}
              >
                <h4 className="font-medium mb-2">Zerlegung {index + 1}:</h4>
                <div className="space-y-2">
                  {decomp.map((rel, relIndex) => (
                    <div key={relIndex} className="bg-white p-2 rounded border text-sm">
                      <span className="font-semibold">{rel.name}</span>
                      <span className="font-mono text-gray-600 ml-2">
                        ({rel.attributes.join(', ')})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </h4>
              <p>{current.explanation}</p>
            </div>
          )}

          {showResult && (
            <div className="mb-6">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                {showExplanation ? 'Kriterien verstecken' : 'Kriterien anzeigen'}
              </button>
              
              {showExplanation && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Kriterien für gute Zerlegungen:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Verlustfreiheit:</strong> Die ursprüngliche Relation muss durch einen Join der zerlegten Relationen rekonstruierbar sein. 
                      Eine Zerlegung von R in R₁ und R₂ ist verlustfrei, wenn (R₁ ∩ R₂) → R₁ oder (R₁ ∩ R₂) → R₂ gilt.
                    </div>
                    <div>
                      <strong>Abhängigkeitsbewahrung:</strong> Alle ursprünglichen FDs müssen in den neuen Relationen überprüfbar sein, 
                      ohne die Tabellen zu joinen.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevExercise}
              disabled={currentExercise === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              ← Vorherige
            </button>
            
            <button
              onClick={resetExercise}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Zurücksetzen
            </button>
            
            <button
              onClick={nextExercise}
              disabled={currentExercise === exercises.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Nächste →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Zerlegungsstrategien:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Verlustfreiheit testen:</strong> Prüfe, ob die gemeinsamen Attribute einen Superschlüssel für mindestens eine der Relationen bilden.
          </div>
          <div>
            <strong>Abhängigkeitsbewahrung:</strong> Stelle sicher, dass alle FDs in den neuen Relationen überprüfbar sind.
          </div>
        </div>
      </div>
    </div>
  );
};
