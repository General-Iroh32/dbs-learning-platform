import React, { useState } from 'react';

export const NormExercise: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showRationale, setShowRationale] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowRationale(true);
    
    if (answer === '2NF') {
      setResult('Richtig! Die Attribute KundenName (abhängig von KundenNr) und ArtikelBez (abhängig von ArtikelNr) sind nur von Teilen des Schlüssels {BestellNr, ArtikelNr} abhängig. Das verletzt die 2NF.');
    } else {
      setResult('Nicht ganz. Überlege dir die partiellen Abhängigkeiten: Hängt ein Nicht-Schlüsselattribut von nur einem Teil des zusammengesetzten Schlüssels ab?');
    }
  };

  const resetExercise = () => {
    setSelectedAnswer(null);
    setResult(null);
    setShowRationale(false);
  };

  const getOptionClasses = (answer: string) => {
    let classes = 'quiz-option p-3 rounded-lg border-2 border-gray-200 cursor-pointer';
    
    if (showRationale) {
      if (answer === '2NF') {
        classes += ' correct';
      } else if (answer === selectedAnswer) {
        classes += ' incorrect';
      }
    } else if (answer === selectedAnswer) {
      classes += ' selected';
    }
    
    return classes;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: Normalformen</h1>
      <p className="text-gray-600 mb-8">Analysiere die Relation und entscheide, wie sie korrekt zerlegt wird.</p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Gegeben ist die Relation:</p>
          <p className="font-mono">Bestellungen(<u>BestellNr</u>, <u>ArtikelNr</u>, ArtikelBez, Menge, KundenNr, KundenName)</p>
          <p className="font-bold mt-2">Funktionale Abhängigkeiten:</p>
          <ul className="list-disc list-inside font-mono">
            <li>{'{BestellNr}'} → {'{KundenNr, KundenName}'}</li>
            <li>{'{ArtikelNr}'} → {'{ArtikelBez}'}</li>
            <li>{'{KundenNr}'} → {'{KundenName}'}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            1. Welche ist die höchste Normalform, die von der Relation <span className="font-mono">Bestellungen</span> verletzt wird?
          </h3>
          <div className="space-y-2">
            {['1NF', '2NF', '3NF'].map((answer) => (
              <div
                key={answer}
                className={getOptionClasses(answer)}
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer === '1NF' && 'Erste Normalform (1NF)'}
                {answer === '2NF' && 'Zweite Normalform (2NF)'}
                {answer === '3NF' && 'Dritte Normalform (3NF)'}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={resetExercise}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Zurücksetzen
          </button>
        </div>

        {result && (
          <div className="mt-4">
            <div className={`p-4 rounded-lg ${
              result.includes('Richtig') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {result}
            </div>
            {result.includes('Richtig') && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="font-semibold mb-2">Eine korrekte Zerlegung in 3NF wäre:</p>
                <ul className="list-disc list-inside font-mono text-left">
                  <li>Bestellposition(<u>BestellNr</u>, <u>ArtikelNr</u>, Menge)</li>
                  <li>Artikel(<u>ArtikelNr</u>, ArtikelBez)</li>
                  <li>Bestellung(<u>BestellNr</u>, KundenNr)</li>
                  <li>Kunde(<u>KundenNr</u>, KundenName)</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
