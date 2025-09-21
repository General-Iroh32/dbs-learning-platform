import React, { useState, useEffect } from 'react';
import { TreePine, Hash, Layers, Zap, Database, Play, Pause, RotateCcw, Settings, Eye, EyeOff } from 'lucide-react';

interface BTreeNode {
  id: string;
  keys: number[];
  children?: string[];
  isLeaf: boolean;
  parent?: string;
  level: number;
}

interface HashSlot {
  index: number;
  value: number | null;
  collision: boolean;
}

interface BloomFilter {
  bits: boolean[];
  hashFunctions: number;
}

export const PhysInteractiveTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'b-tree' | 'hash-table' | 'bloom-filter' | 'index-calculator'>('b-tree');
  const [bTreeNodes, setBTreeNodes] = useState<BTreeNode[]>([]);
  const [bTreeOrder, setBTreeOrder] = useState(3);
  const [hashTableSize, setHashTableSize] = useState(7);
  const [hashSlots, setHashSlots] = useState<HashSlot[]>([]);
  const [bloomFilter, setBloomFilter] = useState<BloomFilter>({ bits: Array(10).fill(false), hashFunctions: 3 });
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  // B+-Tree Operations
  const initializeBTree = () => {
    const nodes: BTreeNode[] = [
      {
        id: 'root',
        keys: [20],
        children: ['leaf1', 'leaf2'],
        isLeaf: false,
        level: 0
      },
      {
        id: 'leaf1',
        keys: [10, 15],
        isLeaf: true,
        parent: 'root',
        level: 1
      },
      {
        id: 'leaf2',
        keys: [25, 30],
        isLeaf: true,
        parent: 'root',
        level: 1
      }
    ];
    setBTreeNodes(nodes);
  };

  const insertIntoBTree = (value: number) => {
    // Find the correct leaf node
    let currentNode = bTreeNodes.find(node => node.id === 'root');
    while (currentNode && !currentNode.isLeaf) {
      // Find the correct child
      let childIndex = 0;
      for (let i = 0; i < currentNode.keys.length; i++) {
        if (value < currentNode.keys[i]) {
          break;
        }
        childIndex++;
      }
      const childId = currentNode.children?.[childIndex];
      currentNode = bTreeNodes.find(node => node.id === childId);
    }

    if (currentNode) {
      // Insert into leaf
      const newKeys = [...currentNode.keys, value].sort((a, b) => a - b);
      const updatedNodes = bTreeNodes.map(node => 
        node.id === currentNode!.id 
          ? { ...node, keys: newKeys }
          : node
      );
      setBTreeNodes(updatedNodes);
    }
  };

  const renderBTree = () => {
    const maxLevel = Math.max(...bTreeNodes.map(node => node.level));
    
    return (
      <div className="space-y-8">
        {Array.from({ length: maxLevel + 1 }, (_, level) => {
          const nodesAtLevel = bTreeNodes.filter(node => node.level === level);
          return (
            <div key={level} className="flex justify-center space-x-4">
              {nodesAtLevel.map(node => (
                <div
                  key={node.id}
                  className={`p-3 border-2 rounded-lg ${
                    node.isLeaf ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-mono text-sm">
                      [{node.keys.join(', ')}]
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {node.isLeaf ? 'Blatt' : 'Knoten'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  // Hash Table Operations
  const initializeHashTable = () => {
    const slots: HashSlot[] = Array.from({ length: hashTableSize }, (_, i) => ({
      index: i,
      value: null,
      collision: false
    }));
    setHashSlots(slots);
  };

  const insertIntoHashTable = (value: number) => {
    const hash = value % hashTableSize;
    const slots = [...hashSlots];
    
    // Linear probing for collision resolution
    let index = hash;
    let attempts = 0;
    
    while (slots[index].value !== null && attempts < hashTableSize) {
      index = (index + 1) % hashTableSize;
      attempts++;
    }
    
    if (attempts < hashTableSize) {
      slots[index] = {
        ...slots[index],
        value: value,
        collision: attempts > 0
      };
      setHashSlots(slots);
    }
  };

  const renderHashTable = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {hashSlots.map(slot => (
          <div
            key={slot.index}
            className={`border-2 p-3 text-center rounded ${
              slot.value !== null
                ? slot.collision
                  ? 'bg-red-100 border-red-300'
                  : 'bg-green-100 border-green-300'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div className="text-xs text-gray-500">Slot {slot.index}</div>
            <div className="font-mono text-sm">
              {slot.value !== null ? slot.value : 'leer'}
            </div>
            {slot.collision && (
              <div className="text-xs text-red-600">Kollision</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Bloom Filter Operations
  const insertIntoBloomFilter = (value: string) => {
    const newBits = [...bloomFilter.bits];
    
    // Simulate hash functions
    for (let i = 0; i < bloomFilter.hashFunctions; i++) {
      const hash = (value.charCodeAt(0) + i * 31) % newBits.length;
      newBits[hash] = true;
    }
    
    setBloomFilter({ ...bloomFilter, bits: newBits });
  };

  const checkBloomFilter = (value: string) => {
    for (let i = 0; i < bloomFilter.hashFunctions; i++) {
      const hash = (value.charCodeAt(0) + i * 31) % bloomFilter.bits.length;
      if (!bloomFilter.bits[hash]) {
        return false; // Definitely not in set
      }
    }
    return true; // Might be in set (could be false positive)
  };

  const renderBloomFilter = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-10 gap-1">
        {bloomFilter.bits.map((bit, index) => (
          <div
            key={index}
            className={`border-2 p-2 text-center rounded ${
              bit ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        Hash-Funktionen: {bloomFilter.hashFunctions}
      </div>
    </div>
  );

  // Index Calculator
  const calculateIndexSize = () => {
    const numRecords = 1000000;
    const keySize = 8; // bytes
    const pointerSize = 8; // bytes
    const order = bTreeOrder;
    
    const recordsPerLeaf = order - 1;
    const numLeaves = Math.ceil(numRecords / recordsPerLeaf);
    const numLevels = Math.ceil(Math.log(numLeaves) / Math.log(order));
    
    let totalNodes = 0;
    let currentLevelNodes = numLeaves;
    
    for (let level = 0; level < numLevels; level++) {
      totalNodes += currentLevelNodes;
      currentLevelNodes = Math.ceil(currentLevelNodes / order);
    }
    
    const bytesPerNode = order * (keySize + pointerSize);
    const totalSizeBytes = totalNodes * bytesPerNode;
    const totalSizeMB = totalSizeBytes / (1024 * 1024);
    
    return {
      numLeaves,
      numLevels,
      totalNodes,
      totalSizeMB: totalSizeMB.toFixed(2)
    };
  };

  const renderIndexCalculator = () => {
    const result = calculateIndexSize();
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">B+-Baum Ordnung:</label>
            <input
              type="number"
              value={bTreeOrder}
              onChange={(e) => setBTreeOrder(parseInt(e.target.value) || 3)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              min="3"
              max="20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Datensätze:</label>
            <input
              type="number"
              value="1000000"
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Berechnungsergebnisse:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Anzahl Blätter:</span> {result.numLeaves.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Anzahl Ebenen:</span> {result.numLevels}
            </div>
            <div>
              <span className="font-medium">Gesamtknoten:</span> {result.totalNodes.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Index-Größe:</span> {result.totalSizeMB} MB
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    initializeBTree();
    initializeHashTable();
  }, [hashTableSize]);

  const tools = [
    {
      id: 'b-tree',
      name: 'B+-Baum Simulator',
      icon: <TreePine className="w-5 h-5" />,
      description: 'Simuliere Einfüge- und Löschoperationen in B+-Bäumen'
    },
    {
      id: 'hash-table',
      name: 'Hash-Tabelle Simulator',
      icon: <Hash className="w-5 h-5" />,
      description: 'Experimentiere mit verschiedenen Hash-Funktionen und Kollisionsbehandlung'
    },
    {
      id: 'bloom-filter',
      name: 'Bloom-Filter Simulator',
      icon: <Layers className="w-5 h-5" />,
      description: 'Verstehe probabilistische Datenstrukturen und False Positives'
    },
    {
      id: 'index-calculator',
      name: 'Index-Größen Rechner',
      icon: <Database className="w-5 h-5" />,
      description: 'Berechne die Größe und Struktur von Datenbankindizes'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interaktive Tools: Physischer Entwurf</h1>
        <p className="text-gray-600">Experimentiere mit verschiedenen Datenstrukturen und Algorithmen</p>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeTool === tool.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              {tool.icon}
              <span className="font-semibold">{tool.name}</span>
            </div>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </button>
        ))}
      </div>

      {/* Tool Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {tools.find(t => t.id === activeTool)?.name}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                if (activeTool === 'b-tree') initializeBTree();
                else if (activeTool === 'hash-table') initializeHashTable();
                else if (activeTool === 'bloom-filter') setBloomFilter({ bits: Array(10).fill(false), hashFunctions: 3 });
              }}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tool-specific controls */}
        {activeTool === 'b-tree' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wert einfügen:</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="b-tree-value"
                    className="p-2 border border-gray-300 rounded-lg"
                    placeholder="Zahl eingeben"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('b-tree-value') as HTMLInputElement;
                      const value = parseInt(input.value);
                      if (!isNaN(value)) {
                        insertIntoBTree(value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Einfügen
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordnung:</label>
                <input
                  type="number"
                  value={bTreeOrder}
                  onChange={(e) => setBTreeOrder(parseInt(e.target.value) || 3)}
                  className="p-2 border border-gray-300 rounded-lg"
                  min="3"
                  max="10"
                />
              </div>
            </div>
            {showDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">B+-Baum Struktur:</h4>
                {renderBTree()}
              </div>
            )}
          </div>
        )}

        {activeTool === 'hash-table' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wert einfügen:</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="hash-value"
                    className="p-2 border border-gray-300 rounded-lg"
                    placeholder="Zahl eingeben"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('hash-value') as HTMLInputElement;
                      const value = parseInt(input.value);
                      if (!isNaN(value)) {
                        insertIntoHashTable(value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Einfügen
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tabellengröße:</label>
                <input
                  type="number"
                  value={hashTableSize}
                  onChange={(e) => setHashTableSize(parseInt(e.target.value) || 7)}
                  className="p-2 border border-gray-300 rounded-lg"
                  min="5"
                  max="20"
                />
              </div>
            </div>
            {showDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Hash-Tabelle (Lineares Sondieren):</h4>
                {renderHashTable()}
              </div>
            )}
          </div>
        )}

        {activeTool === 'bloom-filter' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">String einfügen:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="bloom-value"
                    className="p-2 border border-gray-300 rounded-lg"
                    placeholder="String eingeben"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('bloom-value') as HTMLInputElement;
                      const value = input.value;
                      if (value) {
                        insertIntoBloomFilter(value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Einfügen
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prüfen:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="bloom-check"
                    className="p-2 border border-gray-300 rounded-lg"
                    placeholder="String prüfen"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('bloom-check') as HTMLInputElement;
                      const value = input.value;
                      if (value) {
                        const result = checkBloomFilter(value);
                        alert(result ? 'Möglicherweise vorhanden (kann False Positive sein)' : 'Definitiv nicht vorhanden');
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Prüfen
                  </button>
                </div>
              </div>
            </div>
            {showDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Bloom-Filter:</h4>
                {renderBloomFilter()}
              </div>
            )}
          </div>
        )}

        {activeTool === 'index-calculator' && (
          <div className="space-y-4">
            {renderIndexCalculator()}
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Informationen</h3>
        <div className="text-sm text-gray-600 space-y-2">
          {activeTool === 'b-tree' && (
            <div>
              <p><strong>B+-Bäume</strong> sind selbstausgleichende Bäume, die für Datenbanksysteme optimiert sind.</p>
              <p>• Alle Blätter sind auf der gleichen Höhe</p>
              <p>• Hohe Auslastung der Knoten</p>
              <p>• Logarithmische Suchzeit O(log n)</p>
              <p>• Sequentielle Zugriffe sehr effizient</p>
            </div>
          )}
          {activeTool === 'hash-table' && (
            <div>
              <p><strong>Hash-Tabellen</strong> bieten konstante Zugriffszeit für Gleichheitssuchen.</p>
              <p>• Hash-Funktion: h(k) = k mod m</p>
              <p>• Kollisionsbehandlung: Lineares Sondieren</p>
              <p>• Nicht geeignet für Bereichsabfragen</p>
              <p>• Rote Slots zeigen Kollisionen an</p>
            </div>
          )}
          {activeTool === 'bloom-filter' && (
            <div>
              <p><strong>Bloom-Filter</strong> sind probabilistische Datenstrukturen für schnelle Existenzprüfung.</p>
              <p>• Kann False Positives haben, aber nie False Negatives</p>
              <p>• Mehrere Hash-Funktionen pro Element</p>
              <p>• Sehr speichereffizient</p>
              <p>• Ideal für Vorfilterung vor teuren Operationen</p>
            </div>
          )}
          {activeTool === 'index-calculator' && (
            <div>
              <p><strong>Index-Größen Berechnung</strong> hilft bei der Planung von Datenbankindizes.</p>
              <p>• Berücksichtigt B+-Baum Struktur</p>
              <p>• Berechnet Anzahl Ebenen und Knoten</p>
              <p>• Schätzt Speicherbedarf</p>
              <p>• Wichtig für Performance-Planung</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

