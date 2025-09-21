Absolut\! Hier ist der gesamte Inhalt der PDF-Datei in einem maschinenlesbaren Markdown-Format.

-----

# DBS - Entwurfstheorie

**Katja Hose**
Institut für Logic and Computation
184.686 VU Datenbanksysteme
Sommersemester 2025

-----

## Lernziele

  * Funktionale Abhängigkeiten und Normalformen verstehen
  * Die Güte eines Entwurfs mit Hilfe von Normalformen beschreiben
  * Einen Datenbankentwurf mit Hilfe von Zerlegung verbessern

### Motivation

  * Ein guter Entwurf verhindert Probleme, die während der späteren Verwendung auftreten.
  * Datenbankschemata lassen sich viel leichter verändern, bevor sie in Verwendung sind.
  * Redundanz ist die Quelle vieler Probleme und sollte durch bestimmte Entwurfskriterien vermieden werden.

-----

## Gliederung

1.  **Einführung**
      * Anomalien
      * Gute und schlechte Zerlegungen
2.  **Funktionale Abhängigkeiten**
      * Definition
      * Schlüssel
      * Ableitung funktionaler Abhängigkeiten
      * Berechnung der Attributhülle
      * Kanonische Überdeckung (minimale Überdeckung)
3.  **Normalisieren durch Zerlegung der Relationen**
      * Verlustlose Zerlegung
      * Abhängigkeitsbewahrung
4.  **Normalformen**
      * Erste Normalform
      * Zweite Normalform
      * Dritte Normalform
      * Boyce-Codd-Normalform

-----

## 1\. Einführung

### Anomalien

Ein schlechtes Datenbankschema kann zu verschiedenen Problemen führen, die als Anomalien bezeichnet werden. Betrachten wir die folgende Tabelle `courseOffers`:

| empID | teacher | rank | office | courseID | title | ects |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2125 | Socrates | C4 | 5041 | 226 | Robotics | 4 |
| 2125 | Socrates | C4 | 5049 | 226 | Ethics | 2 |
| 2125 | Socrates | C4 | 4052 | 226 | Logic | 4 |
| 2133 | Curie | C3 | 5259 | 52 | Chemistry | 2 |
| 2137 | Curie | C4 | 4630 | 7 | Physics | 4 |

**Hauptquellen für Probleme:**

  * **Redundanz:** Informationen werden mehrfach gespeichert (z.B. die Daten von Sokrates). Dies führt zu Speicherplatzverschwendung.
  * **Unvollständige Informationen:** Es ist nicht möglich, Professoren ohne Lehrveranstaltungen oder Lehrveranstaltungen ohne Professoren zu speichern.

**Arten von Anomalien:**

  * **Änderungsanomalien:** Wenn Sokrates umzieht, müssen alle Tupel, die ihn betreffen, geändert werden. Wenn dies nicht konsistent geschieht, entstehen Dateninkonsistenzen.
  * **Einfügeanomalien:** Ein neuer Professor kann nicht ohne eine zugehörige Lehrveranstaltung eingefügt werden, es sei denn, man verwendet Null-Werte, was vermieden werden sollte.
  * **Löschanomalien:** Wenn die letzte Lehrveranstaltung eines Professors gelöscht wird, gehen alle Informationen über diesen Professor ebenfalls verloren.

**Ziel eines Datenbankentwurfs:**

Das Ziel ist die Vermeidung von Redundanzen, Null-Werten und Anomalien, während alle Beziehungen zwischen Attributen abgebildet werden. Die Strategie besteht darin, alle gegebenen funktionalen Abhängigkeiten in Schlüsselabhängigkeiten zu transformieren, ohne semantische Informationen zu verlieren.

### Gute und schlechte Zerlegungen

Die Lösung für diese Probleme ist die Zerlegung der großen Tabelle in kleinere, gut strukturierte Tabellen.

#### Eine gute Zerlegung

Zerlege `courseOffers` in `course` und `instructor`.

