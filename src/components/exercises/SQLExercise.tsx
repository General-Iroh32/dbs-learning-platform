import React, { useState } from 'react';

export const SQLExercise: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 'box1',
      question: 'box 1 (SELECT-Klausel)',
      options: [
        'x.fachgebiet',
        'x.name', 
        'x.name.fachgebiet',
        'x.fachgebiet.name',
        't.arzt',
        't.arzt.fachgebiet'
      ],
      correct: 'x.fachgebiet.name',
      explanation: 'Wir brauchen den Namen des Fachgebiets, also x.fachgebiet.name'
    },
    {
      id: 'box2',
      question: 'box 2 (Aggregationsfunktion)',
      options: [
        't.date',
        'MAX(*)',
        'COUNT(*)',
        'x.termin',
        't.anzahl',
        'x.anzahl',
        'SUM(*)'
      ],
      correct: 'COUNT(*)',
      explanation: 'Wir zählen die Anzahl der Termine pro Fachgebiet, also COUNT(*)'
    },
    {
      id: 'box3',
      question: 'box 3 (JOIN-Tabelle)',
      options: [
        'warteliste',
        'fachgebiet',
        'arzt',
        'patient',
        'termin'
      ],
      correct: 'arzt',
      explanation: 'Wir brauchen die Arzt-Tabelle, um das Fachgebiet zu bekommen'
    },
    {
      id: 'box4',
      question: 'box 4 (JOIN-Bedingung)',
      options: [
        'arzt.svnr',
        'patient',
        'patient.svnr',
        'arzt',
        'svnr'
      ],
      correct: 'arzt.svnr = t.arzt',
      explanation: 'Wir verbinden Termine mit Ärzten über die SVNR'
    },
    {
      id: 'box5',
      question: 'box 5 (WHERE-Bedingung)',
      options: [
        'x.fachgebiet.name',
        'x.arzt.svnr',
        'x.patient.svnr',
        'x.fachgebiet',
        'x.patient',
        'x.svnr',
        'x.name.fachgebiet',
        'x.arzt.svnr',
        'x.svnr'
      ],
      correct: 'x.fachgebiet.name',
      explanation: 'Wir filtern nach dem Fachgebiet-Namen'
    },
    {
      id: 'box6',
      question: 'box 6 (GROUP BY)',
      options: [
        'x.patient.svnr',
        'x.fachgebiet.name',
        'x.name.fachgebiet',
        'x.patient',
        'x.name',
        'x.arzt',
        'x.name',
        'x.fachgebiet'
      ],
      correct: 'x.fachgebiet.name',
      explanation: 'Wir gruppieren nach dem Fachgebiet-Namen'
    }
  ];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const checkExercise = () => {
    let correctCount = 0;
    let explanations: string[] = [];

    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correct) {
        correctCount++;
        explanations.push(`✅ ${q.question}: Richtig! ${q.explanation}`);
      } else {
        explanations.push(`❌ ${q.question}: Falsch! ${q.explanation}`);
      }
    });

    setResult(explanations.join('\n\n'));
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setResult(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">SQL-Übung: Komplexe Abfragen</h1>
      <p className="text-gray-600 mb-8">
        Vervollständigen Sie die SQL-Abfrage basierend auf dem gegebenen Schema.
      </p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Schema:</p>
          <ul className="font-mono text-sm mt-2">
            <li>termin(terminid, datum, arzt.svnr, patient.svnr, beschreibung)</li>
            <li>arzt(svnr, name, fachgebiet.name, vorgesetzter.svnr)</li>
            <li>fachgebiet(name, beschreibung, unterfachgebiet_von.fachgebiet.name)</li>
          </ul>
          <p className="font-bold mt-4">Aufgabe:</p>
          <p>Finden Sie für jedes Fachgebiet die Anzahl der Termine für Daten nach dem heutigen Datum.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <div className="mb-2">SELECT <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box1 || 'box 1'}</span> AS fachgebietName, <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box2 || 'box 2'}</span> AS anzahlTermine</div>
          <div className="mb-2">FROM termine t</div>
          <div className="mb-2">JOIN <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box3 || 'box 3'}</span> x ON <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box4 || 'box 4'}</span></div>
          <div className="mb-2">WHERE <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box5 || 'box 5'}</span> AND t.datum &gt; CURRENT_DATE</div>
          <div>GROUP BY <span className="bg-yellow-200 px-1 rounded">{selectedAnswers.box6 || 'box 6'}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <h3 className="font-semibold text-sm">{q.question}:</h3>
              <div className="space-y-1">
                {q.options.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={selectedAnswers[q.id] === option}
                      onChange={() => handleAnswerSelect(q.id, option)}
                      className="text-blue-600"
                    />
                    <span className="text-sm font-mono">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={checkExercise}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Auswerten
          </button>
          <button
            onClick={resetExercise}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Zurücksetzen
          </button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Ergebnis:</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
