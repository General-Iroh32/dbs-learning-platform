import React, { useState } from 'react';
import { Database, HardDrive, TreePine, Hash, Layers, Zap, Target, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  examples: string[];
  keyPoints: string[];
  category: 'Grundlagen' | 'Indexierung' | 'Speicherstrukturen' | 'Performance' | 'Optimierung';
}

export const PhysConceptBasics: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

  const conceptCards: ConceptCard[] = [
    {
      id: 'physischer-entwurf',
      title: 'Physischer Datenbankentwurf',
      icon: <Database className="w-8 h-8" />,
      description: 'Grundlagen des physischen Datenbankentwurfs',
      details: 'Der physische Datenbankentwurf beschäftigt sich mit der effizienten Speicherung und dem schnellen Zugriff auf Daten. Er umfasst die Wahl geeigneter Speicherstrukturen, Indexierung und Optimierungstechniken.',
      examples: [
        'B+-Bäume für sortierte Daten',
        'Hash-Tabellen für schnelle Suche',
        'Clustering für verwandte Daten',
        'Partitionierung für große Tabellen'
      ],
      keyPoints: [
        'Ziel: Minimierung der Zugriffszeit',
        'Berücksichtigung von Zugriffsmustern',
        'Balance zwischen Speicherplatz und Performance',
        'Anpassung an Hardware-Charakteristika'
      ],
      category: 'Grundlagen'
    },
    {
      id: 'indexierung',
      title: 'Indexierung',
      icon: <TreePine className="w-8 h-8" />,
      description: 'Strukturierte Zugriffspfade für schnelle Datenabfrage',
      details: 'Indizes sind zusätzliche Datenstrukturen, die den Zugriff auf Daten in einer Tabelle beschleunigen. Sie funktionieren wie ein Inhaltsverzeichnis in einem Buch.',
      examples: [
        'Primärindex auf Primärschlüssel',
        'Sekundärindex auf häufig abgefragte Attribute',
        'Zusammengesetzte Indizes für mehrere Attribute',
        'Partielle Indizes für Teilmengen'
      ],
      keyPoints: [
        'Beschleunigt SELECT-Abfragen',
        'Verlangsamt INSERT/UPDATE/DELETE',
        'Benötigt zusätzlichen Speicherplatz',
        'Muss regelmäßig gewartet werden'
      ],
      category: 'Indexierung'
    },
    {
      id: 'b-plus-baum',
      title: 'B+-Bäume',
      icon: <TreePine className="w-8 h-8" />,
      description: 'Ausgeglichene Bäume für sortierte Datenzugriffe',
      details: 'B+-Bäume sind selbstausgleichende Bäume, die für Datenbanksysteme optimiert sind. Alle Daten werden in den Blattknoten gespeichert, während die inneren Knoten nur Schlüssel enthalten.',
      examples: [
        'Primärindex auf sortierte Attribute',
        'Range-Queries (Bereichsabfragen)',
        'Sortierte Ausgabe ohne zusätzliche Sortierung',
        'Effiziente Einfüge- und Löschoperationen'
      ],
      keyPoints: [
        'Alle Blätter auf gleicher Höhe',
        'Hohe Auslastung der Knoten',
        'Logarithmische Suchzeit O(log n)',
        'Sequentielle Zugriffe sehr effizient'
      ],
      category: 'Speicherstrukturen'
    },
    {
      id: 'hashing',
      title: 'Hashing',
      icon: <Hash className="w-8 h-8" />,
      description: 'Direkte Adressierung über Hash-Funktionen',
      details: 'Hashing ermöglicht direkten Zugriff auf Daten über eine Hash-Funktion. Die Hash-Funktion berechnet aus einem Schlüssel eine Adresse im Speicher.',
      examples: [
        'Hash-Tabellen für Gleichheitssuchen',
        'Distributed Hashing in NoSQL-Datenbanken',
        'Consistent Hashing für Skalierung',
        'Bloom-Filter für schnelle Existenzprüfung'
      ],
      keyPoints: [
        'Konstante Zugriffszeit O(1) im besten Fall',
        'Keine Sortierung der Daten erforderlich',
        'Kollisionen müssen behandelt werden',
        'Nicht geeignet für Bereichsabfragen'
      ],
      category: 'Speicherstrukturen'
    },
    {
      id: 'clustering',
      title: 'Clustering',
      icon: <Layers className="w-8 h-8" />,
      description: 'Physikalische Gruppierung verwandter Daten',
      details: 'Clustering organisiert Daten so, dass häufig zusammen abgefragte Datensätze physisch nahe beieinander gespeichert werden.',
      examples: [
        'Clustered Index auf Primärschlüssel',
        'Partitionierung nach Zeiträumen',
        'Spaltenbasierte Speicherung (Columnar)',
        'Geografische Clustering'
      ],
      keyPoints: [
        'Reduziert I/O-Operationen',
        'Verbessert Cache-Effizienz',
        'Kann Einfügeoperationen verlangsamen',
        'Wichtig für analytische Workloads'
      ],
      category: 'Optimierung'
    },
    {
      id: 'partitionierung',
      title: 'Partitionierung',
      icon: <Layers className="w-8 h-8" />,
      description: 'Aufteilung großer Tabellen in kleinere Teile',
      details: 'Partitionierung teilt große Tabellen in kleinere, verwaltbare Teile auf. Dies verbessert Performance und Wartbarkeit.',
      examples: [
        'Horizontale Partitionierung nach Werten',
        'Vertikale Partitionierung nach Spalten',
        'Zeitbasierte Partitionierung',
        'Hash-basierte Partitionierung'
      ],
      keyPoints: [
        'Parallelisierung von Abfragen',
        'Reduzierte Wartungszeiten',
        'Bessere Skalierbarkeit',
        'Komplexere Abfrageplanung'
      ],
      category: 'Optimierung'
    },
    {
      id: 'buffer-management',
      title: 'Buffer Management',
      icon: <HardDrive className="w-8 h-8" />,
      description: 'Verwaltung des Hauptspeichers für Datenbankoperationen',
      details: 'Buffer Management verwaltet den Hauptspeicher, der als Cache für Datenbankseiten verwendet wird. Es entscheidet, welche Seiten im Speicher gehalten werden.',
      examples: [
        'LRU (Least Recently Used) Strategie',
        'Clock-Algorithmus für Seitenersetzung',
        'Prefetching für sequentielle Zugriffe',
        'Write-behind für Schreiboperationen'
      ],
      keyPoints: [
        'Minimiert Festplattenzugriffe',
        'Verwaltet begrenzten Hauptspeicher',
        'Berücksichtigt Zugriffsmuster',
        'Kritisch für Performance'
      ],
      category: 'Performance'
    },
    {
      id: 'query-optimization',
      title: 'Query Optimization',
      icon: <Zap className="w-8 h-8" />,
      description: 'Automatische Optimierung von Datenbankabfragen',
      details: 'Query Optimization wählt den effizientesten Ausführungsplan für eine SQL-Abfrage aus. Dabei werden verschiedene Zugriffsstrategien bewertet.',
      examples: [
        'Index-Selection für WHERE-Klauseln',
        'Join-Ordering für mehrere Tabellen',
        'Cost-based Optimization',
        'Heuristische Optimierung'
      ],
      keyPoints: [
        'Berücksichtigt Statistiken über Daten',
        'Schätzt Kosten verschiedener Pläne',
        'Wählt optimalen Ausführungsplan',
        'Kann zur Laufzeit angepasst werden'
      ],
      category: 'Performance'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Grundlagen': return 'text-blue-600 bg-blue-100';
      case 'Indexierung': return 'text-green-600 bg-green-100';
      case 'Speicherstrukturen': return 'text-purple-600 bg-purple-100';
      case 'Performance': return 'text-orange-600 bg-orange-100';
      case 'Optimierung': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsCompleted = (cardId: string) => {
    setCompletedCards(prev => new Set([...prev, cardId]));
  };

  const selectedCardData = conceptCards.find(card => card.id === selectedCard);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Physischer Datenbankentwurf: Konzeptkarten</h1>
        <p className="text-gray-600">Lerne die Grundlagen des physischen Datenbankentwurfs interaktiv</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Fortschritt: {completedCards.size} von {conceptCards.length} Konzepten
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((completedCards.size / conceptCards.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCards.size / conceptCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Concept Cards Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptCards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCard === card.id
                    ? 'border-blue-500 bg-blue-50'
                    : completedCards.has(card.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCard(card.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600 mt-1">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{card.title}</h3>
                      {completedCards.has(card.id) && (
                        <CheckCircle className="text-green-500" size={16} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(card.category)}`}>
                      {card.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-1">
          {selectedCardData ? (
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-blue-600">
                  {selectedCardData.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{selectedCardData.title}</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Beschreibung</h3>
                  <p className="text-sm text-gray-600">{selectedCardData.details}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Beispiele</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCardData.examples.map((example, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={12} />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Wichtige Punkte</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCardData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <Target className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={12} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => markAsCompleted(selectedCardData.id)}
                    disabled={completedCards.has(selectedCardData.id)}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                      completedCards.has(selectedCardData.id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {completedCards.has(selectedCardData.id) ? '✓ Abgeschlossen' : 'Als gelernt markieren'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Konzept auswählen</h3>
              <p className="text-gray-500">Klicke auf eine Konzeptkarte, um Details anzuzeigen</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {completedCards.size > 0 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Fortschritt</h3>
          <p className="text-green-700">
            Du hast bereits {completedCards.size} von {conceptCards.length} Konzepten gelernt. 
            {completedCards.size === conceptCards.length && ' Herzlichen Glückwunsch! Du hast alle Grundlagen abgeschlossen.'}
          </p>
        </div>
      )}
    </div>
  );
};
