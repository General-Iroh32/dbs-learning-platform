import React, { useState } from 'react';

export const PhysExercise: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showRationale, setShowRationale] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowRationale(true);
    
    if (answer === 'a') {
      setResult('Richtig! Der Wert 25 gehört in das Blatt [17|22]. Da dieses voll ist, wird es zu [17] und [22|25] gesplittet. Der mittlere Wert (22) wandert in den Elternknoten, der dadurch zu [17|22|28] wird. Da der Elternknoten nun auch voll ist, müsste dieser im nächsten Schritt ebenfalls gesplittet werden.');
    } else {
      setResult('Nicht ganz. Verfolge den Pfad für den Wert 25 von der Wurzel nach unten. In welches Blatt gehört er? Ist dort Platz? Was passiert bei einem Split?');
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
      if (answer === 'a') {
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
      <h1 className="text-3xl font-bold mb-2">Interaktive Übung: B+-Baum</h1>
      <p className="text-gray-600 mb-8">
        Simuliere das Einfügen des Werts 25 in den gegebenen B+-Baum (Ordnung n=3).
      </p>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
          <p className="font-bold">Ausgangssituation: B+-Baum (n=3)</p>
          <div className="font-mono text-center text-sm p-4">
            <div className="inline-block border p-1 m-2">[17 | 28]</div>
            <br />
            <div className="inline-block border p-1 m-1">[5 | 13 | →]</div>
            <div className="inline-block border p-1 m-1">[17 | 22 | →]</div>
            <div className="inline-block border p-1 m-1">[28 | 30 | ⊥]</div>
          </div>
          <p>Füge den Wert <b>25</b> ein. Welcher Knoten wird gesplittet und wie sieht der Elternknoten danach aus?</p>
        </div>

        <div className="space-y-2">
          {[
            { id: 'a', text: 'Das Blatt [17|22] wird gesplittet. Der Elternknoten wird zu [17|22|28].' },
            { id: 'b', text: 'Das Blatt [28|30] wird gesplittet. Der Elternknoten bleibt [17|28].' },
            { id: 'c', text: 'Der Wurzelknoten [17|28] wird gesplittet. Der Baum wird eine Ebene tiefer.' },
            { id: 'd', text: 'Es findet kein Split statt, da der Knoten [28|30] noch Platz hat.' }
          ].map((option) => (
            <div
              key={option.id}
              className={getOptionClasses(option.id)}
              onClick={() => handleAnswerSelect(option.id)}
            >
              {option.text}
            </div>
          ))}
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
          </div>
        )}
      </div>
    </div>
  );
};
