import React, { useState } from 'react';

export const RAExercise: React.FC = () => {
  const [solution] = useState<string[]>(['π_Name', 'σ_courseID=5001', 'Student', '⋈', 'Belegt']);
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [dropZones, setDropZones] = useState<(string | null)[]>(new Array(5).fill(null));
  const [result, setResult] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  React.useEffect(() => {
    // Shuffle items on component mount
    const shuffled = [...solution].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    setDropZones(prev => {
      const newZones = [...prev];
      newZones[index] = draggedItem;
      return newZones;
    });

    setShuffledItems(prev => prev.filter(item => item !== draggedItem));
    setDraggedItem(null);
  };

  // Removed unused handleSourceDrop function

  const checkExercise = () => {
    let correctCount = 0;
    let totalCount = solution.length;

    dropZones.forEach((item, index) => {
      if (item === solution[index]) {
        correctCount++;
      }
    });

    if (correctCount === totalCount) {
      setResult('Perfekt, die Anfrage ist korrekt!');
    } else {
      setResult(`Du hast ${correctCount} von ${totalCount} Bausteinen korrekt platziert. Versuche es nochmal!`);
    }
  };

  const resetExercise = () => {
    setShuffledItems([...solution].sort(() => Math.random() - 0.5));
    setDropZones(new Array(5).fill(null));
    setResult(null);
  };

  // Removed unused getItemStyle function

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: Relationale Algebra</h1>
      <p className="text-gray-600 mb-8">
        Stelle die Anfrage zusammen: "Finde die Namen aller Studierenden, die die Vorlesung '5001' belegen."
      </p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p><b>Relationen:</b> Student(<u>studID</u>, Name), Belegt(<u>studID</u>, <u>courseID</u>)</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg mb-4" id="source-items">
          <h3 className="font-semibold mb-2">Verfügbare Bausteine:</h3>
          <div className="flex flex-wrap gap-2">
            {shuffledItems.map((item, index) => (
              <div
                key={`source-${index}`}
                className="draggable inline-flex items-center font-mono bg-gray-200 text-gray-800 p-2 m-1 rounded-md shadow-sm cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.replace('_', ' ')}
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-semibold mb-2 text-center">Anfrage zusammenbauen:</h3>
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg space-x-2">
          <div
            data-id="0"
            className="drop-zone p-2 rounded-lg bg-white flex-shrink-0 min-w-[100px] min-h-[40px] border-2 border-dashed border-gray-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 0)}
          >
            {dropZones[0] && (
              <span className="font-mono">{dropZones[0].replace('_', ' ')}</span>
            )}
          </div>
          <span className="text-2xl font-mono">(</span>
          <div
            data-id="1"
            className="drop-zone p-2 rounded-lg bg-white flex-shrink-0 min-w-[100px] min-h-[40px] border-2 border-dashed border-gray-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 1)}
          >
            {dropZones[1] && (
              <span className="font-mono">{dropZones[1].replace('_', ' ')}</span>
            )}
          </div>
          <span className="text-2xl font-mono">(</span>
          <div
            data-id="2"
            className="drop-zone p-2 rounded-lg bg-white min-w-[100px] min-h-[40px] border-2 border-dashed border-gray-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 2)}
          >
            {dropZones[2] && (
              <span className="font-mono">{dropZones[2].replace('_', ' ')}</span>
            )}
          </div>
          <div
            data-id="3"
            className="drop-zone p-2 rounded-lg bg-white flex-shrink-0 min-w-[100px] min-h-[40px] border-2 border-dashed border-gray-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 3)}
          >
            {dropZones[3] && (
              <span className="font-mono">{dropZones[3].replace('_', ' ')}</span>
            )}
          </div>
          <div
            data-id="4"
            className="drop-zone p-2 rounded-lg bg-white min-w-[100px] min-h-[40px] border-2 border-dashed border-gray-400"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 4)}
          >
            {dropZones[4] && (
              <span className="font-mono">{dropZones[4].replace('_', ' ')}</span>
            )}
          </div>
          <span className="text-2xl font-mono">)</span>
          <span className="text-2xl font-mono">)</span>
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
