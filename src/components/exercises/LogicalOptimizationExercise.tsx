import React, { useState } from 'react';

interface TransformationRule {
  id: string;
  name: string;
  description: string;
  before: string;
  after: string;
  explanation: string;
}

export const LogicalOptimizationExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const exercises = [
    {
      title: "Transformationsregeln erkennen",
      description: "Identifiziere die korrekte Transformationsregel für die gegebene Optimierung.",
      beforeExpression: "σ_{name='Socrates' ∧ empID=taughtBy}(professor × course)",
      afterExpression: "σ_{empID=taughtBy}(σ_{name='Socrates'}(professor) × course)",
      question: "Welche Transformationsregel wurde hier angewendet?",
      correctRule: "selection-pushdown",
      explanation: "Die Selektion wurde so weit wie möglich nach unten verschoben (pushing selections). Die Bedingung 'name=Socrates' wird bereits auf der professor-Tabelle angewendet, bevor der Join stattfindet."
    },
    {
      title: "Join-Reihenfolge optimieren",
      description: "Wähle die optimale Join-Reihenfolge für die gegebene Anfrage.",
      query: "SELECT * FROM A, B, C WHERE A.id = B.id AND B.id = C.id",
      statistics: {
        A: { tuples: 1000, selectivity: 0.1 },
        B: { tuples: 100, selectivity: 0.5 },
        C: { tuples: 10000, selectivity: 0.01 }
      },
      question: "Welche Join-Reihenfolge minimiert die Zwischenergebnisse?",
      options: [
        { id: "A-B-C", description: "A ⋈ B ⋈ C", cost: "1000 × 100 × 0.1 = 10,000" },
        { id: "B-A-C", description: "B ⋈ A ⋈ C", cost: "100 × 1000 × 0.1 = 10,000" },
        { id: "B-C-A", description: "B ⋈ C ⋈ A", cost: "100 × 10000 × 0.01 = 10,000" },
        { id: "C-B-A", description: "C ⋈ B ⋈ A", cost: "10000 × 100 × 0.5 = 500,000" }
      ],
      correctRule: "B-C-A",
      explanation: "B ⋈ C ⋈ A ist optimal, da B die kleinste Tabelle ist und C eine hohe Selektivität hat, was zu einem kleinen Zwischenergebnis führt."
    }
  ];

  const transformationRules: TransformationRule[] = [
    {
      id: "selection-breakdown",
      name: "Aufbrechen von Konjunktionen",
      description: "Konjunktionen in Selektionen aufteilen",
      before: "σ_{c1∧c2}(R)",
      after: "σ_{c1}(σ_{c2}(R))",
      explanation: "Komplexe Bedingungen werden in einfachere aufgeteilt."
    },
    {
      id: "selection-commutative",
      name: "Selektion kommutativ",
      description: "Reihenfolge von Selektionen vertauschen",
      before: "σ_{c1}(σ_{c2}(R))",
      after: "σ_{c2}(σ_{c1}(R))",
      explanation: "Selektionen sind kommutativ - die Reihenfolge kann vertauscht werden."
    },
    {
      id: "selection-pushdown",
      name: "Selektion nach unten verschieben",
      description: "Selektionen so weit wie möglich nach unten verschieben",
      before: "σ_c(R ⋈ S)",
      after: "σ_c(R) ⋈ S",
      explanation: "Selektionen werden vor Joins angewendet, um Zwischenergebnisse zu reduzieren."
    },
    {
      id: "projection-pushdown",
      name: "Projektion nach unten verschieben",
      description: "Projektionen so früh wie möglich ausführen",
      before: "π_L(R ⋈ S)",
      after: "π_L1(R) ⋈ π_L2(S)",
      explanation: "Nur benötigte Attribute werden früh projiziert."
    },
    {
      id: "join-commutative",
      name: "Join kommutativ",
      description: "Reihenfolge von Joins vertauschen",
      before: "R ⋈ S",
      after: "S ⋈ R",
      explanation: "Joins sind kommutativ - die Reihenfolge kann optimiert werden."
    }
  ];

  const handleRuleSelect = (ruleId: string) => {
    setSelectedRule(ruleId);
    setShowResult(true);
    setIsCorrect(ruleId === exercises[currentExercise].correctRule);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedRule(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedRule(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const resetExercise = () => {
    setSelectedRule(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const current = exercises[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Logische Anfrageoptimierung - Interaktive Übungen</h1>
      
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
          <h3 className="font-semibold mb-4">Gegebene Situation:</h3>
          
          {currentExercise === 0 && (
            <div>
              <h4 className="font-medium mb-2">Vorher (Initialer Plan):</h4>
              <div className="bg-red-50 p-3 rounded-lg mb-4">
                <code className="text-sm">{current.beforeExpression}</code>
              </div>
              
              <h4 className="font-medium mb-2">Nachher (Optimierter Plan):</h4>
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <code className="text-sm">{current.afterExpression}</code>
              </div>
            </div>
          )}

          {currentExercise === 1 && (
            <div>
              <h4 className="font-medium mb-2">SQL-Anfrage:</h4>
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <code className="text-sm">{current.query}</code>
              </div>
              
              <h4 className="font-medium mb-2">Statistiken:</h4>
              <div className="space-y-2">
                {current.statistics && Object.entries(current.statistics).map(([table, stats]) => (
                  <div key={table} className="bg-gray-50 p-2 rounded text-sm">
                    <strong>Tabelle {table}:</strong> {stats.tuples} Tupel, Selektivität: {stats.selectivity}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h4 className="font-medium mb-2">{current.question}</h4>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Wähle die richtige Antwort:</h3>
          
          {currentExercise === 0 && (
            <div className="space-y-3">
              {transformationRules.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => handleRuleSelect(rule.id)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    showResult
                      ? rule.id === current.correctRule
                        ? 'border-green-500 bg-green-100'
                        : rule.id === selectedRule && !isCorrect
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 bg-gray-50'
                      : selectedRule === rule.id
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="font-medium">{rule.name}</div>
                  <div className="text-sm text-gray-600">{rule.description}</div>
                </button>
              ))}
            </div>
          )}

          {currentExercise === 1 && (
            <div className="space-y-3">
              {current.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleRuleSelect(option.id)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    showResult
                      ? option.id === current.correctRule
                        ? 'border-green-500 bg-green-100'
                        : option.id === selectedRule && !isCorrect
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 bg-gray-50'
                      : selectedRule === option.id
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="font-medium">{option.description}</div>
                  <div className="text-sm text-gray-600">Kosten: {option.cost}</div>
                </button>
              ))}
            </div>
          )}

          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </h4>
              <p>{current.explanation}</p>
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
        <h3 className="font-semibold mb-2">💡 Heuristische Optimierungsregeln:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Selektionen so früh wie möglich:</strong> Reduziert Zwischenergebnisse</li>
          <li>• <strong>Projektionen so früh wie möglich:</strong> Reduziert Datenmenge</li>
          <li>• <strong>Kleine Tabellen zuerst joinen:</strong> Minimiert Zwischenergebnisse</li>
          <li>• <strong>Selektive Bedingungen zuerst:</strong> Filtert früh aus</li>
        </ul>
      </div>
    </div>
  );
};
