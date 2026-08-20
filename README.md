# DBS Lernplattform

Eine interaktive Single-Page-Anwendung zum Lernen zentraler Konzepte aus Datenbanksystemen. Sie verbindet kompakte Theorie, schrittweise Lernpfade, praktische Übungen und Quizfragen in einer responsiven Oberfläche.

Die Anwendung ist ein unabhängiges Open-Source-Lernprojekt. Sie ist kein offizielles Angebot der TU Wien und wird weder von der Universität noch von Lehrveranstaltungsverantwortlichen betrieben oder bestätigt.

## Funktionsumfang

- Lernpfade für relationales Modell, ER-Modellierung und relationale Algebra
- Übungen zu Normalisierung, physischem Datenbankentwurf und Transaktionen
- SQL- und Anfrageoptimierungsaufgaben einschließlich Join-Algorithmen
- Quizmodus mit unmittelbarem Feedback, Erklärungen und Ergebnisübersicht
- Prüfungsvorbereitung mit Zeitlimit und zufälliger Fragenauswahl
- Tastaturbedienbare Antwortoptionen und sichtbare Fokuszustände
- Lazy Loading für umfangreiche Übungsmodule
- Fehlergrenze mit nutzerfreundlichem Wiederherstellungszustand

## Technischer Überblick

- React 19 und TypeScript
- Vite 7 und Tailwind CSS
- Vitest für Unit-Tests
- ESLint mit React-Hooks- und Unused-Imports-Regeln
- pnpm 11 mit reproduzierbarem Lockfile
- Nginx-Container und Vercel-Konfiguration für SPA-Hosting
- GitHub Actions für Linting, Typprüfung, Tests, Build und Container-Build

Die Lerninhalte liegen als typisierte Datenmodule vor. Wiederverwendbare Komponenten rendern Theorie und Quizfragen; komplexere Übungen werden als separate Bundles erst beim Öffnen geladen. Details stehen in [docs/architecture.md](docs/architecture.md).

## Lokale Entwicklung

Voraussetzungen:

- Node.js 22 oder neuer
- pnpm 11.22.0; Corepack kann die im Projekt deklarierte Version aktivieren

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

Der Entwicklungsserver zeigt die lokale URL im Terminal an.

## Qualitätsprüfung

Alle Prüfungen gemeinsam ausführen:

```bash
pnpm run check
```

Einzelne Befehle:

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run preview
```

Pull Requests und Änderungen auf `main` durchlaufen dieselben Prüfungen in GitHub Actions. Das erzeugte `dist`-Verzeichnis wird dort zusätzlich als kurzlebiges Build-Artefakt bereitgestellt.

## Container

```bash
docker build -t dbs-learning-platform .
docker run --rm -p 8080:8080 dbs-learning-platform
```

Danach ist die Anwendung unter `http://localhost:8080` erreichbar. Der Container stellt unter `/healthz` einen Healthcheck bereit. Nginx liefert versionierte Assets mit langfristigem Cache aus und fällt bei Anwendungsrouten auf `index.html` zurück.

## Deployment

Das Repository enthält zwei unterstützte Wege:

- Ein statischer Vite-Build aus `dist`, beispielsweise auf Vercel
- Das Multi-Stage-Dockerfile für jede OCI-kompatible Plattform

Beide Varianten setzen grundlegende Browser-Sicherheitsheader. Die Anwendung benötigt derzeit keine Laufzeit-Secrets und überträgt keine Lern- oder Quizdaten an einen Backend-Dienst.

## Mitwirken und Sicherheit

Hinweise zu Branches, Commits und Pull Requests stehen in [CONTRIBUTING.md](CONTRIBUTING.md). Sicherheitsprobleme bitte entsprechend [SECURITY.md](SECURITY.md) melden und nicht zuerst öffentlich beschreiben.

## Lizenz

Veröffentlicht unter der [MIT-Lizenz](LICENSE). Lerninhalte können fachliche Fehler enthalten und ersetzen keine offiziellen Lehrunterlagen.
