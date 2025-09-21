import React, { useState } from 'react';

interface FD {
  left: string;
  right: string;
}

export const FunctionalDependencyExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [step, setStep] = useState(0);

  const exercises = [
    {
      title: "Funktionale Abhängigkeiten erkennen",
      description: "Identifiziere die funktionalen Abhängigkeiten in der gegebenen Tabelle.",
      table: {
        headers: ["empID", "teacher", "rank", "office", "courseID", "title", "ects"],
        rows: [
          ["2125", "Socrates", "C4", "5041", "226", "Robotics", "4"],
          ["2125", "Socrates", "C4", "5049", "226", "Ethics", "2"],
          ["2125", "Socrates", "C4", "4052", "226", "Logic", "4"],
          ["2133", "Curie", "C3", "5259", "52", "Chemistry", "2"],
          ["2137", "Curie", "C4", "4630", "7", "Physics", "4"]
        ]
      },
      question: "Welche funktionale Abhängigkeit ist in dieser Tabelle erkennbar?",
      options: [
        "{empID} → {teacher, rank, office}",
        "{courseID} → {title, ects}",
        "{teacher} → {empID}",
        "Alle oben genannten"
      ],
      correct: 3,
      explanation: "Alle drei Abhängigkeiten sind korrekt: empID bestimmt eindeutig teacher, rank und office; courseID bestimmt eindeutig title und ects; teacher bestimmt eindeutig empID."
    },
    {
      title: "Attributhülle berechnen",
      description: "Berechne die Attributhülle für die gegebene Attributmenge.",
      fds: [
        { left: "A", right: "B" },
        { left: "B", right: "C" },
        { left: "C", right: "D" },
        { left: "D", right: "E" }
      ],
      question: "Was ist die Attributhülle von {A}?",
      options: [
        "{A, B}",
        "{A, B, C}",
        "{A, B, C, D}",
        "{A, B, C, D, E}"
      ],
      correct: 3,
      explanation: "A → B, dann B → C, dann C → D, dann D → E. Durch Transitivität: A → E. Die Attributhülle von {A} ist {A, B, C, D, E}."
    },
    {
      title: "Armstrong-Axiome anwenden",
      description: "Wende die Armstrong-Axiome an, um neue funktionale Abhängigkeiten abzuleiten.",
      given: [
        { left: "X", right: "Y" },
        { left: "Y", right: "Z" }
      ],
      question: "Welche funktionale Abhängigkeit kann aus den gegebenen FDs abgeleitet werden?",
      options: [
        "X → Z",
        "Y → X",
        "Z → Y",
        "X → YZ"
      ],
      correct: 0,
      explanation: "Durch das Transitivitätsaxiom: Wenn X → Y und Y → Z, dann X → Z."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswer(exercises[currentExercise].options[answerIndex]);
    setShowResult(true);
    setIsCorrect(answerIndex === exercises[currentExercise].correct);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserAnswer('');
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const resetExercise = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const current = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Funktionale Abhängigkeiten - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <span className="text-sm text-gray-600">
            Übung {currentExercise + 1} von {exercises.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {current.table && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Gegebene Tabelle:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {current.table.headers.map((header, index) => (
                      <th key={index} className="border border-gray-300 px-3 py-2 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-3 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {current.fds && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Gegebene funktionale Abhängigkeiten:</h3>
            <div className="space-y-2">
              {current.fds.map((fd, index) => (
                <div key={index} className="font-mono bg-gray-100 p-2 rounded">
                  {`{${fd.left}} → {${fd.right}}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {current.given && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Gegebene FDs:</h3>
            <div className="space-y-2">
              {current.given.map((fd, index) => (
                <div key={index} className="font-mono bg-gray-100 p-2 rounded">
                  {`{${fd.left}} → {${fd.right}}`}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-3">{current.question}</h3>
          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? index === current.correct
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : index === current.options.indexOf(userAnswer) && !isCorrect
                      ? 'border-red-500 bg-red-100 text-red-800'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="font-mono">{option}</span>
              </button>
            ))}
          </div>
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
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Nächste →
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Tipp:</h3>
        <p className="text-sm">
          Funktionale Abhängigkeiten beschreiben, welche Attribute andere Attribute eindeutig bestimmen. 
          Verwende die Armstrong-Axiome (Reflexivität, Erweiterung, Transitivität) um neue FDs abzuleiten.
        </p>
      </div>
    </div>
  );
};
