import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ConceptBasics } from './components/ConceptBasics';
import { Quiz } from './components/Quiz';
import { PDFViewer } from './components/PDFViewer';
import { LearningPath } from './components/LearningPath';
import { RMExercise } from './components/exercises/RMExercise';
import { ERExercise } from './components/exercises/ERExercise';
import { RAExercise } from './components/exercises/RAExercise';
import { RAPraxisExercise } from './components/exercises/RAPraxisExercise';
import { RAPruefungExercise } from './components/exercises/RAPruefungExercise';
import { RADivisionExercise } from './components/exercises/RADivisionExercise';
import { RAOperatorTreeExercise } from './components/exercises/RAOperatorTreeExercise';
import { RAComplexExercise } from './components/exercises/RAComplexExercise';
import { NormExercise } from './components/exercises/NormExercise';
import { PhysExercise } from './components/exercises/PhysExercise';
import { TransExercise } from './components/exercises/TransExercise';
import { SQLExercise } from './components/exercises/SQLExercise';
import { 
  rmConcepts,
  erConcepts, 
  raConcepts, 
  normConcepts, 
  physConcepts, 
  transConcepts,
  sqlConcepts
} from './data/conceptData';
import { 
  rmQuizData,
  erQuizData, 
  raQuizData, 
  normQuizData, 
  physQuizData, 
  transQuizData,
  sqlQuizData
} from './data/quizData';
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

    const pageType = currentPage.split('-')[1] || 'basics';
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
        } else if (pageType === 'uebung') {
          return <PhysExercise />;
        } else if (pageType === 'quiz') {
          return (
            <Quiz
              quizData={physQuizData}
              title="Quiz: Physischer DB-Entwurf"
              description="Überprüfe dein Wissen."
            />
          );
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
          } else if (pageType === 'uebung') {
            return <TransExercise />;
          } else if (pageType === 'quiz') {
            return (
              <Quiz
                quizData={transQuizData}
                title="Quiz: Transaktionen"
                description="Überprüfe dein Wissen."
              />
            );
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