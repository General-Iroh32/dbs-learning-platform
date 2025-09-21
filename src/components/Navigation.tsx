import React, { useState } from 'react';
import { 
  GitBranch, 
  Workflow, 
  CheckSquare, 
  HardDrive, 
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  FileText,
  Database,
  Map
} from 'lucide-react';
import type { NavigationItem } from '../types';

interface NavigationProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

const iconMap = {
  GitBranch,
  Workflow,
  CheckSquare,
  HardDrive,
  ArrowLeftRight,
  FileText,
  Database,
  Map
};

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activePage }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const navigationItems: NavigationItem[] = [
    {
      id: 'lernpfad',
      label: 'Lernpfad',
      icon: 'Map',
      subItems: [
        { id: 'lernpfad', label: 'Strukturierter Lernweg', type: 'basics' }
      ]
    },
    {
      id: 'relationales-modell',
      label: 'Relationales Modell',
      icon: 'Database',
      subItems: [
        { id: 'rm-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'rm-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'rm-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'er-modellierung',
      label: 'ER-Modellierung',
      icon: 'GitBranch',
      subItems: [
        { id: 'er-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'er-uebung', label: 'Einfache Übung', type: 'exercise' },
        { id: 'er-comprehensive', label: 'Umfassende Übungen', type: 'exercise' },
        { id: 'er-praxis', label: 'Praxisfälle', type: 'exercise' },
        { id: 'er-pruefung', label: 'Prüfungssimulation', type: 'exercise' },
        { id: 'er-weak-entity', label: 'Schwache Entitäten', type: 'exercise' },
        { id: 'er-isa', label: 'ISA-Beziehungen', type: 'exercise' },
        { id: 'er-relational-mapping', label: 'Relationale Abbildung', type: 'exercise' },
        { id: 'er-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'relationale-algebra',
      label: 'Relationale Algebra',
      icon: 'Workflow',
      subItems: [
        { id: 'ra-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'ra-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'ra-quiz', label: 'Wissens-Quiz', type: 'quiz' },
        { id: 'ra-praxis', label: 'Praxisfälle', type: 'exercise' },
        { id: 'ra-pruefung', label: 'Prüfungsvorbereitung', type: 'quiz' }
      ]
    },
    {
      id: 'normalisierung',
      label: 'Normalisierung',
      icon: 'CheckSquare',
      subItems: [
        { id: 'norm-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'norm-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'norm-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'physisch',
      label: 'Physischer Entwurf',
      icon: 'HardDrive',
      subItems: [
        { id: 'phys-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'phys-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'phys-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'transaktionen',
      label: 'Transaktionen',
      icon: 'ArrowLeftRight',
      subItems: [
        { id: 'trans-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'trans-concept-basics', label: 'Konzeptkarten', type: 'exercise' },
        { id: 'trans-drag-drop', label: 'Drag & Drop', type: 'exercise' },
        { id: 'trans-comprehensive', label: 'Umfassende Übungen', type: 'exercise' },
        { id: 'trans-praxis', label: 'Praxisfälle', type: 'exercise' },
        { id: 'trans-pruefung', label: 'Prüfungssimulation', type: 'exercise' },
        { id: 'trans-specialized', label: 'Spezialisierte Übungen', type: 'exercise' },
        { id: 'trans-tools', label: 'Interaktive Tools', type: 'exercise' },
        { id: 'trans-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'trans-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'sql',
      label: 'SQL',
      icon: 'Database',
      subItems: [
        { id: 'sql-grundlagen', label: 'Grundlagen', type: 'basics' },
        { id: 'sql-uebung', label: 'Interaktive Übung', type: 'exercise' },
        { id: 'sql-quiz', label: 'Wissens-Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'pdfs',
      label: 'PDF-Dokumente',
      icon: 'FileText'
    }
  ];

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleMainItemClick = (item: NavigationItem) => {
    onNavigate(item.id);
    toggleExpanded(item.id);
  };

  const handleSubItemClick = (subItemId: string) => {
    onNavigate(subItemId);
  };

  const isMainItemActive = (item: NavigationItem) => {
    return activePage === item.id || 
           (item.subItems && item.subItems.some(sub => sub.id === activePage));
  };

  const isSubItemActive = (subItemId: string) => {
    return activePage === subItemId;
  };

  return (
    <aside className="w-full md:w-72 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">DBS Lernplattform</h1>
        <p className="text-sm text-gray-500">Dein Begleiter zur Prüfung</p>
      </div>
      <nav className="mt-6">
        <h2 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Themen
        </h2>
        <div className="mt-2 space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isExpanded = expandedItems.has(item.id);
            const isActive = isMainItemActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMainItemClick(item)}
                  className={`nav-item flex items-center w-full px-6 py-3 text-left text-gray-700 ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <IconComponent className="w-6 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.subItems && (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  )}
                </button>
                {item.subItems && isExpanded && (
                  <div className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem.id)}
                        className={`nav-item nav-sub-item block w-full text-left py-2 text-sm text-gray-600 ${
                          isSubItemActive(subItem.id) ? 'active' : ''
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
