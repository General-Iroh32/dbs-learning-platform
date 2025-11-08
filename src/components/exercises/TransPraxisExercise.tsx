import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  BookOpen, 
  Target,
  Clock,
  AlertTriangle,
  RefreshCw,
  Building,
  CreditCard,
  ShoppingCart,
  Users,
  Activity
} from 'lucide-react';

interface PraxisExercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: 'Banking' | 'E-Commerce' | 'Inventory' | 'Booking' | 'Social' | 'Healthcare';
  points: number;
  context: string;
  businessImpact: string;
}

export const TransPraxisExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per exercise
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showExplanation, setShowExplanation] = useState(false);

  const exercises: PraxisExercise[] = [
    // Banking Scenarios
    {
      id: 'banking-transfer-1',
      title: 'Banküberweisung',
      description: 'Sichere Geldüberweisung zwischen Konten',
      scenario: 'Ein Kunde möchte 500€ von seinem Girokonto auf sein Sparkonto überweisen. Das System muss sicherstellen, dass das Geld nicht verloren geht und beide Konten korrekt aktualisiert werden.',
      question: 'Welche ACID-Eigenschaft ist am wichtigsten, um sicherzustellen, dass das Geld nicht verloren geht?',
      options: [
        'Atomicity - Alle Operationen werden zusammen ausgeführt oder gar nicht',
        'Consistency - Die Datenbank bleibt in einem gültigen Zustand',
        'Isolation - Transaktionen beeinflussen sich nicht gegenseitig',
        'Durability - Änderungen sind dauerhaft gespeichert'
      ],
      correctAnswer: 0,
      explanation: 'Atomicity ist entscheidend, da entweder beide Konten korrekt aktualisiert werden (Geld abgezogen und hinzugefügt) oder gar keine Änderung stattfindet. Dies verhindert, dass Geld "verloren" geht.',
      difficulty: 'Einfach',
      category: 'Banking',
      points: 20,
      context: 'Finanzdienstleistungen erfordern höchste Sicherheit und Zuverlässigkeit',
      businessImpact: 'Fehler könnten zu finanziellen Verlusten und rechtlichen Problemen führen'
    },
    {
      id: 'banking-concurrent-1',
      title: 'Gleichzeitige Überweisungen',
      description: 'Concurrency-Probleme bei parallelen Transaktionen',
      scenario: 'Zwei Personen überweisen gleichzeitig Geld vom selben Konto: Person A überweist 100€, Person B überweist 200€. Der Kontostand beträgt 250€.',
      question: 'Welches Concurrency-Problem könnte auftreten?',
      options: [
        'Dirty Read - Lesen von uncommitted Daten',
        'Non-Repeatable Read - Verschiedene Werte bei wiederholtem Lesen',
        'Lost Update - Änderungen gehen durch Überschreiben verloren',
        'Phantom Read - Neue Zeilen erscheinen zwischen Lesevorgängen'
      ],
      correctAnswer: 2,
      explanation: 'Lost Update: Beide Transaktionen lesen den ursprünglichen Kontostand (250€), berechnen ihre neuen Werte (150€ und 50€) und überschreiben sich gegenseitig. Eine der Änderungen geht verloren.',
      difficulty: 'Mittel',
      category: 'Banking',
      points: 25,
      context: 'Hochfrequente Transaktionen in Bankensystemen',
      businessImpact: 'Kunden könnten Geld verlieren oder unberechtigte Überweisungen erhalten'
    },

    // E-Commerce Scenarios
    {
      id: 'ecommerce-order-1',
      title: 'Online-Bestellung',
      description: 'Komplexe Bestellabwicklung im E-Commerce',
      scenario: 'Ein Kunde bestellt 3 Artikel im Online-Shop. Das System muss: 1) Artikel verfügbar prüfen, 2) Lagerbestand reduzieren, 3) Rechnung erstellen, 4) Zahlung verarbeiten, 5) Versand vorbereiten.',
      question: 'Was passiert, wenn die Zahlung fehlschlägt?',
      options: [
        'Nur die Zahlung wird rückgängig gemacht, Artikel bleiben reserviert',
        'Alle Schritte werden rückgängig gemacht (Rollback)',
        'Die Bestellung wird mit "Zahlung ausstehend" markiert',
        'Die Artikel werden automatisch an einen anderen Kunden verkauft'
      ],
      correctAnswer: 1,
      explanation: 'Bei einem Fehler in der Zahlungsverarbeitung muss die gesamte Transaktion rückgängig gemacht werden (Rollback), um die Konsistenz zu wahren. Artikel werden wieder verfügbar.',
      difficulty: 'Einfach',
      category: 'E-Commerce',
      points: 20,
      context: 'E-Commerce-Systeme mit hohem Transaktionsvolumen',
      businessImpact: 'Falsche Bestandsführung könnte zu Überverkäufen führen'
    },
    {
      id: 'ecommerce-inventory-1',
      title: 'Lagerverwaltung',
      description: 'Concurrent Inventory Management',
      scenario: 'Zwei Kunden bestellen gleichzeitig den letzten verfügbaren Artikel. Das System prüft den Bestand (1 verfügbar) und reserviert den Artikel für beide Kunden.',
      question: 'Welches Isolation Level würde dieses Problem verhindern?',
      options: [
        'READ UNCOMMITTED',
        'READ COMMITTED',
        'REPEATABLE READ',
        'SERIALIZABLE'
      ],
      correctAnswer: 3,
      explanation: 'SERIALIZABLE verhindert Phantom Reads und Lost Updates, indem es sicherstellt, dass keine anderen Transaktionen die gelesenen Daten ändern können, bis die aktuelle Transaktion abgeschlossen ist.',
      difficulty: 'Schwer',
      category: 'E-Commerce',
      points: 30,
      context: 'Hochfrequente Bestellungen bei limitierten Artikeln',
      businessImpact: 'Überverkäufe führen zu unzufriedenen Kunden und Reputationsschäden'
    },

    // Inventory Management
    {
      id: 'inventory-update-1',
      title: 'Lagerbestands-Update',
      description: 'Synchronisation von Lagerbeständen',
      scenario: 'Ein Lagerarbeiter aktualisiert den Bestand eines Artikels von 100 auf 80, während gleichzeitig ein Verkäufer 15 Artikel verkauft und den Bestand auf 85 aktualisiert.',
      question: 'Welches Problem entsteht durch die gleichzeitige Ausführung?',
      options: [
        'Der Bestand wird korrekt auf 70 aktualisiert',
        'Eine der Änderungen geht verloren (Lost Update)',
        'Die Transaktionen blockieren sich gegenseitig',
        'Der Bestand wird auf 95 aktualisiert'
      ],
      correctAnswer: 1,
      explanation: 'Lost Update: Beide Transaktionen lesen den ursprünglichen Wert (100), berechnen ihre neuen Werte (80 und 85) und überschreiben sich. Eine der Änderungen geht verloren.',
      difficulty: 'Mittel',
      category: 'Inventory',
      points: 25,
      context: 'Multi-User Inventory Management System',
      businessImpact: 'Falsche Bestandsführung führt zu logistischen Problemen und Kundenunzufriedenheit'
    },

    // Booking Systems
    {
      id: 'booking-reservation-1',
      title: 'Hotel-Reservierung',
      description: 'Doppelte Zimmerreservierung verhindern',
      scenario: 'Zwei Gäste versuchen gleichzeitig, das letzte verfügbare Zimmer zu buchen. Das System prüft die Verfügbarkeit und reserviert das Zimmer für beide Gäste.',
      question: 'Welche Lösung verhindert doppelte Reservierungen am effektivsten?',
      options: [
        'Optimistic Locking mit Versionsnummern',
        'Pessimistic Locking mit Row-Level Locks',
        'Database Constraints mit UNIQUE Index',
        'Application-Level Checks ohne Locks'
      ],
      correctAnswer: 1,
      explanation: 'Pessimistic Locking mit Row-Level Locks verhindert, dass zwei Transaktionen gleichzeitig dasselbe Zimmer reservieren können. Die erste Transaktion blockiert die zweite.',
      difficulty: 'Schwer',
      category: 'Booking',
      points: 30,
      context: 'Hochfrequente Buchungen bei limitierten Ressourcen',
      businessImpact: 'Doppelte Buchungen führen zu unzufriedenen Gästen und zusätzlichen Kosten'
    },

    // Social Media
    {
      id: 'social-like-1',
      title: 'Social Media Likes',
      description: 'Like-Counter Synchronisation',
      scenario: '1000 Benutzer liken gleichzeitig einen Post. Das System muss den Like-Counter von 5000 auf 6000 aktualisieren.',
      question: 'Welche Strategie ist am besten für hohe Concurrency geeignet?',
      options: [
        'Jeder Like als separate Transaktion',
        'Batch-Processing aller Likes',
        'Atomic Counter mit Optimistic Locking',
        'Separate Like-Tabelle ohne Counter'
      ],
      correctAnswer: 2,
      explanation: 'Atomic Counter mit Optimistic Locking ist am besten geeignet, da es hohe Concurrency unterstützt und trotzdem Konsistenz gewährleistet. Retry-Mechanismen handhaben Konflikte.',
      difficulty: 'Mittel',
      category: 'Social',
      points: 25,
      context: 'Social Media mit Millionen von gleichzeitigen Interaktionen',
      businessImpact: 'Falsche Like-Counter beeinträchtigen die Benutzererfahrung und Plattform-Reputation'
    },

    // Healthcare
    {
      id: 'healthcare-appointment-1',
      title: 'Terminbuchung',
      description: 'Arzttermin-Reservierung',
      scenario: 'Ein Patient bucht einen Termin beim Arzt. Das System muss prüfen, ob der Termin verfügbar ist, und ihn dann reservieren.',
      question: 'Welche ACID-Eigenschaft ist am wichtigsten für die Terminbuchung?',
      options: [
        'Atomicity - Termin wird entweder vollständig gebucht oder gar nicht',
        'Consistency - Terminregeln werden eingehalten',
        'Isolation - Mehrere Patienten können nicht denselben Termin buchen',
        'Durability - Terminbuchung überlebt Systemabstürze'
      ],
      correctAnswer: 2,
      explanation: 'Isolation ist entscheidend, um zu verhindern, dass mehrere Patienten denselben Termin buchen können. Dies wird durch entsprechende Locks gewährleistet.',
      difficulty: 'Einfach',
      category: 'Healthcare',
      points: 20,
      context: 'Kritische Terminbuchungssysteme in der Gesundheitsversorgung',
      businessImpact: 'Doppelte Terminbuchungen führen zu Verwirrung und ineffizienter Ressourcennutzung'
    },

    // Complex Scenarios
    {
      id: 'complex-distributed-1',
      title: 'Distributed Transaction',
      description: 'Transaktionen über mehrere Systeme',
      scenario: 'Eine Reisebuchung umfasst: Flug buchen (Fluggesellschaft), Hotel buchen (Hotelkette), Mietwagen buchen (Autovermietung). Alle Buchungen müssen erfolgreich sein oder alle rückgängig gemacht werden.',
      question: 'Welches Protokoll wird für solche verteilten Transaktionen verwendet?',
      options: [
        'Two-Phase Commit (2PC)',
        'Three-Phase Commit (3PC)',
        'Saga Pattern',
        'Event Sourcing'
      ],
      correctAnswer: 0,
      explanation: 'Two-Phase Commit (2PC) koordiniert Transaktionen über mehrere Systeme. Phase 1: Alle Systeme werden gefragt, ob sie committen können. Phase 2: Alle Systeme committen oder rollbacken.',
      difficulty: 'Schwer',
      category: 'Booking',
      points: 35,
      context: 'Komplexe verteilte Systeme mit hohen Konsistenzanforderungen',
      businessImpact: 'Fehlerhafte Koordination führt zu inkonsistenten Buchungen und Kundenunzufriedenheit'
    }
  ];

  useEffect(() => {
    if (currentExercise < exercises.length) {
      setTimeLeft(300);
      setIsTimerActive(true);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  }, [currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      checkAnswer();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === exercises[currentExercise].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowExplanation(true);
    setIsTimerActive(false);

    if (correct) {
      setScore(score + exercises[currentExercise].points);
      setCompletedExercises(prev => new Set([...prev, exercises[currentExercise].id]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Banking': return <CreditCard className="w-5 h-5" />;
      case 'E-Commerce': return <ShoppingCart className="w-5 h-5" />;
      case 'Inventory': return <Building className="w-5 h-5" />;
      case 'Booking': return <BookOpen className="w-5 h-5" />;
      case 'Social': return <Users className="w-5 h-5" />;
      case 'Healthcare': return <Activity className="w-5 h-5" />;
      default: return <Database className="w-5 h-5" />;
    }
  };

  if (currentExercise >= exercises.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Glückwunsch!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Du hast alle Praxisfälle erfolgreich bearbeitet!
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-blue-600">
              Gesamtpunktzahl: {score} Punkte
            </p>
            <p className="text-gray-600 mt-2">
              {completedExercises.size} von {exercises.length} Fällen abgeschlossen
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentExercise(0);
              setScore(0);
              setCompletedExercises(new Set());
            }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Nochmal spielen
          </button>
        </div>
      </div>
    );
  }

  const currentEx = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-blue-600" />
            Transaktions-Praxisfälle
          </h1>
          <div className="flex items-center justify-center gap-6 text-lg text-gray-600">
            <span>Fall {currentExercise + 1} von {exercises.length}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentEx.difficulty)}`}>
              {currentEx.difficulty}
            </span>
            <span className="flex items-center gap-2">
              {getCategoryIcon(currentEx.category)}
              {currentEx.category}
            </span>
            <span className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              {score} Punkte
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
              <p className="text-gray-600 mb-4">{currentEx.description}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">{currentEx.category}</span>
              <div className="text-lg font-medium text-blue-600">{currentEx.points} Punkte</div>
            </div>
          </div>

          {/* Scenario */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Szenario
            </h3>
            <p className="text-blue-700 mb-4">{currentEx.scenario}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Kontext:</span>
                <p className="text-blue-700">{currentEx.context}</p>
              </div>
              <div>
                <span className="font-medium text-blue-800">Geschäftsauswirkung:</span>
                <p className="text-blue-700">{currentEx.businessImpact}</p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentEx.question}</h3>
            <div className="space-y-3">
              {currentEx.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => setSelectedAnswer(index)}
                    className="w-4 h-4 text-blue-600 mt-1"
                  />
                  <span className="text-gray-700 flex-1">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Antwort prüfen
          </button>
        </div>

        {/* Result Modal */}
        {showResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full p-8">
              <div className="text-center mb-6">
                {isCorrect ? (
                  <div>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                      Richtig!
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      Du hast {currentEx.points} Punkte erhalten!
                    </p>
                  </div>
                ) : (
                  <div>
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-red-600 mb-4">
                      Nicht ganz richtig
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      Die richtige Antwort war: {currentEx.options[currentEx.correctAnswer]}
                    </p>
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Erklärung
                </h3>
                <p className="text-gray-700">{currentEx.explanation}</p>
              </div>

              {/* Business Context */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-800 mb-3">Geschäftskontext</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-800">Kontext:</span>
                    <p className="text-blue-700">{currentEx.context}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Geschäftsauswirkung:</span>
                    <p className="text-blue-700">{currentEx.businessImpact}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setShowExplanation(false);
                    setSelectedAnswer(null);
                    setTimeLeft(300);
                    setIsTimerActive(true);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Nochmal versuchen
                </button>
                <button
                  onClick={() => {
                    setShowResult(false);
                    setShowExplanation(false);
                    nextExercise();
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  {currentExercise < exercises.length - 1 ? 'Nächster Fall' : 'Beenden'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
