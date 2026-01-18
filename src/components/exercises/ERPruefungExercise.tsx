import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, BookOpen, Target, Trophy } from 'lucide-react';

interface ERExamQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: 'Grundkonzepte' | 'Kardinalitäten' | 'Schwache Entitäten' | 'ISA-Beziehungen' | 'Diagramm-Erstellung' | 'Relationale Abbildung';
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  timeLimit?: number; // in seconds
}

export const ERPruefungExercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 Minuten
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const examQuestions: ERExamQuestion[] = [
    {
      id: 'basic-1',
      question: 'Was ist ein Entitätstyp im ER-Modell?',
      options: [
        'Eine Klasse von Objekten mit gemeinsamen Eigenschaften',
        'Ein einzelnes Objekt der realen Welt',
        'Eine Eigenschaft eines Objekts',
        'Eine Verbindung zwischen Objekten'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Entitätstypen repräsentieren Klassen von Objekten (z.B. "Student", "Kurs") mit gemeinsamen Eigenschaften.',
      points: 2,
      category: 'Grundkonzepte',
      difficulty: 'Einfach'
    },
    {
      id: 'cardinality-1',
      question: 'Welche Kardinalität beschreibt eine 1:N Beziehung?',
      scenario: 'Ein Professor kann mehrere Vorlesungen halten. Jede Vorlesung wird von genau einem Professor gehalten.',
      options: [
        'Ein Entitätstyp kann mit vielen Instanzen eines anderen in Beziehung stehen',
        'Beide Entitätstypen können mit vielen Instanzen des anderen in Beziehung stehen',
        'Jeder Entitätstyp kann nur mit einer Instanz des anderen in Beziehung stehen',
        'Ein Entitätstyp kann mit genau zwei Instanzen des anderen in Beziehung stehen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! 1:N bedeutet, dass ein Entitätstyp (1) mit vielen Instanzen eines anderen Entitätstyps (N) in Beziehung stehen kann.',
      points: 3,
      category: 'Kardinalitäten',
      difficulty: 'Einfach'
    },
    {
      id: 'cardinality-2',
      question: 'Wie ist die Kardinalität zwischen Student und Kurs bei der Beziehung "belegt"?',
      scenario: 'Studenten können mehrere Kurse belegen. Kurse können von mehreren Studenten belegt werden.',
      options: [
        'N:M (Viele Studenten zu vielen Kursen)',
        '1:N (Ein Student zu vielen Kursen)',
        'N:1 (Viele Studenten zu einem Kurs)',
        '1:1 (Ein Student zu einem Kurs)'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Da Studenten mehrere Kurse belegen können und Kurse von mehreren Studenten belegt werden, ist es eine N:M Beziehung.',
      points: 3,
      category: 'Kardinalitäten',
      difficulty: 'Einfach'
    },
    {
      id: 'weak-entities-1',
      question: 'Welcher Entitätstyp ist schwach?',
      scenario: 'Ein Student kann mehrere Prüfungen ablegen. Jede Prüfung gehört zu genau einem Studenten und hat eine Prüfungsnummer. Ohne den Studenten kann die Prüfung nicht identifiziert werden.',
      options: [
        'Prüfung (abhängig von Student)',
        'Student (unabhängig)',
        'Prüfungsnummer (ist ein Attribut)',
        'Keiner ist schwach'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Prüfung ist ein schwacher Entitätstyp, da sie nur in Kombination mit Student eindeutig identifiziert werden kann.',
      points: 4,
      category: 'Schwache Entitäten',
      difficulty: 'Mittel'
    },
    {
      id: 'isa-1',
      question: 'Wie würdest du die Beziehung zwischen Angestellter, Professor und Assistent modellieren?',
      scenario: 'Es gibt Angestellte der Universität. Professoren sind Angestellte mit zusätzlichen Attributen wie Rang und Büro. Assistenten sind Angestellte mit einem Fachbereich.',
      options: [
        'ISA-Beziehung: Professor ISA Angestellter, Assistent ISA Angestellter',
        'Normale Beziehungen zwischen drei Entitätstypen',
        'Schwache Entitätstypen',
        'N:M Beziehungen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! ISA-Beziehungen modellieren Vererbung. Professor und Assistent sind spezialisierte Angestellte.',
      points: 4,
      category: 'ISA-Beziehungen',
      difficulty: 'Mittel'
    },
    {
      id: 'participation-1',
      question: 'Wie sind die Participation Constraints?',
      scenario: 'Jeder Student muss mindestens einen Kurs belegen. Nicht jeder Kurs muss von einem Studenten belegt werden.',
      options: [
        'Student: total, Kurs: partiell',
        'Student: partiell, Kurs: total',
        'Beide: total',
        'Beide: partiell'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Jeder Student MUSS einen Kurs belegen (total), aber nicht jeder Kurs muss belegt werden (partiell).',
      points: 3,
      category: 'Kardinalitäten',
      difficulty: 'Mittel'
    },
    {
      id: 'attributes-1',
      question: 'Wo gehören Note und Semester hin?',
      scenario: 'Studenten belegen Kurse. Bei jeder Belegung wird eine Note und das Semester der Belegung gespeichert.',
      options: [
        'Als Attribute der Beziehung "belegt"',
        'Als Attribute des Entitätstyps "Student"',
        'Als Attribute des Entitätstyps "Kurs"',
        'Als separate Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Note und Semester beschreiben die Beziehung zwischen Student und Kurs, nicht die Entitätstypen selbst.',
      points: 3,
      category: 'Grundkonzepte',
      difficulty: 'Mittel'
    },
    {
      id: 'recursive-1',
      question: 'Wie modelliert man diese Beziehung?',
      scenario: 'Personen können andere Personen als Mentoren haben. Eine Person kann mehrere Mentees haben und selbst ein Mentee sein.',
      options: [
        'Rekursive Beziehung mit Rollennamen "Mentor" und "Mentee"',
        'Zwei separate Entitätstypen "Mentor" und "Mentee"',
        'N:M Beziehung zwischen "Person" und "Person"',
        'Schwache Entitätstypen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Rekursive Beziehungen verbinden einen Entitätstyp mit sich selbst. Rollennamen unterscheiden die Rollen.',
      points: 4,
      category: 'Grundkonzepte',
      difficulty: 'Schwer'
    },
    {
      id: 'ternary-1',
      question: 'Wie viele Entitätstypen sind an der Beziehung beteiligt?',
      scenario: 'Professoren bewerten Studenten in Kursen. Ein Professor kann mehrere Studenten in verschiedenen Kursen bewerten.',
      options: [
        '3: Professor, Student, Kurs',
        '2: Professor, Student',
        '4: Professor, Student, Kurs, Bewertung',
        '1: Bewertung'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Beziehung "bewertet" verbindet drei Entitätstypen: Professor, Student und Kurs.',
      points: 4,
      category: 'Grundkonzepte',
      difficulty: 'Schwer'
    },
    {
      id: 'keys-1',
      question: 'Wie ist der Primärschlüssel der Prüfung?',
      scenario: 'Ein Student kann mehrere Prüfungen in verschiedenen Kursen ablegen. Jede Prüfung wird durch Student-ID und Kurs-ID eindeutig identifiziert.',
      options: [
        'Zusammengesetzt: {Student-ID, Kurs-ID}',
        'Einfach: Prüfungs-ID',
        'Einfach: Student-ID',
        'Einfach: Kurs-ID'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Da die Kombination aus Student-ID und Kurs-ID eindeutig ist, ist der Primärschlüssel zusammengesetzt.',
      points: 3,
      category: 'Grundkonzepte',
      difficulty: 'Schwer'
    },
    {
      id: 'mapping-1',
      question: 'Wie werden N:M Beziehungen in relationale Schemata abgebildet?',
      options: [
        'Als separate Relation mit den Primärschlüsseln der beteiligten Entitätstypen als Fremdschlüssel',
        'Durch Einfügen eines Fremdschlüssels in eine der beteiligten Relationen',
        'Durch Zusammenführen der beiden Relationen zu einer',
        'N:M Beziehungen werden nicht abgebildet'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! N:M Beziehungen werden zu separaten Relationen mit den Primärschlüsseln der beteiligten Entitätstypen als zusammengesetzten Schlüssel.',
      points: 4,
      category: 'Relationale Abbildung',
      difficulty: 'Mittel'
    },
    {
      id: 'mapping-2',
      question: 'Wie werden 1:N Beziehungen in relationale Schemata abgebildet?',
      options: [
        'Durch Einfügen eines Fremdschlüssels in die Relation der N-Seite',
        'Als separate Relation mit beiden Primärschlüsseln',
        'Durch Einfügen eines Fremdschlüssels in die Relation der 1-Seite',
        'Durch Zusammenführen der beiden Relationen'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Bei 1:N Beziehungen wird der Primärschlüssel der "1"-Seite als Fremdschlüssel in die Relation der "N"-Seite eingefügt.',
      points: 4,
      category: 'Relationale Abbildung',
      difficulty: 'Mittel'
    },
    {
      id: 'diagram-1',
      question: 'Wie werden schwache Entitätstypen im ER-Diagramm dargestellt?',
      options: [
        'Mit doppelten Rechtecken und gestrichelt unterstrichenen Teilschlüsseln',
        'Mit einfachen Rechtecken wie normale Entitätstypen',
        'Mit Rauten wie Beziehungstypen',
        'Mit Kreisen wie Attribute'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Schwache Entitätstypen werden mit doppelten Rechtecken dargestellt und ihre Teilschlüssel sind gestrichelt unterstrichen.',
      points: 3,
      category: 'Diagramm-Erstellung',
      difficulty: 'Mittel'
    },
    {
      id: 'isa-2',
      question: 'Welche Kardinalität hat eine ISA-Beziehung?',
      options: [
        'Immer [1,1] zu [0,1]',
        'Immer [0,1] zu [0,1]',
        'Immer [1,1] zu [1,1]',
        'Kann beliebig sein'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Jeder Subtyp gehört zu genau einem Supertyp [1,1], aber nicht jeder Supertyp muss einen Subtyp haben [0,1].',
      points: 3,
      category: 'ISA-Beziehungen',
      difficulty: 'Mittel'
    },
    {
      id: 'complex-1',
      question: 'Welche Beziehungstypen sind in diesem Szenario vorhanden?',
      scenario: 'Eine Universität hat Studenten, die Kurse belegen. Professoren halten Vorlesungen in verschiedenen Räumen. Studenten wohnen in Wohnheimen.',
      options: [
        'belegt, hält, findet_statt, wohnt',
        'Student, Kurs, Professor, Raum, Wohnheim',
        'Matrikelnummer, Name, Titel, Raumnummer',
        'belegt, hält, wohnt'
      ],
      correctAnswer: 0,
      explanation: 'Richtig! Die Beziehungstypen sind: belegt (Student-Kurs), hält (Professor-Kurs), findet_statt (Kurs-Raum), wohnt (Student-Wohnheim).',
      points: 5,
      category: 'Diagramm-Erstellung',
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
    setTimeLeft(45 * 60);
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
      case 'Grundkonzepte': return 'text-blue-600 bg-blue-100';
      case 'Kardinalitäten': return 'text-purple-600 bg-purple-100';
      case 'Schwache Entitäten': return 'text-orange-600 bg-orange-100';
      case 'ISA-Beziehungen': return 'text-pink-600 bg-pink-100';
      case 'Diagramm-Erstellung': return 'text-indigo-600 bg-indigo-100';
      case 'Relationale Abbildung': return 'text-teal-600 bg-teal-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">ER-Modell Prüfungssimulation</h1>
          <p className="text-xl text-gray-600 mb-8">Teste dein Wissen in einer realistischen Prüfungsumgebung</p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Prüfungsinformationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Allgemeine Informationen</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• {examQuestions.length} Fragen</li>
                  <li>• Zeitlimit: 45 Minuten</li>
                  <li>• Maximale Punkte: {maxScore}</li>
                  <li>• Bestehensgrenze: 60%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kategorien</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Grundkonzepte</li>
                  <li>• Kardinalitäten</li>
                  <li>• Schwache Entitäten</li>
                  <li>• ISA-Beziehungen</li>
                  <li>• Diagramm-Erstellung</li>
                  <li>• Relationale Abbildung</li>
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
                      <span className="text-sm">Frage {index + 1}: {question.question}</span>
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
        <h1 className="text-3xl font-bold text-gray-800">ER-Modell Prüfung</h1>
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
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentQuestionData.category)}`}>
              {currentQuestionData.category}
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
