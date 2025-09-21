import React, { useState } from 'react';
import { FunctionalDependencyExercise } from './exercises/FunctionalDependencyExercise';
import { AttributeClosureExercise } from './exercises/AttributeClosureExercise';
import { AnomalyExercise } from './exercises/AnomalyExercise';
import { NormalizationExercise } from './exercises/NormalizationExercise';
import { DecompositionExercise } from './exercises/DecompositionExercise';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  prerequisites: string[];
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export const ProgressiveLearningSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showOverview, setShowOverview] = useState(true);

  const learningSteps: LearningStep[] = [
    {
      id: 'anomalies',
      title: 'Anomalien verstehen',
      description: 'Lerne die verschiedenen Arten von Anomalien in schlecht entworfenen Datenbanken kennen.',
      component: AnomalyExercise,
      prerequisites: [],
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '15 Min'
    },
    {
      id: 'functional-dependencies',
      title: 'Funktionale Abhängigkeiten',
      description: 'Verstehe das Konzept der funktionalen Abhängigkeiten und wie man sie erkennt.',
      component: FunctionalDependencyExercise,
      prerequisites: ['anomalies'],
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '20 Min'
    },
    {
      id: 'attribute-closure',
      title: 'Attributhülle berechnen',
      description: 'Lerne den Algorithmus zur Berechnung der Attributhülle mit Armstrong-Axiomen.',
      component: AttributeClosureExercise,
      prerequisites: ['functional-dependencies'],
      completed: false,
      difficulty: 'intermediate',
      estimatedTime: '25 Min'
    },
    {
      id: 'normalization',
      title: 'Normalformen (1NF - BCNF)',
      description: 'Verstehe die verschiedenen Normalformen und wie man sie anwendet.',
      component: NormalizationExercise,
      prerequisites: ['attribute-closure'],
      completed: false,
      difficulty: 'intermediate',
      estimatedTime: '30 Min'
    },
    {
      id: 'decomposition',
      title: 'Zerlegungen',
      description: 'Lerne verlustfreie und abhängigkeitsbewahrende Zerlegungen durchzuführen.',
      component: DecompositionExercise,
      prerequisites: ['normalization'],
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '35 Min'
    }
  ];

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const canAccessStep = (step: LearningStep): boolean => {
    return step.prerequisites.every(prereq => completedSteps.has(prereq));
  };

  const getStepStatus = (step: LearningStep): 'locked' | 'available' | 'completed' => {
    if (completedSteps.has(step.id)) return 'completed';
    if (canAccessStep(step)) return 'available';
    return 'locked';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'available': return '🔓';
      case 'locked': return '🔒';
      default: return '❓';
    }
  };

  const startStep = (stepIndex: number) => {
    const step = learningSteps[stepIndex];
    if (canAccessStep(step)) {
      setCurrentStep(stepIndex);
      setShowOverview(false);
    }
  };

  const goBackToOverview = () => {
    setShowOverview(true);
  };

  const nextStep = () => {
    if (currentStep < learningSteps.length - 1) {
      markStepCompleted(learningSteps[currentStep].id);
      setCurrentStep(currentStep + 1);
    } else {
      markStepCompleted(learningSteps[currentStep].id);
      setShowOverview(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showOverview) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">DBS5 - Entwurfstheorie</h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Interaktives Lernsystem von 0 bis zum Test
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {learningSteps.map((step, index) => {
            const status = getStepStatus(step);
            const isClickable = status !== 'locked';
            
            return (
              <div
                key={step.id}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                  isClickable 
                    ? 'hover:shadow-lg hover:scale-105' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isClickable && startStep(index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{getStatusIcon(status)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                    {step.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Schritt {index + 1}</span>
                  <span>{step.estimatedTime}</span>
                </div>

                {status === 'locked' && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded text-sm text-yellow-700">
                    <strong>Voraussetzungen:</strong> {step.prerequisites.length > 0 
                      ? step.prerequisites.join(', ') 
                      : 'Keine'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🎯 Lernziel</h2>
          <p className="text-lg mb-4">
            Dieses interaktive Lernsystem führt dich Schritt für Schritt durch die Entwurfstheorie von Datenbanken. 
            Du lernst von den Grundlagen (Anomalien) bis zu fortgeschrittenen Konzepten (Zerlegungen).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold mb-2">📚 Theorie</h3>
              <p>Verstehe die Konzepte durch interaktive Beispiele und Erklärungen.</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold mb-2">🔄 Praxis</h3>
              <p>Übe mit realen Szenarien und lerne durch Fehler.</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold mb-2">🎯 Testvorbereitung</h3>
              <p>Bereite dich optimal auf deinen DBS5-Test vor.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Fortschritt: {completedSteps.size} / {learningSteps.length} Schritte
            </div>
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps.size / learningSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CurrentComponent = learningSteps[currentStep].component;

  return (
    <div>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{learningSteps[currentStep].title}</h2>
              <p className="text-gray-600">Schritt {currentStep + 1} von {learningSteps.length}</p>
            </div>
            <button
              onClick={goBackToOverview}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ← Zurück zur Übersicht
            </button>
          </div>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / learningSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <CurrentComponent />
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            ← Vorheriger Schritt
          </button>
          
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentStep === learningSteps.length - 1 ? 'Abschließen' : 'Nächster Schritt →'}
          </button>
        </div>
      </div>
    </div>
  );
};
