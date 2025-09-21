import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  Lock,
  Users,
  Activity
} from 'lucide-react';

interface Transaction {
  id: string;
  operations: {
    type: 'read' | 'write' | 'commit' | 'abort';
    resource: string;
    value?: any;
    timestamp: number;
    status: 'pending' | 'executing' | 'completed' | 'failed';
  }[];
  status: 'active' | 'committed' | 'aborted';
  startTime: number;
  endTime?: number;
}

interface Lock {
  type: 'shared' | 'exclusive';
  resource: string;
  transaction: string;
  timestamp: number;
}

interface DeadlockDetection {
  waitForGraph: {
    [transaction: string]: string[];
  };
  cycles: string[][];
}

export const TransInteractiveTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('transaction-timeline');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000); // milliseconds
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [locks, setLocks] = useState<Lock[]>([]);
  const [deadlockDetection, setDeadlockDetection] = useState<DeadlockDetection | null>(null);
  const [showDeadlock, setShowDeadlock] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tools = [
    { id: 'transaction-timeline', label: 'Transaktions-Timeline', icon: 'Clock' },
    { id: 'acid-visualization', label: 'ACID-Visualisierung', icon: 'Shield' },
    { id: 'isolation-levels', label: 'Isolation Levels', icon: 'Lock' },
    { id: 'concurrency-control', label: 'Concurrency Control', icon: 'Users' },
    { id: 'deadlock-detection', label: 'Deadlock Detection', icon: 'AlertTriangle' },
    { id: 'recovery-simulation', label: 'Recovery Simulation', icon: 'RotateCcw' }
  ];

  const sampleTransactions: Transaction[] = [
    {
      id: 'T1',
      operations: [
        { type: 'read', resource: 'Account A', value: 1000, timestamp: 1, status: 'completed' },
        { type: 'write', resource: 'Account A', value: 500, timestamp: 2, status: 'completed' },
        { type: 'write', resource: 'Account B', value: 500, timestamp: 3, status: 'completed' },
        { type: 'commit', resource: 'all', timestamp: 4, status: 'completed' }
      ],
      status: 'committed',
      startTime: 1,
      endTime: 4
    },
    {
      id: 'T2',
      operations: [
        { type: 'read', resource: 'Account B', value: 200, timestamp: 2, status: 'completed' },
        { type: 'write', resource: 'Account B', value: 300, timestamp: 3, status: 'completed' },
        { type: 'commit', resource: 'all', timestamp: 4, status: 'completed' }
      ],
      status: 'committed',
      startTime: 2,
      endTime: 4
    },
    {
      id: 'T3',
      operations: [
        { type: 'read', resource: 'Account C', value: 1500, timestamp: 3, status: 'completed' },
        { type: 'write', resource: 'Account C', value: 1000, timestamp: 4, status: 'failed' },
        { type: 'abort', resource: 'all', timestamp: 5, status: 'completed' }
      ],
      status: 'aborted',
      startTime: 3,
      endTime: 5
    }
  ];

  const sampleLocks: Lock[] = [
    { type: 'shared', resource: 'Account A', transaction: 'T1', timestamp: 1 },
    { type: 'exclusive', resource: 'Account A', transaction: 'T1', timestamp: 2 },
    { type: 'shared', resource: 'Account B', transaction: 'T2', timestamp: 2 },
    { type: 'exclusive', resource: 'Account B', transaction: 'T2', timestamp: 3 }
  ];

  const sampleDeadlock: DeadlockDetection = {
    waitForGraph: {
      'T1': ['T2'],
      'T2': ['T3'],
      'T3': ['T1']
    },
    cycles: [['T1', 'T2', 'T3', 'T1']]
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const maxSteps = getMaxSteps();
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed]);

  useEffect(() => {
    setTransactions(sampleTransactions);
    setLocks(sampleLocks);
    setDeadlockDetection(sampleDeadlock);
  }, []);

  const getMaxSteps = () => {
    switch (selectedTool) {
      case 'transaction-timeline':
        return Math.max(...transactions.map(t => t.operations.length));
      case 'acid-visualization':
        return 4; // A, C, I, D
      case 'isolation-levels':
        return 4; // 4 isolation levels
      case 'concurrency-control':
        return 6; // different concurrency scenarios
      case 'deadlock-detection':
        return 3; // detection steps
      case 'recovery-simulation':
        return 5; // recovery steps
      default:
        return 1;
    }
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const stepForward = () => {
    const maxSteps = getMaxSteps();
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Clock': <Clock className="w-5 h-5" />,
      'Shield': <Database className="w-5 h-5" />,
      'Lock': <Lock className="w-5 h-5" />,
      'Users': <Users className="w-5 h-5" />,
      'AlertTriangle': <AlertTriangle className="w-5 h-5" />,
      'RotateCcw': <RotateCcw className="w-5 h-5" />
    };
    return icons[iconName] || <Database className="w-5 h-5" />;
  };

  const renderTransactionTimeline = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaktions-Timeline</h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border-l-4 border-blue-400 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-blue-800">{tx.id}</div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    tx.status === 'committed' ? 'bg-green-100 text-green-800' :
                    tx.status === 'aborted' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tx.status}
                  </div>
                </div>
                <div className="space-y-2">
                  {tx.operations.slice(0, currentStep + 1).map((op, index) => (
                    <div key={index} className={`flex items-center gap-3 text-sm ${
                      op.status === 'failed' ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {op.timestamp}
                      </span>
                      <span className="capitalize">{op.type}</span>
                      <span>{op.resource}</span>
                      {op.value && <span className="text-gray-500">({op.value})</span>}
                      {op.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                      {op.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderACIDVisualization = () => {
    const acidProperties = [
      { id: 'A', name: 'Atomicity', description: 'Alles oder Nichts', color: 'bg-red-500' },
      { id: 'C', name: 'Consistency', description: 'Datenbank bleibt konsistent', color: 'bg-blue-500' },
      { id: 'I', name: 'Isolation', description: 'Transaktionen beeinflussen sich nicht', color: 'bg-green-500' },
      { id: 'D', name: 'Durability', description: 'Änderungen sind permanent', color: 'bg-yellow-500' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ACID-Eigenschaften</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {acidProperties.map((prop, index) => (
              <div
                key={prop.id}
                className={`p-4 rounded-lg text-white text-center transition-all ${
                  index <= currentStep ? prop.color : 'bg-gray-300'
                }`}
              >
                <div className="text-2xl font-bold mb-2">{prop.id}</div>
                <div className="text-sm font-medium">{prop.name}</div>
                <div className="text-xs opacity-90 mt-1">{prop.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ACID in Aktion</h3>
          <div className="space-y-4">
            {currentStep >= 0 && (
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</div>
                <div>
                  <div className="font-medium">Atomicity</div>
                  <div className="text-sm text-gray-600">Überweisung: Entweder beide Konten werden geändert oder keines</div>
                </div>
              </div>
            )}
            {currentStep >= 1 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</div>
                <div>
                  <div className="font-medium">Consistency</div>
                  <div className="text-sm text-gray-600">Kontostände bleiben immer gültig (≥ 0)</div>
                </div>
              </div>
            )}
            {currentStep >= 2 && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">I</div>
                <div>
                  <div className="font-medium">Isolation</div>
                  <div className="text-sm text-gray-600">Parallele Transaktionen beeinflussen sich nicht</div>
                </div>
              </div>
            )}
            {currentStep >= 3 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">D</div>
                <div>
                  <div className="font-medium">Durability</div>
                  <div className="text-sm text-gray-600">Änderungen überleben Systemabstürze</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderIsolationLevels = () => {
    const levels = [
      { name: 'READ UNCOMMITTED', problems: ['Dirty Read'], color: 'bg-red-100' },
      { name: 'READ COMMITTED', problems: ['Non-Repeatable Read'], color: 'bg-yellow-100' },
      { name: 'REPEATABLE READ', problems: ['Phantom Read'], color: 'bg-blue-100' },
      { name: 'SERIALIZABLE', problems: [], color: 'bg-green-100' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Isolation Levels</h3>
          <div className="space-y-4">
            {levels.map((level, index) => (
              <div
                key={level.name}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index <= currentStep ? level.color + ' border-blue-400' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{level.name}</div>
                  <div className="text-sm text-gray-500">
                    {index === 0 ? 'Niedrigste' : index === 3 ? 'Höchste' : 'Mittlere'} Isolation
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {level.problems.length > 0 ? `Probleme: ${level.problems.join(', ')}` : 'Keine Concurrency-Probleme'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderConcurrencyControl = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Concurrency Control</h3>
          <div className="space-y-4">
            {currentStep >= 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Optimistic Locking</h4>
                <div className="text-sm text-gray-600">
                  Keine Locks, nur Versionsprüfung. Bei Konflikt: Retry.
                </div>
              </div>
            )}
            {currentStep >= 1 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Pessimistic Locking</h4>
                <div className="text-sm text-gray-600">
                  Locks vor Operationen. Verhindert Konflikte, aber kann blockieren.
                </div>
              </div>
            )}
            {currentStep >= 2 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-2">Shared Locks</h4>
                <div className="text-sm text-gray-600">
                  Mehrere Transaktionen können gleichzeitig lesen.
                </div>
              </div>
            )}
            {currentStep >= 3 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium mb-2">Exclusive Locks</h4>
                <div className="text-sm text-gray-600">
                  Nur eine Transaktion kann schreiben.
                </div>
              </div>
            )}
            {currentStep >= 4 && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium mb-2">Lock Escalation</h4>
                <div className="text-sm text-gray-600">
                  Viele Zeilen-Locks werden zu Tabellen-Locks.
                </div>
              </div>
            )}
            {currentStep >= 5 && (
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-medium mb-2">Deadlock Detection</h4>
                <div className="text-sm text-gray-600">
                  Erkennung von Zyklen in Wait-For-Graphen.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDeadlockDetection = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Deadlock Detection</h3>
          <div className="space-y-4">
            {currentStep >= 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Wait-For-Graph</h4>
                <div className="text-sm text-gray-600">
                  T1 → T2 → T3 → T1 (Zyklus erkannt!)
                </div>
              </div>
            )}
            {currentStep >= 1 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium mb-2">Deadlock erkannt</h4>
                <div className="text-sm text-gray-600">
                  Zyklus: T1 wartet auf T2, T2 wartet auf T3, T3 wartet auf T1
                </div>
              </div>
            )}
            {currentStep >= 2 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Resolution</h4>
                <div className="text-sm text-gray-600">
                  Eine Transaktion (T1) wird abgebrochen, um den Deadlock aufzulösen.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRecoverySimulation = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recovery Simulation</h3>
          <div className="space-y-4">
            {currentStep >= 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium mb-2">Systemabsturz</h4>
                <div className="text-sm text-gray-600">
                  System stürzt ab. Recovery-Prozess startet.
                </div>
              </div>
            )}
            {currentStep >= 1 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-2">Log-Analyse</h4>
                <div className="text-sm text-gray-600">
                  WAL (Write-Ahead Log) wird analysiert.
                </div>
              </div>
            )}
            {currentStep >= 2 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Redo-Phase</h4>
                <div className="text-sm text-gray-600">
                  Committed Transaktionen werden wiederholt.
                </div>
              </div>
            )}
            {currentStep >= 3 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Undo-Phase</h4>
                <div className="text-sm text-gray-600">
                  Nicht-committed Transaktionen werden rückgängig gemacht.
                </div>
              </div>
            )}
            {currentStep >= 4 && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium mb-2">Recovery abgeschlossen</h4>
                <div className="text-sm text-gray-600">
                  Datenbank ist wieder in konsistentem Zustand.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentTool = () => {
    switch (selectedTool) {
      case 'transaction-timeline':
        return renderTransactionTimeline();
      case 'acid-visualization':
        return renderACIDVisualization();
      case 'isolation-levels':
        return renderIsolationLevels();
      case 'concurrency-control':
        return renderConcurrencyControl();
      case 'deadlock-detection':
        return renderDeadlockDetection();
      case 'recovery-simulation':
        return renderRecoverySimulation();
      default:
        return <div>Tool nicht gefunden</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Settings className="w-10 h-10 text-blue-600" />
            Interaktive Transaktions-Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visualisiere und verstehe Transaktionskonzepte durch interaktive Tools
          </p>
        </div>

        {/* Tool Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool.id);
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedTool === tool.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              {getIcon(tool.icon)}
              {tool.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={isPlaying ? pause : play}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={reset}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              
              <button
                onClick={stepBackward}
                disabled={currentStep === 0}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={stepForward}
                disabled={currentStep >= getMaxSteps() - 1}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Schritt {currentStep + 1} von {getMaxSteps()}
              </span>
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Geschwindigkeit:</label>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value={2000}>Langsam</option>
                  <option value={1000}>Normal</option>
                  <option value={500}>Schnell</option>
                  <option value={200}>Sehr schnell</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / getMaxSteps()) * 100}%` }}
            />
          </div>
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderCurrentTool()}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Tool-Informationen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>Verwendung:</strong> Wähle ein Tool aus und verwende die Steuerelemente, um durch die Visualisierung zu navigieren.
            </div>
            <div>
              <strong>Geschwindigkeit:</strong> Passe die Abspielgeschwindigkeit an dein Lerntempo an.
            </div>
            <div>
              <strong>Schritt-für-Schritt:</strong> Verwende die Pfeiltasten für präzise Kontrolle.
            </div>
            <div>
              <strong>Reset:</strong> Starte die Visualisierung von vorne.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
