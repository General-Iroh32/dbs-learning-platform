import React, { useState } from 'react';

interface DivisionStep {
  step: number;
  title: string;
  description: string;
  formula: string;
  result: any[];
  explanation: string;
}

export const RADivisionExercise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const divisionSteps: DivisionStep[] = [
    {
      step: 1,
      title: 'Gegebene Relationen',
      description: 'Wir haben zwei Relationen: R (Dividend) und S (Divisor)',
      formula: 'R ÷ S',
      result: [
        { R: 'R(A,B)', S: 'S(B)' },
        { R: 'R = {(1,2), (1,3), (2,3), (3,4)}', S: 'S = {(2), (3)}' }
      ],
      explanation: 'Die Division R ÷ S findet alle A-Werte aus R, die mit ALLEN B-Werten aus S kombiniert werden können.'
    },
    {
      step: 2,
      title: 'Schritt 1: Projektion von R-S',
      description: 'Projiziere R auf die Attribute, die nicht in S sind',
      formula: 'π_(R-S)(R)',
      result: [
        { A: 1 },
        { A: 2 },
        { A: 3 }
      ],
      explanation: 'π_A(R) gibt alle A-Werte aus R zurück: {1, 2, 3}'
    },
    {
      step: 3,
      title: 'Schritt 2: Kreuzprodukt mit S',
      description: 'Bilde das Kreuzprodukt der Projektion mit S',
      formula: 'π_(R-S)(R) × S',
      result: [
        { A: 1, B: 2 },
        { A: 1, B: 3 },
        { A: 2, B: 2 },
        { A: 2, B: 3 },
        { A: 3, B: 2 },
        { A: 3, B: 3 }
      ],
      explanation: 'Jeder A-Wert wird mit jedem B-Wert aus S kombiniert: {1,2}, {1,3}, {2,2}, {2,3}, {3,2}, {3,3}'
    },
    {
      step: 4,
      title: 'Schritt 3: Differenz von R',
      description: 'Entferne die Tupel, die bereits in R existieren',
      formula: '(π_(R-S)(R) × S) - R',
      result: [
        { A: 2, B: 2 },
        { A: 3, B: 2 },
        { A: 3, B: 3 }
      ],
      explanation: 'Entferne {(1,2), (1,3), (2,3)} aus dem Kreuzprodukt. Übrig bleiben: {(2,2), (3,2), (3,3)}'
    },
    {
      step: 5,
      title: 'Schritt 4: Projektion auf R-S',
      description: 'Projiziere das Ergebnis auf die A-Attribute',
      formula: 'π_(R-S)((π_(R-S)(R) × S) - R)',
      result: [
        { A: 2 },
        { A: 3 }
      ],
      explanation: 'Die A-Werte, die NICHT mit allen B-Werten aus S kombiniert werden können: {2, 3}'
    },
    {
      step: 6,
      title: 'Schritt 5: Finale Differenz',
      description: 'Entferne die "schlechten" A-Werte von allen A-Werten',
      formula: 'π_(R-S)(R) - π_(R-S)((π_(R-S)(R) × S) - R)',
      result: [
        { A: 1 }
      ],
      explanation: 'Alle A-Werte {1, 2, 3} minus die schlechten {2, 3} = {1}. A=1 ist der einzige Wert, der mit ALLEN B-Werten aus S kombiniert werden kann.'
    }
  ];

  const practicalExample = {
    title: 'Praktisches Beispiel: Studenten und Kurse',
    description: 'Finde Studenten, die ALLE Kurse mit 6 ECTS belegen',
    schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
    query: 'π_studID,Name(Student ⋈ (Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))))',
    steps: [
      '1. Finde alle 6-ECTS-Kurse: σ_ECTS = 6(Kurs)',
      '2. Projiziere auf courseID: π_courseID(σ_ECTS = 6(Kurs))',
      '3. Division: Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))',
      '4. Join mit Student: Student ⋈ (Belegt ÷ ...)',
      '5. Projektion auf studID, Name: π_studID,Name(...)'
    ]
  };

  const nextStep = () => {
    if (currentStep < divisionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetExercise = () => {
    setCurrentStep(0);
  };

  const currentDivisionStep = divisionSteps[currentStep];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Relationale Division - Schritt für Schritt</h1>
      <p className="text-gray-600 mb-8">
        Lerne die komplexe relationale Division durch detaillierte Beispiele und Erklärungen.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theoretische Erklärung */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Formale Definition</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <p className="font-mono text-lg font-bold">R ÷ S = π_(R-S)(R) - π_(R-S)((π_(R-S)(R) × S) - R)</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600">Was macht die Division?</h3>
              <p className="text-sm text-gray-700">
                Findet Tupel aus R, die mit <strong>ALLEN</strong> Tupeln aus S kombiniert werden können.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-600">Wann wird sie verwendet?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• "Finde Studenten, die ALLE Kurse belegen"</li>
                <li>• "Finde Mitarbeiter, die ALLE Fähigkeiten haben"</li>
                <li>• "Finde Produkte, die in ALLEN Filialen verkauft werden"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Praktisches Beispiel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Praktisches Beispiel</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <h3 className="font-semibold text-yellow-800">{practicalExample.title}</h3>
            <p className="text-sm text-yellow-700">{practicalExample.description}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Schema:</h4>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{practicalExample.schema}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">RA-Ausdruck:</h4>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{practicalExample.query}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Schritte:</h4>
            <ol className="text-sm text-gray-700 space-y-1">
              {practicalExample.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-mono text-blue-600 mr-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Schritt-für-Schritt Durchführung */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Schritt-für-Schritt Durchführung</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Schritt {currentStep + 1} von {divisionSteps.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / divisionSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            {currentDivisionStep.step}. {currentDivisionStep.title}
          </h3>
          <p className="text-gray-700 mb-4">{currentDivisionStep.description}</p>
          
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Formel:</h4>
            <p className="font-mono text-lg">{currentDivisionStep.formula}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Ergebnis:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(currentDivisionStep.result[0] || {}).map((key) => (
                      <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentDivisionStep.result.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-800 mb-2">Erklärung:</h4>
            <p className="text-green-700">{currentDivisionStep.explanation}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vorheriger Schritt
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={resetExercise}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Zurücksetzen
            </button>
            
            {currentStep < divisionSteps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Nächster Schritt
              </button>
            ) : (
              <div className="px-4 py-2 bg-green-500 text-white rounded">
                Division abgeschlossen!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zusammenfassung */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Zusammenfassung der Division</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">Die Division R ÷ S findet:</h4>
            <ul className="space-y-1">
              <li>• Tupel aus R, die mit ALLEN Tupeln aus S kombiniert werden können</li>
              <li>• Nur die Attribute, die in R aber nicht in S sind</li>
              <li>• Verwendet für "für alle"-Abfragen</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Wichtige Punkte:</h4>
            <ul className="space-y-1">
              <li>• Sehr mächtig, aber komplex zu verstehen</li>
              <li>• Kann durch andere Operatoren ausgedrückt werden</li>
              <li>• Wird oft in SQL mit EXISTS/NOT EXISTS gelöst</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