**course**
| courseID | title | ects | empID |
| :--- | :--- | :--- | :--- |
| 5041 | Robotics | 4 | 2125 |
| 5049 | Ethics | 2 | 2125 |
| 4052 | Logic | 4 | 2125 |
| 5259 | Chemistry | 2 | 2133 |
| 4630 | Physics | 4 | 2137 |

**instructor**
| empID | teacher | rank | office |
| :--- | :--- | :--- | :--- |
| 2125 | Socrates | C4 | 226 |
| 2133 | Curie | C4 | 36 |
| 2137 | Curie | C4 | 7 |

Diese Zerlegung ist **verlustfrei**, d.h., die ursprüngliche Tabelle kann durch einen Join der neuen Tabellen exakt rekonstruiert werden (`courseOffers = instructor ⨝ course`).

#### Eine schlechte Zerlegung

Eine falsche Zerlegung kann zu Informationsverlust oder zur Generierung falscher Daten führen.

**course**
| courseID | title | ects | teacher |
| :--- | :--- | :--- | :--- |
| 5041 | Robotics | 4 | Socrates |
| 5049 | Ethics | 2 | Socrates |
| 4052 | Logic | 4 | Socrates |
| 5259 | Chemistry | 2 | Curie |
| 4630 | Physics | 4 | Curie |

**instructor**
| empID | teacher | rank | office |
| :--- | :--- | :--- | :--- |
| 2125 | Socrates | C4 | 226 |
| 2133 | Curie | C4 | 36 |
| 2137 | Curie | C4 | 7 |

Wenn man diese beiden Tabellen über `teacher` joint, entstehen falsche Tupel, die in der ursprünglichen Relation nicht vorhanden waren. Dies ist eine **verlustbehaftete** Zerlegung.

-----

## 2\. Funktionale Abhängigkeiten (FDs)

### Definition

Eine funktionale Abhängigkeit $\\alpha \\rightarrow \\beta$ zwischen zwei Attributmengen $\\alpha$ und $\\beta$ liegt vor, wenn für alle Tupel einer Relation gilt: Haben zwei Tupel in den Attributen von $\\alpha$ die gleichen Werte, so müssen sie auch in den Attributen von $\\beta$ die gleichen Werte haben.

  * Die $ \\alpha $-Werte **bestimmen** die $ \\beta $-Werte eindeutig.
  * **Triviale FD:** Eine FD $\\alpha \\rightarrow \\beta$ ist trivial, wenn $\\beta \\subseteq \\alpha$.
  * FDs sind semantische Konsistenzbedingungen, die sich aus der Anwendungslogik ergeben und in jedem Zustand der Datenbank gelten müssen.

**Beispiele:**

  * `{Postleitzahl} → {Stadt}`
  * `{Sozialversicherungsnummer} → {Vorname, Nachname}`

### Schlüssel

  * **Superschlüssel:** Eine Attributmenge $\\alpha$ ist ein Superschlüssel, wenn sie alle anderen Attribute der Relation bestimmt ($\\alpha \\rightarrow R$).
  * **Volle funktionale Abhängigkeit:** $\\beta$ ist voll funktional abhängig von $ \\alpha $, wenn $\\alpha \\rightarrow \\beta$ gilt und keine Teilmenge von $\\alpha$ ebenfalls $\\beta$ bestimmt.
  * **Kandidatenschlüssel:** Ein minimaler Superschlüssel. Das heißt, keine echte Teilmenge des Kandidatenschlüssels ist ebenfalls ein Superschlüssel.
  * **Primärschlüssel:** Ein ausgewählter Kandidatenschlüssel.

### Ableitung funktionaler Abhängigkeiten

Aus einer gegebenen Menge von FDs $ F $können weitere FDs logisch abgeleitet werden. Die Menge aller ableitbaren FDs wird als Hülle (Closure)$ F^+ $ bezeichnet.

#### Die Armstrong-Axiome

Die Armstrong-Axiome sind ein korrekter und vollständiger Satz von Regeln, um $F^+$ zu berechnen:

