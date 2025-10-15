import React, { useState } from 'react';


export const RMExercise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const exercises = [
    {
      title: "Zulässige Relationen erkennen",
      description: "Welche der folgenden Relationen ist nach dem relationalen Modell zulässig?",
      tables: [
        {
          name: "Option A",
          data: [
            { name: "Pat", age: 1 },
            { name: "Fred", age: 2 },
            { name: "Sue", age: 3 },
            { name: "Pam", age: 4 }
          ],
          correct: true
        },
        {
          name: "Option B",
          data: [
            { name: "Pat", age: 1 },
            { name: "Fred", age: 2 },
            { name: "Sue", age: 3 },
            { name: "Sue", age: 3 }
          ],
          correct: false,
          reason: "Duplikate sind nicht erlaubt"
        },
        {
          name: "Option C",
          data: [
            { name: "Pat Jensen", age: 1 },
            { name: "Fred D. Roosevelt", age: 2 },
            { name: "Sue H.M.I. Knuth", age: 3 }
          ],
          correct: false,
          reason: "Name ist nicht atomar (enthält mehrere Werte)"
        },
        {
          name: "Option D",
          data: [
            { name: "Pat", age: 1, hobbies: ["Lesen", "Schwimmen"] },
            { name: "Fred", age: 2, hobbies: ["Fahrrad"] }
          ],
          correct: false,
          reason: "Listen als Attributwerte sind nicht atomar"
        }
      ]
    },
    {
      title: "Primär- und Fremdschlüssel identifizieren",
      description: "Identifiziere Primär- und Fremdschlüssel in der folgenden Datenbank:",
      tables: [
        {
          name: "Student",
          data: [
            { studID: 1, name: "Anna", semester: 3 },
            { studID: 2, name: "Bob", semester: 5 },
            { studID: 3, name: "Clara", semester: 3 }
          ],
          primaryKey: "studID",
          foreignKeys: []
        },
        {
          name: "Kurs",
          data: [
            { courseID: "DB1", title: "Datenbanken", ects: 6 },
            { courseID: "ALG", title: "Algorithmen", ects: 5 },
            { courseID: "WEB", title: "Webentwicklung", ects: 4 }
          ],
          primaryKey: "courseID",
          foreignKeys: []
        },
        {
          name: "Belegt",
          data: [
            { studID: 1, courseID: "DB1" },
            { studID: 1, courseID: "ALG" },
            { studID: 2, courseID: "DB1" },
            { studID: 3, courseID: "WEB" }
          ],
          primaryKey: "studID, courseID",
          foreignKeys: ["studID → Student.studID", "courseID → Kurs.courseID"]
        }
      ]
    },
    {
      title: "Vereinigungskompatibilität prüfen",
      description: "Welche der folgenden Relationenpaare sind vereinigungskompatibel?",
      tables: [
        {
          name: "R1(A: string, B: int)",
          data: [
            { A: "x", B: 1 },
            { A: "y", B: 2 }
          ]
        },
        {
          name: "R2(A: string, B: int)",
          data: [
            { A: "z", B: 3 },
            { A: "w", B: 4 }
          ]
        },
        {
          name: "S1(C: string, D: int)",
          data: [
            { C: "a", D: 5 },
            { C: "b", D: 6 }
          ]
        }
      ],
      compatible: ["R1 und R2"],
      incompatible: ["R1 und S1", "R2 und S1"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (currentStep === 0) {
      if (answer === "A") {
        setResult("Richtig! Option A ist zulässig: atomare Werte, keine Duplikate.");
        setScore(score + 1);
      } else {
        setResult("Falsch! Die anderen Optionen verletzen die Regeln des relationalen Modells.");
      }
    } else if (currentStep === 1) {
      setResult("Primärschlüssel: Student.studID, Kurs.courseID, Belegt.(studID, courseID). Fremdschlüssel: Belegt.studID → Student.studID, Belegt.courseID → Kurs.courseID");
    } else if (currentStep === 2) {
      if (answer === "R1 und R2") {
        setResult("Richtig! R1 und R2 haben gleiche Anzahl Attribute mit gleichen Domänen.");
        setScore(score + 1);
      } else {
        setResult("Falsch! R1 und S1 sowie R2 und S1 haben unterschiedliche Attributnamen und Domänen.");
      }
    }
  };

  const nextStep = () => {
    if (currentStep < exercises.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setResult(null);
    } else {
      setResult(`Übung abgeschlossen! Dein Score: ${score}/${exercises.length}`);
    }
  };

  const resetExercise = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setResult(null);
    setScore(0);
  };

  const renderTable = (table: any) => (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{table.name}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(table.data[0] || {}).map((key) => (
                <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                  {key}
                  {table.primaryKey?.includes(key) && <span className="text-blue-600 ml-1">(PK)</span>}
                  {table.foreignKeys?.some((fk: string) => fk.includes(key)) && <span className="text-green-600 ml-1">(FK)</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.data.map((row: any, index: number) => (
              <tr key={index}>
                {Object.values(row).map((value: any, cellIndex: number) => (
                  <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                    {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.reason && (
        <p className="text-sm text-red-600 mt-1">{table.reason}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: Relationales Modell</h1>
      <p className="text-gray-600 mb-8">
        Lerne die Grundlagen des relationalen Modells durch praktische Übungen.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Übung {currentStep + 1} von {exercises.length}: {exercises[currentStep].title}
            </h2>
            <div className="text-sm text-gray-600">
              Score: {score}/{exercises.length}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{exercises[currentStep].description}</p>
        </div>

        {currentStep === 0 && (
          <div className="space-y-4">
            {exercises[0].tables.map((table, index) => (
              <div key={index} className="border rounded-lg p-4">
                {renderTable(table)}
                <button
                  onClick={() => handleAnswer(String.fromCharCode(65 + index))}
                  className={`px-4 py-2 rounded ${
                    selectedAnswer === String.fromCharCode(65 + index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Option {String.fromCharCode(65 + index)}
                </button>
              </div>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            {exercises[1].tables.map((table, index) => (
              <div key={index}>
                {renderTable(table)}
              </div>
            ))}
            <button
              onClick={() => handleAnswer("show")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Lösung anzeigen
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            {exercises[2].tables.map((table, index) => (
              <div key={index}>
                {renderTable(table)}
              </div>
            ))}
            <div className="space-y-2">
              <button
                onClick={() => handleAnswer("R1 und R2")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedAnswer === "R1 und R2"
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                R1 und R2
              </button>
              <button
                onClick={() => handleAnswer("R1 und S1")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedAnswer === "R1 und S1"
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                R1 und S1
              </button>
              <button
                onClick={() => handleAnswer("R2 und S1")}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedAnswer === "R2 und S1"
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                R2 und S1
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <p className="text-blue-800">{result}</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Zurücksetzen
          </button>
          {currentStep < exercises.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!selectedAnswer}
            >
              Nächste Übung
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Abschließen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
