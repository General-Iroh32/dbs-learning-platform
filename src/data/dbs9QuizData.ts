import type { QuizData } from '../types';

export const dbs9QuizData: QuizData = {
  questions: [
    {
      question: "In welcher Reihenfolge werden SQL-Klauseln tatsächlich ausgeführt?",
      hint: "Überlege, welche Operationen zuerst stattfinden müssen.",
      answerOptions: [
        {
          text: "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
          rationale: "Falsch! Das ist die geschriebene Reihenfolge, nicht die Ausführungsreihenfolge.",
          isCorrect: false
        },
        {
          text: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
          rationale: "Richtig! Zuerst werden die Tabellen geladen (FROM), dann gefiltert (WHERE), gruppiert (GROUP BY), Gruppen gefiltert (HAVING), projiziert (SELECT) und sortiert (ORDER BY).",
          isCorrect: true
        },
        {
          text: "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY",
          rationale: "Falsch! SELECT (Projektion) kommt erst nach der Gruppierung und Filterung.",
          isCorrect: false
        },
        {
          text: "WHERE → FROM → GROUP BY → HAVING → SELECT → ORDER BY",
          rationale: "Falsch! FROM muss zuerst kommen, um die Tabellen zu laden.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Transformationsregel wird beim 'pushing selections' angewendet?",
      hint: "Überlege, was das Ziel der logischen Optimierung ist.",
      answerOptions: [
        {
          text: "Selektionen werden nach oben im Anfragebaum verschoben",
          rationale: "Falsch! Selektionen werden nach UNTEN verschoben, um Zwischenergebnisse zu reduzieren.",
          isCorrect: false
        },
        {
          text: "Selektionen werden so weit wie möglich nach unten verschoben",
          rationale: "Richtig! Das 'pushing selections' verschiebt Selektionen so weit wie möglich nach unten, um Zwischenergebnisse früh zu reduzieren.",
          isCorrect: true
        },
        {
          text: "Selektionen werden durch Projektionen ersetzt",
          rationale: "Falsch! Selektionen und Projektionen sind verschiedene Operationen.",
          isCorrect: false
        },
        {
          text: "Selektionen werden komplett entfernt",
          rationale: "Falsch! Selektionen werden nicht entfernt, sondern nur verschoben.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welcher Join-Algorithmus ist optimal für zwei große Tabellen, die bereits sortiert sind?",
      hint: "Überlege, welche Kosten entfallen, wenn die Tabellen bereits sortiert sind.",
      answerOptions: [
        {
          text: "Nested Loop Join",
          rationale: "Falsch! Nested Loop Join ist nicht optimal für große Tabellen, auch wenn sie sortiert sind.",
          isCorrect: false
        },
        {
          text: "Hash Join",
          rationale: "Falsch! Hash Join ist gut für große Tabellen, aber nicht optimal wenn sie bereits sortiert sind.",
          isCorrect: false
        },
        {
          text: "Sort-Merge Join",
          rationale: "Richtig! Sort-Merge Join ist optimal für bereits sortierte Tabellen, da keine Sortierungskosten anfallen.",
          isCorrect: true
        },
        {
          text: "Index Nested Loop Join",
          rationale: "Falsch! Index Nested Loop Join benötigt einen Index, nicht sortierte Tabellen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was dominiert die Kosten in einem Datenbank-Kostenmodell?",
      hint: "Überlege, welche Operation am langsamsten ist.",
      answerOptions: [
        {
          text: "CPU-Zeit",
          rationale: "Falsch! CPU-Operationen sind viel schneller als I/O-Operationen.",
          isCorrect: false
        },
        {
          text: "Netzwerkkommunikation",
          rationale: "Falsch! Netzwerkkommunikation ist nur bei verteilten Systemen relevant.",
          isCorrect: false
        },
        {
          text: "Festplattenzugriff (I/O)",
          rationale: "Richtig! Festplattenzugriff dominiert die Kosten, da I/O-Operationen um Größenordnungen langsamer sind als CPU-Operationen.",
          isCorrect: true
        },
        {
          text: "Speicherzugriff",
          rationale: "Falsch! Hauptspeicherzugriff ist viel schneller als Festplattenzugriff.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche PostgreSQL-Befehle werden verwendet, um Ausführungspläne zu analysieren?",
      hint: "Überlege, welche Befehle für Performance-Analyse verwendet werden.",
      answerOptions: [
        {
          text: "SHOW PLAN und ANALYZE",
          rationale: "Falsch! Das sind nicht die korrekten PostgreSQL-Befehle.",
          isCorrect: false
        },
        {
          text: "EXPLAIN und EXPLAIN ANALYZE",
          rationale: "Richtig! EXPLAIN zeigt den geplanten Ausführungsplan, EXPLAIN ANALYZE führt die Anfrage aus und zeigt reale Ausführungszeiten.",
          isCorrect: true
        },
        {
          text: "DESCRIBE und SHOW",
          rationale: "Falsch! Diese Befehle zeigen Metadaten, nicht Ausführungspläne.",
          isCorrect: false
        },
        {
          text: "DEBUG und TRACE",
          rationale: "Falsch! Das sind nicht die Standard-PostgreSQL-Befehle für Ausführungspläne.",
          isCorrect: false
        }
      ]
    }
  ]
};