1.  **Reflexivität:** Wenn $ \\beta \\subseteq \\alpha $, dann gilt $\\alpha \\rightarrow \\beta$.
2.  **Erweiterung/Verstärkung:** Wenn $ \\alpha \\rightarrow \\beta $, dann gilt $\\alpha\\gamma \\rightarrow \\beta\\gamma$.
3.  **Transitivität:** Wenn $\\alpha \\rightarrow \\beta$ und $ \\beta \\rightarrow \\gamma $, dann gilt $\\alpha \\rightarrow \\gamma$.

#### Weitere Ableitungsregeln

  * **Vereinigung:** Wenn $\\alpha \\rightarrow \\beta$ und $ \\alpha \\rightarrow \\gamma $, dann gilt $\\alpha \\rightarrow \\beta\\gamma$.
  * **Dekomposition:** Wenn $ \\alpha \\rightarrow \\beta\\gamma $, dann gilt $\\alpha \\rightarrow \\beta$ und $\\alpha \\rightarrow \\gamma$.
  * **Pseudotransitivität:** Wenn $\\alpha \\rightarrow \\beta$ und $ \\gamma\\beta \\rightarrow \\delta $, dann gilt $\\alpha\\gamma \\rightarrow \\delta$.

### Berechnung der Attributhülle

Die Attributhülle $\\alpha^+$ einer Attributmenge $\\alpha$ ist die Menge aller Attribute, die von $\\alpha$ funktional bestimmt werden. Man kann sie mit folgendem Algorithmus berechnen:

```
Algorithmus attrClosure(F, α):
  result = α
  repeat
    for each β → γ in F do
      if β ⊆ result then
        result = result ∪ γ
      end if
    end for
  until result changes no more
```

**Anwendungen:**

  * **Testen einer FD:** Um zu testen, ob $\\alpha \\rightarrow \\beta$ gilt, berechnet man $\\alpha^+$ und prüft, ob $\\beta \\subseteq \\alpha^+$.
  * **Testen auf Superschlüssel:** Um zu testen, ob $\\kappa$ ein Superschlüssel ist, berechnet man $\\kappa^+$ und prüft, ob $\\kappa^+$ alle Attribute der Relation $R$ enthält.

### Kanonische Überdeckung (Minimale Überdeckung)

Da die Hülle $F^+$ sehr groß sein kann, sucht man nach einer kleinstmöglichen, äquivalenten Menge von FDs, der sogenannten kanonischen oder minimalen Überdeckung $F\_c$.

**Eigenschaften von $ F\_c $:**

1.  **Äquivalenz:** $F\_c^+ = F^+$.
2.  **Keine überflüssigen Attribute:** Weder auf der linken noch auf der rechten Seite einer FD gibt es redundante Attribute.
3.  **Einzigartige linke Seiten:** Jede linke Seite einer FD in $F\_c$ ist einzigartig (erreicht durch die Vereinigungsregel).

-----

## 3\. Normalisieren durch Zerlegung der Relationen

Die Normalisierung verbessert ein Schema durch Zerlegung in mehrere kleinere Schemata, um Redundanzen und Anomalien zu beseitigen.

### Verlustlose Zerlegung (Lossless Decomposition)

Eine Zerlegung ist die wichtigste Eigenschaft einer guten Zerlegung.

  * **Gültigkeit:** Alle Attribute des ursprünglichen Schemas müssen in der Zerlegung vorkommen.
  * **Verlustfreiheit:** Die ursprüngliche Relation muss durch einen natürlichen Join der zerlegten Relationen exakt rekonstruierbar sein ($R = R\_1 \\Join R\_2$).

Eine Zerlegung von $R$ in $R\_1$ und $R\_2$ ist verlustfrei, wenn die gemeinsamen Attribute ($R\_1 \\cap R\_2$) einen Superschlüssel für mindestens eine der beiden Relationen bilden:

  * $(R\_1 \\cap R\_2) \\rightarrow R\_1$ oder
  * $(R\_1 \\cap R\_2) \\rightarrow R\_2$

### Abhängigkeitsbewahrung (Dependency Preservation)

