Absolut\! Hier ist der gesamte Inhalt der PDF-Datei in einem maschinenlesbaren Markdown-Format extrahiert, einschließlich der Bilder.

-----

# DBS - Anfrageoptimierung

**Katja Hose**
Institut für Logic and Computation
Sommersemester 2025

-----

## Lernziele und Motivation

### Lernziele

  * [cite\_start]Verstehen, wie SELECT-Anfragen ausgeführt werden [cite: 15]
  * [cite\_start]Kenntnis von grundlegenden Join-Algorithmen [cite: 16]
  * [cite\_start]Grundlagen der heuristischen (logischen) Anfrageoptimierung verstehen [cite: 17]
  * [cite\_start]Grundlagen der physischen Anfrageoptimierung verstehen [cite: 18]

### Motivation

  * [cite\_start]Die Kenntnis von Grundlagen der Anfragenbearbeitung und -optimierung sind Voraussetzungen für Database-Tuning [cite: 20]

-----

## Gliederung

1.  [cite\_start]**Motivation und Einführung** [cite: 26]
      * [cite\_start]Anfragebearbeitung [cite: 27]
      * [cite\_start]Anfrageoptimierung [cite: 28]
2.  [cite\_start]**Logische (heuristische) Anfrageoptimierung** [cite: 29]
      * [cite\_start]Äquivalenzerhaltende Transformationsregeln [cite: 30]
      * [cite\_start]Phasen der logischen Anfrageoptimierung [cite: 31]
3.  [cite\_start]**Implementierung von Operatoren** [cite: 32]
      * [cite\_start]Selektion (Access Paths) [cite: 33]
      * [cite\_start]Join-Algorithmen [cite: 34]
4.  [cite\_start]**Kostenbasierte (physische) Anfrageoptimierung** [cite: 35]
      * [cite\_start]Selektivität und Kardinalität [cite: 36]
      * [cite\_start]Kostenschätzung [cite: 37]
      * [cite\_start]PostgreSQL [cite: 38]

-----

## 1\. Motivation und Einführung

### Ausführen einer SQL-Anfrage

Die Klauseln einer SQL-Anfrage werden in folgender Reihenfolge **angegeben**:

  * [cite\_start]`SELECT` column(s) [cite: 48]
  * [cite\_start]`FROM` table list [cite: 49]
  * [cite\_start]`WHERE` condition [cite: 50]
  * [cite\_start]`GROUP BY` grouping column(s) [cite: 51]
  * [cite\_start]`HAVING` group condition [cite: 52]
  * [cite\_start]`ORDER BY` sort list [cite: 53]

Aber die Anfrage wird in einer **anderen Reihenfolge ausgeführt**:

1.  [cite\_start]Kartesisches Produkt der Tabellen in der `FROM`-Klausel [cite: 86]
2.  [cite\_start]Prädikate in der `WHERE`-Klausel [cite: 102, 103]
3.  [cite\_start]`GROUP BY`-Klausel [cite: 122]
4.  [cite\_start]Prädikate in der `HAVING`-Klausel (um Gruppen zu eliminieren) [cite: 142, 143]
5.  [cite\_start]Aggregatfunktionen für jede verbleibende Gruppe berechnen [cite: 165, 166]
6.  [cite\_start]Projektion auf Spalten der `SELECT`-Klausel [cite: 189]

[cite\_start]**Wichtig:** SQL ist **deklarativ**\! [cite: 206] [cite\_start]Es ist nicht die Aufgabe des Benutzers, effiziente Anfragen zu schreiben, sondern die der Anfrageoptimierung, effiziente Ausführungspläne zu finden. [cite: 287] [cite\_start]In der Realität sind Optimierer jedoch nicht perfekt. [cite: 303]

### Schritte der Anfragebearbeitung

[cite\_start] [cite: 214]

1.  [cite\_start]Anfrage in einer abstrakten Anfragesprache [cite: 215]
2.  [cite\_start]Scanning, Parsing, and Semantic Analysis [cite: 216]
3.  [cite\_start]Intermediate Query Plan [cite: 217]
4.  [cite\_start]Query Optimizer [cite: 218]
5.  [cite\_start]Execution Plan [cite: 219]
6.  [cite\_start]Code Generator [cite: 220]
7.  [cite\_start]Code for Query Execution [cite: 221]
8.  [cite\_start]Runtime Database Processor [cite: 222]
9.  [cite\_start]Anfrageergebnis [cite: 223]

### Beispiel: Initialer Anfrageplan

**SQL-Anfrage:**

```sql
SELECT title
FROM professor, course
WHERE name='Socrates' AND empID=taughtBy;
```

[cite\_start][cite: 233, 234, 235, 238]

