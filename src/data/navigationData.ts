import type { NavigationItem, PDFDocument } from '../types';

export const navigationItems: NavigationItem[] = [
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
    icon: 'ProjectDiagram',
    subItems: [
      { id: 'er-grundlagen', label: 'Grundlagen', type: 'basics' },
      { id: 'er-uebung', label: 'Interaktive Übung', type: 'exercise' },
      { id: 'er-quiz', label: 'Wissens-Quiz', type: 'quiz' }
    ]
  },
  {
    id: 'relationale-algebra',
    label: 'Relationale Algebra',
    icon: 'Stream',
    subItems: [
      { id: 'ra-grundlagen', label: 'Grundlagen', type: 'basics' },
      { id: 'ra-uebung', label: 'Interaktive Übung', type: 'exercise' },
      { id: 'ra-quiz', label: 'Wissens-Quiz', type: 'quiz' },
      { id: 'ra-praxis', label: 'Praxisfälle', type: 'exercise' },
      { id: 'ra-pruefung', label: 'Prüfungsvorbereitung', type: 'quiz' },
      { id: 'ra-division', label: 'Relationale Division', type: 'exercise' },
      { id: 'ra-operator-tree', label: 'Operatorbaumdarstellung', type: 'exercise' },
      { id: 'ra-complex', label: 'Komplexe Ausdrücke', type: 'exercise' }
    ]
  },
  {
    id: 'normalisierung',
    label: 'Normalisierung',
    icon: 'Tasks',
    subItems: [
      { id: 'norm-grundlagen', label: 'Grundlagen', type: 'basics' },
      { id: 'norm-uebung', label: 'Interaktive Übung', type: 'exercise' },
      { id: 'norm-quiz', label: 'Wissens-Quiz', type: 'quiz' }
    ]
  },
  {
    id: 'entwurfstheorie',
    label: 'Entwurfstheorie (DBS5)',
    icon: 'Settings',
    subItems: [
      { id: 'design-theory-basics', label: 'Grundlagen', type: 'basics' },
      { id: 'progressive-learning', label: 'Progressives Lernen', type: 'basics' },
      { id: 'anomaly-exercise', label: 'Anomalien-Übung', type: 'exercise' },
      { id: 'fd-exercise', label: 'Funktionale Abhängigkeiten', type: 'exercise' },
      { id: 'attribute-closure', label: 'Attributhülle', type: 'exercise' },
      { id: 'normalization-exercise', label: 'Normalformen-Übung', type: 'exercise' },
      { id: 'decomposition-exercise', label: 'Zerlegungs-Übung', type: 'exercise' },
      { id: 'design-theory-quiz', label: 'Entwurfstheorie-Quiz', type: 'quiz' },
      { id: 'test-preparation', label: 'Testvorbereitung', type: 'quiz' }
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
      { id: 'trans-uebung', label: 'Interaktive Übung', type: 'exercise' },
      { id: 'trans-quiz', label: 'Wissens-Quiz', type: 'quiz' }
    ]
  }
];

export const pdfDocuments: PDFDocument[] = [
  {
    id: 'dbs-2',
    title: 'DBS-2',
    filename: 'DBS-2.pdf',
    description: 'Datenbanksysteme Vorlesung 2'
  },
  {
    id: 'dbs-4',
    title: 'DBS-4',
    filename: 'DBS-4.pdf',
    description: 'Datenbanksysteme Vorlesung 4'
  },
  {
    id: 'dbs-5',
    title: 'DBS-5',
    filename: 'DBS-5.pdf',
    description: 'Datenbanksysteme Vorlesung 5'
  },
  {
    id: 'dbs-6',
    title: 'DBS-6',
    filename: 'DBS-6.pdf',
    description: 'Datenbanksysteme Vorlesung 6'
  },
  {
    id: 'dbs-7',
    title: 'DBS-7',
    filename: 'DBS-7.pdf',
    description: 'Datenbanksysteme Vorlesung 7'
  },
  {
    id: 'dbs-8',
    title: 'DBS-8',
    filename: 'DBS-8.pdf',
    description: 'Datenbanksysteme Vorlesung 8'
  },
  {
    id: 'test-1',
    title: 'Test 1',
    filename: 'TU_Wien-Datenbanksysteme_VU_(Hose)_-_SS2024_Test_1 (1) (1).pdf',
    description: 'Datenbanksysteme Test 1'
  }
];
