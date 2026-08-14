# Mitwirken

Danke für dein Interesse an der DBS Lernplattform. Kleine, klar abgegrenzte Änderungen sind am einfachsten zu prüfen und zusammenzuführen.

## Entwicklungsablauf

1. Erstelle einen Branch von `main`.
2. Installiere Abhängigkeiten mit `pnpm install --frozen-lockfile`.
3. Implementiere die Änderung einschließlich passender Tests.
4. Führe `pnpm run check` aus.
5. Eröffne einen Pull Request mit Problem, Lösung und manuellen Prüfschritten.

Verwende nach Möglichkeit Conventional Commits, beispielsweise `feat:`, `fix:`, `refactor:`, `test:`, `docs:` oder `ci:`. Ein Commit sollte eine nachvollziehbare fachliche Änderung enthalten.

## Qualitätsanforderungen

- Neue Logik benötigt automatisierte Tests, sofern sie unabhängig von der Oberfläche prüfbar ist.
- Interaktive Elemente müssen per Tastatur bedienbar sein und einen sichtbaren Fokus besitzen.
- Neue Inhalte werden typisiert und dürfen keine ungesicherten externen HTML-Inhalte rendern.
- Große Übungsmodule sollen dynamisch importiert werden, damit der Start-Bundle klein bleibt.
- Fachliche Aussagen sollten anhand verlässlicher Lehr- oder Standardquellen geprüft werden.

## Pull Requests

Beschreibe im Pull Request:

- welches Problem gelöst wird,
- welche sichtbaren Änderungen entstehen,
- welche automatisierten und manuellen Prüfungen ausgeführt wurden,
- ob Screenshots für die Bewertung der Oberfläche relevant sind.

Bitte keine generierten Abhängigkeiten, Build-Artefakte, Secrets oder persönliche Daten committen.