**Algebraischer Ausdruck:**
[cite\_start]`π_title(σ_{name='Socrates' ∧ empID=taughtBy}(professor × course))` [cite: 240]

**Initialer Plan:**
[cite\_start] [cite: 232]

### Alternativer Anfrageplan

**Algebraischer Ausdruck:**
[cite\_start]`π_title(σ_{empID=taughtBy}(σ_{name='Socrates'}(professor) × course))` [cite: 259]

**Alternativer Plan:**
[cite\_start] [cite: 254]

### Anfrageausführungskosten

[cite\_start]Ein Kostenmodell berücksichtigt viele Faktoren, wobei der **Festplattenzugriff dominiert**: [cite: 320]

  * [cite\_start]Gesamte Zeit bis zum Ergebnis (Response Time) [cite: 313]
  * [cite\_start]CPU-Kosten [cite: 316]
  * [cite\_start]Netzwerkkommunikation [cite: 317]
  * [cite\_start]Aktueller Query-Load [cite: 318]
  * [cite\_start]Parallelisierung [cite: 319]

### Arten der Anfrageoptimierung

  * [cite\_start]**Logische Anfrageoptimierung:** [cite: 329]
      * [cite\_start]Basiert auf Relationaler Algebra [cite: 330]
      * [cite\_start]Nutzt äquivalenzerhaltende Transformationsregeln [cite: 331]
      * [cite\_start]Heuristische Optimierung [cite: 332]
  * [cite\_start]**Physische Anfrageoptimierung:** [cite: 333]
      * [cite\_start]Berücksichtigt Algorithmen und Operatorimplementationen [cite: 334]
      * [cite\_start]Basiert auf einem Kostenmodell [cite: 335]

-----

## 2\. Logische (heuristische) Anfrageoptimierung

[cite\_start]Das Hauptziel der logischen Anfrageoptimierung ist die **Reduzierung der Größe von Zwischenergebnissen**. [cite: 385] [cite\_start]Dies geschieht durch die Anwendung von äquivalenzerhaltenden Transformationsregeln auf einen initialen algebraischen Ausdruck, basierend auf Heuristiken. [cite: 351, 368]

### Äquivalenzerhaltende Transformationsregeln

  * **Aufbrechen von Konjunktionen in Selektionen:**
    [cite\_start]`σ_{c1∧c2}(R) ≡ σ_{c1}(σ_{c2}(R))` [cite: 395]
  * **Selektion (σ) ist kommutativ:**
    [cite\_start]`σ_{c1}(σ_{c2}(R)) ≡ σ_{c2}(σ_{c1}(R))` [cite: 398]
  * **Kaskaden von Projektionen (π) vereinfachen:**
    [cite\_start]Wenn $L\_1 ⊆ L\_2$, dann `π_{L1}(π_{L2}(R)) ≡ π_{L1}(R)` [cite: 399, 400]
  * **Vertauschen von σ und π:**
    Wenn die Selektion sich nur auf Attribute der Projektionsliste bezieht:
    [cite\_start]`π_{A1,...,An}(σ_c(R)) ≡ σ_c(π_{A1,...,An}(R))` [cite: 412]
  * [cite\_start]**Join (⋈), Vereinigung (U), Schnitt (∩) und Differenz (-) sind kommutativ und assoziativ.** [cite: 413, 447]
  * **Vertauschen von σ und Join (⋈):**
    Wenn das Prädikat `c` nur Attribute aus `R` betrifft:
    [cite\_start]`σ_c(R ⋈_j S) ≡ σ_c(R) ⋈_j S` [cite: 425]
    Wenn `c = c1 ∧ c2` ist, wobei `c1` nur `R` und `c2` nur `S` betrifft:
    [cite\_start]`σ_c(R ⋈_j S) ≡ σ_{c1}(R) ⋈_j σ_{c2}(S)` [cite: 427]
  * **Vertauschen von π und Join (⋈):**
    [cite\_start]`π_L(R ⋈_c S) ≡ (π_{A1..An}(R)) ⋈_c (π_{B1..Bm}(S))` (unter bestimmten Bedingungen) [cite: 438]
  * **Kombination von Kartesischem Produkt und Selektion:**
    [cite\_start]`σ_θ(R × S) ≡ R ⋈_θ S` [cite: 467]

### Phasen der logischen Anfrageoptimierung

1.  [cite\_start]**Aufbrechen von Selektionen** in einzelne Prädikate. [cite: 498]
2.  [cite\_start]**Verschieben der Selektionen** so weit wie möglich nach unten im Anfragebaum ("pushing selections"). [cite: 499]
3.  [cite\_start]**Einführen von Joins** (Zusammenfassen von Selektionen und Kreuzprodukten). [cite: 500, 501]
4.  [cite\_start]**Bestimmen der Join-Reihenfolge**, um möglichst kleine Zwischenergebnisse zu erzeugen. [cite: 502, 503]
5.  [cite\_start]**Einführen und Verschieben von Projektionen** so weit wie möglich nach unten. [cite: 505, 506]

