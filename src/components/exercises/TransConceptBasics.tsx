import React, { useState } from 'react';
import { 
  Database, 
  Lock, 
  RefreshCw, 
  Shield, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Target,
  AlertTriangle,
  Clock,
  Users,
  Activity
} from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  definition: string;
  properties: string[];
  examples: string[];
  icon: string;
  category: 'Grundlagen' | 'ACID' | 'Isolation' | 'Concurrency' | 'Recovery';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
}

export const TransConceptBasics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<ConceptCard | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const conceptCards: ConceptCard[] = [
    // Grundlagen
    {
      id: 'transaction-basics',
      title: 'Transaktion',
      definition: 'Eine Transaktion ist eine Folge von Datenbankoperationen, die als eine logische Einheit behandelt wird.',
      properties: [
        'Sequenz von READ/WRITE Operationen',
        'Atomicity: Alles oder Nichts',
        'Consistency: Datenbank bleibt konsistent',
        'Isolation: Transaktionen beeinflussen sich nicht',
        'Durability: Änderungen sind permanent'
      ],
      examples: [
        'Überweisung: Geld von Konto A abziehen, zu Konto B hinzufügen',
        'Bestellung: Artikel reservieren, Rechnung erstellen, Lager reduzieren',
        'Benutzerregistrierung: Account erstellen, Profil anlegen, Berechtigungen setzen'
      ],
      icon: 'Database',
      category: 'Grundlagen',
      difficulty: 'Einfach'
    },
    {
      id: 'acid-atomicity',
      title: 'Atomicity (Atomarität)',
      definition: 'Alle Operationen einer Transaktion werden entweder vollständig ausgeführt oder gar nicht.',
      properties: [
        'Alles-oder-Nichts Prinzip',
        'Bei Fehler: Rollback aller Änderungen',
        'Commit: Bestätigung aller Änderungen',
        'Abort: Rückgängigmachung aller Änderungen'
      ],
      examples: [
        'Überweisung: Entweder beide Konten werden geändert oder keines',
        'Bestellung: Entweder alle Artikel werden reserviert oder keiner',
        'Datenbank-Update: Entweder alle Zeilen werden geändert oder keine'
      ],
      icon: 'Shield',
      category: 'ACID',
      difficulty: 'Einfach'
    },
    {
      id: 'acid-consistency',
      title: 'Consistency (Konsistenz)',
      definition: 'Eine Transaktion führt die Datenbank von einem konsistenten Zustand in einen anderen konsistenten Zustand über.',
      properties: [
        'Integritätsbedingungen bleiben erhalten',
        'Geschäftsregeln werden eingehalten',
        'Datenbank-Constraints werden respektiert',
        'Vor und nach der Transaktion: konsistenter Zustand'
      ],
      examples: [
        'Kontostand kann nicht negativ werden',
        'Fremdschlüssel-Referenzen bleiben gültig',
        'Eindeutigkeit von Primärschlüsseln',
        'Check-Constraints werden eingehalten'
      ],
      icon: 'CheckCircle',
      category: 'ACID',
      difficulty: 'Einfach'
    },
    {
      id: 'acid-isolation',
      title: 'Isolation (Isolation)',
      definition: 'Gleichzeitig ausgeführte Transaktionen beeinflussen sich nicht gegenseitig.',
      properties: [
        'Transaktionen laufen unabhängig ab',
        'Intermediäre Ergebnisse sind unsichtbar',
        'Verschiedene Isolation Levels möglich',
        'Verhindert Concurrency-Probleme'
      ],
      examples: [
        'Zwei Überweisungen gleichzeitig: Keine Beeinflussung',
        'Lese- und Schreiboperationen parallel',
        'Mehrere Benutzer arbeiten gleichzeitig',
        'Transaktionen sehen nur committed Daten'
      ],
      icon: 'Users',
      category: 'ACID',
      difficulty: 'Mittel'
    },
    {
      id: 'acid-durability',
      title: 'Durability (Dauerhaftigkeit)',
      definition: 'Nach dem erfolgreichen Abschluss einer Transaktion sind die Änderungen dauerhaft gespeichert.',
      properties: [
        'Änderungen überleben Systemabstürze',
        'Persistente Speicherung auf Festplatte',
        'WAL (Write-Ahead Logging)',
        'Recovery nach Systemfehlern möglich'
      ],
      examples: [
        'Überweisung bleibt auch nach Stromausfall erhalten',
        'Bestellung wird nicht durch Server-Neustart verloren',
        'Datenbank-Recovery stellt alle Commits wieder her',
        'Log-Dateien sichern alle Änderungen'
      ],
      icon: 'Database',
      category: 'ACID',
      difficulty: 'Einfach'
    },
    {
      id: 'isolation-levels',
      title: 'Isolation Levels',
      definition: 'Verschiedene Stufen der Isolation zwischen gleichzeitig laufenden Transaktionen.',
      properties: [
        'READ UNCOMMITTED: Niedrigste Isolation',
        'READ COMMITTED: Standard in den meisten DBMS',
        'REPEATABLE READ: Verhindert Phantom Reads',
        'SERIALIZABLE: Höchste Isolation'
      ],
      examples: [
        'READ UNCOMMITTED: Dirty Reads möglich',
        'READ COMMITTED: Keine Dirty Reads, aber Non-Repeatable Reads',
        'REPEATABLE READ: Keine Non-Repeatable Reads, aber Phantom Reads',
        'SERIALIZABLE: Vollständige Isolation'
      ],
      icon: 'Lock',
      category: 'Isolation',
      difficulty: 'Schwer'
    },
    {
      id: 'concurrency-problems',
      title: 'Concurrency Probleme',
      definition: 'Probleme, die bei gleichzeitiger Ausführung von Transaktionen auftreten können.',
      properties: [
        'Dirty Read: Lesen uncommitted Daten',
        'Non-Repeatable Read: Verschiedene Werte bei wiederholtem Lesen',
        'Phantom Read: Neue Zeilen erscheinen',
        'Lost Update: Änderungen gehen verloren'
      ],
      examples: [
        'Dirty Read: T1 ändert, T2 liest, T1 rollback',
        'Non-Repeatable Read: T1 liest zweimal, T2 ändert dazwischen',
        'Phantom Read: T1 zählt Zeilen, T2 fügt neue hinzu',
        'Lost Update: Beide Transaktionen ändern denselben Wert'
      ],
      icon: 'AlertTriangle',
      category: 'Concurrency',
      difficulty: 'Mittel'
    },
    {
      id: 'locking',
      title: 'Locking (Sperren)',
      definition: 'Mechanismus zur Kontrolle des gleichzeitigen Zugriffs auf Datenbankobjekte.',
      properties: [
        'Shared Lock (S-Lock): Mehrere Leser erlaubt',
        'Exclusive Lock (X-Lock): Nur ein Schreiber',
        'Lock Escalation: Viele kleine Locks zu einem großen',
        'Deadlock Detection: Erkennung von Zyklen'
      ],
      examples: [
        'SELECT: Shared Lock auf gelesene Zeilen',
        'UPDATE: Exclusive Lock auf geänderte Zeilen',
        'Deadlock: T1 wartet auf T2, T2 wartet auf T1',
        'Lock Escalation: Viele Zeilen-Locks zu Tabellen-Lock'
      ],
      icon: 'Lock',
      category: 'Concurrency',
      difficulty: 'Mittel'
    },
    {
      id: 'recovery',
      title: 'Recovery (Wiederherstellung)',
      definition: 'Wiederherstellung der Datenbank nach Systemfehlern oder Abstürzen.',
      properties: [
        'WAL (Write-Ahead Logging)',
        'Checkpoint: Konsistenter Zustand',
        'Redo: Wiederholung committed Transaktionen',
        'Undo: Rückgängigmachung uncommitted Transaktionen'
      ],
      examples: [
        'Systemabsturz: Recovery aus Log-Dateien',
        'Checkpoint: Periodische Sicherung des Zustands',
        'Redo: Wiederherstellung nach Festplattenfehler',
        'Undo: Rollback bei Transaktionsfehler'
      ],
      icon: 'RefreshCw',
      category: 'Recovery',
      difficulty: 'Schwer'
    },
    {
      id: 'transaction-states',
      title: 'Transaktions-Zustände',
      definition: 'Die verschiedenen Zustände, die eine Transaktion während ihres Lebenszyklus durchläuft.',
      properties: [
        'Active: Transaktion läuft',
        'Partially Committed: Alle Operationen ausgeführt',
        'Committed: Erfolgreich abgeschlossen',
        'Failed: Fehler aufgetreten',
        'Aborted: Zurückgerollt'
      ],
      examples: [
        'Active: BEGIN TRANSACTION ausgeführt',
        'Partially Committed: Alle SQL-Befehle ausgeführt',
        'Committed: COMMIT erfolgreich',
        'Failed: Fehler bei SQL-Befehl',
        'Aborted: ROLLBACK ausgeführt'
      ],
      icon: 'Activity',
      category: 'Grundlagen',
      difficulty: 'Einfach'
    }
  ];

  const categories = [
    { id: 'all', label: 'Alle', icon: 'Database' },
    { id: 'Grundlagen', label: 'Grundlagen', icon: 'BookOpen' },
    { id: 'ACID', label: 'ACID', icon: 'Shield' },
    { id: 'Isolation', label: 'Isolation', icon: 'Lock' },
    { id: 'Concurrency', label: 'Concurrency', icon: 'Users' },
    { id: 'Recovery', label: 'Recovery', icon: 'RefreshCw' }
  ];

  const filteredCards = selectedCategory === 'all' 
    ? conceptCards 
    : conceptCards.filter(card => card.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Database': <Database className="w-6 h-6" />,
      'Shield': <Shield className="w-6 h-6" />,
      'CheckCircle': <CheckCircle className="w-6 h-6" />,
      'Users': <Users className="w-6 h-6" />,
      'Lock': <Lock className="w-6 h-6" />,
      'AlertTriangle': <AlertTriangle className="w-6 h-6" />,
      'RefreshCw': <RefreshCw className="w-6 h-6" />,
      'Activity': <Activity className="w-6 h-6" />
    };
    return icons[iconName] || <Database className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-blue-600" />
            Transaktions-Grundlagen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lerne die fundamentalen Konzepte von Transaktionen in Datenbanksystemen
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              {getIcon(category.icon)}
              {category.label}
            </button>
          ))}
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => {
                setSelectedCard(card);
                setShowDetails(true);
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {getIcon(card.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {card.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(card.difficulty)}`}>
                        {card.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {card.definition}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {card.category}
                  </span>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {showDetails && selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {getIcon(selectedCard.icon)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {selectedCard.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedCard.difficulty)}`}>
                          {selectedCard.difficulty}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {selectedCard.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-8 h-8" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Definition */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Definition
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {selectedCard.definition}
                    </p>
                  </div>

                  {/* Properties */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Eigenschaften
                    </h3>
                    <ul className="space-y-2">
                      {selectedCard.properties.map((property, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{property}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Beispiele
                    </h3>
                    <ul className="space-y-3">
                      {selectedCard.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Schließen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="text-center">
          <p className="text-gray-600">
            {filteredCards.length} Konzept{filteredCards.length !== 1 ? 'e' : ''} verfügbar
          </p>
        </div>
      </div>
    </div>
  );
};
