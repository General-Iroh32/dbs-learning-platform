import React, { useState } from 'react';

interface OperatorNode {
  id: string;
  type: 'operator' | 'relation';
  label: string;
  children?: string[];
  position: { x: number; y: number };
}

interface OperatorTreeExercise {
  id: string;
  title: string;
  description: string;
  raExpression: string;
  correctTree: OperatorNode[];
  explanation: string;
}

export const RAOperatorTreeExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const exercises: OperatorTreeExercise[] = [
    {
      id: 'basic-projection',
      title: 'Einfache Projektion',
      description: 'Baue den Operatorbaum für eine einfache Projektion',
      raExpression: 'π_Name(Student)',
      correctTree: [
        { id: '1', type: 'operator', label: 'π_Name', position: { x: 200, y: 100 } },
        { id: '2', type: 'relation', label: 'Student', position: { x: 200, y: 200 } }
      ],
      explanation: 'Die Projektion π_Name ist der Operator, Student ist die Relation. Der Operator steht über der Relation.'
    },
    {
      id: 'selection-projection',
      title: 'Selektion und Projektion',
      description: 'Baue den Operatorbaum für Selektion gefolgt von Projektion',
      raExpression: 'π_Name(σ_Alter > 25(Student))',
      correctTree: [
        { id: '1', type: 'operator', label: 'π_Name', position: { x: 200, y: 50 } },
        { id: '2', type: 'operator', label: 'σ_Alter > 25', position: { x: 200, y: 150 } },
        { id: '3', type: 'relation', label: 'Student', position: { x: 200, y: 250 } }
      ],
      explanation: 'Zuerst wird die Selektion σ_Alter > 25 auf Student angewendet, dann die Projektion π_Name auf das Ergebnis.'
    },
    {
      id: 'join-example',
      title: 'Natural Join',
      description: 'Baue den Operatorbaum für einen Natural Join',
      raExpression: 'Student ⋈ Belegt',
      correctTree: [
        { id: '1', type: 'operator', label: '⋈', position: { x: 200, y: 100 } },
        { id: '2', type: 'relation', label: 'Student', position: { x: 100, y: 200 } },
        { id: '3', type: 'relation', label: 'Belegt', position: { x: 300, y: 200 } }
      ],
      explanation: 'Der Natural Join ⋈ verbindet die beiden Relationen Student und Belegt über gleichnamige Attribute.'
    },
    {
      id: 'complex-query',
      title: 'Komplexe Anfrage',
      description: 'Baue den Operatorbaum für eine komplexe Anfrage',
      raExpression: 'π_Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))',
      correctTree: [
        { id: '1', type: 'operator', label: 'π_Name', position: { x: 200, y: 50 } },
        { id: '2', type: 'operator', label: 'σ_ECTS > 5', position: { x: 200, y: 150 } },
        { id: '3', type: 'operator', label: '⋈', position: { x: 200, y: 250 } },
        { id: '4', type: 'operator', label: '⋈', position: { x: 200, y: 350 } },
        { id: '5', type: 'relation', label: 'Student', position: { x: 100, y: 450 } },
        { id: '6', type: 'relation', label: 'Belegt', position: { x: 200, y: 450 } },
        { id: '7', type: 'relation', label: 'Kurs', position: { x: 300, y: 450 } }
      ],
      explanation: 'Zuerst werden Student, Belegt und Kurs gejoint, dann wird nach ECTS > 5 gefiltert, und schließlich werden die Namen projiziert.'
    }
  ];

  const availableNodes = [
    { id: 'π_Name', type: 'operator', label: 'π_Name' },
    { id: 'σ_Alter > 25', type: 'operator', label: 'σ_Alter > 25' },
    { id: 'σ_ECTS > 5', type: 'operator', label: 'σ_ECTS > 5' },
    { id: '⋈', type: 'operator', label: '⋈' },
    { id: 'Student', type: 'relation', label: 'Student' },
    { id: 'Belegt', type: 'relation', label: 'Belegt' },
    { id: 'Kurs', type: 'relation', label: 'Kurs' }
  ];

  const currentEx = exercises[currentExercise];

  const handleNodeClick = (nodeId: string) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  const checkSolution = () => {
    setShowSolution(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedNodes([]);
      setShowSolution(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedNodes([]);
      setShowSolution(false);
    }
  };

  const resetExercise = () => {
    setSelectedNodes([]);
    setShowSolution(false);
  };

  const renderOperatorTree = () => {
    return (
      <div className="relative w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="text-center text-gray-500 mb-4">
          Ziehe die Knoten hierher, um den Operatorbaum zu erstellen
        </div>
        
        {/* Zeige ausgewählte Knoten */}
        {selectedNodes.map((nodeId, index) => {
          const node = availableNodes.find(n => n.id === nodeId);
          if (!node) return null;
          
          const position = {
            x: 50 + (index % 3) * 150,
            y: 100 + Math.floor(index / 3) * 80
          };
          
          return (
            <div
              key={nodeId}
              className={`absolute px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                node.type === 'operator' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}
              style={{ left: position.x, top: position.y }}
              onClick={() => handleNodeClick(nodeId)}
            >
              {node.label}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Operatorbaumdarstellung</h1>
      <p className="text-gray-600 mb-8">
        Lerne, wie man RA-Ausdrücke als Operatorbäume darstellt und versteht.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Übung {currentExercise + 1} von {exercises.length}: {currentEx.title}
            </h2>
            <div className="text-sm text-gray-600">
              Schwierigkeit: {currentExercise === 0 ? 'Einfach' : currentExercise === 1 ? 'Mittel' : 'Schwer'}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{currentEx.description}</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">RA-Ausdruck:</h3>
          <p className="font-mono text-lg">{currentEx.raExpression}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verfügbare Knoten */}
          <div>
            <h3 className="font-semibold mb-4">Verfügbare Knoten:</h3>
            <div className="space-y-2">
              {availableNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedNodes.includes(node.id)
                      ? node.type === 'operator' 
                        ? 'bg-blue-200 text-blue-800' 
                        : 'bg-green-200 text-green-800'
                      : node.type === 'operator'
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <span className="font-mono">{node.label}</span>
                  <span className="ml-2 text-xs">
                    ({node.type === 'operator' ? 'Operator' : 'Relation'})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Operatorbaum */}
          <div>
            <h3 className="font-semibold mb-4">Operatorbaum:</h3>
            {renderOperatorTree()}
          </div>
        </div>

        {showSolution && (
          <div className="mt-6 p-4 rounded-lg border-l-4 border-blue-400 bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">Lösung:</h3>
            <div className="mb-4">
              <div className="relative w-full h-64 bg-white border border-gray-300 rounded-lg p-4">
                {currentEx.correctTree.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute px-3 py-2 rounded-lg text-sm font-medium ${
                      node.type === 'operator' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}
                    style={{ left: node.position.x, top: node.position.y }}
                  >
                    {node.label}
                  </div>
                ))}
                
                {/* Verbindungslinien */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {currentEx.correctTree.map((node) => {
                    if (node.children) {
                      return node.children.map((childId) => {
                        const child = currentEx.correctTree.find(n => n.id === childId);
                        if (!child) return null;
                        
                        return (
                          <line
                            key={`${node.id}-${childId}`}
                            x1={node.position.x + 30}
                            y1={node.position.y + 20}
                            x2={child.position.x + 30}
                            y2={child.position.y}
                            stroke="#6B7280"
                            strokeWidth="2"
                          />
                        );
                      });
                    }
                    return null;
                  })}
                </svg>
              </div>
            </div>
            
            <p className="text-blue-700">{currentEx.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={prevExercise}
            disabled={currentExercise === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vorherige Übung
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={resetExercise}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Zurücksetzen
            </button>
            
            <button
              onClick={checkSolution}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Lösung prüfen
            </button>
            
            {currentExercise < exercises.length - 1 ? (
              <button
                onClick={nextExercise}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Nächste Übung
              </button>
            ) : (
              <div className="px-4 py-2 bg-green-500 text-white rounded">
                Alle Übungen abgeschlossen!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theorie */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">📚 Theorie: Operatorbäume</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
          <div>
            <h4 className="font-semibold mb-2">Vorteile von Operatorbäumen:</h4>
            <ul className="space-y-1">
              <li>• Zeigen die Auswertungsreihenfolge</li>
              <li>• Machen komplexe Ausdrücke verständlicher</li>
              <li>• Hilfen bei der Anfrageoptimierung</li>
              <li>• Visualisieren Datenfluss</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Regeln:</h4>
            <ul className="space-y-1">
              <li>• Operatoren sind Knoten</li>
              <li>• Relationen sind Blätter</li>
              <li>• Auswertung von unten nach oben</li>
              <li>• Jeder Operator hat seine Eingaben</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
