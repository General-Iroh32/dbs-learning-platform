import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ConceptBasics } from './components/ConceptBasics';
import { Quiz } from './components/Quiz';
import { PDFViewer } from './components/PDFViewer';
import { LearningPath } from './components/LearningPath';
import { RMExercise } from './components/exercises/RMExercise';
import { ERExercise } from './components/exercises/ERExercise';
import { ERComprehensiveExercise } from './components/exercises/ERComprehensiveExercise';
import { ERToRelationalMapping } from './components/exercises/ERToRelationalMapping';
import { ERPraxisExercise } from './components/exercises/ERPraxisExercise';
import { ERPruefungExercise } from './components/exercises/ERPruefungExercise';
import { ERWeakEntityExercise } from './components/exercises/ERWeakEntityExercise';
import { ERISAExercise } from './components/exercises/ERISAExercise';
import { RAExercise } from './components/exercises/RAExercise';
import { RAPraxisExercise } from './components/exercises/RAPraxisExercise';
import { RAPruefungExercise } from './components/exercises/RAPruefungExercise';
import { RADivisionExercise } from './components/exercises/RADivisionExercise';
import { RAOperatorTreeExercise } from './components/exercises/RAOperatorTreeExercise';
import { RAComplexExercise } from './components/exercises/RAComplexExercise';
import { NormExercise } from './components/exercises/NormExercise';
import { PhysExercise } from './components/exercises/PhysExercise';
import { PhysConceptBasics } from './components/exercises/PhysConceptBasics';
import { PhysDragDropExercise } from './components/exercises/PhysDragDropExercise';
import { PhysComprehensiveExercise } from './components/exercises/PhysComprehensiveExercise';
import { PhysPraxisExercise } from './components/exercises/PhysPraxisExercise';
import { PhysPruefungExercise } from './components/exercises/PhysPruefungExercise';
import { PhysSpecializedExercise } from './components/exercises/PhysSpecializedExercise';
import { PhysInteractiveTools } from './components/exercises/PhysInteractiveTools';
import { PhysQuiz } from './components/exercises/PhysQuiz';
import { TransExercise } from './components/exercises/TransExercise';
import { TransConceptBasics } from './components/exercises/TransConceptBasics';
import { TransDragDropExercise } from './components/exercises/TransDragDropExercise';
import { TransComprehensiveExercise } from './components/exercises/TransComprehensiveExercise';
import { TransPraxisExercise } from './components/exercises/TransPraxisExercise';
import { TransPruefungExercise } from './components/exercises/TransPruefungExercise';
import { TransSpecializedExercise } from './components/exercises/TransSpecializedExercise';
import { TransInteractiveTools } from './components/exercises/TransInteractiveTools';
import { TransQuiz } from './components/exercises/TransQuiz';
import { SQLExercise } from './components/exercises/SQLExercise';
import { ProgressiveLearningSystem } from './components/ProgressiveLearningSystem';
import { AnomalyExercise } from './components/exercises/AnomalyExercise';
import { FunctionalDependencyExercise } from './components/exercises/FunctionalDependencyExercise';
import { AttributeClosureExercise } from './components/exercises/AttributeClosureExercise';
import { NormalizationExercise } from './components/exercises/NormalizationExercise';
import { DecompositionExercise } from './components/exercises/DecompositionExercise';
import { TestPreparationMode } from './components/TestPreparationMode';
import { ProgressiveDBS9LearningSystem } from './components/ProgressiveDBS9LearningSystem';
import { QueryExecutionExercise } from './components/exercises/QueryExecutionExercise';
import { LogicalOptimizationExercise } from './components/exercises/LogicalOptimizationExercise';
import { JoinAlgorithmsExercise } from './components/exercises/JoinAlgorithmsExercise';
import { CostOptimizationExercise } from './components/exercises/CostOptimizationExercise';
import { DBS9TestPreparationMode } from './components/DBS9TestPreparationMode';
import { 
  rmConcepts,
  erConcepts, 
  raConcepts, 
  normConcepts, 
  physConcepts, 
  transConcepts,
  sqlConcepts,
  designTheoryConcepts
} from './data/conceptData';
import { 
  rmQuizData,
  erQuizData, 
  raQuizData, 
  normQuizData, 
  sqlQuizData,
  designTheoryQuizData
} from './data/quizData';
import { dbs9QuizData } from './data/dbs9QuizData';
import { pdfDocuments } from './data/navigationData';