### Zusammenfassung: Heuristische Anfrageoptimierung

**Erfahrungsregeln (Heuristiken):**

  * [cite\_start]Selektionen so früh wie möglich ausführen. [cite: 797]
  * [cite\_start]Projektionen so früh wie möglich ausführen. [cite: 798]

**Optimierungsprozess:**

1.  [cite\_start]Erstelle einen initialen Plan aus der SQL-Anfrage. [cite: 811]
2.  [cite\_start]Modifiziere den Plan schrittweise, um ihn in einen effizienteren zu überführen. [cite: 812]

-----

## 3\. Implementierung von Operatoren

### Selektion (Access Paths)

[cite\_start]Das Hauptziel hierbei ist es, die Blattoperatoren im Anfrageplan durch konkrete Zugriffsmethoden zu ersetzen. [cite: 871, 872]

**Mögliche Zugriffsmethoden für Punkt-/Bereichsanfragen:**

  * [cite\_start]**Linear Search:** Aufwändig, funktioniert aber immer. [cite: 880, 881]
  * [cite\_start]**Binary Search:** Nur wenn die Datei entsprechend sortiert ist. [cite: 892, 893]
  * [cite\_start]**Primary Hash Index:** Effizient für Single Record Retrieval, nicht für Bereichsanfragen. [cite: 906, 908]
  * [cite\_start]**Primary/Clustering Index:** Pointer zum ersten Block mit dem gesuchten Wert. [cite: 923, 924]
  * [cite\_start]**Secondary Index:** Jeder Record hat einen eigenen Pointer, kann teuer werden. [cite: 940, 941, 942]

**Strategien für konjunktive Anfragen (`AND`):**

  * [cite\_start]**Passenden Index verwenden:** Ideal ist ein Index über alle benötigten Attribute. [cite: 1002]
  * [cite\_start]**Selektivsten Index nutzen:** Falls mehrere Indexe existieren, den selektivsten verwenden und danach die restlichen Konditionen auswerten. [cite: 1003, 1004]
  * [cite\_start]**Überschneidung von Pointern:** Wenn mehrere Indexe anwendbar sind, die Pointer-Listen schneiden. [cite: 1017]

[cite\_start]Disjunktive Anfragen (`OR`) bieten wenig Optimierungspotenzial. [cite: 1036]

### Join-Algorithmen

Es gibt verschiedene Algorithmen zur Implementierung von Joins:

  * [cite\_start]Nested Loop Join [cite: 1072]
  * [cite\_start]Index-based Join [cite: 1073]
  * [cite\_start]Sort-Merge Join [cite: 1074]
  * [cite\_start]Hash Join [cite: 1074]

[cite\_start]Die Kosten werden oft in `I/Os` (Block-Retrievals) geschätzt und hängen von der Tabellengröße und der Join-Selektivität ab. [cite: 1089, 1108]

#### Nested Loop Join

  * [cite\_start]**Brute-Force-Strategie:** Jedes Tupel der äußeren Relation wird mit jedem Tupel der inneren Relation verglichen. [cite: 1959]
  * **Block Nested Loop Join:** Effizienter, da blockweise gearbeitet wird. [cite\_start]Die Kosten hängen davon ab, welche Relation als äußere gewählt wird. [cite: 1962]
      * [cite\_start]**Kostenformel:** `b_outer + (ceil(b_outer / (nB - 2)) * b_inner)` [cite: 1962]
      * [cite\_start]Dabei sind `b_outer` und `b_inner` die Anzahl der Blöcke der Relationen und `nB` die Puffergröße. [cite: 1962]

#### Index-based Nested Loop Join

  * [cite\_start]Nutzt einen Index für die innere Relation, um den vollständigen Scan zu vermeiden. [cite: 1970]

#### Sort-Merge Join

  * [cite\_start]**Voraussetzung:** Beide Relationen müssen auf den Join-Attributen sortiert sein. [cite: 1971]
  * **Prinzip:** Die sortierten Relationen werden wie beim Reißverschlussverfahren gleichzeitig durchlaufen.
  * [cite\_start]**Kosten (wenn sortiert):** `b1 + b2` Block-Transfers. [cite: 1983]

