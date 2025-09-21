import type { QuizData } from '../types';

export const rmQuizData: QuizData = {
  questions: [
    {
      question: "Welche der folgenden Relationen ist zulässig nach dem relationalen Modell?",
      hint: "Das relationale Modell basiert auf Mengen und erlaubt keine Duplikate.",
      answerOptions: [
        {
          text: "Eine Relation mit atomaren Werten und ohne Duplikate",
          rationale: "Richtig! Das relationale Modell erfordert atomare Werte und basiert auf Mengen, daher sind Duplikate nicht erlaubt.",
          isCorrect: true
        },
        {
          text: "Eine Relation mit Listen als Attributwerten",
          rationale: "Falsch! Alle Werte müssen atomar (unteilbar) sein. Listen verletzen diese Regel.",
          isCorrect: false
        },
        {
          text: "Eine Relation mit identischen Tupeln",
          rationale: "Falsch! Duplikate sind im relationalen Modell nicht erlaubt, da es auf Mengen basiert.",
          isCorrect: false
        },
        {
          text: "Eine Relation mit verschachtelten Relationen als Attributwerten",
          rationale: "Falsch! Attributwerte müssen atomar sein. Verschachtelte Relationen sind nicht erlaubt.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen einem Primärschlüssel und einem Fremdschlüssel?",
      hint: "Überlegen Sie, welche Funktionen diese Schlüssel in einer Datenbank haben.",
      answerOptions: [
        {
          text: "Primärschlüssel identifiziert Tupel eindeutig, Fremdschlüssel referenziert andere Relationen",
          rationale: "Richtig! Der Primärschlüssel identifiziert jedes Tupel in einer Relation eindeutig, während der Fremdschlüssel auf den Primärschlüssel einer anderen Relation verweist.",
          isCorrect: true
        },
        {
          text: "Fremdschlüssel identifiziert Tupel eindeutig, Primärschlüssel referenziert andere Relationen",
          rationale: "Falsch! Das ist genau umgekehrt.",
          isCorrect: false
        },
        {
          text: "Beide identifizieren Tupel eindeutig",
          rationale: "Falsch! Nur der Primärschlüssel identifiziert Tupel eindeutig. Fremdschlüssel referenzieren andere Relationen.",
          isCorrect: false
        },
        {
          text: "Es gibt keinen Unterschied zwischen Primär- und Fremdschlüsseln",
          rationale: "Falsch! Es gibt wichtige funktionale Unterschiede zwischen diesen Schlüsseltypen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Eigenschaft muss erfüllt sein, damit zwei Relationen vereinigungskompatibel sind?",
      hint: "Überlegen Sie, was nötig ist, um Mengenoperationen zwischen Relationen durchzuführen.",
      answerOptions: [
        {
          text: "Gleiche Anzahl Attribute mit gleichen Domänen in entsprechender Reihenfolge",
          rationale: "Richtig! Vereinigungskompatibilität erfordert, dass beide Relationen die gleiche Anzahl Attribute haben und entsprechende Attribute die gleichen Domänen haben.",
          isCorrect: true
        },
        {
          text: "Gleiche Anzahl Tupel",
          rationale: "Falsch! Die Anzahl der Tupel ist für Vereinigungskompatibilität irrelevant.",
          isCorrect: false
        },
        {
          text: "Gleiche Attributnamen",
          rationale: "Falsch! Attributnamen müssen nicht identisch sein, nur die Domänen müssen übereinstimmen.",
          isCorrect: false
        },
        {
          text: "Gleiche Primärschlüssel",
          rationale: "Falsch! Primärschlüssel sind für Vereinigungskompatibilität nicht relevant.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was repräsentiert ein NULL-Wert in einer Relation?",
      hint: "NULL-Werte haben eine spezielle Bedeutung im relationalen Modell.",
      answerOptions: [
        {
          text: "Unbekannte oder unanwendbare Werte",
          rationale: "Richtig! NULL-Werte repräsentieren fehlende, unbekannte oder für bestimmte Tupel unanwendbare Informationen.",
          isCorrect: true
        },
        {
          text: "Den Wert 0",
          rationale: "Falsch! NULL ist nicht dasselbe wie 0. NULL bedeutet 'kein Wert', während 0 ein spezifischer numerischer Wert ist.",
          isCorrect: false
        },
        {
          text: "Einen leeren String",
          rationale: "Falsch! NULL ist nicht dasselbe wie ein leerer String. NULL bedeutet 'kein Wert', während ein leerer String ein spezifischer String-Wert ist.",
          isCorrect: false
        },
        {
          text: "Einen Fehler in der Datenbank",
          rationale: "Falsch! NULL-Werte sind ein legitimer Teil des relationalen Modells und repräsentieren keine Fehler.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const erQuizData: QuizData = {
  questions: [
    {
      question: "Was ist ein Entitätstyp im ER-Modell?",
      hint: "Überlegen Sie, was Entitätstypen repräsentieren.",
      answerOptions: [
        {
          text: "Eine Klasse von Objekten mit gemeinsamen Eigenschaften",
          rationale: "Richtig! Entitätstypen repräsentieren Klassen von Objekten (z.B. 'Student', 'Kurs') mit gemeinsamen Eigenschaften.",
          isCorrect: true
        },
        {
          text: "Ein einzelnes Objekt der realen Welt",
          rationale: "Falsch! Das wäre eine Entität (Instanz), nicht ein Entitätstyp.",
          isCorrect: false
        },
        {
          text: "Eine Eigenschaft eines Objekts",
          rationale: "Falsch! Das wäre ein Attribut.",
          isCorrect: false
        },
        {
          text: "Eine Verbindung zwischen Objekten",
          rationale: "Falsch! Das wäre ein Beziehungstyp.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Kardinalität beschreibt eine 1:N Beziehung?",
      hint: "Überlegen Sie, was 1:N bedeutet.",
      answerOptions: [
        {
          text: "Ein Entitätstyp kann mit einem anderen Entitätstyp in einer Beziehung stehen, der andere kann mit vielen in Beziehung stehen",
          rationale: "Richtig! 1:N bedeutet, dass ein Entitätstyp (1) mit vielen Instanzen eines anderen Entitätstyps (N) in Beziehung stehen kann.",
          isCorrect: true
        },
        {
          text: "Beide Entitätstypen können mit vielen Instanzen des anderen in Beziehung stehen",
          rationale: "Falsch! Das wäre eine N:M Beziehung.",
          isCorrect: false
        },
        {
          text: "Jeder Entitätstyp kann nur mit einer Instanz des anderen in Beziehung stehen",
          rationale: "Falsch! Das wäre eine 1:1 Beziehung.",
          isCorrect: false
        },
        {
          text: "Ein Entitätstyp kann mit genau zwei Instanzen des anderen in Beziehung stehen",
          rationale: "Falsch! 1:N bedeutet nicht 1:2, sondern 1 zu beliebig vielen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welcher der folgenden Entitätstypen sollte als schwacher Entitätstyp modelliert werden?",
      hint: "Schwache Entitätstypen haben keinen eigenen Primärschlüssel und sind von einem starken Entitätstyp abhängig.",
      answerOptions: [
        {
          text: "Keiner - alle Entitätstypen haben eigene Primärschlüssel",
          rationale: "Richtig! Schwache Entitätstypen sind selten und haben keine eigene Identität. In den meisten Fällen haben alle Entitätstypen eigene Primärschlüssel.",
          isCorrect: true
        },
        {
          text: "Veranstaltung",
          rationale: "Veranstaltungen haben normalerweise eine eigene ID und sind unabhängig identifizierbar.",
          isCorrect: false
        },
        {
          text: "Ticket",
          rationale: "Tickets haben normalerweise eine eigene Ticket-ID und sind unabhängig identifizierbar.",
          isCorrect: false
        },
        {
          text: "Datum",
          rationale: "Datum ist ein Attribut, kein Entitätstyp.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Betrachten Sie eine M:N-Beziehung 'performt' zwischen 'Veranstaltung' und 'Künstler:in'. Wie viele Relationen sollten erstellt werden, um Redundanz zu minimieren?",
      hint: "M:N-Beziehungen werden durch eine Zwischentabelle aufgelöst.",
      answerOptions: [
        {
          text: "3 Relationen",
          rationale: "Richtig! Man braucht: 1) Veranstaltung-Tabelle, 2) Künstler-Tabelle, 3) performt-Zwischentabelle mit den Fremdschlüsseln beider Entitäten.",
          isCorrect: true
        },
        {
          text: "2 Relationen",
          rationale: "Das würde nur für 1:N Beziehungen funktionieren.",
          isCorrect: false
        },
        {
          text: "1 Relation",
          rationale: "Das würde zu massiver Redundanz führen.",
          isCorrect: false
        },
        {
          text: "4 Relationen",
          rationale: "Das wäre zu viele - man braucht nur die beiden Entitätstabellen plus die Zwischentabelle.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Identifizieren Sie die korrekten Werte für [min_x, max_x] und [min_y, max_y] für die Beziehung zwischen 'Veranstaltung' und 'Künstler:in', wenn ein Künstler bei einer oder mehreren Veranstaltungen auftritt und eine Veranstaltung von einem oder mehreren Künstlern bestritten wird.",
      hint: "Überlegen Sie: Kann eine Veranstaltung ohne Künstler existieren? Kann ein Künstler ohne Veranstaltung existieren?",
      answerOptions: [
        {
          text: "[1, *] und [1, *]",
          rationale: "Richtig! Eine Veranstaltung muss mindestens einen Künstler haben [1,*] und ein Künstler muss mindestens bei einer Veranstaltung auftreten [1,*].",
          isCorrect: true
        },
        {
          text: "[0, *] und [1, *]",
          rationale: "Das würde bedeuten, dass eine Veranstaltung ohne Künstler existieren kann, was der Beschreibung widerspricht.",
          isCorrect: false
        },
        {
          text: "[1, *] und [0, *]",
          rationale: "Das würde bedeuten, dass ein Künstler ohne Veranstaltung existieren kann, was der Beschreibung widerspricht.",
          isCorrect: false
        },
        {
          text: "[0, *] und [0, *]",
          rationale: "Das würde bedeuten, dass beide optional sind, was der Beschreibung widerspricht.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const raQuizData: QuizData = {
  questions: [
    {
      question: "Was ist das Ergebnis von π_Name(σ_Alter > 25(Student))?",
      hint: "Überlegen Sie, welche Operatoren in welcher Reihenfolge angewendet werden.",
      answerOptions: [
        {
          text: "Namen aller Studenten, die älter als 25 sind",
          rationale: "Richtig! Zuerst wird σ_Alter > 25 angewendet (Selektion), dann π_Name (Projektion).",
          isCorrect: true
        },
        {
          text: "Alle Attribute aller Studenten über 25",
          rationale: "Falsch! Die Projektion π_Name wählt nur das Name-Attribut aus.",
          isCorrect: false
        },
        {
          text: "Namen aller Studenten",
          rationale: "Falsch! Die Selektion σ_Alter > 25 filtert nur Studenten über 25.",
          isCorrect: false
        },
        {
          text: "Alter aller Studenten über 25",
          rationale: "Falsch! Die Projektion π_Name wählt das Name-Attribut aus, nicht das Alter.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welcher Operator wird verwendet, um zwei Relationen über gleichnamige Attribute zu verbinden?",
      hint: "Dieser Operator ist der häufigste Join-Typ in der relationalen Algebra.",
      answerOptions: [
        {
          text: "Natural Join (⋈)",
          rationale: "Richtig! Der Natural Join verbindet Relationen über gleichnamige Attribute automatisch.",
          isCorrect: true
        },
        {
          text: "Theta-Join (⨝_θ)",
          rationale: "Falsch! Theta-Join ist ein allgemeinerer Join mit beliebigem Prädikat.",
          isCorrect: false
        },
        {
          text: "Kreuzprodukt (×)",
          rationale: "Falsch! Das Kreuzprodukt bildet alle möglichen Kombinationen, ohne auf Attribute zu achten.",
          isCorrect: false
        },
        {
          text: "Vereinigung (∪)",
          rationale: "Falsch! Die Vereinigung kombiniert Tupel aus zwei Relationen, verbindet sie aber nicht.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen Left Outer Join (⟕) und Natural Join (⋈)?",
      hint: "Überlegen Sie, was mit Tupeln passiert, die keinen Join-Partner finden.",
      answerOptions: [
        {
          text: "Left Outer Join behält alle Tupel der linken Relation, Natural Join eliminiert partnerlose Tupel",
          rationale: "Richtig! Left Outer Join behält alle Tupel der linken Relation bei, Natural Join eliminiert Tupel ohne Partner.",
          isCorrect: true
        },
        {
          text: "Natural Join behält alle Tupel der linken Relation, Left Outer Join eliminiert partnerlose Tupel",
          rationale: "Falsch! Das ist genau umgekehrt.",
          isCorrect: false
        },
        {
          text: "Beide verhalten sich identisch",
          rationale: "Falsch! Es gibt wichtige Unterschiede im Umgang mit partnerlosen Tupeln.",
          isCorrect: false
        },
        {
          text: "Left Outer Join ist schneller als Natural Join",
          rationale: "Falsch! Die Geschwindigkeit ist nicht der Hauptunterschied zwischen diesen Join-Typen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was berechnet die Division R ÷ S?",
      hint: "Die Division findet Tupel, die mit ALLEN Tupeln einer anderen Relation kombiniert werden können.",
      answerOptions: [
        {
          text: "Tupel aus R, die mit ALLEN Tupeln aus S kombiniert werden können",
          rationale: "Richtig! R ÷ S findet Tupel aus R, die mit jedem einzelnen Tupel aus S kombiniert werden können.",
          isCorrect: true
        },
        {
          text: "Tupel aus R, die mit MINDESTENS einem Tupel aus S kombiniert werden können",
          rationale: "Falsch! Das wäre ein Semi-Join, nicht eine Division.",
          isCorrect: false
        },
        {
          text: "Tupel aus R, die mit KEINEM Tupel aus S kombiniert werden können",
          rationale: "Falsch! Das wäre die Differenz, nicht die Division.",
          isCorrect: false
        },
        {
          text: "Alle Tupel aus R und S",
          rationale: "Falsch! Das wäre die Vereinigung, nicht die Division.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Aggregatfunktionen können mit dem γ-Operator verwendet werden?",
      hint: "Der γ-Operator gruppiert Tupel und wendet Aggregatfunktionen auf die Gruppen an.",
      answerOptions: [
        {
          text: "COUNT, SUM, AVG, MIN, MAX",
          rationale: "Richtig! Diese sind die typischen Aggregatfunktionen in der relationalen Algebra.",
          isCorrect: true
        },
        {
          text: "Nur COUNT",
          rationale: "Falsch! Es gibt mehrere Aggregatfunktionen.",
          isCorrect: false
        },
        {
          text: "Nur SUM und AVG",
          rationale: "Falsch! Es gibt mehr Aggregatfunktionen als nur diese beiden.",
          isCorrect: false
        },
        {
          text: "Nur MIN und MAX",
          rationale: "Falsch! Es gibt mehr Aggregatfunktionen als nur diese beiden.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen Semi-Join (⋉) und Natural Join (⋈)?",
      hint: "Überlegen Sie, welche Attribute im Ergebnis enthalten sind.",
      answerOptions: [
        {
          text: "Semi-Join behält nur Attribute der linken Relation, Natural Join behält alle Attribute",
          rationale: "Richtig! L ⋉ R = π_L(L ⨝ R) behält nur Attribute von L, während Natural Join alle Attribute behält.",
          isCorrect: true
        },
        {
          text: "Natural Join behält nur Attribute der linken Relation, Semi-Join behält alle Attribute",
          rationale: "Falsch! Das ist genau umgekehrt.",
          isCorrect: false
        },
        {
          text: "Beide behalten alle Attribute",
          rationale: "Falsch! Semi-Join behält nur Attribute der linken Relation.",
          isCorrect: false
        },
        {
          text: "Beide behalten nur Attribute der linken Relation",
          rationale: "Falsch! Natural Join behält alle Attribute beider Relationen.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const normQuizData: QuizData = {
  questions: [
    {
      question: "Eine Relation R(A, B, C) mit dem Schlüssel {A, B} hat die FD: A → C. Welche Normalform ist verletzt?",
      hint: "Ein Nicht-Schlüsselattribut hängt von einem Teil des Schlüssels ab.",
      answerOptions: [
        {
          text: "Zweite Normalform (2NF)",
          rationale: "C ist ein Nicht-Schlüsselattribut und hängt von A ab, was nur ein Teil des zusammengesetzten Primärschlüssels {A, B} ist. Dies ist eine partielle Abhängigkeit.",
          isCorrect: true
        },
        {
          text: "Erste Normalform (1NF)",
          rationale: "Die 1NF befasst sich nur mit der Atomarität der Attributwerte, nicht mit funktionalen Abhängigkeiten.",
          isCorrect: false
        },
        {
          text: "Dritte Normalform (3NF)",
          rationale: "Die 3NF wird erst verletzt, wenn ein Nicht-Schlüsselattribut von einem anderen Nicht-Schlüsselattribut abhängt (transitive Abhängigkeit).",
          isCorrect: false
        },
        {
          text: "Boyce-Codd-Normalform (BCNF)",
          rationale: "Da die 2NF verletzt ist, ist automatisch auch die BCNF verletzt, aber 2NF ist die spezifischste und erste verletzte Normalform in diesem Fall.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist eine transitive Abhängigkeit, die durch die 3NF verhindert wird?",
      hint: "Es ist eine Art 'Kettenreaktion' zwischen Attributen.",
      answerOptions: [
        {
          text: "Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut ab.",
          rationale: "Wenn A → B und B → C gilt (wobei A der Schlüssel ist), dann hängt C transitiv von A über B ab.",
          isCorrect: true
        },
        {
          text: "Ein Schlüsselattribut hängt von einem Nicht-Schlüsselattribut ab.",
          rationale: "Dies würde die Definition eines Schlüssels verletzen, ist aber nicht die Definition einer transitiven Abhängigkeit.",
          isCorrect: false
        },
        {
          text: "Ein Attribut hängt von sich selbst ab.",
          rationale: "Dies ist eine triviale Abhängigkeit und für die Normalisierung nicht relevant.",
          isCorrect: false
        },
        {
          text: "Ein zusammengesetzter Schlüssel existiert.",
          rationale: "Die Existenz eines zusammengesetzten Schlüssels allein ist kein Problem, führt aber zur Notwendigkeit, die 2NF zu prüfen.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const physQuizData: QuizData = {
  questions: [
    {
      question: "Was ist der Hauptvorteil eines B+-Baum-Index gegenüber einem einfachen sequenziellen (sortierten) File?",
      hint: "Denke an das Hinzufügen und Entfernen von Daten.",
      answerOptions: [
        {
          text: "Einfüge- und Löschoperationen sind effizienter, ohne die gesamte Datei neu organisieren zu müssen.",
          rationale: "B+-Bäume sind dynamische Strukturen, die sich durch das Aufteilen oder Zusammenführen von Knoten anpassen, was lokalisierte Änderungen ermöglicht.",
          isCorrect: true
        },
        {
          text: "B+-Bäume benötigen weniger Speicherplatz.",
          rationale: "B+-Bäume benötigen zusätzlichen Speicherplatz für die Baumstruktur selbst.",
          isCorrect: false
        },
        {
          text: "Exakte Suchen (Point Queries) sind immer schneller.",
          rationale: "Für eine sortierte Datei kann eine binäre Suche sehr schnell sein; der Hauptvorteil des B+-Baums liegt in der Effizienz von Updates.",
          isCorrect: false
        },
        {
          text: "Ein B+-Baum kann nur auf dem Primärschlüssel erstellt werden.",
          rationale: "B+-Bäume können auf jeder Spalte (oder mehreren Spalten) erstellt werden, um Abfragen zu beschleunigen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Art von Abfrage profitiert NICHT von einem Hash-Index?",
      hint: "Hashing ist gut darin, eine Nadel im Heuhaufen zu finden, aber nicht, einen Teil des Heuhaufens zu durchsuchen.",
      answerOptions: [
        {
          text: "Bereichsabfragen (z.B. `WHERE gehalt BETWEEN 50000 AND 60000`)",
          rationale: "Eine Hashfunktion zerstört die natürliche Ordnung der Daten, daher können Bereiche nicht effizient durchsucht werden.",
          isCorrect: true
        },
        {
          text: "Exakte Suche nach einem Schlüsselwert (z.B. `WHERE id = 12345`)",
          rationale: "Dies ist die Stärke von Hash-Indizes, da die Position des Datensatzes direkt berechnet werden kann.",
          isCorrect: false
        },
        {
          text: "Join-Operationen auf dem Hash-Schlüssel.",
          rationale: "Hashing kann Joins beschleunigen, wenn die Join-Bedingung auf Gleichheit des Hash-Schlüssels prüft.",
          isCorrect: false
        },
        {
          text: "Suchen nach einem bestimmten Namen (z.B. `WHERE name = 'Meier'`)",
          rationale: "Wenn ein Hash-Index auf der Spalte 'name' existiert, ist dies eine exakte Suche und daher sehr effizient.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen einem Clustering-Index (Primärindex) und einem Non-Clustering-Index (Sekundärindex)?",
      hint: "Es geht darum, ob der Index die physische Reihenfolge der Daten in der Tabelle bestimmt.",
      answerOptions: [
        {
          text: "Ein Clustering-Index sortiert die Datenzeilen in der Tabelle physisch entsprechend der Reihenfolge des Index.",
          rationale: "Dadurch kann es nur einen Clustering-Index pro Tabelle geben. Ein Non-Clustering-Index hat eine von den Daten getrennte Struktur.",
          isCorrect: true
        },
        {
          text: "Ein Clustering-Index ist immer ein Hash-Index.",
          rationale: "Ein Clustering-Index bezieht sich auf die physische Datensortierung und ist meist ein B+-Baum, nicht zwingend ein Hash-Index.",
          isCorrect: false
        },
        {
          text: "Ein Non-Clustering-Index kann nur auf Nicht-Schlüssel-Attributen erstellt werden.",
          rationale: "Sekundärindizes können auf beliebigen Spalten erstellt werden, um verschiedene Arten von Abfragen zu unterstützen.",
          isCorrect: false
        },
        {
          text: "Clustering-Indexe sind immer 'sparse' und Non-Clustering-Indexe sind immer 'dense'.",
          rationale: "Während Clustering-Indexe oft sparse sind, müssen Non-Clustering-Indexe dense sein, da sie auf jeden einzelnen Datensatz verweisen müssen.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const transQuizData: QuizData = {
  questions: [
    {
      question: "Gegeben sei der Schedule: r₁(x) → r₂(y) → w₂(y) → r₃(x) → r₁(x) → r₃(y) → w₃(y) → r₄(z) → r₃(y) → w₂(x) → w₁(x) → c₁ → c₂. Welche der folgenden gerichteten Kanten sind Teil des Conflict Graphs?",
      hint: "Konflikte entstehen zwischen Operationen verschiedener Transaktionen auf demselben Objekt, wenn mindestens eine ein Schreibzugriff ist.",
      answerOptions: [
        {
          text: "(T1, T2) und (T2, T3)",
          rationale: "Richtig! T1 und T2 konflikten bei x (r₁(x) und w₂(x)), T2 und T3 konflikten bei y (w₂(y) und w₃(y)).",
          isCorrect: true
        },
        {
          text: "(T1, T3) und (T3, T4)",
          rationale: "T1 und T3 haben keinen direkten Konflikt, T3 und T4 arbeiten an verschiedenen Objekten (y und z).",
          isCorrect: false
        },
        {
          text: "(T2, T4) und (T4, T1)",
          rationale: "T2 und T4 arbeiten an verschiedenen Objekten (y,x und z), T4 und T1 haben keinen Konflikt.",
          isCorrect: false
        },
        {
          text: "Keine der Kanten",
          rationale: "Es gibt definitiv Konflikte in diesem Schedule.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche der folgenden Conflict Graphs repräsentieren serialisierbare Schedules?",
      hint: "Ein Schedule ist serialisierbar, wenn sein Conflict Graph azyklisch ist.",
      answerOptions: [
        {
          text: "Azyklische Graphen",
          rationale: "Richtig! Nur azyklische Conflict Graphs repräsentieren serialisierbare Schedules, da sie eine topologische Sortierung erlauben.",
          isCorrect: true
        },
        {
          text: "Zyklen mit gerader Länge",
          rationale: "Falsch! Jeder Zyklus macht einen Schedule nicht-serialisierbar, unabhängig von der Länge.",
          isCorrect: false
        },
        {
          text: "Graphen mit mehr als 3 Knoten",
          rationale: "Falsch! Die Anzahl der Knoten ist irrelevant für die Serialisierbarkeit.",
          isCorrect: false
        },
        {
          text: "Graphen mit ungerader Anzahl von Kanten",
          rationale: "Falsch! Die Anzahl der Kanten ist irrelevant für die Serialisierbarkeit.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was passiert bei einem Deadlock in einem 2PL-System?",
      hint: "Deadlocks entstehen, wenn Transaktionen zirkulär auf Sperren warten.",
      answerOptions: [
        {
          text: "Eine der Transaktionen wird abgebrochen und zurückgesetzt",
          rationale: "Richtig! Bei einem Deadlock wird eine der beteiligten Transaktionen abgebrochen, um den Deadlock aufzulösen.",
          isCorrect: true
        },
        {
          text: "Alle Transaktionen werden automatisch committet",
          rationale: "Falsch! Das würde Inkonsistenzen verursachen.",
          isCorrect: false
        },
        {
          text: "Das System wartet unendlich lange",
          rationale: "Falsch! Moderne DBMS erkennen und lösen Deadlocks automatisch.",
          isCorrect: false
        },
        {
          text: "Die Sperren werden automatisch freigegeben",
          rationale: "Falsch! Das würde die ACID-Eigenschaften verletzen.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const raPraxisQuizData: QuizData = {
  questions: [
    {
      question: "Gegeben: Student(studID, Name, Semester), Belegt(studID, courseID), Kurs(courseID, Titel, ECTS). Welche Anfrage findet alle Studenten, die Kurse mit mehr als 5 ECTS belegen?",
      hint: "Sie müssen Studenten mit Kursen über Belegt verbinden und dann nach ECTS filtern.",
      answerOptions: [
        {
          text: "π_Name(Student ⋈ Belegt ⋈ σ_ECTS > 5(Kurs))",
          rationale: "Richtig! Zuerst werden Kurse mit ECTS > 5 gefiltert, dann mit Belegt und Student gejoint, und schließlich die Namen projiziert.",
          isCorrect: true
        },
        {
          text: "π_Name(σ_ECTS > 5(Student ⋈ Belegt ⋈ Kurs))",
          rationale: "Falsch! Die Selektion muss vor dem Join angewendet werden, um nur relevante Kurse zu betrachten.",
          isCorrect: false
        },
        {
          text: "π_Name(Student ⋈ σ_ECTS > 5(Belegt ⋈ Kurs))",
          rationale: "Falsch! Die Selektion muss auf die Kurs-Relation angewendet werden, nicht auf das Ergebnis von Belegt ⋈ Kurs.",
          isCorrect: false
        },
        {
          text: "σ_ECTS > 5(π_Name(Student ⋈ Belegt ⋈ Kurs))",
          rationale: "Falsch! Die Projektion auf Name entfernt das ECTS-Attribut, wodurch die Selektion unmöglich wird.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Anfrage findet Studenten, die ALLE Kurse mit 6 ECTS belegen?",
      hint: "Das ist ein typischer Fall für die Division. Sie müssen Studenten finden, die mit ALLEN 6-ECTS-Kursen kombiniert werden können.",
      answerOptions: [
        {
          text: "π_studID,Name(Student ⋈ (Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))))",
          rationale: "Richtig! Die Division findet Studenten, die mit ALLEN 6-ECTS-Kursen kombiniert werden können.",
          isCorrect: true
        },
        {
          text: "π_studID,Name(Student ⋈ σ_ECTS = 6(Belegt ⋈ Kurs))",
          rationale: "Falsch! Das findet Studenten, die MINDESTENS einen 6-ECTS-Kurs belegen, nicht ALLE.",
          isCorrect: false
        },
        {
          text: "π_studID,Name(σ_ECTS = 6(Student ⋈ Belegt ⋈ Kurs))",
          rationale: "Falsch! Das ist syntaktisch falsch, da Student kein ECTS-Attribut hat.",
          isCorrect: false
        },
        {
          text: "Belegt ÷ π_courseID(σ_ECTS = 6(Kurs))",
          rationale: "Falsch! Das gibt nur die studIDs zurück, nicht die Namen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Wie findet man die Anzahl der belegten Kurse pro Student?",
      hint: "Sie müssen gruppieren und zählen. Welcher Operator ist dafür zuständig?",
      answerOptions: [
        {
          text: "γ_studID; COUNT(courseID)(Belegt)",
          rationale: "Richtig! Der γ-Operator gruppiert nach studID und zählt die courseIDs pro Gruppe.",
          isCorrect: true
        },
        {
          text: "π_studID, COUNT(courseID)(Belegt)",
          rationale: "Falsch! π ist für Projektion, nicht für Gruppierung und Aggregation.",
          isCorrect: false
        },
        {
          text: "σ_COUNT(courseID)(Belegt)",
          rationale: "Falsch! σ ist für Selektion, nicht für Gruppierung und Aggregation.",
          isCorrect: false
        },
        {
          text: "Belegt ÷ courseID",
          rationale: "Falsch! Das ist eine Division, keine Gruppierung.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const raPruefungQuizData: QuizData = {
  questions: [
    {
      question: "Gegeben: R(A,B,C) und S(B,C,D) mit R = {(1,2,3), (4,5,6)} und S = {(2,3,7), (5,6,8)}. Was ist das Ergebnis von R ⋈ S?",
      hint: "Natural Join verbindet über gleichnamige Attribute. Hier sind das B und C.",
      answerOptions: [
        {
          text: "{(1,2,3,7), (4,5,6,8)}",
          rationale: "Richtig! (1,2,3) aus R passt zu (2,3,7) aus S über B=2 und C=3. (4,5,6) aus R passt zu (5,6,8) aus S über B=5 und C=6.",
          isCorrect: true
        },
        {
          text: "{(1,2,3), (4,5,6), (2,3,7), (5,6,8)}",
          rationale: "Falsch! Das wäre eine Vereinigung, kein Join.",
          isCorrect: false
        },
        {
          text: "{(1,2,3,2,3,7), (4,5,6,5,6,8)}",
          rationale: "Falsch! Das wäre ein Kreuzprodukt, kein Natural Join.",
          isCorrect: false
        },
        {
          text: "{}",
          rationale: "Falsch! Es gibt passende Tupel für den Join.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche der folgenden Aussagen über die relationale Division ist korrekt?",
      hint: "Die Division R ÷ S findet Tupel aus R, die mit ALLEN Tupeln aus S kombiniert werden können.",
      answerOptions: [
        {
          text: "R ÷ S = π_R-S(R) - π_R-S((π_R-S(R) × S) - R)",
          rationale: "Richtig! Das ist die formale Definition der relationalen Division.",
          isCorrect: true
        },
        {
          text: "R ÷ S = R - S",
          rationale: "Falsch! Das wäre die Differenz, nicht die Division.",
          isCorrect: false
        },
        {
          text: "R ÷ S = π_R-S(R × S)",
          rationale: "Falsch! Das wäre eine Projektion des Kreuzprodukts, nicht die Division.",
          isCorrect: false
        },
        {
          text: "R ÷ S = R ∩ S",
          rationale: "Falsch! Das wäre der Schnitt, nicht die Division.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Gegeben: Student(studID, Name, Semester), Prüfung(studID, courseID, Note). Welche Anfrage findet Studenten, die in mindestens einem Kurs eine Note besser als 2.0 haben?",
      hint: "Sie müssen Studenten mit Prüfungen verbinden und nach der Note filtern.",
      answerOptions: [
        {
          text: "π_studID,Name(Student ⋈ σ_Note < 2.0(Prüfung))",
          rationale: "Richtig! Zuerst werden Prüfungen mit Note < 2.0 gefiltert, dann mit Student gejoint und die Namen projiziert.",
          isCorrect: true
        },
        {
          text: "π_studID,Name(σ_Note < 2.0(Student ⋈ Prüfung))",
          rationale: "Falsch! Die Selektion muss vor dem Join angewendet werden, da Student kein Note-Attribut hat.",
          isCorrect: false
        },
        {
          text: "σ_Note < 2.0(π_studID,Name(Student ⋈ Prüfung))",
          rationale: "Falsch! Die Projektion entfernt das Note-Attribut, wodurch die Selektion unmöglich wird.",
          isCorrect: false
        },
        {
          text: "Student ⋈ σ_Note < 2.0(Prüfung)",
          rationale: "Falsch! Das Ergebnis enthält alle Attribute, nicht nur studID und Name.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen einem Semi-Join L ⋉ R und einem Natural Join L ⋈ R?",
      hint: "Überlegen Sie, welche Attribute im Ergebnis enthalten sind.",
      answerOptions: [
        {
          text: "Semi-Join behält nur Attribute von L, Natural Join behält alle Attribute",
          rationale: "Richtig! L ⋉ R = π_L(L ⋈ R) behält nur Attribute der linken Relation, während L ⋈ R alle Attribute behält.",
          isCorrect: true
        },
        {
          text: "Natural Join behält nur Attribute von L, Semi-Join behält alle Attribute",
          rationale: "Falsch! Das ist genau umgekehrt.",
          isCorrect: false
        },
        {
          text: "Beide behalten alle Attribute",
          rationale: "Falsch! Semi-Join behält nur Attribute der linken Relation.",
          isCorrect: false
        },
        {
          text: "Beide behalten nur Attribute von L",
          rationale: "Falsch! Natural Join behält alle Attribute beider Relationen.",
          isCorrect: false
        }
      ]
    }
  ]
};

export const sqlQuizData: QuizData = {
  questions: [
    {
      question: "Welche SQL-Klausel wird verwendet, um Zeilen nach der Gruppierung zu filtern?",
      hint: "WHERE filtert vor der Gruppierung, eine andere Klausel filtert nach der Gruppierung.",
      answerOptions: [
        {
          text: "HAVING",
          rationale: "Richtig! HAVING filtert Gruppen nach der Gruppierung, während WHERE Zeilen vor der Gruppierung filtert.",
          isCorrect: true
        },
        {
          text: "WHERE",
          rationale: "Falsch! WHERE filtert Zeilen vor der Gruppierung, nicht Gruppen nach der Gruppierung.",
          isCorrect: false
        },
        {
          text: "GROUP BY",
          rationale: "Falsch! GROUP BY gruppiert die Daten, filtert aber nicht.",
          isCorrect: false
        },
        {
          text: "ORDER BY",
          rationale: "Falsch! ORDER BY sortiert die Ergebnisse, filtert aber nicht.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Was ist der Unterschied zwischen INNER JOIN und LEFT JOIN?",
      hint: "Überlegen Sie, welche Zeilen in den Ergebnissen enthalten sind.",
      answerOptions: [
        {
          text: "INNER JOIN zeigt nur übereinstimmende Zeilen, LEFT JOIN zeigt alle Zeilen aus der linken Tabelle",
          rationale: "Richtig! INNER JOIN gibt nur Zeilen zurück, die in beiden Tabellen übereinstimmen. LEFT JOIN gibt alle Zeilen aus der linken Tabelle zurück, auch wenn keine Übereinstimmung in der rechten Tabelle existiert.",
          isCorrect: true
        },
        {
          text: "INNER JOIN ist schneller als LEFT JOIN",
          rationale: "Falsch! Die Geschwindigkeit ist nicht der Hauptunterschied zwischen diesen JOIN-Typen.",
          isCorrect: false
        },
        {
          text: "LEFT JOIN zeigt nur übereinstimmende Zeilen, INNER JOIN zeigt alle Zeilen",
          rationale: "Falsch! Das ist genau umgekehrt.",
          isCorrect: false
        },
        {
          text: "Es gibt keinen Unterschied zwischen INNER JOIN und LEFT JOIN",
          rationale: "Falsch! Es gibt wichtige funktionale Unterschiede zwischen diesen JOIN-Typen.",
          isCorrect: false
        }
      ]
    },
    {
      question: "Welche Aggregationsfunktion zählt die Anzahl der Zeilen in einer Gruppe?",
      hint: "Diese Funktion zählt alle Zeilen, unabhängig von NULL-Werten.",
      answerOptions: [
        {
          text: "COUNT(*)",
          rationale: "Richtig! COUNT(*) zählt alle Zeilen in einer Gruppe, einschließlich Zeilen mit NULL-Werten.",
          isCorrect: true
        },
        {
          text: "SUM(*)",
          rationale: "Falsch! SUM() summiert Werte, kann aber nicht mit * verwendet werden.",
          isCorrect: false
        },
        {
          text: "AVG(*)",
          rationale: "Falsch! AVG() berechnet Durchschnittswerte, kann aber nicht mit * verwendet werden.",
          isCorrect: false
        },
        {
          text: "MAX(*)",
          rationale: "Falsch! MAX() findet den Maximalwert, kann aber nicht mit * verwendet werden.",
          isCorrect: false
        }
      ]
    }
  ]
};
