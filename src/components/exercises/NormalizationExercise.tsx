import React, { useState } from 'react';

interface FD {
  left: string;
  right: string;
}

interface Relation {
  name: string;
  attributes: string[];
  primaryKey: string[];
  fds: FD[];
}

export const NormalizationExercise: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedNF, setSelectedNF] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showDecomposition, setShowDecomposition] = useState(false);

  const exercises = [
    {
      title: "1NF - Erste Normalform",
      description: "Prüfe, ob die Relation in der ersten Normalform ist.",
      relation: {
        name: "Student",
        attributes: ["studentID", "name", "courses"],
        primaryKey: ["studentID"],
        fds: [
          { left: "studentID", right: "name" },
          { left: "studentID", right: "courses" }
        ]
      },
      table: {
        headers: ["studentID", "name", "courses"],
        rows: [
          ["S001", "Alice", "Math, Physics, Chemistry"],
          ["S002", "Bob", "Math, Biology"],
          ["S003", "Charlie", "Physics, Chemistry, Biology"]
        ]
      },
      question: "Ist diese Relation in 1NF?",
      options: ["Ja", "Nein"],
      correct: 1,
      explanation: "Nein! Das Attribut 'courses' enthält Listen (Math, Physics, Chemistry), was gegen die 1NF verstößt. Alle Attribute müssen atomar sein.",
      decomposition: [
        { name: "Student", attributes: ["studentID", "name"], primaryKey: ["studentID"] },
        { name: "Enrollment", attributes: ["studentID", "course"], primaryKey: ["studentID", "course"] }
      ]
    },
    {
      title: "2NF - Zweite Normalform",
      description: "Prüfe, ob die Relation in der zweiten Normalform ist.",
      relation: {
        name: "OrderDetails",
        attributes: ["orderID", "productID", "productName", "quantity", "price"],
        primaryKey: ["orderID", "productID"],
        fds: [
          { left: "orderID, productID", right: "quantity" },
          { left: "productID", right: "productName" },
          { left: "productID", right: "price" }
        ]
      },
      table: {
        headers: ["orderID", "productID", "productName", "quantity", "price"],
        rows: [
          ["O001", "P001", "Laptop", "2", "999.99"],
          ["O001", "P002", "Mouse", "1", "29.99"],
          ["O002", "P001", "Laptop", "1", "999.99"],
          ["O002", "P003", "Keyboard", "1", "79.99"]
        ]
      },
      question: "Welche Normalform wird hier verletzt?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 1,
      explanation: "2NF wird verletzt! Die Attribute 'productName' und 'price' hängen nur von 'productID' ab (Teil des Schlüssels), nicht vom gesamten Schlüssel {orderID, productID}. Das ist eine partielle Abhängigkeit.",
      decomposition: [
        { name: "OrderItems", attributes: ["orderID", "productID", "quantity"], primaryKey: ["orderID", "productID"] },
        { name: "Product", attributes: ["productID", "productName", "price"], primaryKey: ["productID"] }
      ]
    },
    {
      title: "3NF - Dritte Normalform",
      description: "Prüfe, ob die Relation in der dritten Normalform ist.",
      relation: {
        name: "Employee",
        attributes: ["empID", "name", "deptID", "deptName", "deptLocation"],
        primaryKey: ["empID"],
        fds: [
          { left: "empID", right: "name" },
          { left: "empID", right: "deptID" },
          { left: "deptID", right: "deptName" },
          { left: "deptID", right: "deptLocation" }
        ]
      },
      table: {
        headers: ["empID", "name", "deptID", "deptName", "deptLocation"],
        rows: [
          ["E001", "Alice", "D001", "IT", "Building A"],
          ["E002", "Bob", "D001", "IT", "Building A"],
          ["E003", "Charlie", "D002", "HR", "Building B"],
          ["E004", "Diana", "D002", "HR", "Building B"]
        ]
      },
      question: "Welche Normalform wird hier verletzt?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 2,
      explanation: "3NF wird verletzt! Es gibt eine transitive Abhängigkeit: empID → deptID → deptName. Das Nicht-Schlüsselattribut 'deptName' hängt von 'deptID' ab, welches selbst ein Nicht-Schlüsselattribut ist.",
      decomposition: [
        { name: "Employee", attributes: ["empID", "name", "deptID"], primaryKey: ["empID"] },
        { name: "Department", attributes: ["deptID", "deptName", "deptLocation"], primaryKey: ["deptID"] }
      ]
    },
    {
      title: "BCNF - Boyce-Codd-Normalform",
      description: "Prüfe, ob die Relation in der Boyce-Codd-Normalform ist.",
      relation: {
        name: "CourseInstructor",
        attributes: ["courseID", "instructor", "timeSlot"],
        primaryKey: ["courseID"],
        fds: [
          { left: "courseID", right: "instructor" },
          { left: "instructor", right: "timeSlot" }
        ]
      },
      table: {
        headers: ["courseID", "instructor", "timeSlot"],
        rows: [
          ["C001", "Prof. Smith", "Mon 9-11"],
          ["C002", "Prof. Smith", "Mon 9-11"],
          ["C003", "Prof. Jones", "Tue 10-12"],
          ["C004", "Prof. Jones", "Tue 10-12"]
        ]
      },
      question: "Welche Normalform wird hier verletzt?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 3,
      explanation: "BCNF wird verletzt! Die FD 'instructor → timeSlot' hat 'instructor' als Determinante, aber 'instructor' ist kein Superschlüssel. In BCNF muss jede Determinante einer nicht-trivialen FD ein Superschlüssel sein.",
      decomposition: [
        { name: "Course", attributes: ["courseID", "instructor"], primaryKey: ["courseID"] },
        { name: "InstructorSchedule", attributes: ["instructor", "timeSlot"], primaryKey: ["instructor"] }
      ]
    }
  ];

  const handleNFSelect = (nf: string) => {
    setSelectedNF(nf);
    setShowResult(true);
    setIsCorrect(nf === exercises[currentExercise].options[exercises[currentExercise].correct]);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedNF(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowDecomposition(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedNF(null);
      setShowResult(false);
      setIsCorrect(false);
      setShowDecomposition(false);
    }
  };

  const resetExercise = () => {
    setSelectedNF(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowDecomposition(false);
  };

  const current = exercises[currentExercise];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Normalformen - Interaktive Übungen</h1>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <span className="text-sm text-gray-600">
            Übung {currentExercise + 1} von {exercises.length}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{current.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Relation: {current.relation.name}</h3>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Attribute:</h4>
            <p className="font-mono bg-gray-100 p-2 rounded">
              {current.relation.attributes.join(', ')}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Primärschlüssel:</h4>
            <p className="font-mono bg-blue-100 p-2 rounded">
              {`{${current.relation.primaryKey.join(', ')}}`}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Funktionale Abhängigkeiten:</h4>
            <div className="space-y-1">
              {current.relation.fds.map((fd, index) => (
                <div key={index} className="font-mono bg-gray-100 p-2 rounded text-sm">
                  {`{${fd.left}} → {${fd.right}}`}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Beispieldaten:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {current.table.headers.map((header, index) => (
                      <th key={index} className="border border-gray-300 px-2 py-1 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-2 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">{current.question}</h3>
          
          <div className="space-y-3 mb-6">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleNFSelect(option)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? option === current.options[current.correct]
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : option === selectedNF && !isCorrect
                      ? 'border-red-500 bg-red-100 text-red-800'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {option}
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

          {showResult && (
            <div className="mb-6">
              <button
                onClick={() => setShowDecomposition(!showDecomposition)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                {showDecomposition ? 'Zerlegung verstecken' : 'Zerlegung anzeigen'}
              </button>
              
              {showDecomposition && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Korrekte Zerlegung:</h4>
                  <div className="space-y-3">
                    {current.decomposition.map((rel, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-semibold">{rel.name}</div>
                        <div className="font-mono text-sm text-gray-600">
                          Attribute: {rel.attributes.join(', ')}
                        </div>
                        <div className="font-mono text-sm text-blue-600">
                          PK: {`{${rel.primaryKey.join(', ')}}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevExercise}
              disabled={currentExercise === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              ← Vorherige
            </button>
            
            <button
              onClick={resetExercise}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Zurücksetzen
            </button>
            
            <button
              onClick={nextExercise}
              disabled={currentExercise === exercises.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Nächste →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Normalformen im Überblick:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>1NF:</strong> Alle Attribute sind atomar (nicht weiter zerlegbar)
          </div>
          <div>
            <strong>2NF:</strong> 1NF + keine partiellen Abhängigkeiten
          </div>
          <div>
            <strong>3NF:</strong> 2NF + keine transitiven Abhängigkeiten
          </div>
          <div>
            <strong>BCNF:</strong> Jede Determinante ist ein Superschlüssel
          </div>
        </div>
      </div>
    </div>
  );
};
