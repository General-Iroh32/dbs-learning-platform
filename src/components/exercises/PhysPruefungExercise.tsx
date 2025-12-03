import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Database, Target, Trophy, TreePine, Hash, Layers, Zap } from 'lucide-react';

interface PhysExamQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: 'Indexierung' | 'Speicherstrukturen' | 'Performance' | 'Optimierung' | 'B+-Bäume' | 'Hashing' | 'Buffer Management';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  timeLimit?: number; // in seconds
}

export const PhysPruefungExercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 Minuten
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const examQuestions: PhysExamQuestion[] = [
    {
      id: 'index-basics-1',
      question: 'Was ist der Hauptzweck eines Datenbankindex?',
      options: [
        'Speicherplatz zu sparen',
        'Datenzugriffe zu beschleunigen',
        'Datenintegrität zu gewährleisten',
        'Backup-Prozesse zu optimieren'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Indizes beschleunigen Datenzugriffe, indem sie zusätzliche Datenstrukturen bereitstellen, die den Zugriff auf bestimmte Datensätze erleichtern.',
      points: 2,
      category: 'Indexierung',
      difficulty: 'Einfach'
    },
    {
      id: 'b-tree-properties',
      question: 'Welche Eigenschaft ist charakteristisch für B+-Bäume?',
      options: [
        'Alle Knoten haben die gleiche Anzahl von Kindern',
        'Alle Blätter sind auf der gleichen Höhe',
        'Die Wurzel hat immer genau zwei Kinder',
        'Jeder Knoten hat maximal zwei Kinder'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! B+-Bäume sind selbstausgleichend, wodurch alle Blätter auf der gleichen Höhe bleiben und konstante Suchzeiten garantiert werden.',
      points: 3,
      category: 'B+-Bäume',
      difficulty: 'Einfach'
    },
    {
      id: 'hashing-advantages',
      question: 'Was ist ein Hauptvorteil von Hashing?',
      options: [
        'Konstante Zugriffszeit O(1) für Gleichheitssuchen',
        'Effiziente Bereichsabfragen',
        'Automatische Sortierung der Daten',
        'Keine Kollisionen möglich'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Hashing bietet konstante Zugriffszeit O(1) für Gleichheitssuchen, ist aber nicht für Bereichsabfragen geeignet.',
      points: 3,
      category: 'Hashing',
      difficulty: 'Einfach'
    },
    {
      id: 'clustering-benefits',
      question: 'Was ist der Hauptvorteil von Clustering?',
      options: [
        'Reduziert die Anzahl der Indizes',
        'Minimiert I/O-Operationen für verwandte Daten',
        'Erhöht die Speichereffizienz',
        'Vereinfacht die Abfrageoptimierung'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Clustering gruppiert verwandte Daten physisch zusammen, was I/O-Operationen reduziert und die Performance verbessert.',
      points: 3,
      category: 'Optimierung',
      difficulty: 'Einfach'
    },
    {
      id: 'index-selection',
      question: 'Welcher Index-Typ ist für Bereichsabfragen (BETWEEN, <, >) am besten geeignet?',
      options: [
        'Hash-Index',
        'B+-Baum Index',
        'Bitmap-Index',
        'Clustered Index'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! B+-Bäume sind für Bereichsabfragen optimiert, da sie sortierte Datenstrukturen sind und sequentielle Zugriffe effizient unterstützen.',
      points: 4,
      category: 'Indexierung',
      difficulty: 'Mittel'
    },
    {
      id: 'b-tree-insertion',
      question: 'Was passiert beim Einfügen in einen vollen B+-Baum Knoten?',
      options: [
        'Der neue Wert wird abgelehnt',
        'Der Knoten wird gesplittet und der mittlere Wert wandert nach oben',
        'Der gesamte Baum wird neu aufgebaut',
        'Der Knoten wird einfach erweitert'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Bei einem vollen Knoten wird dieser gesplittet und der mittlere Wert wandert in den Elternknoten, um die B+-Baum Eigenschaften zu erhalten.',
      points: 4,
      category: 'B+-Bäume',
      difficulty: 'Mittel'
    },
    {
      id: 'composite-index',
      question: 'Bei einem zusammengesetzten Index (A, B, C) - welche Abfragen können effizient ausgeführt werden?',
      options: [
        'Nur WHERE A = ? AND B = ? AND C = ?',
        'WHERE A = ? AND B = ? AND C = ? sowie WHERE A = ? AND B = ?',
        'Alle Abfragen mit A, B oder C',
        'Nur Abfragen mit dem ersten Attribut A'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Zusammengesetzte Indizes können für Abfragen mit dem führenden Schlüssel und aufeinanderfolgenden Attributen verwendet werden.',
      points: 4,
      category: 'Indexierung',
      difficulty: 'Mittel'
    },
    {
      id: 'partitioning-strategy',
      question: 'Welche Partitionierungsstrategie ist für zeitbasierte Daten am besten geeignet?',
      options: [
        'Hash-basierte Partitionierung',
        'Range-basierte Partitionierung nach Zeitstempel',
        'Round-Robin Partitionierung',
        'Zufällige Partitionierung'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Range-basierte Partitionierung nach Zeitstempel ist optimal für zeitbasierte Daten, da sie effiziente Abfragen nach Zeiträumen ermöglicht.',
      points: 4,
      category: 'Optimierung',
      difficulty: 'Mittel'
    },
    {
      id: 'buffer-management',
      question: 'Welche Strategie wird häufig für Buffer Management verwendet?',
      options: [
        'FIFO (First In, First Out)',
        'LRU (Least Recently Used)',
        'Zufällige Auswahl',
        'LIFO (Last In, First Out)'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! LRU ist eine weit verbreitete Strategie, die davon ausgeht, dass kürzlich verwendete Seiten wahrscheinlich wieder verwendet werden.',
      points: 3,
      category: 'Buffer Management',
      difficulty: 'Mittel'
    },
    {
      id: 'query-optimization',
      question: 'Was ist das Hauptziel der Query Optimization?',
      options: [
        'Minimierung der Speichernutzung',
        'Auswahl des effizientesten Ausführungsplans',
        'Reduzierung der Anzahl der Indizes',
        'Vereinfachung der SQL-Syntax'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Query Optimization wählt den effizientesten Ausführungsplan aus verschiedenen möglichen Strategien aus.',
      points: 4,
      category: 'Performance',
      difficulty: 'Mittel'
    },
    {
      id: 'bloom-filter',
      question: 'Was ist ein charakteristisches Merkmal von Bloom-Filtern?',
      options: [
        'Sie können False Negatives haben',
        'Sie können False Positives haben, aber nie False Negatives',
        'Sie sind deterministisch',
        'Sie benötigen viel Speicherplatz'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Bloom-Filter sind probabilistische Datenstrukturen, die False Positives haben können, aber nie False Negatives.',
      points: 4,
      category: 'Hashing',
      difficulty: 'Schwer'
    },
    {
      id: 'index-maintenance',
      question: 'Welche Auswirkung haben Indizes auf Schreiboperationen?',
      options: [
        'Sie beschleunigen INSERT, UPDATE und DELETE',
        'Sie haben keine Auswirkung auf Schreiboperationen',
        'Sie verlangsamen INSERT, UPDATE und DELETE',
        'Sie verhindern Schreiboperationen'
      ],
      correctAnswer: 2,
      explanation: 'Richtig! Indizes verlangsamen Schreiboperationen, da sie bei jeder Änderung aktualisiert werden müssen.',
      points: 3,
      category: 'Performance',
      difficulty: 'Mittel'
    },
    {
      id: 'storage-structures',
      question: 'Welche Speicherstruktur ist für OLTP-Workloads am besten geeignet?',
      options: [
        'Spaltenbasierte Speicherung',
        'Zeilenbasierte Speicherung',
        'Hybride Speicherung',
        'Komprimierte Speicherung'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Zeilenbasierte Speicherung ist für OLTP optimal, da sie schnelle Zugriffe auf einzelne Datensätze ermöglicht.',
      points: 4,
      category: 'Speicherstrukturen',
      difficulty: 'Mittel'
    },
    {
      id: 'concurrent-access',
      question: 'Was ist ein Hauptproblem bei gleichzeitigen Zugriffen auf Indizes?',
      options: [
        'Speicherplatzverbrauch',
        'Lock-Konflikte und Blockierungen',
        'Langsame Abfragen',
        'Datenverlust'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Gleichzeitige Zugriffe können zu Lock-Konflikten führen, besonders bei Index-Updates.',
      points: 4,
      category: 'Performance',
      difficulty: 'Schwer'
    },
    {
      id: 'index-statistics',
      question: 'Warum sind Statistiken für die Query Optimization wichtig?',
      options: [
        'Sie reduzieren den Speicherverbrauch',
        'Sie ermöglichen bessere Kostenabschätzungen',
        'Sie verhindern Deadlocks',
        'Sie beschleunigen Index-Updates'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Statistiken helfen dem Query Optimizer, die Kosten verschiedener Ausführungspläne abzuschätzen.',
      points: 4,
      category: 'Performance',
      difficulty: 'Schwer'
    },
    {
      id: 'compression-benefits',
      question: 'Was ist ein Hauptvorteil der Datenkomprimierung?',
      options: [
        'Reduziert CPU-Verbrauch',
        'Minimiert I/O-Operationen',
                'Erhöht die Abfragegeschwindigkeit',
        'Vereinfacht die Wartung'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Komprimierung reduziert die Datenmenge, die von der Festplatte gelesen werden muss, was I/O-Operationen minimiert.',
      points: 3,
      category: 'Optimierung',
      difficulty: 'Mittel'
    },
    {
      id: 'index-fragmentation',
      question: 'Was ist Index-Fragmentierung und wie kann sie behoben werden?',
      options: [
        'Löschen und Neuerstellen des Index',
        'REBUILD oder REORGANIZE des Index',
        'Hinzufügen neuer Indizes',
        'Löschen alter Daten'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Index-Fragmentierung kann durch REBUILD oder REORGANIZE behoben werden, um die Performance zu verbessern.',
      points: 4,
      category: 'Performance',
      difficulty: 'Schwer'
    },
    {
      id: 'workload-optimization',
      question: 'Wie unterscheidet sich die Optimierung für OLTP vs. OLAP?',
      options: [
        'OLTP optimiert für schnelle Schreiboperationen, OLAP für analytische Abfragen',
        'Beide verwenden die gleichen Optimierungsstrategien',
        'OLAP benötigt keine Indizes',
        'OLTP benötigt keine Indizes'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! OLTP optimiert für schnelle Transaktionen, OLAP für komplexe analytische Abfragen mit großen Datenmengen.',
      points: 5,
      category: 'Performance',
      difficulty: 'Schwer'
    },
    {
      id: 'index-monitoring',
      question: 'Welche Metriken sind wichtig für das Index-Monitoring?',
      options: [
        'Nur die Anzahl der Indizes',
        'Nutzungshäufigkeit, Fragmentierung und Wartungskosten',
        'Nur die Größe der Indizes',
        'Nur die Erstellungszeit'
      ],
      correctAnswer: 1,
      explanation: 'Richtig! Wichtige Metriken sind Nutzungshäufigkeit (werden Indizes verwendet?), Fragmentierung und Wartungskosten.',
      points: 4,
      category: 'Performance',
      difficulty: 'Schwer'
    }
  ];

  useEffect(() => {
    setMaxScore(examQuestions.reduce((sum, q) => sum + q.points, 0));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && timeLeft > 0 && !examFinished) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setExamFinished(true);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeLeft, examFinished]);

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(60 * 60);
    setExamFinished(false);
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishExam = () => {
    setExamFinished(true);
    setShowResults(true);
    
    // Calculate score
    let totalScore = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    setScore(totalScore);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { grade: 'Sehr gut', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'Gut', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'Befriedigend', color: 'text-yellow-500' };
    if (percentage >= 60) return { grade: 'Ausreichend', color: 'text-orange-500' };
    return { grade: 'Nicht bestanden', color: 'text-red-500' };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'text-green-600 bg-green-100';
      case 'Mittel': return 'text-yellow-600 bg-yellow-100';
      case 'Schwer': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Indexierung': return 'text-blue-600 bg-blue-100';
      case 'Speicherstrukturen': return 'text-purple-600 bg-purple-100';
      case 'Performance': return 'text-orange-600 bg-orange-100';
      case 'Optimierung': return 'text-pink-600 bg-pink-100';
      case 'B+-Bäume': return 'text-green-600 bg-green-100';
      case 'Hashing': return 'text-indigo-600 bg-indigo-100';
      case 'Buffer Management': return 'text-teal-600 bg-teal-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Indexierung': return <TreePine className="w-4 h-4" />;
      case 'Speicherstrukturen': return <Database className="w-4 h-4" />;
      case 'Performance': return <Zap className="w-4 h-4" />;
      case 'Optimierung': return <Layers className="w-4 h-4" />;
      case 'B+-Bäume': return <TreePine className="w-4 h-4" />;
      case 'Hashing': return <Hash className="w-4 h-4" />;
      case 'Buffer Management': return <Database className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Physischer Datenbankentwurf: Prüfungssimulation</h1>
          <p className="text-xl text-gray-600 mb-8">Teste dein Wissen in einer realistischen Prüfungsumgebung</p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Prüfungsinformationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Allgemeine Informationen</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• {examQuestions.length} Fragen</li>
                  <li>• Zeitlimit: 60 Minuten</li>
                  <li>• Maximale Punkte: {maxScore}</li>
                  <li>• Bestehensgrenze: 60%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kategorien</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Indexierung</li>
                  <li>• Speicherstrukturen</li>
                  <li>• Performance</li>
                  <li>• Optimierung</li>
                  <li>• B+-Bäume</li>
                  <li>• Hashing</li>
                  <li>• Buffer Management</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={startExam}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg"
          >
            Prüfung starten
          </button>
        </div>
      </div>
    );
  }

  if (examFinished && showResults) {
    const grade = getGrade(score, maxScore);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Prüfung abgeschlossen!</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Trophy className={`text-6xl ${grade.color}`} />
            </div>
            
            <h2 className={`text-3xl font-bold mb-4 ${grade.color}`}>{grade.grade}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-gray-600">Erreichte Punkte</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{maxScore}</div>
                <div className="text-gray-600">Maximale Punkte</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{percentage}%</div>
                <div className="text-gray-600">Prozent</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold mb-4">Detaillierte Ergebnisse:</h3>
              <div className="space-y-2">
                {examQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    <div key={question.id} className="flex items-center justify-between p-2 rounded">
                      <span className="text-sm">Frage {index + 1}: {question.question.substring(0, 50)}...</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{question.points} Punkte</span>
                        {isCorrect ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <XCircle className="text-red-500" size={16} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg"
          >
            Neue Prüfung starten
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = examQuestions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Physischer Entwurf Prüfung</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="text-red-500" />
            <span className={`font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Frage {currentQuestion + 1} von {examQuestions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Frage {currentQuestion + 1}</h2>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentQuestionData.difficulty)}`}>
              {currentQuestionData.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentQuestionData.category)} flex items-center`}>
              {getCategoryIcon(currentQuestionData.category)}
              <span className="ml-1">{currentQuestionData.category}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
              {currentQuestionData.points} Punkte
            </span>
          </div>
        </div>

        {currentQuestionData.scenario && (
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 mb-6">
            <p className="font-bold text-blue-800 mb-2">Szenario:</p>
            <p className="text-blue-700">{currentQuestionData.scenario}</p>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4">{currentQuestionData.question}</h3>
        
        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
                className="mr-3"
              />
              <span className="flex-1">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-semibold"
        >
          ← Zurück
        </button>
        
        <div className="flex space-x-2">
          {Object.keys(selectedAnswers).map(questionIndex => (
            <button
              key={questionIndex}
              onClick={() => setCurrentQuestion(parseInt(questionIndex))}
              className={`w-8 h-8 rounded-full text-sm font-semibold ${
                parseInt(questionIndex) === currentQuestion
                  ? 'bg-blue-500 text-white'
                  : selectedAnswers[parseInt(questionIndex)] !== undefined
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {parseInt(questionIndex) + 1}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          {currentQuestion === examQuestions.length - 1 ? (
            <button
              onClick={finishExam}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Prüfung beenden
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Weiter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

