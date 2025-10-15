import React, { useState } from 'react';

interface Operation {
  id: number;
  trans: string;
  op: string;
}

export const TransExercise: React.FC = () => {
  const [selectedPairs, setSelectedPairs] = useState<Set<string>>(new Set());
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const operations: Operation[] = [
    { id: 1, trans: 'T1', op: 'read(A)' },
    { id: 2, trans: 'T2', op: 'read(A)' },
    { id: 3, trans: 'T1', op: 'write(A)' },
    { id: 4, trans: 'T2', op: 'write(A)' },
    { id: 5, trans: 'T1', op: 'commit' },
    { id: 6, trans: 'T2', op: 'commit' }
  ];

  // Correct conflict pairs: (1,4), (2,3), (3,4)
  const correctPairs = new Set(['1-4', '2-3', '3-4']);

  const handleOperationClick = (operationId: number) => {
    if (firstSelection === null) {
      setFirstSelection(operationId);
    } else {
      if (firstSelection === operationId) {
        setFirstSelection(null);
        return;
      }

      const firstOp = operations.find(op => op.id === firstSelection);
      const secondOp = operations.find(op => op.id === operationId);

      if (firstOp && secondOp && firstOp.trans !== secondOp.trans) {
        const pairKey = `${Math.min(firstSelection, operationId)}-${Math.max(firstSelection, operationId)}`;
        const newPairs = new Set(selectedPairs);
        
        if (newPairs.has(pairKey)) {
          newPairs.delete(pairKey);
        } else {
          newPairs.add(pairKey);
        }
        
        setSelectedPairs(newPairs);
      }
      
      setFirstSelection(null);
    }
  };

  const checkExercise = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    selectedPairs.forEach(pair => {
      if (correctPairs.has(pair)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    let resultMessage = `Du hast ${correctCount} von ${correctPairs.size} Konflikten richtig gefunden.`;
    if (incorrectCount > 0) {
      resultMessage += ` Du hast zusätzlich ${incorrectCount} falsche Paare ausgewählt.`;
    }

    if (correctCount === correctPairs.size && incorrectCount === 0) {
      resultMessage = 'Perfekt! Alle Konflikte korrekt identifiziert. Die Konflikte sind: r1(A)-w2(A), r2(A)-w1(A), und w1(A)-w2(A).';
    }

    setResult(resultMessage);
  };

  const resetExercise = () => {
    setSelectedPairs(new Set());
    setFirstSelection(null);
    setResult(null);
  };

  const getOperationClasses = (operationId: number) => {
    let classes = 'exercise-option p-2 border-2 rounded-lg cursor-pointer';
    
    if (firstSelection === operationId) {
      classes += ' selected';
    }
    
    if (result) {
      const isInCorrectPair = Array.from(selectedPairs).some(pair => {
        const [first, second] = pair.split('-').map(Number);
        return (first === operationId || second === operationId) && correctPairs.has(pair);
      });
      
      const isInIncorrectPair = Array.from(selectedPairs).some(pair => {
        const [first, second] = pair.split('-').map(Number);
        return (first === operationId || second === operationId) && !correctPairs.has(pair);
      });
      
      if (isInCorrectPair) {
        classes += ' correct';
      } else if (isInIncorrectPair) {
        classes += ' incorrect';
      }
    }
    
    return classes;
  };

  const getPairClasses = (pair: string) => {
    let classes = 'user-selection inline-block p-2 bg-yellow-100 rounded-md m-1';
    
    if (result) {
      if (correctPairs.has(pair)) {
        classes += ' correct';
      } else {
        classes += ' incorrect';
      }
    }
    
    return classes;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: Konflikte</h1>
      <p className="text-gray-600 mb-8">
        Analysiere den Schedule und identifiziere alle Konfliktoperationen.
      </p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2 border p-4 rounded-lg">
          {operations.map(op => (
            <div
              key={op.id}
              className={`font-mono p-2 rounded ${
                op.trans === 'T1' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'
              }`}
            >
              <b>{op.trans}:</b> {op.op}
            </div>
          ))}
        </div>

        <p className="mt-4">
          Wähle alle Paare von Operationen aus, die einen Konflikt darstellen, indem du sie anklickst. 
          Es werden nur Paare unterschiedlicher Transaktionen berücksichtigt.
        </p>

        <div id="user-selections" className="mt-2">
          {Array.from(selectedPairs).map(pair => (
            <div key={pair} className={getPairClasses(pair)}>
              {pair.split('-').map(id => {
                const op = operations.find(o => o.id === parseInt(id));
                return op ? `${op.trans}: ${op.op}` : '';
              }).join(' - ')}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            {operations.map(op => (
              <div
                key={`left-${op.id}`}
                className={getOperationClasses(op.id)}
                onClick={() => handleOperationClick(op.id)}
              >
                {op.trans}: {op.op}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {operations.map(op => (
              <div
                key={`right-${op.id}`}
                className={getOperationClasses(op.id)}
                onClick={() => handleOperationClick(op.id)}
              >
                {op.trans}: {op.op}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={checkExercise}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Auswerten
          </button>
          <button
            onClick={resetExercise}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Zurücksetzen
          </button>
        </div>

        {result && (
          <div className="mt-4 text-center">
            <div className={`p-4 rounded-lg ${
              result.includes('Perfekt') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
