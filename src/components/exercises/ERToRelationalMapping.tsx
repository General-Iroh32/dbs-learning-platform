import React, { useState, useEffect } from 'react';
import { Database, Key, Link, CheckCircle, XCircle, ArrowRight, BookOpen, Target } from 'lucide-react';

interface RelationalMappingExercise {
  id: string;
  title: string;
  description: string;
  erDiagram: {
    entities: {
      name: string;
      attributes: {
        name: string;
        isKey: boolean;
        isMultiValued: boolean;
        isComposite: boolean;
        isDerived: boolean;
      }[];
    }[];
    relationships: {
      name: string;
      fromEntity: string;
      toEntity: string;
      fromCardinality: string;
      toCardinality: string;
      attributes: {
        name: string;
        isKey: boolean;
      }[];
    }[];
  };
  correctMapping: {
    relations: {
      name: string;
      attributes: {
        name: string;
        isKey: boolean;
        isForeignKey: boolean;
        references?: string;
      }[];
    }[];
  };
  explanation: string;
  hints: string[];
  points: number;
}

export const ERToRelationalMapping: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userMapping, setUserMapping] = useState<{
    relations: {
      name: string;
      attributes: {
        name: string;
        isKey: boolean;
        isForeignKey: boolean;
        references?: string;
      }[];
    }[];
  }>({ relations: [] });
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const exercises: RelationalMappingExercise[] = [
    {
      id: 'basic-mapping',
      title: 'Grundlegende Relationen-Ableitung',
      description: 'Leite Relationen aus einem einfachen ER-Diagramm ab',
      erDiagram: {
        entities: [
          {
            name: 'Student',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Name', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Titel', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          }
        ],
        relationships: [
          {
            name: 'belegt',
            fromEntity: 'Student',
            toEntity: 'Kurs',
            fromCardinality: 'N',
            toCardinality: 'M',
            attributes: []
          }
        ]
      },
      correctMapping: {
        relations: [
          {
            name: 'Student',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isForeignKey: false },
              { name: 'Name', isKey: false, isForeignKey: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isForeignKey: false },
              { name: 'Titel', isKey: false, isForeignKey: false }
            ]
          },
          {
            name: 'belegt',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isForeignKey: true, references: 'Student.Matrikelnummer' },
              { name: 'KursID', isKey: true, isForeignKey: true, references: 'Kurs.KursID' }
            ]
          }
        ]
      },
      explanation: 'Bei N:M Beziehungen wird eine separate Relation erstellt mit den Primärschlüsseln der beteiligten Entitätstypen als Fremdschlüssel.',
      hints: ['N:M Beziehungen werden zu separaten Relationen', 'Primärschlüssel werden zu Fremdschlüsseln'],
      points: 25
    },
    {
      id: '1-n-mapping',
      title: '1:N Beziehungen abbilden',
      description: 'Leite Relationen aus 1:N Beziehungen ab',
      erDiagram: {
        entities: [
          {
            name: 'Professor',
            attributes: [
              { name: 'Personalnummer', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Name', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Titel', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          }
        ],
        relationships: [
          {
            name: 'hält',
            fromEntity: 'Professor',
            toEntity: 'Kurs',
            fromCardinality: '1',
            toCardinality: 'N',
            attributes: []
          }
        ]
      },
      correctMapping: {
        relations: [
          {
            name: 'Professor',
            attributes: [
              { name: 'Personalnummer', isKey: true, isForeignKey: false },
              { name: 'Name', isKey: false, isForeignKey: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isForeignKey: false },
              { name: 'Titel', isKey: false, isForeignKey: false },
              { name: 'Personalnummer', isKey: false, isForeignKey: true, references: 'Professor.Personalnummer' }
            ]
          }
        ]
      },
      explanation: 'Bei 1:N Beziehungen wird der Primärschlüssel der "1"-Seite als Fremdschlüssel in die Relation der "N"-Seite eingefügt.',
      hints: ['1:N Beziehungen werden in die N-Seite eingefügt', 'Der Primärschlüssel der 1-Seite wird Fremdschlüssel'],
      points: 30
    },
    {
      id: 'complex-mapping',
      title: 'Komplexe ER-Diagramme abbilden',
      description: 'Leite Relationen aus einem komplexen ER-Diagramm ab',
      erDiagram: {
        entities: [
          {
            name: 'Student',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Name', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Titel', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          },
          {
            name: 'Professor',
            attributes: [
              { name: 'Personalnummer', isKey: true, isMultiValued: false, isComposite: false, isDerived: false },
              { name: 'Name', isKey: false, isMultiValued: false, isComposite: false, isDerived: false }
            ]
          }
        ],
        relationships: [
          {
            name: 'belegt',
            fromEntity: 'Student',
            toEntity: 'Kurs',
            fromCardinality: 'N',
            toCardinality: 'M',
            attributes: [
              { name: 'Note', isKey: false }
            ]
          },
          {
            name: 'hält',
            fromEntity: 'Professor',
            toEntity: 'Kurs',
            fromCardinality: '1',
            toCardinality: 'N',
            attributes: []
          }
        ]
      },
      correctMapping: {
        relations: [
          {
            name: 'Student',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isForeignKey: false },
              { name: 'Name', isKey: false, isForeignKey: false }
            ]
          },
          {
            name: 'Kurs',
            attributes: [
              { name: 'KursID', isKey: true, isForeignKey: false },
              { name: 'Titel', isKey: false, isForeignKey: false },
              { name: 'Personalnummer', isKey: false, isForeignKey: true, references: 'Professor.Personalnummer' }
            ]
          },
          {
            name: 'Professor',
            attributes: [
              { name: 'Personalnummer', isKey: true, isForeignKey: false },
              { name: 'Name', isKey: false, isForeignKey: false }
            ]
          },
          {
            name: 'belegt',
            attributes: [
              { name: 'Matrikelnummer', isKey: true, isForeignKey: true, references: 'Student.Matrikelnummer' },
              { name: 'KursID', isKey: true, isForeignKey: true, references: 'Kurs.KursID' },
              { name: 'Note', isKey: false, isForeignKey: false }
            ]
          }
        ]
      },
      explanation: 'Komplexe Diagramme kombinieren verschiedene Beziehungstypen. N:M Beziehungen werden zu separaten Relationen, 1:N Beziehungen werden in die N-Seite eingefügt.',
      hints: ['Beziehungsattribute kommen in die Beziehungsrelation', 'Kombiniere verschiedene Mapping-Regeln'],
      points: 40
    }
  ];

  const [currentExerciseData, setCurrentExerciseData] = useState<RelationalMappingExercise>(exercises[0]);

  useEffect(() => {
    setCurrentExerciseData(exercises[currentExercise]);
    setUserMapping({ relations: [] });
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  }, [currentExercise]);

  const addRelation = () => {
    const newRelation = {
      name: 'Neue_Relation',
      attributes: []
    };
    setUserMapping(prev => ({
      relations: [...prev.relations, newRelation]
    }));
  };

  const updateRelation = (index: number, updates: Partial<typeof userMapping.relations[0]>) => {
    setUserMapping(prev => ({
      relations: prev.relations.map((rel, i) => 
        i === index ? { ...rel, ...updates } : rel
      )
    }));
  };

  const deleteRelation = (index: number) => {
    setUserMapping(prev => ({
      relations: prev.relations.filter((_, i) => i !== index)
    }));
  };

  const addAttribute = (relationIndex: number) => {
    const newAttribute = {
      name: 'Neues_Attribut',
      isKey: false,
      isForeignKey: false,
      references: ''
    };
    
    setUserMapping(prev => ({
      relations: prev.relations.map((rel, i) => 
        i === relationIndex 
          ? { ...rel, attributes: [...rel.attributes, newAttribute] }
          : rel
      )
    }));
  };

  const updateAttribute = (relationIndex: number, attrIndex: number, updates: Partial<{
    name: string;
    isKey: boolean;
    isForeignKey: boolean;
    references?: string;
  }>) => {
    setUserMapping(prev => ({
      relations: prev.relations.map((rel, i) => 
        i === relationIndex 
          ? {
              ...rel,
              attributes: rel.attributes.map((attr, j) => 
                j === attrIndex ? { ...attr, ...updates } : attr
              )
            }
          : rel
      )
    }));
  };

  const deleteAttribute = (relationIndex: number, attrIndex: number) => {
    setUserMapping(prev => ({
      relations: prev.relations.map((rel, i) => 
        i === relationIndex 
          ? {
              ...rel,
              attributes: rel.attributes.filter((_, j) => j !== attrIndex)
            }
          : rel
      )
    }));
  };

  const checkMapping = () => {
    const correct = currentExerciseData.correctMapping;
    
    // Check if number of relations matches
    if (userMapping.relations.length !== correct.relations.length) {
      setIsCorrect(false);
      setShowExplanation(true);
      return;
    }
    
    // Check each relation
    const isCorrectResult = correct.relations.every(correctRel => {
      const userRel = userMapping.relations.find(rel => rel.name === correctRel.name);
      if (!userRel) return false;
      
      // Check attributes
      return correctRel.attributes.every(correctAttr => {
        const userAttr = userRel.attributes.find(attr => 
          attr.name === correctAttr.name &&
          attr.isKey === correctAttr.isKey &&
          attr.isForeignKey === correctAttr.isForeignKey
        );
        return !!userAttr;
      }) && userRel.attributes.length === correctRel.attributes.length;
    });
    
    setIsCorrect(isCorrectResult);
    setShowExplanation(true);
    
    if (isCorrectResult) {
      setScore(prev => prev + currentExerciseData.points);
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  const resetMapping = () => {
    setUserMapping({ relations: [] });
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const renderERDiagram = () => {
    const diagram = currentExerciseData.erDiagram;
    
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">ER-Diagramm</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {diagram.entities.map((entity, index) => (
            <div key={index} className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 min-w-[200px]">
              <div className="font-semibold text-center mb-2">{entity.name}</div>
              <div className="space-y-1">
                {entity.attributes.map((attr, attrIndex) => (
                  <div key={attrIndex} className="text-sm flex items-center">
                    {attr.isKey && <Key size={12} className="mr-1 text-yellow-600" />}
                    <span className={attr.isKey ? 'underline' : ''}>{attr.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Beziehungen: {diagram.relationships.map(rel => rel.name).join(', ')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ER zu Relationale Abbildung</h1>
        <p className="text-gray-600">Lerne, wie man ER-Diagramme in relationale Schemata umwandelt</p>
      </div>

      {/* Exercise Info */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{currentExerciseData.title}</h2>
        <p className="text-gray-600 mb-4">{currentExerciseData.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Wert: {currentExerciseData.points} Punkte</span>
          <div className="flex space-x-2">
            <button
              onClick={checkMapping}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Abbildung prüfen
            </button>
            <button
              onClick={resetMapping}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ER Diagram */}
        <div>
          {renderERDiagram()}
        </div>

        {/* Relational Mapping */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Relationale Abbildung</h3>
            <button
              onClick={addRelation}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              + Relation
            </button>
          </div>
          
          <div className="space-y-4">
            {userMapping.relations.map((relation, relIndex) => (
              <div key={relIndex} className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={relation.name}
                    onChange={(e) => updateRelation(relIndex, { name: e.target.value })}
                    className="font-semibold bg-transparent border-none outline-none"
                    placeholder="Relationsname"
                  />
                  <button
                    onClick={() => deleteRelation(relIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {relation.attributes.map((attr, attrIndex) => (
                    <div key={attrIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={attr.name}
                        onChange={(e) => updateAttribute(relIndex, attrIndex, { name: e.target.value })}
                        className="flex-1 p-1 border rounded text-sm"
                        placeholder="Attributname"
                      />
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={attr.isKey}
                          onChange={(e) => updateAttribute(relIndex, attrIndex, { isKey: e.target.checked })}
                        />
                        <span className="text-xs">PK</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={attr.isForeignKey}
                          onChange={(e) => updateAttribute(relIndex, attrIndex, { isForeignKey: e.target.checked })}
                        />
                        <span className="text-xs">FK</span>
                      </label>
                      {attr.isForeignKey && (
                        <input
                          type="text"
                          value={attr.references || ''}
                          onChange={(e) => updateAttribute(relIndex, attrIndex, { references: e.target.value })}
                          className="w-32 p-1 border rounded text-xs"
                          placeholder="Referenz"
                        />
                      )}
                      <button
                        onClick={() => deleteAttribute(relIndex, attrIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAttribute(relIndex)}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    + Attribut hinzufügen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hint */}
      {!showHint && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowHint(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            💡 Tipp anzeigen
          </button>
        </div>
      )}

      {showHint && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">Tipp:</h4>
          <p className="text-yellow-700">{currentExerciseData.hints[0]}</p>
        </div>
      )}

      {/* Result */}
      {isCorrect !== null && (
        <div className="mt-6">
          <div className={`p-4 rounded-lg ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <div className="flex items-center">
              {isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
              <span className="font-semibold">
                {isCorrect ? 'Richtig!' : 'Falsch!'}
              </span>
            </div>
            <p className="mt-2">{currentExerciseData.explanation}</p>
          </div>
          
          {isCorrect && (
            <div className="mt-4 text-center">
              <button
                onClick={nextExercise}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {currentExercise < exercises.length - 1 ? 'Nächste Übung' : 'Alle Übungen abgeschlossen!'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
