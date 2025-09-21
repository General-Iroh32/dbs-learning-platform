import React, { useState } from 'react';

interface ComplexExample {
  id: string;
  title: string;
  description: string;
  raExpression: string;
  stepByStep: {
    step: number;
    description: string;
    subExpression: string;
    result: any[];
    explanation: string;
  }[];
  tables: {
    name: string;
    schema: string;
    data: any[];
  }[];
}

export const RAComplexExercise: React.FC = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const examples: ComplexExample[] = [
    {
      id: 'wine-query',
      title: 'Wein-Abfrage mit Joins',
      description: 'Finde alle Weine aus Kalifornien, die nach 2000 produziert wurden',
      raExpression: 'π_name,color,vineyard(σ_year > 2000(wines) ⨝ σ_region = "California"(producer))',
      stepByStep: [
        {
          step: 1,
          description: 'Selektion der Weine nach 2000',
          subExpression: 'σ_year > 2000(wines)',
          result: [
            { wineID: 2168, name: 'Creek Shiraz', color: 'red', year: 2003, vineyard: 'Creek' },
            { wineID: 3456, name: 'Zinfandel', color: 'red', year: 2004, vineyard: 'Helena' },
            { wineID: 2171, name: 'Pinot Noir', color: 'red', year: 2001, vineyard: 'Creek' },
            { wineID: 4961, name: 'Chardonnay', color: 'white', year: 2002, vineyard: 'Bighorn' }
          ],
          explanation: 'Filtere alle Weine, die nach dem Jahr 2000 produziert wurden.'
        },
        {
          step: 2,
          description: 'Selektion der Produzenten aus Kalifornien',
          subExpression: 'σ_region = "California"(producer)',
          result: [
            { vineyard: 'Helena', area: 'Napa Valley', region: 'California' },
            { vineyard: 'Bighorn', area: 'Napa Valley', region: 'California' }
          ],
          explanation: 'Filtere alle Produzenten, die in Kalifornien ansässig sind.'
        },
        {
          step: 3,
          description: 'Natural Join der gefilterten Relationen',
          subExpression: 'σ_year > 2000(wines) ⨝ σ_region = "California"(producer)',
          result: [
            { wineID: 3456, name: 'Zinfandel', color: 'red', year: 2004, vineyard: 'Helena', area: 'Napa Valley', region: 'California' },
            { wineID: 4961, name: 'Chardonnay', color: 'white', year: 2002, vineyard: 'Bighorn', area: 'Napa Valley', region: 'California' }
          ],
          explanation: 'Verbinde die Weine mit den Produzenten über das vineyard-Attribut. Nur Weine mit passenden Produzenten bleiben übrig.'
        },
        {
          step: 4,
          description: 'Projektion auf gewünschte Attribute',
          subExpression: 'π_name,color,vineyard(...)',
          result: [
            { name: 'Zinfandel', color: 'red', vineyard: 'Helena' },
            { name: 'Chardonnay', color: 'white', vineyard: 'Bighorn' }
          ],
          explanation: 'Wähle nur die gewünschten Attribute aus: Name, Farbe und Weingut.'
        }
      ],
      tables: [
        {
          name: 'wines',
          schema: 'wines(wineID, name, color, year, vineyard)',
          data: [
            { wineID: 1042, name: 'La Rose Grand Cru', color: 'red', year: 1998, vineyard: 'Château La Rose' },
            { wineID: 2168, name: 'Creek Shiraz', color: 'red', year: 2003, vineyard: 'Creek' },
            { wineID: 3456, name: 'Zinfandel', color: 'red', year: 2004, vineyard: 'Helena' },
            { wineID: 2171, name: 'Pinot Noir', color: 'red', year: 2001, vineyard: 'Creek' },
            { wineID: 3478, name: 'Pinot Noir', color: 'red', year: 1999, vineyard: 'Helena' },
            { wineID: 4711, name: 'Riesling Reserve', color: 'white', year: 1999, vineyard: 'Müller' },
            { wineID: 4961, name: 'Chardonnay', color: 'white', year: 2002, vineyard: 'Bighorn' }
          ]
        },
        {
          name: 'producer',
          schema: 'producer(vineyard, area, region)',
          data: [
            { vineyard: 'Creek', area: 'Barossa Valley', region: 'South Australia' },
            { vineyard: 'Helena', area: 'Napa Valley', region: 'California' },
            { vineyard: 'Château La Rose', area: 'Saint-Emilion', region: 'Bordeaux' },
            { vineyard: 'Château La Pointe', area: 'Pomerol', region: 'Bordeaux' },
            { vineyard: 'Müller', area: 'Rheingau', region: 'Hessen' },
            { vineyard: 'Bighorn', area: 'Napa Valley', region: 'California' }
          ]
        }
      ]
    },
    {
      id: 'prerequisite-query',
      title: 'Vorgänger-Abfrage',
      description: 'Finde Vorgänger zweiter Stufe der Vorlesung 5216',
      raExpression: 'π_V1.course(σ_V2.successor = 5216 ∧ V1.successor = V2.course(ρ_V1(prerequisite) × ρ_V2(prerequisite)))',
      stepByStep: [
        {
          step: 1,
          description: 'Umbenennung der prerequisite-Relation',
          subExpression: 'ρ_V1(prerequisite) × ρ_V2(prerequisite)',
          result: [
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5001, 'V2.successor': 5041 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5001, 'V2.successor': 5043 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5001, 'V2.successor': 5049 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5041, 'V2.successor': 5216 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5043, 'V2.successor': 5052 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5041, 'V2.successor': 5052 },
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5052, 'V2.successor': 5259 },
            // ... weitere Kombinationen
          ],
          explanation: 'Bilde das Kreuzprodukt der prerequisite-Relation mit sich selbst, um alle möglichen Kombinationen zu finden.'
        },
        {
          step: 2,
          description: 'Selektion der relevanten Tupel',
          subExpression: 'σ_V2.successor = 5216 ∧ V1.successor = V2.course(...)',
          result: [
            { 'V1.course': 5001, 'V1.successor': 5041, 'V2.course': 5041, 'V2.successor': 5216 }
          ],
          explanation: 'Finde Tupel, wo V2.successor = 5216 (Zielvorlesung) und V1.successor = V2.course (Verkettung der Vorgänger).'
        },
        {
          step: 3,
          description: 'Projektion auf V1.course',
          subExpression: 'π_V1.course(...)',
          result: [
            { 'V1.course': 5001 }
          ],
          explanation: 'Wähle nur die V1.course-Attribute aus, um die Vorgänger zweiter Stufe zu erhalten.'
        }
      ],
      tables: [
        {
          name: 'prerequisite',
          schema: 'prerequisite(course, successor)',
          data: [
            { course: 5001, successor: 5041 },
            { course: 5001, successor: 5043 },
            { course: 5001, successor: 5049 },
            { course: 5041, successor: 5216 },
            { course: 5043, successor: 5052 },
            { course: 5041, successor: 5052 },
            { course: 5052, successor: 5259 }
          ]
        }
      ]
    },
    {
      id: 'student-department-query',
      title: 'Studenten-Abteilungs-Abfrage',
      description: 'Finde Abteilungen, die nur von Dozenten, aber nicht von Studenten vertreten sind',
      raExpression: 'π_dept_name(instructor) - π_dept_name(student)',
      stepByStep: [
        {
          step: 1,
          description: 'Projektion der Dozenten-Abteilungen',
          subExpression: 'π_dept_name(instructor)',
          result: [
            { dept_name: 'Comp. Sci.' },
            { dept_name: 'Music' },
            { dept_name: 'History' },
            { dept_name: 'Biology' },
            { dept_name: 'Elec. Eng.' },
            { dept_name: 'Finance' },
            { dept_name: 'Physics' }
          ],
          explanation: 'Sammle alle Abteilungen, in denen Dozenten arbeiten.'
        },
        {
          step: 2,
          description: 'Projektion der Studenten-Abteilungen',
          subExpression: 'π_dept_name(student)',
          result: [
            { dept_name: 'Comp. Sci.' },
            { dept_name: 'History' },
            { dept_name: 'Finance' },
            { dept_name: 'Physics' },
            { dept_name: 'Music' }
          ],
          explanation: 'Sammle alle Abteilungen, in denen Studenten eingeschrieben sind.'
        },
        {
          step: 3,
          description: 'Differenz der Abteilungen',
          subExpression: 'π_dept_name(instructor) - π_dept_name(student)',
          result: [
            { dept_name: 'Biology' },
            { dept_name: 'Elec. Eng.' }
          ],
          explanation: 'Entferne alle Abteilungen, die auch von Studenten vertreten sind. Übrig bleiben nur Abteilungen mit Dozenten, aber ohne Studenten.'
        }
      ],
      tables: [
        {
          name: 'instructor',
          schema: 'instructor(ID, name, dept_name, salary)',
          data: [
            { ID: 10101, name: 'Srinivasan', dept_name: 'Comp. Sci.', salary: 65000 },
            { ID: 12121, name: 'Wu', dept_name: 'Finance', salary: 90000 },
            { ID: 15151, name: 'Mozart', dept_name: 'Music', salary: 40000 },
            { ID: 22222, name: 'Einstein', dept_name: 'Physics', salary: 95000 },
            { ID: 32343, name: 'El Said', dept_name: 'History', salary: 60000 },
            { ID: 33456, name: 'Gold', dept_name: 'Physics', salary: 87000 },
            { ID: 45565, name: 'Katz', dept_name: 'Comp. Sci.', salary: 75000 },
            { ID: 58583, name: 'Califieri', dept_name: 'History', salary: 62000 },
            { ID: 76543, name: 'Singh', dept_name: 'Finance', salary: 80000 },
            { ID: 76766, name: 'Crick', dept_name: 'Biology', salary: 72000 },
            { ID: 83821, name: 'Brandt', dept_name: 'Comp. Sci.', salary: 92000 },
            { ID: 98345, name: 'Kim', dept_name: 'Elec. Eng.', salary: 80000 }
          ]
        },
        {
          name: 'student',
          schema: 'student(ID, name, dept_name, tot_cred)',
          data: [
            { ID: 128, name: 'Zhang', dept_name: 'Comp. Sci.', tot_cred: 102 },
            { ID: 12345, name: 'Shankar', dept_name: 'Comp. Sci.', tot_cred: 32 },
            { ID: 19991, name: 'Brandt', dept_name: 'History', tot_cred: 80 },
            { ID: 23121, name: 'Chavez', dept_name: 'Finance', tot_cred: 110 },
            { ID: 44553, name: 'Peltier', dept_name: 'Physics', tot_cred: 56 },
            { ID: 45678, name: 'Levy', dept_name: 'Physics', tot_cred: 46 },
            { ID: 54321, name: 'Williams', dept_name: 'Comp. Sci.', tot_cred: 54 },
            { ID: 55739, name: 'Sanchez', dept_name: 'Music', tot_cred: 38 },
            { ID: 70557, name: 'Snow', dept_name: 'Physics', tot_cred: 0 },
            { ID: 76543, name: 'Brown', dept_name: 'Comp. Sci.', tot_cred: 58 },
            { ID: 76653, name: 'Aoi', dept_name: 'Elec. Eng.', tot_cred: 60 },
            { ID: 98765, name: 'Bourikas', dept_name: 'Elec. Eng.', tot_cred: 98 },
            { ID: 98988, name: 'Tanaka', dept_name: 'Biology', tot_cred: 120 }
          ]
        }
      ]
    }
  ];

  const currentEx = examples[currentExample];
  const currentStepData = currentEx.stepByStep[currentStep];

  const nextStep = () => {
    if (currentStep < currentEx.stepByStep.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextExample = () => {
    if (currentExample < examples.length - 1) {
      setCurrentExample(currentExample + 1);
      setCurrentStep(0);
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
      setCurrentStep(0);
    }
  };

  const resetExercise = () => {
    setCurrentStep(0);
  };

  const renderTable = (table: any) => {
    if (!table.data || table.data.length === 0) return null;
    
    const columns = Object.keys(table.data[0]);
    
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">{table.name}:</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => (
                  <th key={col} className="border border-gray-300 px-4 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row: any, index: number) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col} className="border border-gray-300 px-4 py-2">
                      {String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Komplexe RA-Ausdrücke</h1>
      <p className="text-gray-600 mb-8">
        Lerne komplexe relationale Algebra-Ausdrücke durch detaillierte Schritt-für-Schritt Beispiele.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Beispiel {currentExample + 1} von {examples.length}: {currentEx.title}
            </h2>
            <div className="text-sm text-gray-600">
              Schwierigkeit: {currentExample === 0 ? 'Mittel' : currentExample === 1 ? 'Schwer' : 'Sehr schwer'}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{currentEx.description}</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">RA-Ausdruck:</h3>
          <p className="font-mono text-lg">{currentEx.raExpression}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tabellen */}
          <div>
            <h3 className="font-semibold mb-4">Gegebene Tabellen:</h3>
            {currentEx.tables.map((table, index) => (
              <div key={index} className="mb-6">
                <div className="text-sm text-gray-600 mb-2 font-mono">{table.schema}</div>
                {renderTable(table)}
              </div>
            ))}
          </div>

          {/* Schritt-für-Schritt */}
          <div>
            <h3 className="font-semibold mb-4">Schritt-für-Schritt Auswertung:</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-blue-800">
                  Schritt {currentStep + 1}: {currentStepData.description}
                </h4>
                <span className="text-sm text-gray-600">
                  {currentStep + 1} von {currentEx.stepByStep.length}
                </span>
              </div>
              
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
                <h5 className="font-semibold text-gray-800 mb-2">Teilausdruck:</h5>
                <p className="font-mono text-lg">{currentStepData.subExpression}</p>
              </div>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2">Ergebnis:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        {currentStepData.result.length > 0 && Object.keys(currentStepData.result[0]).map((key) => (
                          <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentStepData.result.map((row, index) => (
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
                <h5 className="font-semibold text-green-800 mb-2">Erklärung:</h5>
                <p className="text-green-700">{currentStepData.explanation}</p>
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
                
                {currentStep < currentEx.stepByStep.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Nächster Schritt
                  </button>
                ) : (
                  <div className="px-4 py-2 bg-green-500 text-white rounded">
                    Ausdruck abgeschlossen!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={prevExample}
            disabled={currentExample === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vorheriges Beispiel
          </button>
          
          {currentExample < examples.length - 1 ? (
            <button
              onClick={nextExample}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Nächstes Beispiel
            </button>
          ) : (
            <div className="px-4 py-2 bg-green-500 text-white rounded">
              Alle Beispiele abgeschlossen!
            </div>
          )}
        </div>
      </div>

      {/* Tipps */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">💡 Tipps für komplexe RA-Ausdrücke</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
          <div>
            <h4 className="font-semibold mb-2">Auswertungsreihenfolge:</h4>
            <ul className="space-y-1">
              <li>• Von innen nach außen</li>
              <li>• Zuerst unäre Operatoren (π, σ, ρ)</li>
              <li>• Dann binäre Operatoren (×, ⨝, ∪, -)</li>
              <li>• Klammern beachten!</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Häufige Muster:</h4>
            <ul className="space-y-1">
              <li>• Selektion vor Join (Performance)</li>
              <li>• Projektion am Ende (nur benötigte Attribute)</li>
              <li>• Umbenennung bei Namenskonflikten</li>
              <li>• Division für "für alle"-Abfragen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
