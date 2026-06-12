import { lazy, Suspense, useState } from 'react';
import { Navigation } from './components/Navigation';
import { ConceptBasics } from './components/ConceptBasics';
import { Quiz } from './components/Quiz';
import { LearningPath } from './components/LearningPath';
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

const RMExercise = lazy(() => import('./components/exercises/RMExercise').then((module) => ({ default: module.RMExercise })));
const ERExercise = lazy(() => import('./components/exercises/ERExercise').then((module) => ({ default: module.ERExercise })));
const ERComprehensiveExercise = lazy(() => import('./components/exercises/ERComprehensiveExercise').then((module) => ({ default: module.ERComprehensiveExercise })));
const ERToRelationalMapping = lazy(() => import('./components/exercises/ERToRelationalMapping').then((module) => ({ default: module.ERToRelationalMapping })));
const ERPraxisExercise = lazy(() => import('./components/exercises/ERPraxisExercise').then((module) => ({ default: module.ERPraxisExercise })));
const ERPruefungExercise = lazy(() => import('./components/exercises/ERPruefungExercise').then((module) => ({ default: module.ERPruefungExercise })));
const ERWeakEntityExercise = lazy(() => import('./components/exercises/ERWeakEntityExercise').then((module) => ({ default: module.ERWeakEntityExercise })));
const ERISAExercise = lazy(() => import('./components/exercises/ERISAExercise').then((module) => ({ default: module.ERISAExercise })));
const RAExercise = lazy(() => import('./components/exercises/RAExercise').then((module) => ({ default: module.RAExercise })));
const RAPraxisExercise = lazy(() => import('./components/exercises/RAPraxisExercise').then((module) => ({ default: module.RAPraxisExercise })));
const RAPruefungExercise = lazy(() => import('./components/exercises/RAPruefungExercise').then((module) => ({ default: module.RAPruefungExercise })));
const RADivisionExercise = lazy(() => import('./components/exercises/RADivisionExercise').then((module) => ({ default: module.RADivisionExercise })));
const RAOperatorTreeExercise = lazy(() => import('./components/exercises/RAOperatorTreeExercise').then((module) => ({ default: module.RAOperatorTreeExercise })));
const RAComplexExercise = lazy(() => import('./components/exercises/RAComplexExercise').then((module) => ({ default: module.RAComplexExercise })));
const NormExercise = lazy(() => import('./components/exercises/NormExercise').then((module) => ({ default: module.NormExercise })));
const PhysExercise = lazy(() => import('./components/exercises/PhysExercise').then((module) => ({ default: module.PhysExercise })));
const PhysConceptBasics = lazy(() => import('./components/exercises/PhysConceptBasics').then((module) => ({ default: module.PhysConceptBasics })));
const PhysDragDropExercise = lazy(() => import('./components/exercises/PhysDragDropExercise').then((module) => ({ default: module.PhysDragDropExercise })));
const PhysComprehensiveExercise = lazy(() => import('./components/exercises/PhysComprehensiveExercise').then((module) => ({ default: module.PhysComprehensiveExercise })));
const PhysPraxisExercise = lazy(() => import('./components/exercises/PhysPraxisExercise').then((module) => ({ default: module.PhysPraxisExercise })));
const PhysPruefungExercise = lazy(() => import('./components/exercises/PhysPruefungExercise').then((module) => ({ default: module.PhysPruefungExercise })));
const PhysSpecializedExercise = lazy(() => import('./components/exercises/PhysSpecializedExercise').then((module) => ({ default: module.PhysSpecializedExercise })));
const PhysInteractiveTools = lazy(() => import('./components/exercises/PhysInteractiveTools').then((module) => ({ default: module.PhysInteractiveTools })));
const PhysQuiz = lazy(() => import('./components/exercises/PhysQuiz').then((module) => ({ default: module.PhysQuiz })));
const TransExercise = lazy(() => import('./components/exercises/TransExercise').then((module) => ({ default: module.TransExercise })));
const TransConceptBasics = lazy(() => import('./components/exercises/TransConceptBasics').then((module) => ({ default: module.TransConceptBasics })));
const TransDragDropExercise = lazy(() => import('./components/exercises/TransDragDropExercise').then((module) => ({ default: module.TransDragDropExercise })));
const TransComprehensiveExercise = lazy(() => import('./components/exercises/TransComprehensiveExercise').then((module) => ({ default: module.TransComprehensiveExercise })));
const TransPraxisExercise = lazy(() => import('./components/exercises/TransPraxisExercise').then((module) => ({ default: module.TransPraxisExercise })));
const TransPruefungExercise = lazy(() => import('./components/exercises/TransPruefungExercise').then((module) => ({ default: module.TransPruefungExercise })));
const TransSpecializedExercise = lazy(() => import('./components/exercises/TransSpecializedExercise').then((module) => ({ default: module.TransSpecializedExercise })));
const TransInteractiveTools = lazy(() => import('./components/exercises/TransInteractiveTools').then((module) => ({ default: module.TransInteractiveTools })));
const TransQuiz = lazy(() => import('./components/exercises/TransQuiz').then((module) => ({ default: module.TransQuiz })));
const SQLExercise = lazy(() => import('./components/exercises/SQLExercise').then((module) => ({ default: module.SQLExercise })));
const ProgressiveLearningSystem = lazy(() => import('./components/ProgressiveLearningSystem').then((module) => ({ default: module.ProgressiveLearningSystem })));
const AnomalyExercise = lazy(() => import('./components/exercises/AnomalyExercise').then((module) => ({ default: module.AnomalyExercise })));
const FunctionalDependencyExercise = lazy(() => import('./components/exercises/FunctionalDependencyExercise').then((module) => ({ default: module.FunctionalDependencyExercise })));
const AttributeClosureExercise = lazy(() => import('./components/exercises/AttributeClosureExercise').then((module) => ({ default: module.AttributeClosureExercise })));
const NormalizationExercise = lazy(() => import('./components/exercises/NormalizationExercise').then((module) => ({ default: module.NormalizationExercise })));
const DecompositionExercise = lazy(() => import('./components/exercises/DecompositionExercise').then((module) => ({ default: module.DecompositionExercise })));
const TestPreparationMode = lazy(() => import('./components/TestPreparationMode').then((module) => ({ default: module.TestPreparationMode })));
const ProgressiveDBS9LearningSystem = lazy(() => import('./components/ProgressiveDBS9LearningSystem').then((module) => ({ default: module.ProgressiveDBS9LearningSystem })));
const QueryExecutionExercise = lazy(() => import('./components/exercises/QueryExecutionExercise').then((module) => ({ default: module.QueryExecutionExercise })));
const LogicalOptimizationExercise = lazy(() => import('./components/exercises/LogicalOptimizationExercise').then((module) => ({ default: module.LogicalOptimizationExercise })));
const JoinAlgorithmsExercise = lazy(() => import('./components/exercises/JoinAlgorithmsExercise').then((module) => ({ default: module.JoinAlgorithmsExercise })));
const CostOptimizationExercise = lazy(() => import('./components/exercises/CostOptimizationExercise').then((module) => ({ default: module.CostOptimizationExercise })));
const DBS9TestPreparationMode = lazy(() => import('./components/DBS9TestPreparationMode').then((module) => ({ default: module.DBS9TestPreparationMode })));

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


      default:
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
          <Suspense
            fallback={(
              <div className="flex min-h-64 items-center justify-center" role="status">
                <p className="text-sm font-medium text-gray-600">Inhalt wird geladen …</p>
              </div>
            )}
          >
            {renderContent()}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
