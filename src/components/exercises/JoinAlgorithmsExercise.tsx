import React, { useState } from 'react';

interface JoinAlgorithm {
  id: string;
  name: string;
  description: string;
  costFormula: string;
  bestCase: string;
  worstCase: string;
  requirements: string[];
}

interface Scenario {
  id: string;
  description: string;
  table1: { name: string; size: number; sorted: boolean; indexed: boolean };
  table2: { name: string; size: number; sorted: boolean; indexed: boolean };
  joinType: string;
  bestAlgorithm: string;
  explanation: string;
}

export const JoinAlgorithmsExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCostCalculation, setShowCostCalculation] = useState(false);

  const algorithms: JoinAlgorithm[] = [
    {
      id: "nested-loop",
      name: "Nested Loop Join",
      description: "Brute-Force-Strategie: Jedes Tupel der äußeren Relation wird mit jedem Tupel der inneren Relation verglichen.",
      costFormula: "b_outer + (ceil(b_outer / (nB - 2)) * b_inner)",
      bestCase: "Kleine äußere Relation, große innere Relation",
      worstCase: "Beide Relationen sehr groß",
      requirements: ["Keine speziellen Anforderungen"]
    },
    {
      id: "index-nested-loop",
      name: "Index-based Nested Loop Join",
      description: "Nutzt einen Index für die innere Relation, um den vollständigen Scan zu vermeiden.",
      costFormula: "b_outer + (n_outer * cost_index_lookup)",
      bestCase: "Index auf Join-Attribut der inneren Relation",
      worstCase: "Kein passender Index verfügbar",
      requirements: ["Index auf Join-Attribut der inneren Relation"]
    },
    {
      id: "sort-merge",
      name: "Sort-Merge Join",
      description: "Beide Relationen werden auf den Join-Attributen sortiert und dann wie ein Reißverschluss durchlaufen.",
      costFormula: "b1 + b2 (wenn bereits sortiert)",
      bestCase: "Beide Relationen bereits sortiert",
      worstCase: "Beide Relationen müssen sortiert werden",
      requirements: ["Beide Relationen auf Join-Attributen sortiert"]
    },
    {
      id: "hash-join",
      name: "Hash Join",
      description: "Beide Relationen werden mit einer Hashfunktion partitioniert, dann werden passende Buckets gejoint.",
      costFormula: "3 * (b1 + b2)",
      bestCase: "Kleinere Relation passt in den Hauptspeicher",
      worstCase: "Beide Relationen sehr groß",
      requirements: ["Gleichheits-Join", "Ausreichend Hauptspeicher"]
    }
  ];

  const scenarios: Scenario[] = [
    {
      id: "scenario1",
      description: "Join zwischen einer kleinen Kundentabelle (100 Blöcke) und einer großen Bestelltabelle (10.000 Blöcke). Beide Tabellen sind unsortiert, aber die Bestelltabelle hat einen Index auf customerID.",
      table1: { name: "Customer", size: 100, sorted: false, indexed: false },
      table2: { name: "Orders", size: 10000, sorted: false, indexed: true },
      joinType: "Customer.customerID = Orders.customerID",
      bestAlgorithm: "index-nested-loop",
      explanation: "Index-based Nested Loop ist optimal, da die kleine Customer-Tabelle als äußere Relation verwendet wird und die große Orders-Tabelle einen Index auf dem Join-Attribut hat."
    },
    {
      id: "scenario2",
      description: "Join zwischen zwei großen Tabellen (je 5.000 Blöcke), beide sind bereits auf den Join-Attributen sortiert. Keine Indizes verfügbar.",
      table1: { name: "Products", size: 5000, sorted: true, indexed: false },
      table2: { name: "Sales", size: 5000, sorted: true, indexed: false },
      joinType: "Products.productID = Sales.productID",
      bestAlgorithm: "sort-merge",
      explanation: "Sort-Merge Join ist optimal, da beide Relationen bereits sortiert sind und keine zusätzlichen Sortierungskosten anfallen."
    },
    {
      id: "scenario3",
      description: "Join zwischen einer mittelgroßen Tabelle (1.000 Blöcke) und einer sehr großen Tabelle (50.000 Blöcke). Beide sind unsortiert, keine Indizes. Ausreichend Hauptspeicher verfügbar.",
      table1: { name: "Department", size: 1000, sorted: false, indexed: false },
      table2: { name: "Employee", size: 50000, sorted: false, indexed: false },
      joinType: "Department.deptID = Employee.deptID",
      bestAlgorithm: "hash-join",
      explanation: "Hash Join ist optimal, da die kleinere Department-Tabelle in den Hauptspeicher passt und Hash Join bei großen Datenmengen sehr effizient ist."
    },
    {
      id: "scenario4",
      description: "Join zwischen zwei kleinen Tabellen (je 50 Blöcke), beide unsortiert, keine Indizes verfügbar.",
      table1: { name: "Category", size: 50, sorted: false, indexed: false },
      table2: { name: "Subcategory", size: 50, sorted: false, indexed: false },
      joinType: "Category.catID = Subcategory.catID",
      bestAlgorithm: "nested-loop",
      explanation: "Nested Loop Join ist optimal für kleine Tabellen, da die Overhead-Kosten für Hash Join und Sort-Merge zu hoch wären."
    }
  ];

  const handleAlgorithmSelect = (algorithmId: string) => {
    setSelectedAlgorithm(algorithmId);
    setShowResult(true);
    setIsCorrect(algorithmId === scenarios[currentExercise].bestAlgorithm);
  };

  const nextExercise = () => {
    if (currentExercise < scenarios.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAlgorithm(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowCostCalculation(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedAlgorithm(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowCostCalculation(false);
    }
  };

  const resetExercise = () => {
    setSelectedAlgorithm(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowCostCalculation(false);
  };

  const current = scenarios[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Join-Algorithmen - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Szenario {currentExercise + 1}</h2>
          <span className="text-sm text-gray-600">
            Übung {currentExercise + 1} von {scenarios.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Szenario-Details:</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Tabelle 1: {current.table1.name}</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Größe: {current.table1.size} Blöcke</div>
                  <div>Sortiert: {current.table1.sorted ? 'Ja' : 'Nein'}</div>
                  <div>Indexiert: {current.table1.indexed ? 'Ja' : 'Nein'}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tabelle 2: {current.table2.name}</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Größe: {current.table2.size} Blöcke</div>
                  <div>Sortiert: {current.table2.sorted ? 'Ja' : 'Nein'}</div>
                  <div>Indexiert: {current.table2.indexed ? 'Ja' : 'Nein'}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Join-Bedingung:</h4>
              <div className="bg-blue-50 p-3 rounded-lg">
                <code className="text-sm">{current.joinType}</code>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Welcher Join-Algorithmus ist optimal?</h4>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Verfügbare Algorithmen:</h3>
          
          <div className="space-y-3">
            {algorithms.map((algorithm) => (
              <button
                key={algorithm.id}
                onClick={() => handleAlgorithmSelect(algorithm.id)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? algorithm.id === current.bestAlgorithm
                      ? 'border-green-500 bg-green-100'
                      : algorithm.id === selectedAlgorithm && !isCorrect
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-gray-50'
                    : selectedAlgorithm === algorithm.id
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium">{algorithm.name}</div>
                <div className="text-sm text-gray-600">{algorithm.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Kosten: {algorithm.costFormula}
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
              <p className="mb-2">{current.explanation}</p>
              
              <button
                onClick={() => setShowCostCalculation(!showCostCalculation)}
                className="text-sm underline hover:no-underline"
              >
                {showCostCalculation ? 'Kostenberechnung verstecken' : 'Kostenberechnung anzeigen'}
              </button>
              
              {showCostCalculation && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <h5 className="font-medium mb-2">Kostenvergleich:</h5>
                  <div className="space-y-1 text-sm">
                    {algorithms.map((alg) => {
                      const selectedAlg = algorithms.find(a => a.id === selectedAlgorithm);
                      const isSelected = alg.id === selectedAlgorithm;
                      return (
                        <div key={alg.id} className={`p-2 rounded ${isSelected ? 'bg-blue-50' : ''}`}>
                          <strong>{alg.name}:</strong> {alg.costFormula}
                        </div>
                      );
                    })}
                  </div>
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
              disabled={currentExercise === scenarios.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Nächste →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Join-Algorithmus Auswahl:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Nested Loop:</strong> Kleine Tabellen, keine speziellen Anforderungen
          </div>
          <div>
            <strong>Index Nested Loop:</strong> Index auf Join-Attribut der inneren Relation
          </div>
          <div>
            <strong>Sort-Merge:</strong> Beide Tabellen bereits sortiert
          </div>
          <div>
            <strong>Hash Join:</strong> Große Tabellen, ausreichend Hauptspeicher
          </div>
        </div>
      </div>
    </div>
  );
};
