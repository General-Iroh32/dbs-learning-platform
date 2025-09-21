import React, { useState, useEffect } from 'react';
import { Database, TreePine, Hash, Layers, Zap, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface DragItem {
  id: string;
  name: string;
  type: 'index' | 'structure' | 'optimization' | 'access-method';
  description: string;
  icon: React.ReactNode;
}

interface DropZone {
  id: string;
  title: string;
  description: string;
  correctItems: string[];
  icon: React.ReactNode;
}

export const PhysDragDropExercise: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropZones, setDropZones] = useState<{ [key: string]: DragItem[] }>({
    'b-tree': [],
    'hashing': [],
    'clustering': [],
    'partitioning': []
  });
  const [result, setResult] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const dragItems: DragItem[] = [
    {
      id: 'primary-index',
      name: 'Primärindex',
      type: 'index',
      description: 'Index auf Primärschlüssel',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      id: 'secondary-index',
      name: 'Sekundärindex',
      type: 'index',
      description: 'Index auf andere Attribute',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      id: 'b-plus-tree',
      name: 'B+-Baum',
      type: 'structure',
      description: 'Ausgeglichener Baum für sortierte Daten',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      id: 'hash-table',
      name: 'Hash-Tabelle',
      type: 'structure',
      description: 'Direkte Adressierung über Hash-Funktion',
      icon: <Hash className="w-5 h-5" />
    },
    {
      id: 'clustered-index',
      name: 'Clustered Index',
      type: 'optimization',
      description: 'Physikalische Sortierung der Daten',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'horizontal-partitioning',
      name: 'Horizontale Partitionierung',
      type: 'optimization',
      description: 'Aufteilung nach Zeilen',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'vertical-partitioning',
      name: 'Vertikale Partitionierung',
      type: 'optimization',
      description: 'Aufteilung nach Spalten',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'range-scan',
      name: 'Range Scan',
      type: 'access-method',
      description: 'Sequentieller Zugriff auf Bereich',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'index-scan',
      name: 'Index Scan',
      type: 'access-method',
      description: 'Zugriff über Index',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'table-scan',
      name: 'Table Scan',
      type: 'access-method',
      description: 'Vollständiger Tabellendurchlauf',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'composite-index',
      name: 'Zusammengesetzter Index',
      type: 'index',
      description: 'Index auf mehrere Attribute',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      id: 'bloom-filter',
      name: 'Bloom-Filter',
      type: 'structure',
      description: 'Probabilistische Datenstruktur',
      icon: <Hash className="w-5 h-5" />
    }
  ];

  const dropZonesConfig: DropZone[] = [
    {
      id: 'b-tree',
      title: 'B+-Baum Strukturen',
      description: 'Alle Konzepte, die mit B+-Bäumen zusammenhängen',
      correctItems: ['b-plus-tree', 'primary-index', 'secondary-index', 'composite-index', 'range-scan', 'index-scan'],
      icon: <TreePine className="w-6 h-6" />
    },
    {
      id: 'hashing',
      title: 'Hashing Strukturen',
      description: 'Alle Konzepte, die mit Hashing zusammenhängen',
      correctItems: ['hash-table', 'bloom-filter'],
      icon: <Hash className="w-6 h-6" />
    },
    {
      id: 'clustering',
      title: 'Clustering & Optimierung',
      description: 'Konzepte zur Datenoptimierung und -gruppierung',
      correctItems: ['clustered-index', 'horizontal-partitioning', 'vertical-partitioning'],
      icon: <Layers className="w-6 h-6" />
    },
    {
      id: 'partitioning',
      title: 'Zugriffsmethoden',
      description: 'Verschiedene Methoden zum Datenzugriff',
      correctItems: ['table-scan', 'range-scan', 'index-scan'],
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const [availableItems, setAvailableItems] = useState<DragItem[]>([]);

  useEffect(() => {
    // Shuffle items on component mount
    const shuffled = [...dragItems].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    setDropZones(prev => ({
      ...prev,
      [zoneId]: [...prev[zoneId], draggedItem]
    }));

    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    setDraggedItem(null);
  };

  const removeFromZone = (zoneId: string, itemId: string) => {
    const item = dropZones[zoneId].find(item => item.id === itemId);
    if (!item) return;

    setDropZones(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter(item => item.id !== itemId)
    }));

    setAvailableItems(prev => [...prev, item]);
  };

  const checkExercise = () => {
    let correctCount = 0;
    let totalCount = 0;

    dropZonesConfig.forEach(zone => {
      const zoneItems = dropZones[zone.id];
      totalCount += zone.correctItems.length;
      
      zoneItems.forEach(item => {
        if (zone.correctItems.includes(item.id)) {
          correctCount++;
        }
      });
    });

    const percentage = Math.round((correctCount / totalCount) * 100);
    setScore(percentage);

    if (percentage === 100) {
      setResult('Perfekt! Alle Konzepte sind korrekt zugeordnet.');
    } else if (percentage >= 80) {
      setResult(`Sehr gut! Du hast ${correctCount} von ${totalCount} Konzepten korrekt zugeordnet (${percentage}%).`);
    } else if (percentage >= 60) {
      setResult(`Gut! Du hast ${correctCount} von ${totalCount} Konzepten korrekt zugeordnet (${percentage}%). Schau dir die falsch zugeordneten Konzepte nochmal an.`);
    } else {
      setResult(`Du hast ${correctCount} von ${totalCount} Konzepten korrekt zugeordnet (${percentage}%). Versuche es nochmal und überlege, welche Eigenschaften die verschiedenen Konzepte haben.`);
    }

    setShowFeedback(true);
  };

  const resetExercise = () => {
    setAvailableItems([...dragItems].sort(() => Math.random() - 0.5));
    setDropZones({
      'b-tree': [],
      'hashing': [],
      'clustering': [],
      'partitioning': []
    });
    setResult(null);
    setShowFeedback(false);
    setScore(0);
  };

  const getItemStyle = (item: DragItem, zoneId: string) => {
    if (showFeedback) {
      const zone = dropZonesConfig.find(z => z.id === zoneId);
      if (zone && zone.correctItems.includes(item.id)) {
        return 'bg-green-100 border-green-300';
      } else {
        return 'bg-red-100 border-red-300';
      }
    }
    return 'bg-gray-100 border-gray-300';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Drag & Drop: Physischer Datenbankentwurf</h1>
      <p className="text-gray-600 mb-8">Ordne die Konzepte den richtigen Kategorien zu.</p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Aufgabe:</p>
          <p>
            Ordne die folgenden Konzepte des physischen Datenbankentwurfs den passenden Kategorien zu. 
            Jedes Konzept gehört zu genau einer Kategorie. Überlege dir die Eigenschaften und Verwendungszwecke der verschiedenen Konzepte.
          </p>
        </div>

        {/* Available Items */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-3">Verfügbare Konzepte:</h3>
          <div className="flex flex-wrap gap-2">
            {availableItems.map((item) => (
              <div
                key={item.id}
                className="draggable inline-flex items-center space-x-2 bg-white text-gray-800 p-3 m-1 rounded-md shadow-sm cursor-grab border-2 border-gray-200 hover:border-gray-300"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dropZonesConfig.map((zone) => (
            <div key={zone.id} className="space-y-3">
              <div className="flex items-center space-x-2">
                {zone.icon}
                <h3 className="font-semibold text-lg">{zone.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{zone.description}</p>
              <div
                className="drop-zone p-4 bg-white rounded-lg min-h-[200px] border-2 border-dashed border-gray-300"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone.id)}
              >
                {dropZones[zone.id].length === 0 ? (
                  <p className="text-gray-400 text-center mt-8">Ziehe Konzepte hierher</p>
                ) : (
                  <div className="space-y-2">
                    {dropZones[zone.id].map((item) => (
                      <div
                        key={item.id}
                        className={`inline-flex items-center space-x-2 p-2 m-1 rounded-md shadow-sm border-2 ${getItemStyle(item, zone.id)}`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                        <button
                          onClick={() => removeFromZone(zone.id, item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          disabled={showFeedback}
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 text-center space-x-4">
          <button
            onClick={checkExercise}
            disabled={showFeedback}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg"
          >
            {showFeedback ? 'Bereits ausgewertet' : 'Auswerten'}
          </button>
          <button
            onClick={resetExercise}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Zurücksetzen
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              score >= 80 
                ? 'bg-green-100 text-green-800' 
                : score >= 60
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center mb-2">
                {score >= 80 ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                <span className="font-semibold text-lg">{result}</span>
              </div>
              {score < 100 && (
                <div className="mt-2">
                  <p className="text-sm">
                    <strong>Tipp:</strong> Überlege dir die Hauptfunktionen der Konzepte:
                  </p>
                  <ul className="text-sm mt-1 ml-4">
                    <li>• B+-Bäume: Sortierte Daten, Range-Queries, Indizes</li>
                    <li>• Hashing: Schnelle Gleichheitssuche, direkte Adressierung</li>
                    <li>• Clustering: Physikalische Gruppierung verwandter Daten</li>
                    <li>• Zugriffsmethoden: Verschiedene Wege, um Daten zu lesen</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
