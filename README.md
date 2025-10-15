# DBS Lernplattform

Eine interaktive Lernplattform für Datenbanksysteme, entwickelt mit React und TypeScript.

## Features

- **Interaktive Grundlagen**: Übersichtliche Darstellung der wichtigsten DBS-Konzepte
- **Quiz-System**: Multiple-Choice-Fragen mit detaillierten Erklärungen
- **Drag & Drop Übungen**: Praktische Übungen für ER-Modellierung
- **PDF-Viewer**: Integrierte Anzeige von Vorlesungsunterlagen und Tests
- **Responsive Design**: Optimiert für Desktop und Mobile

## Themen

- ER-Modellierung
- Relationale Algebra
- Normalisierung
- Physischer Datenbankentwurf
- Transaktionen

## Technologie-Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **PDF-Viewer**: react-pdf
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Installation

```bash
# Dependencies installieren
pnpm install

# Entwicklungsserver starten
pnpm run dev

# Build für Produktion
pnpm run build
```

## Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── exercises/      # Übungs-Komponenten
│   ├── Navigation.tsx  # Hauptnavigation
│   ├── ConceptBasics.tsx # Grundlagen-Darstellung
│   ├── Quiz.tsx        # Quiz-Komponente
│   └── PDFViewer.tsx   # PDF-Viewer
├── data/               # Daten und Konfiguration
│   ├── conceptData.ts  # Grundlagen-Daten
│   ├── quizData.ts     # Quiz-Fragen
│   └── navigationData.ts # Navigation und PDFs
├── types/              # TypeScript-Typen
└── App.tsx            # Hauptkomponente
```

## Verwendung

1. **Navigation**: Verwende die Seitenleiste, um zwischen Themen zu wechseln
2. **Grundlagen**: Lese die Konzeptkarten für jedes Thema
3. **Quiz**: Teste dein Wissen mit interaktiven Fragen
4. **Übungen**: Praktiziere mit Drag & Drop-Übungen
5. **PDFs**: Durchsuche die Vorlesungsunterlagen

## Entwicklung

Das Projekt verwendet moderne React-Patterns:
- Functional Components mit Hooks
- TypeScript für Typsicherheit
- Komponentenbasierte Architektur
- Wiederverwendbare UI-Komponenten

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.