Das zweite Kriterium für eine gute Zerlegung ist, dass alle ursprünglichen funktionalen Abhängigkeiten auch nach der Zerlegung noch effizient überprüft werden können, ohne die Tabellen wieder joinen zu müssen.

Eine Zerlegung bewahrt die Abhängigkeiten, wenn die Vereinigung der Hüllen der FDs der einzelnen neuen Relationen äquivalent zur Hülle der ursprünglichen FDs ist: $F^+ = (F\_{R\_1} \\cup F\_{R\_2} \\cup \\dots)^+$.

-----

## 4\. Normalformen

Normalformen sind Regeln für Relationenschemata, die bestimmte Arten von problematischen FDs verbieten.

### Erste Normalform (1NF)

> Eine Relation ist in 1NF, wenn alle ihre Attribute **atomar** sind.

Das bedeutet, die Werte in jeder Zelle dürfen nicht weiter zerlegbar sein (keine Listen, Mengen oder zusammengesetzten Werte).

### Zweite Normalform (2NF)

> Eine Relation ist in 2NF, wenn sie in 1NF ist und jedes Nicht-Primattribut **voll funktional** von jedem Kandidatenschlüssel abhängt.

Ein *Primattribut* ist ein Attribut, das Teil eines Kandidatenschlüssels ist. 2NF verbietet **partielle Abhängigkeiten**, bei denen ein Nicht-Primattribut nur von einem Teil eines zusammengesetzten Schlüssels abhängt.

### Dritte Normalform (3NF)

> Eine Relation ist in 3NF, wenn sie in 2NF ist und für jede FD $\\alpha \\rightarrow B$ mindestens eine der folgenden Bedingungen gilt:
>
> 1.  Die FD ist trivial ($B \\in \\alpha$).
> 2.  $\\alpha$ ist ein Superschlüssel.
> 3.  $B$ ist ein Primattribut.

3NF verbietet **transitive Abhängigkeiten**, bei denen ein Nicht-Primattribut von einem anderen Nicht-Primattribut abhängt.

### Boyce-Codd-Normalform (BCNF)

> Eine Relation ist in BCNF, wenn für jede nicht-triviale FD $\\alpha \\rightarrow B$ gilt, dass $\\alpha$ ein **Superschlüssel** ist.

BCNF ist eine strengere Version der 3NF, da die dritte Bedingung (Attribut B ist prim) entfällt.

### Vergleich der Normalformen

  * **Verlustfreiheit** kann bei der Zerlegung in jede Normalform garantiert werden.
  * **Abhängigkeitsbewahrung** kann nur bis zur 3NF garantiert werden. Eine Zerlegung in BCNF ist zwar immer verlustfrei, aber nicht immer abhängigkeitsbewahrend. In der Praxis gibt man sich oft mit 3NF zufrieden, um die Abhängigkeitsbewahrung sicherzustellen.

**Übersicht:**
| Normalform | Charakteristik |
| :--- | :--- |
| **1NF** | Nur atomare Attribute |
| **2NF** | Keine partielle Abhängigkeit |
| **3NF** | Keine transitive Abhängigkeit (Ausnahme: zu Primattributen) |
| **BCNF** | Jede Determinante einer nicht-trivialen FD ist ein Superschlüssel |

-----

## Zusammenfassung

  * Ein **guter relationaler Entwurf** vermeidet Redundanz, Anomalien und Null-Werte.
  * **Funktionale Abhängigkeiten (FDs)** sind das zentrale Konzept, um die Qualität eines Entwurfs zu bewerten.
  * Die **Zerlegung** ist die Technik, um ein schlechtes Schema in ein gutes zu überführen. Eine gute Zerlegung ist **verlustfrei** und **abhängigkeitsbewahrend**.
  * **Normalformen** (1NF, 2NF, 3NF, BCNF) sind schrittweise strengere Regeln, um die Qualität des Entwurfs zu sichern.
  * **3NF** bietet einen guten Kompromiss, da sie verlustfreie und abhängigkeitsbewahrende Zerlegungen immer ermöglicht.
  * **BCNF** ist strenger, kann aber dazu führen, dass die Abhängigkeitsbewahrung verloren geht.