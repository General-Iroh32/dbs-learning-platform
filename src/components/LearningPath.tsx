import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, BookOpen, Brain, Target } from 'lucide-react';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'practice' | 'quiz' | 'exam';
  estimatedTime: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  prerequisites: string[];
  pageId: string;
  completed: boolean;
}

interface LearningPathProps {
  onNavigate: (pageId: string) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({ onNavigate }) => {
  const [completedSteps] = useState<Set<string>>(new Set());

  const learningSteps: LearningStep[] = [
    {
      id: 'rm-basics',
      title: 'Relationales Modell - Grundlagen',
      description: 'Lerne die mathematischen Grundlagen des relationalen Datenmodells kennen.',
      type: 'theory',
      estimatedTime: '30 Min',
      difficulty: 'Einfach',
      prerequisites: [],
      pageId: 'rm-grundlagen',
      completed: completedSteps.has('rm-basics')
    },
    {
      id: 'rm-practice',
      title: 'Relationales Modell - Übung',
      description: 'Übe das Erkennen zulässiger Relationen und das Arbeiten mit Schlüsseln.',
      type: 'practice',
      estimatedTime: '20 Min',
      difficulty: 'Einfach',
      prerequisites: ['rm-basics'],
      pageId: 'rm-uebung',
      completed: completedSteps.has('rm-practice')
    },
    {
      id: 'rm-quiz',
      title: 'Relationales Modell - Quiz',
      description: 'Teste dein Wissen über das relationale Modell.',
      type: 'quiz',
      estimatedTime: '15 Min',
      difficulty: 'Einfach',
      prerequisites: ['rm-basics', 'rm-practice'],
      pageId: 'rm-quiz',
      completed: completedSteps.has('rm-quiz')
    },
    {
      id: 'er-basics',
      title: 'ER-Modellierung - Grundlagen',
      description: 'Verstehe Entitätstypen, Attribute und Beziehungstypen.',
      type: 'theory',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['rm-quiz'],
      pageId: 'er-grundlagen',
      completed: completedSteps.has('er-basics')
    },
    {
      id: 'er-practice',
      title: 'ER-Modellierung - Einfache Übung',
      description: 'Erstelle ER-Diagramme mit Drag & Drop.',
      type: 'practice',
      estimatedTime: '20 Min',
      difficulty: 'Mittel',
      prerequisites: ['er-basics'],
      pageId: 'er-uebung',
      completed: completedSteps.has('er-practice')
    },
        {
          id: 'er-comprehensive',
          title: 'ER-Modellierung - Umfassende Übungen',
          description: 'Progressive Übungen von Grundkonzepten bis zu komplexen ER-Diagrammen.',
          type: 'practice',
          estimatedTime: '60 Min',
          difficulty: 'Mittel',
          prerequisites: ['er-practice'],
          pageId: 'er-comprehensive',
          completed: completedSteps.has('er-comprehensive')
        },
        {
          id: 'er-praxis',
          title: 'ER-Modellierung - Praxisfälle',
          description: 'Löse realistische ER-Modellierungsaufgaben mit Multiple Choice.',
          type: 'practice',
          estimatedTime: '45 Min',
          difficulty: 'Mittel',
          prerequisites: ['er-comprehensive'],
          pageId: 'er-praxis',
          completed: completedSteps.has('er-praxis')
        },
        {
          id: 'er-weak-entity',
          title: 'ER-Modellierung - Schwache Entitäten',
          description: 'Spezielle Übungen zu schwachen Entitätstypen und identifizierenden Beziehungen.',
          type: 'practice',
          estimatedTime: '30 Min',
          difficulty: 'Mittel',
          prerequisites: ['er-praxis'],
          pageId: 'er-weak-entity',
          completed: completedSteps.has('er-weak-entity')
        },
        {
          id: 'er-isa',
          title: 'ER-Modellierung - ISA-Beziehungen',
          description: 'Lerne Spezialisierung und Generalisierung im ER-Modell.',
          type: 'practice',
          estimatedTime: '30 Min',
          difficulty: 'Mittel',
          prerequisites: ['er-weak-entity'],
          pageId: 'er-isa',
          completed: completedSteps.has('er-isa')
        },
        {
          id: 'er-pruefung',
          title: 'ER-Modellierung - Prüfungssimulation',
          description: 'Teste dein Wissen in einer realistischen Prüfungsumgebung mit Zeitlimit.',
          type: 'exam',
          estimatedTime: '45 Min',
          difficulty: 'Schwer',
          prerequisites: ['er-isa'],
          pageId: 'er-pruefung',
          completed: completedSteps.has('er-pruefung')
        },
    {
      id: 'er-relational-mapping',
      title: 'ER zu Relationale Abbildung',
      description: 'Lerne, wie man ER-Diagramme in relationale Schemata umwandelt.',
      type: 'practice',
      estimatedTime: '40 Min',
      difficulty: 'Schwer',
      prerequisites: ['er-comprehensive'],
      pageId: 'er-relational-mapping',
      completed: completedSteps.has('er-relational-mapping')
    },
    {
      id: 'er-quiz',
      title: 'ER-Modellierung - Quiz',
      description: 'Überprüfe dein Verständnis der ER-Modellierung.',
      type: 'quiz',
      estimatedTime: '20 Min',
      difficulty: 'Mittel',
      prerequisites: ['er-basics', 'er-practice'],
      pageId: 'er-quiz',
      completed: completedSteps.has('er-quiz')
    },
    {
      id: 'ra-basics',
      title: 'Relationale Algebra - Grundlagen',
      description: 'Lerne alle wichtigen Operatoren der relationalen Algebra.',
      type: 'theory',
      estimatedTime: '60 Min',
      difficulty: 'Mittel',
      prerequisites: ['er-quiz'],
      pageId: 'ra-grundlagen',
      completed: completedSteps.has('ra-basics')
    },
    {
      id: 'ra-practice',
      title: 'Relationale Algebra - Übung',
      description: 'Baue RA-Ausdrücke mit Drag & Drop zusammen.',
      type: 'practice',
      estimatedTime: '25 Min',
      difficulty: 'Mittel',
      prerequisites: ['ra-basics'],
      pageId: 'ra-uebung',
      completed: completedSteps.has('ra-practice')
    },
    {
      id: 'ra-quiz',
      title: 'Relationale Algebra - Quiz',
      description: 'Teste dein Verständnis der RA-Operatoren.',
      type: 'quiz',
      estimatedTime: '20 Min',
      difficulty: 'Mittel',
      prerequisites: ['ra-basics', 'ra-practice'],
      pageId: 'ra-quiz',
      completed: completedSteps.has('ra-quiz')
    },
    {
      id: 'ra-praxis',
      title: 'Relationale Algebra - Praxisfälle',
      description: 'Löse komplexe RA-Aufgaben mit steigendem Schwierigkeitsgrad.',
      type: 'practice',
      estimatedTime: '45 Min',
      difficulty: 'Schwer',
      prerequisites: ['ra-quiz'],
      pageId: 'ra-praxis',
      completed: completedSteps.has('ra-praxis')
    },
    {
      id: 'ra-exam',
      title: 'Prüfungsvorbereitung - RA',
      description: 'Simuliere eine echte Prüfung mit Zeitlimit.',
      type: 'exam',
      estimatedTime: '30 Min',
      difficulty: 'Schwer',
      prerequisites: ['ra-praxis'],
      pageId: 'ra-pruefung',
      completed: completedSteps.has('ra-exam')
    },
    {
      id: 'trans-basics',
      title: 'Transaktionen - Grundlagen',
      description: 'Lerne die ACID-Eigenschaften und Grundkonzepte von Transaktionen.',
      type: 'theory',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['ra-exam'],
      pageId: 'trans-grundlagen',
      completed: completedSteps.has('trans-basics')
    },
    {
      id: 'trans-concepts',
      title: 'Transaktionen - Konzeptkarten',
      description: 'Interaktive Karten zu ACID, Isolation Levels und Concurrency-Problemen.',
      type: 'theory',
      estimatedTime: '30 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-basics'],
      pageId: 'trans-concept-basics',
      completed: completedSteps.has('trans-concepts')
    },
    {
      id: 'trans-drag-drop',
      title: 'Transaktionen - Drag & Drop',
      description: 'Einfache Zuordnungsübungen zu ACID-Eigenschaften und Transaktions-Zuständen.',
      type: 'practice',
      estimatedTime: '25 Min',
      difficulty: 'Einfach',
      prerequisites: ['trans-concepts'],
      pageId: 'trans-drag-drop',
      completed: completedSteps.has('trans-drag-drop')
    },
    {
      id: 'trans-comprehensive',
      title: 'Transaktionen - Umfassende Übungen',
      description: 'Progressive Übungen von Grundkonzepten bis zu erweiterten Transaktions-Themen.',
      type: 'practice',
      estimatedTime: '60 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-drag-drop'],
      pageId: 'trans-comprehensive',
      completed: completedSteps.has('trans-comprehensive')
    },
    {
      id: 'trans-praxis',
      title: 'Transaktionen - Praxisfälle',
      description: 'Realistische Szenarien aus Banking, E-Commerce und anderen Bereichen.',
      type: 'practice',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-comprehensive'],
      pageId: 'trans-praxis',
      completed: completedSteps.has('trans-praxis')
    },
    {
      id: 'trans-specialized',
      title: 'Transaktionen - Spezialisierte Übungen',
      description: 'Deep Dive in ACID, Isolation Levels, Concurrency Control und Recovery.',
      type: 'practice',
      estimatedTime: '50 Min',
      difficulty: 'Schwer',
      prerequisites: ['trans-praxis'],
      pageId: 'trans-specialized',
      completed: completedSteps.has('trans-specialized')
    },
    {
      id: 'trans-tools',
      title: 'Transaktionen - Interaktive Tools',
      description: 'Visualisiere Transaktionskonzepte mit interaktiven Tools und Simulationen.',
      type: 'practice',
      estimatedTime: '40 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-specialized'],
      pageId: 'trans-tools',
      completed: completedSteps.has('trans-tools')
    },
    {
      id: 'trans-uebung',
      title: 'Transaktionen - Interaktive Übung',
      description: 'Klassische interaktive Übungen zu Transaktionskonzepten.',
      type: 'practice',
      estimatedTime: '35 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-tools'],
      pageId: 'trans-uebung',
      completed: completedSteps.has('trans-uebung')
    },
    {
      id: 'trans-exam',
      title: 'Transaktionen - Prüfungssimulation',
      description: 'Teste dein Wissen in einer realistischen Prüfungsumgebung mit Zeitlimit.',
      type: 'exam',
      estimatedTime: '30 Min',
      difficulty: 'Schwer',
      prerequisites: ['trans-uebung'],
      pageId: 'trans-pruefung',
      completed: completedSteps.has('trans-exam')
    },
    {
      id: 'trans-quiz',
      title: 'Transaktionen - Wissens-Quiz',
      description: 'Abschließendes Quiz mit detaillierter Auswertung und Empfehlungen.',
      type: 'quiz',
      estimatedTime: '20 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-exam'],
      pageId: 'trans-quiz',
      completed: completedSteps.has('trans-quiz')
    },
    {
      id: 'design-theory-basics',
      title: 'Entwurfstheorie - Grundlagen',
      description: 'Lerne die theoretischen Grundlagen des Datenbankentwurfs kennen.',
      type: 'theory',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-quiz'],
      pageId: 'design-theory-basics',
      completed: completedSteps.has('design-theory-basics')
    },
    {
      id: 'anomaly-exercise',
      title: 'Entwurfstheorie - Anomalien-Übung',
      description: 'Verstehe Änderungs-, Einfüge- und Löschanomalien durch interaktive Übungen.',
      type: 'practice',
      estimatedTime: '30 Min',
      difficulty: 'Mittel',
      prerequisites: ['design-theory-basics'],
      pageId: 'anomaly-exercise',
      completed: completedSteps.has('anomaly-exercise')
    },
    {
      id: 'fd-exercise',
      title: 'Entwurfstheorie - Funktionale Abhängigkeiten',
      description: 'Lerne funktionale Abhängigkeiten und Armstrong-Axiome kennen.',
      type: 'practice',
      estimatedTime: '35 Min',
      difficulty: 'Mittel',
      prerequisites: ['anomaly-exercise'],
      pageId: 'fd-exercise',
      completed: completedSteps.has('fd-exercise')
    },
    {
      id: 'normalization-exercise',
      title: 'Entwurfstheorie - Normalformen-Übung',
      description: 'Übe 1NF, 2NF, 3NF und BCNF mit interaktiven Beispielen.',
      type: 'practice',
      estimatedTime: '40 Min',
      difficulty: 'Schwer',
      prerequisites: ['fd-exercise'],
      pageId: 'normalization-exercise',
      completed: completedSteps.has('normalization-exercise')
    },
    {
      id: 'decomposition-exercise',
      title: 'Entwurfstheorie - Zerlegungs-Übung',
      description: 'Lerne verlustfreie und abhängigkeitsbewahrende Zerlegungen.',
      type: 'practice',
      estimatedTime: '35 Min',
      difficulty: 'Schwer',
      prerequisites: ['normalization-exercise'],
      pageId: 'decomposition-exercise',
      completed: completedSteps.has('decomposition-exercise')
    },
    {
      id: 'design-theory-quiz',
      title: 'Entwurfstheorie - Quiz',
      description: 'Teste dein Wissen über Anomalien, FDs, Normalformen und Zerlegungen.',
      type: 'quiz',
      estimatedTime: '25 Min',
      difficulty: 'Mittel',
      prerequisites: ['decomposition-exercise'],
      pageId: 'design-theory-quiz',
      completed: completedSteps.has('design-theory-quiz')
    },
    {
      id: 'phys-basics',
      title: 'Physischer Entwurf - Grundlagen',
      description: 'Lerne die Grundlagen des physischen Datenbankentwurfs und der Speicherstrukturen.',
      type: 'theory',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['trans-quiz'],
      pageId: 'phys-grundlagen',
      completed: completedSteps.has('phys-basics')
    },
    {
      id: 'phys-concepts',
      title: 'Physischer Entwurf - Konzeptkarten',
      description: 'Interaktive Karten zu Indexierung, Speicherstrukturen und Performance-Optimierung.',
      type: 'theory',
      estimatedTime: '30 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-basics'],
      pageId: 'phys-concept-basics',
      completed: completedSteps.has('phys-concepts')
    },
    {
      id: 'phys-drag-drop',
      title: 'Physischer Entwurf - Drag & Drop',
      description: 'Einfache Zuordnungsübungen zu Indexierung und Speicherstrukturen.',
      type: 'practice',
      estimatedTime: '25 Min',
      difficulty: 'Einfach',
      prerequisites: ['phys-concepts'],
      pageId: 'phys-drag-drop',
      completed: completedSteps.has('phys-drag-drop')
    },
    {
      id: 'phys-comprehensive',
      title: 'Physischer Entwurf - Umfassende Übungen',
      description: 'Progressive Übungen von Grundkonzepten bis zu erweiterten Optimierungstechniken.',
      type: 'practice',
      estimatedTime: '60 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-drag-drop'],
      pageId: 'phys-comprehensive',
      completed: completedSteps.has('phys-comprehensive')
    },
    {
      id: 'phys-praxis',
      title: 'Physischer Entwurf - Praxisfälle',
      description: 'Realistische Szenarien aus E-Commerce, Analytics und anderen Bereichen.',
      type: 'practice',
      estimatedTime: '45 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-comprehensive'],
      pageId: 'phys-praxis',
      completed: completedSteps.has('phys-praxis')
    },
    {
      id: 'phys-specialized',
      title: 'Physischer Entwurf - Spezialisierte Übungen',
      description: 'Deep Dive in B+-Bäume, Hashing, Bloom-Filter und Performance-Analyse.',
      type: 'practice',
      estimatedTime: '50 Min',
      difficulty: 'Schwer',
      prerequisites: ['phys-praxis'],
      pageId: 'phys-specialized',
      completed: completedSteps.has('phys-specialized')
    },
    {
      id: 'phys-tools',
      title: 'Physischer Entwurf - Interaktive Tools',
      description: 'Visualisiere Datenstrukturen mit interaktiven Tools und Simulationen.',
      type: 'practice',
      estimatedTime: '40 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-specialized'],
      pageId: 'phys-tools',
      completed: completedSteps.has('phys-tools')
    },
    {
      id: 'phys-uebung',
      title: 'Physischer Entwurf - Interaktive Übung',
      description: 'Klassische interaktive Übungen zu physischen Datenbankstrukturen.',
      type: 'practice',
      estimatedTime: '35 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-tools'],
      pageId: 'phys-uebung',
      completed: completedSteps.has('phys-uebung')
    },
    {
      id: 'phys-exam',
      title: 'Physischer Entwurf - Prüfungssimulation',
      description: 'Teste dein Wissen in einer realistischen Prüfungsumgebung mit Zeitlimit.',
      type: 'exam',
      estimatedTime: '60 Min',
      difficulty: 'Schwer',
      prerequisites: ['phys-uebung'],
      pageId: 'phys-pruefung',
      completed: completedSteps.has('phys-exam')
    },
    {
      id: 'phys-quiz',
      title: 'Physischer Entwurf - Wissens-Quiz',
      description: 'Abschließendes Quiz mit verschiedenen Modi und detaillierter Auswertung.',
      type: 'quiz',
      estimatedTime: '20 Min',
      difficulty: 'Mittel',
      prerequisites: ['phys-exam'],
      pageId: 'phys-quiz',
      completed: completedSteps.has('phys-quiz')
    },
    {
      id: 'dbs9-progressive-learning',
      title: 'Anfrageoptimierung - Progressives Lernen',
      description: 'Strukturierter Lernweg durch SQL-Ausführung, Join-Algorithmen und Optimierung.',
      type: 'theory',
      estimatedTime: '60 Min',
      difficulty: 'Schwer',
      prerequisites: ['phys-quiz'],
      pageId: 'dbs9-progressive-learning',
      completed: completedSteps.has('dbs9-progressive-learning')
    },
    {
      id: 'query-execution-exercise',
      title: 'Anfrageoptimierung - SQL-Ausführungsreihenfolge',
      description: 'Verstehe die tatsächliche Ausführungsreihenfolge von SQL-Anfragen.',
      type: 'practice',
      estimatedTime: '30 Min',
      difficulty: 'Mittel',
      prerequisites: ['dbs9-progressive-learning'],
      pageId: 'query-execution-exercise',
      completed: completedSteps.has('query-execution-exercise')
    },
    {
      id: 'join-algorithms-exercise',
      title: 'Anfrageoptimierung - Join-Algorithmen',
      description: 'Lerne Nested Loop, Hash Join, Sort-Merge und Index Nested Loop Join.',
      type: 'practice',
      estimatedTime: '40 Min',
      difficulty: 'Schwer',
      prerequisites: ['query-execution-exercise'],
      pageId: 'join-algorithms-exercise',
      completed: completedSteps.has('join-algorithms-exercise')
    },
    {
      id: 'cost-optimization-exercise',
      title: 'Anfrageoptimierung - Kostenbasierte Optimierung',
      description: 'Verstehe Kostenmodelle und wähle optimale Ausführungspläne.',
      type: 'practice',
      estimatedTime: '35 Min',
      difficulty: 'Schwer',
      prerequisites: ['join-algorithms-exercise'],
      pageId: 'cost-optimization-exercise',
      completed: completedSteps.has('cost-optimization-exercise')
    },
    {
      id: 'dbs9-quiz',
      title: 'Anfrageoptimierung - Quiz',
      description: 'Teste dein Wissen über SQL-Ausführung, Join-Algorithmen und Optimierung.',
      type: 'quiz',
      estimatedTime: '25 Min',
      difficulty: 'Schwer',
      prerequisites: ['cost-optimization-exercise'],
      pageId: 'dbs9-quiz',
      completed: completedSteps.has('dbs9-quiz')
    }
  ];

  const handleStepClick = (step: LearningStep) => {
    onNavigate(step.pageId);
  };


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-5 h-5" />;
      case 'practice': return <Brain className="w-5 h-5" />;
      case 'quiz': return <Target className="w-5 h-5" />;
      case 'exam': return <Clock className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practice': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-yellow-100 text-yellow-800';
      case 'exam': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-green-100 text-green-800';
      case 'Mittel': return 'bg-yellow-100 text-yellow-800';
      case 'Schwer': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = completedSteps.size;
  const totalCount = learningSteps.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lernpfad: Datenbanksysteme</h1>
        <p className="text-gray-600 mb-6">
          Folge diesem strukturierten Lernpfad von den Grundlagen bis zur Prüfungsvorbereitung.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Fortschritt</h2>
            <span className="text-lg font-bold text-blue-600">
              {completedCount}/{totalCount} Schritte abgeschlossen
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {Math.round(progressPercentage)}% des Lernpfads abgeschlossen
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {learningSteps.map((step, index) => {
          return (
            <div
              key={step.id}
              className="bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg cursor-pointer"
              onClick={() => handleStepClick(step)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {index + 1}. {step.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(step.type)}`}>
                        {step.type === 'theory' && 'Theorie'}
                        {step.type === 'practice' && 'Übung'}
                        {step.type === 'quiz' && 'Quiz'}
                        {step.type === 'exam' && 'Prüfung'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                        {step.difficulty}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.estimatedTime}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  {step.prerequisites.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Empfohlene Reihenfolge:</p>
                      <div className="flex flex-wrap gap-1">
                        {step.prerequisites.map((prereq, prereqIndex) => {
                          const prereqStep = learningSteps.find(s => s.id === prereq);
                          const isCompleted = completedSteps.has(prereq);
                          return (
                            <span
                              key={prereqIndex}
                              className={`px-2 py-1 rounded text-xs ${
                                isCompleted 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-600'
                              }`}
                            >
                              {prereqStep?.title || prereq}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  {getTypeIcon(step.type)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tipps für den Erfolg</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Arbeite die Schritte in der angegebenen Reihenfolge ab</li>
          <li>• Nimm dir Zeit für die Übungen - sie sind der Schlüssel zum Verständnis</li>
          <li>• Wiederhole schwierige Konzepte, bevor du weitermachst</li>
          <li>• Nutze die Prüfungsvorbereitung, um dein Wissen zu testen</li>
          <li>• Bei Fragen kannst du jederzeit zu den Grundlagen zurückkehren</li>
        </ul>
      </div>
    </div>
  );
};
