import React, { useState } from 'react';

interface TableRow {
  empID: string;
  teacher: string;
  rank: string;
  office: string;
  courseID: string;
  title: string;
  ects: string;
}

export const AnomalyExercise: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [tableData, setTableData] = useState<TableRow[]>([
    { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "226", title: "Robotics", ects: "4" },
    { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "227", title: "Ethics", ects: "2" },
    { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "228", title: "Logic", ects: "4" },
    { empID: "2133", teacher: "Curie", rank: "C3", office: "5259", courseID: "52", title: "Chemistry", ects: "2" },
    { empID: "2137", teacher: "Curie", rank: "C4", office: "4630", courseID: "7", title: "Physics", ects: "4" }
  ]);
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const scenarios = [
    {
      title: "Änderungsanomalie",
      description: "Sokrates zieht in ein neues Büro um. Das neue Büro ist '5050'.",
      action: "Ändere das Büro von Sokrates",
      correctAnswer: "Änderungsanomalie",
      explanation: "Bei einer Änderungsanomalie müssen alle Tupel, die Sokrates betreffen, geändert werden. Wenn dies nicht konsistent geschieht, entstehen Dateninkonsistenzen.",
      performAction: () => {
        setTableData(prev => prev.map(row => 
          row.empID === "2125" ? { ...row, office: "5050" } : row
        ));
      }
    },
    {
      title: "Einfügeanomalie",
      description: "Ein neuer Professor 'Einstein' mit empID '2140', Rang 'C4' und Büro '6000' soll eingefügt werden, aber er unterrichtet noch keine Kurse.",
      action: "Versuche den neuen Professor einzufügen",
      correctAnswer: "Einfügeanomalie",
      explanation: "Ein neuer Professor kann nicht ohne eine zugehörige Lehrveranstaltung eingefügt werden, es sei denn, man verwendet Null-Werte, was vermieden werden sollte.",
      performAction: () => {
        // Simuliere das Problem - kann nicht eingefügt werden ohne courseID
        alert("Problem: Kann nicht eingefügt werden, da courseID, title und ects erforderlich sind!");
      }
    },
    {
      title: "Löschanomalie",
      description: "Der Kurs 'Logic' (courseID: 228) von Sokrates wird gelöscht.",
      action: "Lösche den Logic-Kurs",
      correctAnswer: "Löschanomalie",
      explanation: "Wenn die letzte Lehrveranstaltung eines Professors gelöscht wird, gehen alle Informationen über diesen Professor ebenfalls verloren.",
      performAction: () => {
        setTableData(prev => prev.filter(row => row.courseID !== "228"));
      }
    }
  ];

  const anomalyTypes = [
    "Änderungsanomalie",
    "Einfügeanomalie", 
    "Löschanomalie"
  ];

  const handleAnomalySelect = (anomaly: string) => {
    setSelectedAnomaly(anomaly);
    setShowResult(true);
    setIsCorrect(anomaly === scenarios[currentScenario].correctAnswer);
  };

  const performAction = () => {
    scenarios[currentScenario].performAction();
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnomaly(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      setSelectedAnomaly(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const resetScenario = () => {
    setTableData([
      { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "226", title: "Robotics", ects: "4" },
      { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "227", title: "Ethics", ects: "2" },
      { empID: "2125", teacher: "Socrates", rank: "C4", office: "5041", courseID: "228", title: "Logic", ects: "4" },
      { empID: "2133", teacher: "Curie", rank: "C3", office: "5259", courseID: "52", title: "Chemistry", ects: "2" },
      { empID: "2137", teacher: "Curie", rank: "C4", office: "4630", courseID: "7", title: "Physics", ects: "4" }
    ]);
    setSelectedAnomaly(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const current = scenarios[currentScenario];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Anomalien in Datenbanken - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <span className="text-sm text-gray-600">
            Szenario {currentScenario + 1} von {scenarios.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Aktuelle Tabelle: courseOffers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left">empID</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">teacher</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">rank</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">office</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">courseID</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">title</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">ects</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{row.empID}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.teacher}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.rank}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.office}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.courseID}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.title}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.ects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <button
              onClick={performAction}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {current.action}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Welche Art von Anomalie tritt hier auf?</h3>
          
          <div className="space-y-3 mb-6">
            {anomalyTypes.map((anomaly) => (
              <button
                key={anomaly}
                onClick={() => handleAnomalySelect(anomaly)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? anomaly === current.correctAnswer
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : anomaly === selectedAnomaly && !isCorrect
                      ? 'border-red-500 bg-red-100 text-red-800'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {anomaly}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <h4 className="font-semibold mb-2">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </h4>
              <p>{current.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevScenario}
              disabled={currentScenario === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              ← Vorherige
            </button>
            
            <button
              onClick={resetScenario}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Zurücksetzen
            </button>
            
            <button
              onClick={nextScenario}
              disabled={currentScenario === scenarios.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Nächste →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Anomalien verstehen:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Änderungsanomalie:</strong> Änderungen müssen an mehreren Stellen vorgenommen werden, was zu Inkonsistenzen führen kann.
          </div>
          <div>
            <strong>Einfügeanomalie:</strong> Neue Daten können nicht eingefügt werden, ohne andere (möglicherweise irrelevante) Daten zu speichern.
          </div>
          <div>
            <strong>Löschanomalie:</strong> Das Löschen von Daten kann unbeabsichtigt andere wichtige Informationen entfernen.
          </div>
        </div>
      </div>
    </div>
  );
};
