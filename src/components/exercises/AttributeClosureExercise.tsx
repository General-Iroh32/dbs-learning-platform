import React, { useState } from 'react';

interface FD {
  left: string;
  right: string;
}

export const AttributeClosureExercise: React.FC = () => {
  const [step, setStep] = useState(0);
  const [currentResult, setCurrentResult] = useState<string[]>([]);
  const [selectedFD, setSelectedFD] = useState<number | null>(null);
  const [showNextStep, setShowNextStep] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const fds: FD[] = [
    { left: "A", right: "B" },
    { left: "B", right: "C" },
    { left: "C", right: "D" },
    { left: "D", right: "E" },
    { left: "E", right: "F" }
  ];

  const targetAttribute = "A";
  const correctClosure = ["A", "B", "C", "D", "E", "F"];

  const handleFDClick = (fdIndex: number) => {
    if (selectedFD === fdIndex) {
      setSelectedFD(null);
      return;
    }
    setSelectedFD(fdIndex);
  };

  const applyFD = () => {
    if (selectedFD === null) return;

    const fd = fds[selectedFD];
    const leftSet = fd.left.split(',').map(s => s.trim());
    
    // Check if all left attributes are in current result
    const canApply = leftSet.every(attr => currentResult.includes(attr));
    
    if (canApply) {
      const newAttributes = fd.right.split(',').map(s => s.trim());
      const updatedResult = [...new Set([...currentResult, ...newAttributes])].sort();
      setCurrentResult(updatedResult);
      setShowNextStep(true);
    } else {
      alert(`Die FD {${fd.left}} → {${fd.right}} kann nicht angewendet werden, da nicht alle Attribute von {${fd.left}} in der aktuellen Attributhülle enthalten sind.`);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    setSelectedFD(null);
    setShowNextStep(false);
    
    if (currentResult.length === correctClosure.length && 
        currentResult.every(attr => correctClosure.includes(attr))) {
      setIsComplete(true);
    }
  };

  const resetExercise = () => {
    setStep(0);
    setCurrentResult([targetAttribute]);
    setSelectedFD(null);
    setShowNextStep(false);
    setIsComplete(false);
  };

  const getFDClasses = (fdIndex: number) => {
    let classes = "p-3 border-2 rounded-lg cursor-pointer transition-colors ";
    
    if (selectedFD === fdIndex) {
      classes += "border-blue-500 bg-blue-100";
    } else {
      const fd = fds[fdIndex];
      const leftSet = fd.left.split(',').map(s => s.trim());
      const canApply = leftSet.every(attr => currentResult.includes(attr));
      
      if (canApply) {
        classes += "border-green-300 bg-green-50 hover:border-green-500";
      } else {
        classes += "border-gray-300 bg-gray-50";
      }
    }
    
    return classes;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Attributhülle - Interaktiver Algorithmus</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Berechne die Attributhülle von {`{${targetAttribute}}`}</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Gegebene funktionale Abhängigkeiten:</h3>
          <div className="space-y-2">
            {fds.map((fd, index) => (
              <div
                key={index}
                className={getFDClasses(index)}
                onClick={() => handleFDClick(index)}
              >
                <span className="font-mono">{`{${fd.left}} → {${fd.right}}`}</span>
                {selectedFD === index && (
                  <div className="mt-2 text-sm text-blue-600">
                    ✓ Ausgewählt - Klicke "FD anwenden" um diese Abhängigkeit zu verwenden
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Aktuelle Attributhülle:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="font-mono text-lg">
              {`{${currentResult.join(', ')}}`}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={applyFD}
            disabled={selectedFD === null}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            FD anwenden
          </button>
          
          {showNextStep && (
            <button
              onClick={nextStep}
              className="ml-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Nächster Schritt
            </button>
          )}
          
          <button
            onClick={resetExercise}
            className="ml-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Zurücksetzen
          </button>
        </div>

        {isComplete && (
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">🎉 Perfekt!</h3>
            <p className="text-green-700">
              Du hast die Attributhülle von {`{${targetAttribute}}`} erfolgreich berechnet: {`{${currentResult.join(', ')}}`}
            </p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Algorithmus-Schritte:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Starte mit result = {`{${targetAttribute}}`}</li>
              <li>Wiederhole bis sich result nicht mehr ändert:</li>
              <li className="ml-4">Für jede FD α → β in F:</li>
              <li className="ml-8">Wenn α ⊆ result, dann result = result ∪ β</li>
              <li>Gib result zurück</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Tipp:</h3>
        <p className="text-sm">
          Die Attributhülle {`{${targetAttribute}}`}+ enthält alle Attribute, die von {targetAttribute} funktional bestimmt werden. 
          Verwende die Armstrong-Axiome, um schrittweise alle abhängigen Attribute zu finden.
        </p>
      </div>
    </div>
  );
};
