# Sicherheitsrichtlinie

## Unterstützte Version

Sicherheitskorrekturen werden auf dem aktuellen Stand des `main`-Branches vorgenommen. Es gibt derzeit keine separat gepflegten älteren Release-Linien.

## Schwachstellen melden

Bitte veröffentliche eine vermutete Schwachstelle nicht zuerst in einem öffentlichen Issue. Nutze stattdessen GitHub Private Vulnerability Reporting im Bereich **Security** des Repositorys, sofern diese Funktion verfügbar ist. Alternativ kann ein Maintainer über die im GitHub-Profil angegebene Kontaktmöglichkeit erreicht werden.

Eine hilfreiche Meldung enthält:

- betroffene Version oder Commit,
- reproduzierbare Schritte,
- erwartete und beobachtete Auswirkung,
- mögliche Abhilfemaßnahmen, falls bekannt.

Secrets, Zugriffstoken, personenbezogene Daten und aktive Exploits dürfen nicht in öffentliche Issues oder Pull Requests aufgenommen werden.

## Betriebsmodell

Die Anwendung ist derzeit ein statisches Frontend ohne eigenes Backend, Benutzerkonten oder persistente Nutzerdaten. Deployment-Konfigurationen setzen grundlegende Sicherheitsheader. Abhängigkeiten werden automatisiert überwacht; dennoch sollten Betreiber Images und JavaScript-Abhängigkeiten regelmäßig aktualisieren.
