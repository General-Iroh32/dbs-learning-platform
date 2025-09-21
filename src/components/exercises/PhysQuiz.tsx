import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Target, Trophy, RotateCcw, Clock, Brain, Zap } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Indexierung' | 'Speicherstrukturen' | 'Performance' | 'Optimierung' | 'B+-Bäume' | 'Hashing' | 'Buffer Management';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  points: number;
  timeLimit?: number; // in seconds
}

export const PhysQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizMode, setQuizMode] = useState<'practice' | 'timed' | 'challenge'>('practice');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const allQuestions: QuizQuestion[] = [
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
      explanation: 'Indizes beschleunigen Datenzugriffe, indem sie zusätzliche Datenstrukturen bereitstellen, die den Zugriff auf bestimmte Datensätze erleichtern.',
      category: 'Indexierung',
      difficulty: 'Einfach',
      points: 10
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
      explanation: 'B+-Bäume sind selbstausgleichend, wodurch alle Blätter auf der gleichen Höhe bleiben und konstante Suchzeiten garantiert werden.',
      category: 'B+-Bäume',
      difficulty: 'Einfach',
      points: 10
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
      explanation: 'Hashing bietet konstante Zugriffszeit O(1) für Gleichheitssuchen, ist aber nicht für Bereichsabfragen geeignet.',
      category: 'Hashing',
      difficulty: 'Einfach',
      points: 10
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
      explanation: 'Clustering gruppiert verwandte Daten physisch zusammen, was I/O-Operationen reduziert und die Performance verbessert.',
      category: 'Optimierung',
      difficulty: 'Einfach',
      points: 10
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
      explanation: 'B+-Bäume sind für Bereichsabfragen optimiert, da sie sortierte Datenstrukturen sind und sequentielle Zugriffe effizient unterstützen.',
      category: 'Indexierung',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Bei einem vollen Knoten wird dieser gesplittet und der mittlere Wert wandert in den Elternknoten, um die B+-Baum Eigenschaften zu erhalten.',
      category: 'B+-Bäume',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Zusammengesetzte Indizes können für Abfragen mit dem führenden Schlüssel und aufeinanderfolgenden Attributen verwendet werden.',
      category: 'Indexierung',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Range-basierte Partitionierung nach Zeitstempel ist optimal für zeitbasierte Daten, da sie effiziente Abfragen nach Zeiträumen ermöglicht.',
      category: 'Optimierung',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'LRU ist eine weit verbreitete Strategie, die davon ausgeht, dass kürzlich verwendete Seiten wahrscheinlich wieder verwendet werden.',
      category: 'Buffer Management',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Query Optimization wählt den effizientesten Ausführungsplan aus verschiedenen möglichen Strategien aus.',
      category: 'Performance',
      difficulty: 'Mittel',
      points: 15
    },
    {
      id: 'bloom-filter-analysis',
      question: 'Was ist ein charakteristisches Merkmal von Bloom-Filtern?',
      options: [
        'Sie können False Negatives haben',
        'Sie können False Positives haben, aber nie False Negatives',
        'Sie sind deterministisch',
        'Sie benötigen viel Speicherplatz'
      ],
      correctAnswer: 1,
      explanation: 'Bloom-Filter sind probabilistische Datenstrukturen, die False Positives haben können, aber nie False Negatives.',
      category: 'Hashing',
      difficulty: 'Schwer',
      points: 20
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
      explanation: 'Indizes verlangsamen Schreiboperationen, da sie bei jeder Änderung aktualisiert werden müssen.',
      category: 'Performance',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Zeilenbasierte Speicherung ist für OLTP optimal, da sie schnelle Zugriffe auf einzelne Datensätze ermöglicht.',
      category: 'Speicherstrukturen',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Gleichzeitige Zugriffe können zu Lock-Konflikten führen, besonders bei Index-Updates.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 20
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
      explanation: 'Statistiken helfen dem Query Optimizer, die Kosten verschiedener Ausführungspläne abzuschätzen.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 20
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
      explanation: 'Komprimierung reduziert die Datenmenge, die von der Festplatte gelesen werden muss, was I/O-Operationen minimiert.',
      category: 'Optimierung',
      difficulty: 'Mittel',
      points: 15
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
      explanation: 'Index-Fragmentierung kann durch REBUILD oder REORGANIZE behoben werden, um die Performance zu verbessern.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 20
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
      explanation: 'OLTP optimiert für schnelle Transaktionen, OLAP für komplexe analytische Abfragen mit großen Datenmengen.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 20
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
      explanation: 'Wichtige Metriken sind Nutzungshäufigkeit (werden Indizes verwendet?), Fragmentierung und Wartungskosten.',
      category: 'Performance',
      difficulty: 'Schwer',
      points: 20
    }
  ];

  useEffect(() => {
    if (quizMode === 'practice') {
      setQuestions(allQuestions.slice(0, 10));
    } else if (quizMode === 'timed') {
      setQuestions(allQuestions.slice(0, 15));
      setTimeLeft(300); // 5 Minuten
    } else if (quizMode === 'challenge') {
      setQuestions(allQuestions);
      setTimeLeft(600); // 10 Minuten
    }
    setTotalQuestions(questions.length);
  }, [quizMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && timeLeft && timeLeft > 0 && !quizFinished) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev && prev <= 1) {
            setQuizFinished(true);
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeLeft, quizFinished]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setMaxStreak(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(prevMax => Math.max(prevMax, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(null);
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'Sehr gut', color: 'text-green-600', icon: '🏆' };
    if (percentage >= 80) return { grade: 'Gut', color: 'text-green-500', icon: '🥇' };
    if (percentage >= 70) return { grade: 'Befriedigend', color: 'text-yellow-500', icon: '🥈' };
    if (percentage >= 60) return { grade: 'Ausreichend', color: 'text-orange-500', icon: '🥉' };
    return { grade: 'Nicht bestanden', color: 'text-red-500', icon: '❌' };
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Physischer Entwurf: Wissens-Quiz</h1>
          <p className="text-xl text-gray-600 mb-8">Teste dein Wissen mit verschiedenen Quiz-Modi</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Übungsmodus</h3>
              <p className="text-gray-600 mb-4">10 Fragen ohne Zeitlimit</p>
              <button
                onClick={() => {
                  setQuizMode('practice');
                  startQuiz();
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Starten
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2">Zeitmodus</h3>
              <p className="text-gray-600 mb-4">15 Fragen in 5 Minuten</p>
              <button
                onClick={() => {
                  setQuizMode('timed');
                  startQuiz();
                }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Starten
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Herausforderung</h3>
              <p className="text-gray-600 mb-4">Alle Fragen in 10 Minuten</p>
              <button
                onClick={() => {
                  setQuizMode('challenge');
                  startQuiz();
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Starten
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const grade = getGrade(percentage);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz abgeschlossen!</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-6xl mb-4">{grade.icon}</div>
            <h2 className={`text-3xl font-bold mb-4 ${grade.color}`}>{grade.grade}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                <div className="text-gray-600">Richtige Antworten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{totalQuestions}</div>
                <div className="text-gray-600">Gesamtfragen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{percentage}%</div>
                <div className="text-gray-600">Prozent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{maxStreak}</div>
                <div className="text-gray-600">Max. Serie</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{score} Punkte</div>
              <div className="text-gray-600">Gesamtpunktzahl</div>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg"
          >
            Neues Quiz starten
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Physischer Entwurf Quiz</h1>
        <div className="flex items-center space-x-4">
          {timeLeft && (
            <div className="flex items-center space-x-2">
              <Clock className="text-red-500" />
              <span className={`font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" />
            <span className="font-semibold">{score} Punkte</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="text-purple-500" />
            <span className="font-semibold">Serie: {streak}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Question Counter */}
      <div className="text-center mb-6">
        <span className="text-lg font-semibold text-gray-700">
          Frage {currentQuestion + 1} von {totalQuestions}
        </span>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Frage {currentQuestion + 1}</h2>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentQuestionData.difficulty)}`}>
              {currentQuestionData.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentQuestionData.category)}`}>
              {currentQuestionData.category}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
              {currentQuestionData.points} Punkte
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-6">{currentQuestionData.question}</h3>
        
        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                className="mr-3"
              />
              <span className="flex-1">{option}</span>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={resetQuiz}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Quiz beenden
          </button>
          
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null || showResult}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {showResult ? 'Bereits geprüft' : 'Antwort prüfen'}
          </button>
        </div>

        {/* Result */}
        {showResult && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentQuestionData.correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center mb-2">
                {selectedAnswer === currentQuestionData.correctAnswer ? 
                  <CheckCircle className="mr-2" /> : 
                  <XCircle className="mr-2" />
                }
                <span className="font-semibold">
                  {selectedAnswer === currentQuestionData.correctAnswer ? 'Richtig!' : 'Falsch!'}
                </span>
              </div>
              <p>{currentQuestionData.explanation}</p>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={nextQuestion}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {currentQuestion < questions.length - 1 ? 'Nächste Frage →' : 'Quiz beenden'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

