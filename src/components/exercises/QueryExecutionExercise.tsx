import React, { useState } from 'react';

interface ExecutionStep {
  id: number;
  description: string;
  sqlClause: string;
  example: string;
}

export const QueryExecutionExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const exercises = [
    {
      title: "SQL-Ausführungsreihenfolge",
      description: "Ordne die SQL-Klauseln in der Reihenfolge, in der sie tatsächlich ausgeführt werden.",
      sqlQuery: `SELECT title, COUNT(*)
FROM professor, course
WHERE name='Socrates' AND empID=taughtBy
GROUP BY title
HAVING COUNT(*) > 1
ORDER BY title;`,
      steps: [
        { id: 1, description: "Kartesisches Produkt der Tabellen in der FROM-Klausel", sqlClause: "FROM", example: "professor × course" },
        { id: 2, description: "Prädikate in der WHERE-Klausel anwenden", sqlClause: "WHERE", example: "name='Socrates' AND empID=taughtBy" },
        { id: 3, description: "GROUP BY-Klausel ausführen", sqlClause: "GROUP BY", example: "GROUP BY title" },
        { id: 4, description: "HAVING-Klausel anwenden (Gruppen eliminieren)", sqlClause: "HAVING", example: "HAVING COUNT(*) > 1" },
        { id: 5, description: "Aggregatfunktionen berechnen", sqlClause: "Aggregate", example: "COUNT(*)" },
        { id: 6, description: "Projektion auf SELECT-Spalten", sqlClause: "SELECT", example: "title, COUNT(*)" },
        { id: 7, description: "ORDER BY-Klausel ausführen", sqlClause: "ORDER BY", example: "ORDER BY title" }
      ],
      correctOrder: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      title: "SQL vs. Ausführungsreihenfolge",
      description: "Vergleiche die geschriebene SQL-Reihenfolge mit der tatsächlichen Ausführungsreihenfolge.",
      sqlQuery: `SELECT deptName, AVG(salary)
FROM employee, department
WHERE empID = managerID AND salary > 50000
GROUP BY deptName
HAVING AVG(salary) > 60000
ORDER BY AVG(salary) DESC;`,
      steps: [
        { id: 1, description: "FROM: Tabellen laden", sqlClause: "FROM", example: "employee, department" },
        { id: 2, description: "WHERE: Bedingungen filtern", sqlClause: "WHERE", example: "empID = managerID AND salary > 50000" },
        { id: 3, description: "GROUP BY: Gruppierung", sqlClause: "GROUP BY", example: "GROUP BY deptName" },
        { id: 4, description: "HAVING: Gruppen filtern", sqlClause: "HAVING", example: "HAVING AVG(salary) > 60000" },
        { id: 5, description: "Aggregate: Funktionen berechnen", sqlClause: "Aggregate", example: "AVG(salary)" },
        { id: 6, description: "SELECT: Spalten auswählen", sqlClause: "SELECT", example: "deptName, AVG(salary)" },
        { id: 7, description: "ORDER BY: Sortierung", sqlClause: "ORDER BY", example: "ORDER BY AVG(salary) DESC" }
      ],
      correctOrder: [1, 2, 3, 4, 5, 6, 7]
    }
  ];

  const handleStepClick = (stepId: number) => {
    if (userOrder.includes(stepId)) {
      setUserOrder(userOrder.filter(id => id !== stepId));
    } else {
      setUserOrder([...userOrder, stepId]);
    }
  };

  const checkAnswer = () => {
    setShowResult(true);
    setIsCorrect(JSON.stringify(userOrder) === JSON.stringify(exercises[currentExercise].correctOrder));
  };

  const resetExercise = () => {
    setUserOrder([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      resetExercise();
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      resetExercise();
    }
  };

  const current = exercises[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SQL-Ausführungsreihenfolge - Interaktive Übungen</h1>
      
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
          <h3 className="font-semibold mb-4">SQL-Anfrage:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm font-mono whitespace-pre-wrap">{current.sqlQuery}</pre>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Deine Reihenfolge:</h4>
            <div className="space-y-2 min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
              {userOrder.map((stepId, index) => {
                const step = current.steps.find(s => s.id === stepId);
                return step ? (
                  <div key={stepId} className="flex items-center bg-blue-100 p-2 rounded">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-medium">{step.sqlClause}:</span> {step.description}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Verfügbare Schritte:</h3>
          <div className="space-y-3">
            {current.steps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? userOrder.includes(step.id)
                      ? step.id === exercises[currentExercise].correctOrder[userOrder.indexOf(step.id)]
                        ? 'border-green-500 bg-green-100'
                        : 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-gray-50'
                    : userOrder.includes(step.id)
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium text-blue-600">{step.sqlClause}</div>
                <div className="text-sm text-gray-700">{step.description}</div>
                <div className="text-xs text-gray-500 mt-1">{step.example}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={checkAnswer}
              disabled={userOrder.length !== current.steps.length || showResult}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Antwort prüfen
            </button>
          </div>

          {showResult && (
            <div className={`mt-4 p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </h4>
              {isCorrect ? (
                <p>Perfekt! Du verstehst die SQL-Ausführungsreihenfolge korrekt.</p>
              ) : (
                <div>
                  <p className="mb-2">Die korrekte Reihenfolge ist:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {exercises[currentExercise].correctOrder.map((stepId, index) => {
                      const step = current.steps.find(s => s.id === stepId);
                      return (
                        <li key={stepId}>
                          {step?.sqlClause}: {step?.description}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
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
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Wichtige Erkenntnisse:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>SQL ist deklarativ:</strong> Du beschreibst WAS du willst, nicht WIE es ausgeführt wird</li>
          <li>• <strong>Ausführungsreihenfolge:</strong> FROM → WHERE → GROUP BY → HAVING → Aggregate → SELECT → ORDER BY</li>
          <li>• <strong>Optimierung:</strong> Das DBMS wählt automatisch den effizientesten Ausführungsplan</li>
        </ul>
      </div>
    </div>
  );
};
