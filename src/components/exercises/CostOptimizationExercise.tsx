import React, { useState } from 'react';

interface Statistics {
  tableName: string;
  numTuples: number;
  numBlocks: number;
  attributes: {
    [key: string]: {
      distinctValues: number;
      minValue: number;
      maxValue: number;
    };
  };
}

interface Query {
  id: string;
  sql: string;
  description: string;
  correctPlan: string;
  explanation: string;
}

export const CostOptimizationExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const statistics: Statistics = {
    tableName: "employee",
    numTuples: 10000,
    numBlocks: 1000,
    attributes: {
      empID: { distinctValues: 10000, minValue: 1, maxValue: 10000 },
      name: { distinctValues: 9500, minValue: 1, maxValue: 1 },
      salary: { distinctValues: 500, minValue: 30000, maxValue: 150000 },
      deptID: { distinctValues: 10, minValue: 1, maxValue: 10 },
      age: { distinctValues: 50, minValue: 22, maxValue: 65 }
    }
  };

  const queries: Query[] = [
    {
      id: "query1",
      sql: "SELECT * FROM employee WHERE salary > 100000",
      description: "Alle Mitarbeiter mit Gehalt über 100.000",
      correctPlan: "Seq Scan",
      explanation: "Sequential Scan ist optimal, da keine Indizes verfügbar sind und die Selektivität hoch ist (ca. 33% der Tupel)."
    },
    {
      id: "query2",
      sql: "SELECT * FROM employee WHERE empID = 1234",
      description: "Spezifischer Mitarbeiter über empID",
      correctPlan: "Index Scan",
      explanation: "Index Scan ist optimal für Punktabfragen auf dem Primärschlüssel empID, da nur ein Tupel zurückgegeben wird."
    },
    {
      id: "query3",
      sql: "SELECT deptID, COUNT(*) FROM employee GROUP BY deptID",
      description: "Anzahl Mitarbeiter pro Abteilung",
      correctPlan: "Hash Aggregate",
      explanation: "Hash Aggregate ist optimal für Gruppierungen, da es effizienter ist als Sort + Group Aggregate für diese Datenmenge."
    },
    {
      id: "query4",
      sql: "SELECT * FROM employee WHERE salary BETWEEN 50000 AND 80000 ORDER BY name",
      description: "Mitarbeiter mit Gehalt zwischen 50.000-80.000, sortiert nach Name",
      correctPlan: "Sort + Seq Scan",
      explanation: "Sequential Scan gefolgt von Sort ist optimal, da keine Indizes verfügbar sind und die Sortierung erforderlich ist."
    }
  ];

  const executionPlans = [
    {
      id: "Seq Scan",
      name: "Sequential Scan",
      description: "Vollständiger Scan der Tabelle",
      cost: "O(n)",
      bestFor: "Große Selektivität, keine Indizes"
    },
    {
      id: "Index Scan",
      name: "Index Scan",
      description: "Verwendung eines Index für den Zugriff",
      cost: "O(log n)",
      bestFor: "Punktabfragen, kleine Selektivität"
    },
    {
      id: "Hash Aggregate",
      name: "Hash Aggregate",
      description: "Gruppierung mit Hash-Tabelle",
      cost: "O(n)",
      bestFor: "Gruppierungen, keine Sortierung nötig"
    },
    {
      id: "Sort + Seq Scan",
      name: "Sort + Sequential Scan",
      description: "Scan gefolgt von Sortierung",
      cost: "O(n log n)",
      bestFor: "Sortierung erforderlich"
    },
    {
      id: "Sort + Group Aggregate",
      name: "Sort + Group Aggregate",
      description: "Sortierung gefolgt von Gruppierung",
      cost: "O(n log n)",
      bestFor: "Gruppierung mit Sortierung"
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowResult(true);
    setIsCorrect(planId === queries[currentExercise].correctPlan);
  };

  const nextExercise = () => {
    if (currentExercise < queries.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedPlan(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedPlan(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const resetExercise = () => {
    setSelectedPlan(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const current = queries[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Kostenbasierte Optimierung - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Query {currentExercise + 1}</h2>
          <span className="text-sm text-gray-600">
            Übung {currentExercise + 1} von {queries.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">SQL-Anfrage:</h3>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm font-mono">{current.sql}</pre>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showStatistics ? 'Statistiken verstecken' : 'Statistiken anzeigen'}
            </button>
          </div>

          {showStatistics && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Tabellen-Statistiken:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Tabelle:</strong> {statistics.tableName}</div>
                <div><strong>Tupel:</strong> {statistics.numTuples.toLocaleString()}</div>
                <div><strong>Blöcke:</strong> {statistics.numBlocks.toLocaleString()}</div>
                <div className="mt-3">
                  <strong>Attribute:</strong>
                  <div className="ml-4 space-y-1">
                    {Object.entries(statistics.attributes).map(([attr, stats]) => (
                      <div key={attr}>
                        <strong>{attr}:</strong> {stats.distinctValues} distinkte Werte
                        {attr === 'salary' && <span className="text-gray-600"> (Range: {stats.minValue}-{stats.maxValue})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-medium mb-2">Welcher Ausführungsplan ist optimal?</h4>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Verfügbare Ausführungspläne:</h3>
          
          <div className="space-y-3">
            {executionPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? plan.id === current.correctPlan
                      ? 'border-green-500 bg-green-100'
                      : plan.id === selectedPlan && !isCorrect
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-gray-50'
                    : selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium">{plan.name}</div>
                <div className="text-sm text-gray-600">{plan.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Kosten: {plan.cost} | Best for: {plan.bestFor}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </h4>
              <p>{current.explanation}</p>
              
              {!isCorrect && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-sm">
                    <strong>Korrekte Antwort:</strong> {executionPlans.find(p => p.id === current.correctPlan)?.name}
                  </p>
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
              disabled={currentExercise === queries.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Nächste →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Kostenbasierte Optimierung:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Sequential Scan:</strong> O(n) - Für große Selektivität
          </div>
          <div>
            <strong>Index Scan:</strong> O(log n) - Für Punktabfragen
          </div>
          <div>
            <strong>Hash Aggregate:</strong> O(n) - Für Gruppierungen
          </div>
          <div>
            <strong>Sort + Scan:</strong> O(n log n) - Wenn Sortierung nötig
          </div>
        </div>
      </div>
    </div>
  );
};