function App() {
  const [currentPage, setCurrentPage] = useState('lernpfad');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (currentPage === 'lernpfad') {
      return <LearningPath onNavigate={handleNavigate} />;
    }

    // Direct routing for design theory
    if (currentPage === 'design-theory-basics') {
      return (
        <ConceptBasics
          concepts={designTheoryConcepts}
          title="Grundlagen: Entwurfstheorie"
          description="Lerne die wichtigsten Konzepte der Datenbankentwurfstheorie kennen."
        />
      );
    }

    if (currentPage === 'progressive-learning') {
      return <ProgressiveLearningSystem />;
    }

    if (currentPage === 'anomaly-exercise') {
      return <AnomalyExercise />;
    }

    if (currentPage === 'fd-exercise') {
      return <FunctionalDependencyExercise />;
    }

    if (currentPage === 'attribute-closure') {
      return <AttributeClosureExercise />;
    }

    if (currentPage === 'normalization-exercise') {
      return <NormalizationExercise />;
    }

    if (currentPage === 'decomposition-exercise') {
      return <DecompositionExercise />;
    }

    if (currentPage === 'design-theory-quiz') {
      return (
        <Quiz
          quizData={designTheoryQuizData}
          title="Quiz: Entwurfstheorie"
          description="Überprüfe dein Wissen über Anomalien, funktionale Abhängigkeiten, Normalformen und Zerlegungen."
        />
      );
    }

    if (currentPage === 'test-preparation') {
      return <TestPreparationMode />;
    }

    // Direct routing for DBS9 Anfrageoptimierung
    if (currentPage === 'dbs9-progressive-learning') {
      return <ProgressiveDBS9LearningSystem />;
    }

    if (currentPage === 'query-execution-exercise') {
      return <QueryExecutionExercise />;
    }

    if (currentPage === 'logical-optimization-exercise') {
      return <LogicalOptimizationExercise />;
    }

    if (currentPage === 'join-algorithms-exercise') {
      return <JoinAlgorithmsExercise />;
    }

    if (currentPage === 'cost-optimization-exercise') {
      return <CostOptimizationExercise />;
    }

    if (currentPage === 'dbs9-test-preparation') {
      return <DBS9TestPreparationMode />;
    }

    if (currentPage === 'dbs9-quiz') {
      return (
        <Quiz
          quizData={dbs9QuizData}
          title="Quiz: Anfrageoptimierung (DBS9)"
          description="Überprüfe dein Wissen über SQL-Ausführung, logische Optimierung, Join-Algorithmen und kostenbasierte Optimierung."
        />
      );
    }

    const pageType = currentPage.includes('-') ? currentPage.substring(currentPage.indexOf('-') + 1) : 'basics';
    const topic = currentPage.split('-')[0];

    switch (topic) {
      case 'rm':
        if (pageType === 'grundlagen') {
          return (
            <ConceptBasics
              concepts={rmConcepts}
              title="Grundlagen: Relationales Modell"
              description="Die mathematischen Grundlagen des relationalen Datenmodells."
            />
          );
        } else if (pageType === 'uebung') {
          return <RMExercise />;
        } else if (pageType === 'quiz') {
          return (
            <Quiz
              quizData={rmQuizData}
              title="Quiz: Relationales Modell"
              description="Überprüfe dein Wissen über das relationale Modell."
            />
          );
        }
        break;

      case 'er':
        if (pageType === 'grundlagen') {
          return (
            <ConceptBasics
              concepts={erConcepts}
              title="Grundlagen: ER-Modellierung"
              description="Kernkonzepte für das Verständnis von ER-Diagrammen."
            />
          );
        } else if (pageType === 'uebung') {
          return <ERExercise />;
          } else if (pageType === 'comprehensive') {
            return <ERComprehensiveExercise />;
          } else if (pageType === 'praxis') {
            return <ERPraxisExercise />;
          } else if (pageType === 'pruefung') {
            return <ERPruefungExercise />;
          } else if (pageType === 'weak-entity') {
            return <ERWeakEntityExercise />;
          } else if (pageType === 'isa') {
            return <ERISAExercise />;
          } else if (pageType === 'relational-mapping') {
            return <ERToRelationalMapping />;
          } else if (pageType === 'quiz') {
          return (
            <Quiz
              quizData={erQuizData}
              title="Quiz: ER-Modellierung"
              description="Überprüfe dein Wissen."
            />
          );
        }
        break;

      case 'ra':
        if (pageType === 'grundlagen') {
          return (
            <ConceptBasics
              concepts={raConcepts}
              title="Grundlagen: Relationale Algebra"
              description="Die wichtigsten Operatoren der Relationalen Algebra."
            />
          );
        } else if (pageType === 'uebung') {
          return <RAExercise />;
        } else if (pageType === 'quiz') {
          return (
            <Quiz
              quizData={raQuizData}
              title="Quiz: Relationale Algebra"
              description="Überprüfe dein Wissen."
            />
          );
        } else if (pageType === 'praxis') {
          return <RAPraxisExercise />;
                } else if (pageType === 'pruefung') {
                  return <RAPruefungExercise />;
                } else if (pageType === 'division') {
                  return <RADivisionExercise />;
                } else if (pageType === 'operator-tree') {
                  return <RAOperatorTreeExercise />;
                } else if (pageType === 'complex') {
                  return <RAComplexExercise />;
                }
        break;

      case 'norm':
        if (pageType === 'grundlagen') {
          return (
            <ConceptBasics
              concepts={normConcepts}
              title="Grundlagen: Normalisierung"
              description="Ein guter Entwurf vermeidet Probleme. Lerne hier die wichtigsten Normalformen kennen."
            />
          );
        } else if (pageType === 'uebung') {
          return <NormExercise />;
        } else if (pageType === 'quiz') {
          return (
            <Quiz
              quizData={normQuizData}
              title="Quiz: Normalisierung"
              description="Überprüfe dein Wissen."
            />
          );
        }
        break;

      case 'phys':
        if (pageType === 'grundlagen') {
          return (
            <ConceptBasics
              concepts={physConcepts}
              title="Grundlagen: Physischer Datenbankentwurf"
              description="Hier geht es darum, wie Daten auf Speichermedien organisiert werden, um schnellen Zugriff zu ermöglichen."
            />
          );
        } else if (pageType === 'concept-basics') {
          return <PhysConceptBasics />;
        } else if (pageType === 'drag-drop') {
          return <PhysDragDropExercise />;
        } else if (pageType === 'comprehensive') {
          return <PhysComprehensiveExercise />;
        } else if (pageType === 'praxis') {
          return <PhysPraxisExercise />;
        } else if (pageType === 'pruefung') {
          return <PhysPruefungExercise />;
        } else if (pageType === 'specialized') {
          return <PhysSpecializedExercise />;
        } else if (pageType === 'tools') {
          return <PhysInteractiveTools />;
        } else if (pageType === 'uebung') {
          return <PhysExercise />;
        } else if (pageType === 'quiz') {
          return <PhysQuiz />;
        }
        break;

        case 'trans':
          if (pageType === 'grundlagen') {
            return (
              <ConceptBasics
                concepts={transConcepts}
                title="Grundlagen: Transaktionen"
                description="Transaktionen bündeln Operationen zu einer logischen Einheit, um die Datenbank konsistent zu halten."
              />
            );
          } else if (pageType === 'concept-basics') {
            return <TransConceptBasics />;
          } else if (pageType === 'drag-drop') {
            return <TransDragDropExercise />;
          } else if (pageType === 'comprehensive') {
            return <TransComprehensiveExercise />;
          } else if (pageType === 'praxis') {
            return <TransPraxisExercise />;
          } else if (pageType === 'pruefung') {
            return <TransPruefungExercise />;
          } else if (pageType === 'specialized') {
            return <TransSpecializedExercise />;
          } else if (pageType === 'tools') {
            return <TransInteractiveTools />;
          } else if (pageType === 'uebung') {
            return <TransExercise />;
          } else if (pageType === 'quiz') {
            return <TransQuiz />;
          }
          break;

        case 'sql':
          if (pageType === 'grundlagen') {
            return (
              <ConceptBasics
                concepts={sqlConcepts}
                title="Grundlagen: SQL"
                description="Structured Query Language - die Standardsprache für Datenbankabfragen."
              />
            );
          } else if (pageType === 'uebung') {
            return <SQLExercise />;
          } else if (pageType === 'quiz') {
            return (
              <Quiz
                quizData={sqlQuizData}
                title="Quiz: SQL"
                description="Überprüfe dein Wissen."
              />
            );
          }
          break;


      case 'pdfs':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-2">PDF-Dokumente</h1>
            <p className="text-gray-600 mb-8">Durchsuche die Vorlesungsunterlagen und Tests.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentPage(`pdf-${doc.id}`)}
                >
                  <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Handle PDF viewing
        if (currentPage.startsWith('pdf-')) {
          const pdfId = currentPage.replace('pdf-', '');
          const document = pdfDocuments.find(doc => doc.id === pdfId);
          if (document) {
            return <PDFViewer document={document} />;
          }
        }
        break;
    }

    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">Inhalt nicht gefunden</h1>
        <p className="text-gray-500">Die angeforderte Seite konnte nicht gefunden werden.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Navigation onNavigate={handleNavigate} activePage={currentPage} />
      <main className="flex-1 p-6 md:p-10">
        <div id="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;