# DBS Lernplattform - TU Wien

Eine vollständig programmierte interaktive Lernplattform für die **Datenbanksysteme VU (Hose)** an der TU Wien. Speziell entwickelt für die Vorbereitung auf den **1. Multiple Choice Test** und das Verständnis aller wichtigen DBS-Konzepte.

## 🎯 Ziel

Diese Plattform unterstützt Studenten der TU Wien bei der Vorbereitung auf die Datenbanksysteme VU von Prof. Hose durch:
- **Strukturiertes Lernen** aller prüfungsrelevanten Themen
- **Interaktive Übungen** für besseres Verständnis
- **Quiz-System** zur Testvorbereitung
- **Praktische Beispiele** aus der Vorlesung

## ✨ Features

- **Interaktive Grundlagen**: Übersichtliche Darstellung der wichtigsten DBS-Konzepte
- **Quiz-System**: Multiple-Choice-Fragen mit detaillierten Erklärungen für Testvorbereitung
- **Drag & Drop Übungen**: Praktische Übungen für ER-Modellierung und Relationale Algebra
- **PDF-Viewer**: Integrierte Anzeige von Vorlesungsunterlagen und Tests
- **Responsive Design**: Optimiert für Desktop und Mobile
- **Vollständig programmiert**: Keine externe Abhängigkeiten, alles selbst entwickelt

## 📚 Themen (Prüfungsrelevant)

- **Relationales Modell**: Domänen, Relationen, Tupel, Schlüssel
- **ER-Modellierung**: Entitätstypen, Beziehungen, Kardinalitäten
- **Relationale Algebra**: Alle Operatoren, Joins, Division
- **Normalisierung**: 1NF, 2NF, 3NF, BCNF, Funktionale Abhängigkeiten
- **Physischer Entwurf**: Dateiorganisation, Indexe, B+-Bäume, Hashing
- **Transaktionen**: ACID, Schedules, Serialisierbarkeit
- **SQL**: JOINs, Aggregationen, Subqueries

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

## 🚀 Verwendung

1. **Navigation**: Verwende die Seitenleiste, um zwischen Themen zu wechseln
2. **Grundlagen**: Lese die Konzeptkarten für jedes Thema (prüfungsrelevant!)
3. **Quiz**: Teste dein Wissen mit interaktiven Multiple-Choice-Fragen
4. **Übungen**: Praktiziere mit Drag & Drop-Übungen für ER-Modellierung und RA
5. **PDFs**: Durchsuche die Vorlesungsunterlagen und Tests
6. **Lernpfad**: Folge dem strukturierten Lernweg für optimale Testvorbereitung

## 🎓 Für TU Wien Studenten

Diese Plattform ist speziell für die **Datenbanksysteme VU (Hose)** entwickelt und deckt alle wichtigen Themen für den **1. Multiple Choice Test** ab:

- ✅ **Alle Vorlesungsinhalte** strukturiert aufbereitet
- ✅ **Prüfungsrelevante Übungen** mit Lösungen
- ✅ **Multiple Choice Fragen** zur Testvorbereitung
- ✅ **Interaktive Beispiele** aus der Vorlesung
- ✅ **PDF-Zugang** zu allen Unterlagen

## 💻 Entwicklung

Das Projekt verwendet moderne React-Patterns:
- Functional Components mit Hooks
- TypeScript für Typsicherheit
- Komponentenbasierte Architektur
- Wiederverwendbare UI-Komponenten
- **Vollständig selbst programmiert** - keine externen Lernplattformen

## 📖 Lizenz

Dieses Projekt ist für Bildungszwecke erstellt und steht allen TU Wien Studenten zur Verfügung.