import React, { useState, useEffect } from 'react';
import { Box, List, Link } from 'lucide-react';
import type { ExerciseItem } from '../../types';

export const ERExercise: React.FC = () => {
  const [items] = useState<ExerciseItem[]>([
    { name: 'Student', type: 'entity' },
    { name: 'Kurs', type: 'entity' },
    { name: 'Dozent', type: 'entity' },
    { name: 'Matrikelnummer', type: 'attribute' },
    { name: 'Name', type: 'attribute' },
    { name: 'Titel', type: 'attribute' },
    { name: 'hält', type: 'relationship' },
    { name: 'belegt', type: 'relationship' }
  ]);

  const [shuffledItems, setShuffledItems] = useState<ExerciseItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<ExerciseItem | null>(null);
  const [dropZones, setDropZones] = useState<{ [key: string]: ExerciseItem[] }>({
    entity: [],
    attribute: [],
    relationship: []
  });
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // Shuffle items on component mount
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent, item: ExerciseItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    setDropZones(prev => ({
      ...prev,
      [category]: [...prev[category], draggedItem]
    }));

    setShuffledItems(prev => prev.filter(item => item.name !== draggedItem.name));
    setDraggedItem(null);
  };

  // Removed unused handleSourceDrop function

  const checkExercise = () => {
    let correctCount = 0;
    let totalCount = items.length;

    Object.keys(dropZones).forEach(category => {
      dropZones[category].forEach(item => {
        if (item.type === category) {
          correctCount++;
        }
      });
    });

    if (correctCount === totalCount) {
      setResult('Super gemacht! Alle Elemente sind korrekt zugeordnet.');
    } else {
      setResult(`Du hast ${correctCount} von ${totalCount} Elementen korrekt zugeordnet. Schau dir die falsch zugeordneten Elemente nochmal an.`);
    }
  };

  const resetExercise = () => {
    setShuffledItems([...items].sort(() => Math.random() - 0.5));
    setDropZones({ entity: [], attribute: [], relationship: [] });
    setResult(null);
  };

  const getItemStyle = (item: ExerciseItem, category: string) => {
    if (result) {
      return item.type === category ? 'bg-green-100' : 'bg-red-100';
    }
    return 'bg-gray-200';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: ER-Modellierung</h1>
      <p className="text-gray-600 mb-8">Ordne die Elemente den korrekten Kategorien zu.</p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Szenario:</p>
          <p>
            Ein <span className="text-blue-600">Dozent</span> mit einem <span className="text-green-600">Namen</span>{' '}
            <span className="text-red-600">hält</span> einen <span className="text-blue-600">Kurs</span> mit einem{' '}
            <span className="text-green-600">Titel</span>. Ein <span className="text-blue-600">Student</span> mit einer{' '}
            <span className="text-green-600">Matrikelnummer</span> und einem <span className="text-green-600">Namen</span>{' '}
            <span className="text-red-600">belegt</span> einen <span className="text-blue-600">Kurs</span>.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg" id="source-items">
          <h3 className="font-semibold mb-2">Verfügbare Elemente:</h3>
          <div className="flex flex-wrap gap-2">
            {shuffledItems.map((item, index) => (
              <div
                key={`source-${index}`}
                className="draggable inline-block bg-gray-200 text-gray-800 p-2 m-1 rounded-md shadow-sm cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <h3 className="font-semibold mb-2 text-center text-blue-600 flex items-center justify-center">
              <Box className="mr-2" />
              Entitätstypen
            </h3>
            <div
              className="drop-zone p-4 bg-white rounded-lg min-h-[150px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'entity')}
            >
              {dropZones.entity.map((item, index) => (
                <div
                  key={`entity-${index}`}
                  className={`inline-block p-2 m-1 rounded-md shadow-sm ${getItemStyle(item, 'entity')}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-center text-green-600 flex items-center justify-center">
              <List className="mr-2" />
              Attribute
            </h3>
            <div
              className="drop-zone p-4 bg-white rounded-lg min-h-[150px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'attribute')}
            >
              {dropZones.attribute.map((item, index) => (
                <div
                  key={`attribute-${index}`}
                  className={`inline-block p-2 m-1 rounded-md shadow-sm ${getItemStyle(item, 'attribute')}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-center text-red-600 flex items-center justify-center">
              <Link className="mr-2" />
              Beziehungen
            </h3>
            <div
              className="drop-zone p-4 bg-white rounded-lg min-h-[150px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'relationship')}
            >
              {dropZones.relationship.map((item, index) => (
                <div
                  key={`relationship-${index}`}
                  className={`inline-block p-2 m-1 rounded-md shadow-sm ${getItemStyle(item, 'relationship')}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
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
              result.includes('Super gemacht') 
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
