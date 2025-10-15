import React, { useState } from 'react';

interface ExamQuestion {
  id: string;
  question: string;
  schema: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: 'Grundlagen' | 'Operatoren' | 'Komplexe Anfragen' | 'Optimierung';
}

export const RAPruefungExercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 Minuten
  const [examStarted, setExamStarted] = useState(false);

  const examQuestions: ExamQuestion[] = [
    {
      id: 'basic-1',
      question: 'Was ist das Ergebnis von π_Name(σ_Alter > 25(Student))?',
      schema: 'Student(studID, Name, Alter, Semester)',
      options: [
        'Namen aller Studenten, die älter als 25 sind',
        'Alle Attribute aller Studenten über 25',
        'Namen aller Studenten',
        'Alter aller Studenten über 25'
      ],
      correctAnswer: 0,
      explanation: 'Zuerst wird σ_Alter > 25 angewendet (Selektion), dann π_Name (Projektion).',
      points: 2,
      category: 'Grundlagen'
    },
    {
      id: 'operators-1',
      question: 'Welcher Operator wird verwendet, um zwei Relationen über gleichnamige Attribute zu verbinden?',
      schema: 'R(A,B,C), S(B,C,D)',
      options: [
        'Natural Join (⋈)',
        'Theta-Join (⨝_θ)',
        'Kreuzprodukt (×)',
        'Vereinigung (∪)'
      ],
      correctAnswer: 0,
      explanation: 'Der Natural Join verbindet Relationen über gleichnamige Attribute automatisch.',
      points: 2,
      category: 'Operatoren'
    },
    {
      id: 'operators-2',
      question: 'Was ist der Unterschied zwischen Left Outer Join (⟕) und Natural Join (⋈)?',
      schema: 'L(A,B,C), R(C,D,E)',
      options: [
        'Left Outer Join behält alle Tupel der linken Relation, Natural Join eliminiert partnerlose Tupel',
        'Natural Join behält alle Tupel der linken Relation, Left Outer Join eliminiert partnerlose Tupel',
        'Beide verhalten sich identisch',
        'Left Outer Join ist schneller als Natural Join'
      ],
      correctAnswer: 0,
      explanation: 'Left Outer Join behält alle Tupel der linken Relation bei, Natural Join eliminiert Tupel ohne Partner.',
      points: 3,
      category: 'Operatoren'
    },
    {
      id: 'operators-3',
      question: 'Was berechnet die Division R ÷ S?',
      schema: 'R(A,B), S(B)',
      options: [
        'Tupel aus R, die mit ALLEN Tupeln aus S kombiniert werden können',
        'Tupel aus R, die mit MINDESTENS einem Tupel aus S kombiniert werden können',
        'Tupel aus R, die mit KEINEM Tupel aus S kombiniert werden können',
        'Alle Tupel aus R und S'
      ],
      correctAnswer: 0,
      explanation: 'R ÷ S findet Tupel aus R, die mit jedem einzelnen Tupel aus S kombiniert werden können.',
      points: 4,
      category: 'Operatoren'
    },
    {
      id: 'operators-4',
      question: 'Welche Aggregatfunktionen können mit dem γ-Operator verwendet werden?',
      schema: 'R(A,B,C)',
      options: [
        'COUNT, SUM, AVG, MIN, MAX',
        'Nur COUNT',
        'Nur SUM und AVG',
        'Nur MIN und MAX'
      ],
      correctAnswer: 0,
      explanation: 'Diese sind die typischen Aggregatfunktionen in der relationalen Algebra.',
      points: 2,
      category: 'Operatoren'
    },
    {
      id: 'complex-1',
      question: 'Gegeben: Student(studID, Name, Semester), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS). Welche Anfrage findet alle Studenten, die Kurse mit mehr als 5 ECTS belegen?',
      schema: 'Student(studID, Name, Semester), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      options: [
        'π_Name(Student ⋈ Belegt ⋈ σ_ECTS > 5(Kurs))',
        'π_Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))',
        'π_Name(Student ⋈ σ_ECTS > 5(Belegt ⋈ Kurs))',
        'σ_ECTS > 5(π_Name(Student ⋈ Belegt ⋈ Kurs))'
      ],
      correctAnswer: 0,
      explanation: 'Zuerst werden Kurse mit ECTS > 5 gefiltert, dann mit Belegt und Student gejoint, und schließlich die Namen projiziert.',
      points: 5,
      category: 'Komplexe Anfragen'
    },
    {
      id: 'complex-2',
      question: 'Welche Anfrage findet Studenten, die ALLE Kurse mit 6 ECTS belegen?',
      schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      options: [
        'π_studID,Name(Student ⋈ (Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))))',
        'π_studID,Name(Student ⋈ σ_ECTS = 6(Belegt ⋈ Kurs))',
        'π_studID,Name(σ_ECTS = 6(Student ⋈ Belegt ⋈ Kurs))',
        'Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))'
      ],
      correctAnswer: 0,
      explanation: 'Die Division findet Studenten, die mit ALLEN 6-ECTS-Kursen kombiniert werden können.',
      points: 6,
      category: 'Komplexe Anfragen'
    },
    {
      id: 'complex-3',
      question: 'Wie findet man die Anzahl der belegten Kurse pro Student?',
      schema: 'Belegt(studID, courseID)',
      options: [
        'γ_studID; COUNT(courseID)(Belegt)',
        'π_studID, COUNT(courseID)(Belegt)',
        'σ_COUNT(courseID)(Belegt)',
        'Belegt ÷ courseID'
      ],
      correctAnswer: 0,
      explanation: 'Der γ-Operator gruppiert nach studID und zählt die courseIDs pro Gruppe.',
      points: 3,
      category: 'Komplexe Anfragen'
    },
    {
      id: 'optimization-1',
      question: 'Welche Anfrage ist effizienter für "Studenten, die Kurse mit mehr als 5 ECTS belegen"?',
      schema: 'Student(studID, Name), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS)',
      options: [
        'π_Name(Student ⋈ Belegt ⋈ σ_ECTS > 5(Kurs))',
        'π_Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))',
        'σ_ECTS > 5(π_Name(Student ⋈ Belegt ⋈ Kurs))',
        'π_Name(Student ⋈ σ_ECTS > 5(Belegt ⋈ Kurs))'
      ],
      correctAnswer: 0,
      explanation: 'Die Selektion sollte vor dem Join angewendet werden, um nur relevante Kurse zu betrachten.',
      points: 4,
      category: 'Optimierung'
    },
    {
      id: 'optimization-2',
      question: 'Was ist der Unterschied zwischen Semi-Join (⋉) und Natural Join (⋈)?',
      schema: 'L(A,B,C), R(C,D,E)',
      options: [
        'Semi-Join behält nur Attribute von L, Natural Join behält alle Attribute',
        'Natural Join behält nur Attribute von L, Semi-Join behält alle Attribute',
        'Beide behalten alle Attribute',
        'Beide behalten nur Attribute von L'
      ],
      correctAnswer: 0,
      explanation: 'L ⋉ R = π_L(L ⋈ R) behält nur Attribute der linken Relation, während L ⋈ R alle Attribute behält.',
      points: 3,
      category: 'Optimierung'
    }
  ];

  const totalPoints = examQuestions.reduce((sum, q) => sum + q.points, 0);
  const maxPoints = totalPoints;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeLeft]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishExam = () => {
    setShowResults(true);
  };

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(30 * 60);
  };

  const resetExam = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setExamStarted(false);
    setTimeLeft(30 * 60);
  };

  const calculateScore = () => {
    let earnedPoints = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });
    return earnedPoints;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Grundlagen': return 'bg-blue-100 text-blue-800';
      case 'Operatoren': return 'bg-green-100 text-green-800';
      case 'Komplexe Anfragen': return 'bg-yellow-100 text-yellow-800';
      case 'Optimierung': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Prüfungsvorbereitung: Relationale Algebra</h1>
        <p className="text-gray-600 mb-8">
          Simuliere eine echte Prüfung mit 10 Fragen in 30 Minuten.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Prüfungssimulation</h2>
            <div className="space-y-4 mb-8">
              <div className="text-lg">
                <strong>Anzahl Fragen:</strong> {examQuestions.length}
              </div>
              <div className="text-lg">
                <strong>Zeitlimit:</strong> 30 Minuten
              </div>
              <div className="text-lg">
                <strong>Maximale Punkte:</strong> {maxPoints}
              </div>
              <div className="text-lg">
                <strong>Kategorien:</strong> Grundlagen, Operatoren, Komplexe Anfragen, Optimierung
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Hinweise:</h3>
              <ul className="text-left space-y-2 max-w-2xl mx-auto">
                <li>• Du kannst zwischen Fragen vor- und zurücknavigieren</li>
                <li>• Alle Antworten werden automatisch gespeichert</li>
                <li>• Die Zeit läuft kontinuierlich ab</li>
                <li>• Du kannst die Prüfung jederzeit beenden</li>
                <li>• Nach Ablauf der Zeit wird automatisch ausgewertet</li>
              </ul>
            </div>

            <button
              onClick={startExam}
              className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              Prüfung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const earnedPoints = calculateScore();
    const percentage = Math.round((earnedPoints / maxPoints) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Prüfungsergebnis</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Dein Ergebnis</h2>
            <div className="text-6xl font-bold mb-4 text-blue-600">{percentage}%</div>
            <div className="text-xl text-gray-600 mb-4">
              {earnedPoints} von {maxPoints} Punkten erreicht
            </div>
            <div className={`text-lg font-semibold ${
              percentage >= 80 ? 'text-green-600' : 
              percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage >= 80 ? 'Sehr gut!' : 
               percentage >= 60 ? 'Befriedigend' : 'Nicht bestanden'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Detaillierte Auswertung:</h3>
            {examQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Frage {index + 1}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? `+${question.points}` : '0'} Punkte
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{question.question}</p>
                  <div className="space-y-1">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className={`p-2 rounded ${
                        optionIndex === question.correctAnswer
                          ? 'bg-green-100 text-green-800'
                          : optionIndex === userAnswer && !isCorrect
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-50'
                      }`}>
                        <span className="font-mono text-sm">{option}</span>
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-semibold">✓ Richtig</span>
                        )}
                        {optionIndex === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-600 font-semibold">✗ Deine Antwort</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={resetExam}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Neue Prüfung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prüfung: Relationale Algebra</h1>
        <div className="text-right">
          <div className="text-lg font-semibold text-red-600">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600">
            Frage {currentQuestion + 1} von {examQuestions.length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Frage {currentQuestion + 1}</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded text-sm ${getCategoryColor(currentQ.category)}`}>
                {currentQ.category}
              </span>
              <span className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-800">
                {currentQ.points} Punkte
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Schema:</h3>
          <p className="font-mono text-blue-700">{currentQ.schema}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">{currentQ.question}</h3>
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-mono text-sm">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vorherige
          </button>
          
          <div className="flex space-x-2">
            {currentQuestion < examQuestions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Nächste Frage
              </button>
            ) : (
              <button
                onClick={finishExam}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Prüfung beenden
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {currentQuestion + 1} von {examQuestions.length} Fragen bearbeitet
          </p>
        </div>
      </div>
    </div>
  );
};
