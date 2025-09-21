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
      title: 'ER-Modellierung - Übung',
      description: 'Erstelle ER-Diagramme mit Drag & Drop.',
      type: 'practice',
      estimatedTime: '30 Min',
      difficulty: 'Mittel',
      prerequisites: ['er-basics'],
      pageId: 'er-uebung',
      completed: completedSteps.has('er-practice')
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
    }
  ];

  const handleStepClick = (step: LearningStep) => {
    const canAccess = step.prerequisites.every(prereq => 
      completedSteps.has(prereq) || prereq === ''
    );
    
    if (canAccess) {
      onNavigate(step.pageId);
    }
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
          const canAccess = step.prerequisites.every(prereq => 
            completedSteps.has(prereq) || prereq === ''
          );
          const isLocked = !canAccess;
          
          return (
            <div
              key={step.id}
              className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 ${
                isLocked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg cursor-pointer'
              }`}
              onClick={() => !isLocked && handleStepClick(step)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : isLocked ? (
                    <Circle className="w-6 h-6 text-gray-400" />
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
                      <p className="text-sm text-gray-500 mb-1">Voraussetzungen:</p>
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
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {prereqStep?.title || prereq}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {isLocked && (
                    <p className="text-sm text-red-600">
                      🔒 Schließe zuerst die Voraussetzungen ab
                    </p>
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