#### Hash Join

  * **Prinzip:**
    1.  [cite\_start]**Partitionierungsphase:** Beide Relationen werden mithilfe einer Hashfunktion `h1` in Buckets partitioniert. [cite: 1992]
    2.  **Join-Phase:** Für jedes Paar passender Buckets wird ein Join durchgeführt. [cite\_start]Oft wird hierfür eine zweite Hashfunktion `h2` und eine In-Memory-Hashtabelle für das kleinere Bucket verwendet. [cite: 1991]
  * **Kosten:** ca. [cite\_start]`3 * (b1 + b2)` Block-Transfers. [cite: 1995]
  * [cite\_start]**Performance:** Beste Performanz, wenn die kleinere Relation komplett in den Hauptspeicher passt. [cite: 1998]

-----

## 4\. Kostenbasierte (physische) Anfrageoptimierung

[cite\_start]Das Ziel ist, für eine gegebene Anfrage den **besten (kostengünstigsten) Ausführungsplan** zu finden, indem konkrete Algorithmen und Zugriffspfade ausgewählt werden. [cite: 2000]

[cite\_start] [cite: 2000]

### Prozess der physischen Optimierung

1.  [cite\_start]Erstelle alternative Ausführungspläne. [cite: 2004]
2.  [cite\_start]Wähle Algorithmen und Zugriffspfade (Access Paths). [cite: 2004]
3.  [cite\_start]Berechne die Kosten für jeden Plan. [cite: 2004]
4.  [cite\_start]Wähle den günstigsten Ausführungsplan aus. [cite: 2004]

### Voraussetzungen

  * [cite\_start]**Kostenmodell:** Erfasst Metriken wie Festplattenzugriffe, CPU-Zeit, etc. [cite: 2004, 2030]
  * [cite\_start]**Statistiken:** Werden für Input-Relationen (im Systemkatalog gespeichert) und zur Schätzung von Zwischenergebnissen benötigt. [cite: 2004]

#### Benötigte Statistiken

  * [cite\_start]**Pro Relation:** Anzahl Tupel (`nr`), Tupelgröße (`lr`), Anzahl Blöcke (`br`), Organisation (Heap, Index, etc.). [cite: 2007]
  * [cite\_start]**Pro Attribut:** Anzahl distinkter Werte (`V(A, r)`), Kardinalität der Selektion, Werteverteilung. [cite: 2008]
  * [cite\_start]**Pro Index:** Typ (B+-Baum, Hash), Anzahl Ebenen, etc. [cite: 2012]

### Heuristische vs. Kostenbasierte Optimierung

| Heuristisch | Kostenbasiert |
| :--- | :--- |
| [cite\_start]Kann immer verwendet werden. [cite: 2039] | [cite\_start]Kann nur verwendet werden, wenn Statistiken vorliegen. [cite: 2039] |
| [cite\_start]Pläne werden sequenziell generiert. [cite: 2039] | [cite\_start]Mehrere Pläne werden generiert. [cite: 2039] |
| [cite\_start]Jeder Plan ist (wahrscheinlich) besser als der vorherige. [cite: 2039] | [cite\_start]Kosten für jeden Plan berechnen, den günstigsten wählen. [cite: 2039] |
| [cite\_start]Suche ist linear. [cite: 2039] | [cite\_start]Suche ist mehrdimensional. [cite: 2039] |

### PostgreSQL

PostgreSQL bietet Werkzeuge, um den Anfrageausführungsplan zu analysieren.

  * [cite\_start]`EXPLAIN`: Zeigt den vom Optimierer gewählten Ausführungsplan, ohne die Anfrage auszuführen. [cite: 2044]
  * [cite\_start]`EXPLAIN ANALYZE`: Führt die Anfrage tatsächlich aus und zeigt den Plan zusammen mit den realen Ausführungszeiten und Tupelzahlen. [cite: 2048]
  * [cite\_start]`ANALYZE`: Sammelt Statistiken über die Inhalte der Tabellen, die der Optimierer dann verwenden kann. [cite: 2049]

**Beispiel `EXPLAIN` Output:**
[cite\_start] [cite: 2045]

**Visualisierter Plan:**
[cite\_start] [cite: 2053]

-----

## Zusammenfassung

  * [cite\_start]Anfrageoptimierung ist eine **Kernkomponente** von relationalen DBMS. [cite: 2060]
  * [cite\_start]**Heuristische Optimierung** kann immer verwendet werden, führt aber eventuell zu suboptimalen Plänen. [cite: 2060]
  * [cite\_start]**Kostenbasierte Optimierung** ist auf genaue Statistiken angewiesen, um den besten Plan zu finden. [cite: 2060]
  * [cite\_start]Datenbanksysteme bieten Werkzeuge wie `EXPLAIN`, um Einblicke in die Ausführung zu geben. [cite: 2060]
  * [cite\_start]**Database-Tuning** (z.B. das Erstellen von Indexen) bleibt eine wichtige Aufgabe für Datenbankadministratoren. [cite: 2055]