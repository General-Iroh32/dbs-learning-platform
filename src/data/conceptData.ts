import type { ConceptCard } from '../types';

export const rmConcepts: ConceptCard[] = [
  {
    title: 'Domänen (Wertebereiche)',
    description: 'D₁, D₂, ..., Dₙ sind die Grundlage des relationalen Modells. Jede Domäne definiert einen Wertebereich (z.B. string, integer, date).',
    icon: 'Database'
  },
  {
    title: 'Relation',
    description: 'Eine Relation R ⊆ D₁ × ... × Dₙ ist eine Teilmenge des kartesischen Produkts von Domänen. Mathematisch basiert sie auf Mengen und enthält keine Duplikate.',
    icon: 'Table'
  },
  {
    title: 'Relationenschema',
    description: 'Legt die Struktur der gespeicherten Daten fest. Notation: R(A₁:D₁, A₂:D₂, ...) mit Aᵢ für Attribute und Dᵢ für Domänen. Wird mit sch(R) oder R bezeichnet.',
    icon: 'FileText'
  },
  {
    title: 'Tupel',
    description: 'Eine Zeile in einer Relation. Jedes Tupel repräsentiert eine Instanz des Relationenschemas und hat atomare Werte. Tupel haben keine feste Reihenfolge.',
    icon: 'List'
  },
  {
    title: 'Attribut',
    description: 'Eine Spalte in einer Relation. Jedes Attribut hat einen Namen und gehört zu einer Domäne (Wertebereich). Die Reihenfolge der Attribute ist wichtig.',
    icon: 'Columns'
  },
  {
    title: 'Attributwert',
    description: 'Ein einzelner Eintrag in einer Relation. Muss atomar sein und gehört zu einer spezifischen Domäne.',
    icon: 'Circle'
  },
  {
    title: 'Primärschlüssel',
    description: 'Ein oder mehrere Attribute, die jedes Tupel in einer Relation eindeutig identifizieren. Unterstrichen dargestellt. Kann zusammengesetzt sein.',
    icon: 'Key'
  },
  {
    title: 'Fremdschlüssel',
    description: 'Attribute, die auf den Primärschlüssel einer anderen Relation verweisen. Stellen Referenzielle Integrität sicher. Werte müssen in der referenzierten Tabelle existieren.',
    icon: 'Link'
  },
  {
    title: 'Atomare Werte',
    description: 'Alle Werte in einem Tupel müssen atomar (unteilbar) sein. Keine Listen, Arrays, verschachtelte Strukturen oder andere Relationen als Werte.',
    icon: 'Circle'
  },
  {
    title: 'Null-Werte',
    description: 'Spezielle Werte für unbekannte oder unanwendbare Daten. Repräsentiert fehlende oder nicht verfügbare Informationen. Alternative Notation: leere Zelle.',
    icon: 'HelpCircle'
  },
  {
    title: 'Tupelreihenfolge',
    description: 'Tupel einer Relation haben keine feste Reihenfolge. Zwei Relationen mit denselben Tupeln in unterschiedlicher Reihenfolge sind identisch.',
    icon: 'SortAsc'
  },
  {
    title: 'Attributreihenfolge',
    description: 'Die mathematische Definition von Tupeln sieht eine bestimmte Reihenfolge der Attribute vor. In der Praxis ist die Reihenfolge oft bedeutungslos.',
    icon: 'SortDesc'
  },
  {
    title: 'Duplikate',
    description: 'Im relationalen Modell sind Duplikate nicht erlaubt, da Relationen auf Mengen basieren. Keine zwei Tupel dürfen identische Werte in allen Attributen haben.',
    icon: 'Copy'
  },
  {
    title: 'Vereinigungskompatibilität',
    description: 'Zwei Relationen sind vereinigungskompatibel, wenn sie die gleiche Anzahl Attribute haben und entsprechende Attribute gleiche Domänen haben.',
    icon: 'GitMerge'
  },
  {
    title: 'Zulässige Relationen',
    description: 'Eine Relation ist zulässig, wenn alle Attributwerte zu ihren jeweiligen Domänen gehören, atomar sind und keine Duplikate existieren.',
    icon: 'CheckCircle'
  }
];

export const erConcepts: ConceptCard[] = [
  {
    title: 'Entitätstypen',
    description: 'Repräsentiert eine Klasse von Objekten mit gemeinsamen Eigenschaften (z.B. \'Student\'). Dargestellt als Rechteck.',
    icon: 'Box'
  },
  {
    title: 'Attribute',
    description: 'Beschreiben Eigenschaften eines Entitätstyps (z.B. \'Matrikelnummer\'). Dargestellt als Ovale, Schlüsselattribute sind unterstrichen.',
    icon: 'List'
  },
  {
    title: 'Beziehungstypen',
    description: 'Beschreibt eine Verknüpfung zwischen Entitätstyps (z.B. \'Student\' belegt \'Kurs\'). Dargestellt als Raute.',
    icon: 'Link'
  },
  {
    title: 'Kardinalitäten',
    description: 'Definieren, wie viele Instanzen an einer Beziehung teilnehmen können (1:1, 1:N, M:N). Die (min, max)-Notation präzisiert die Teilnahme.',
    icon: 'SortAsc'
  }
];

export const raConcepts: ConceptCard[] = [
  {
    title: 'Basisoperatoren',
    description: 'Die sechs fundamentalen Operatoren: π (Projektion), σ (Selektion), ρ (Umbenennung), × (Kreuzprodukt), ∪ (Vereinigung), - (Differenz). Jede RA-Anfrage kann mit diesen ausgedrückt werden.',
    icon: 'Layers'
  },
  {
    title: 'π Projektion',
    description: 'Wählt bestimmte Spalten (Attribute) aus einer Relation aus. π_A₁,A₂(R) wählt Attribute A₁ und A₂ aus R. Duplikate werden automatisch entfernt. Erweiterte Projektion: π_A₁,A₂,expr(R) mit Berechnungen.',
    icon: 'Columns'
  },
  {
    title: 'σ Selektion',
    description: 'Filtert Zeilen (Tupel) aus einer Relation. σ_F(R) mit F als Prädikat aus logischen (∨, ∧, ¬) und arithmetischen Operatoren (<, ≤, =, >, ≥, ≠). Beispiel: σ_salary > 80000(instructor)',
    icon: 'Filter'
  },
  {
    title: 'ρ Umbenennung',
    description: 'Benennt Relationen oder Attribute um. ρ_S(R) für Relation, ρ_A←B(R) für Attribute. Verhindert Namenskonflikte. Alternative Notation: α (in manchen Lehrbüchern).',
    icon: 'Edit'
  },
  {
    title: '× Kreuzprodukt',
    description: 'Bildet jede mögliche Kombination von Tupeln aus zwei Relationen. R × S enthält |R| × |S| Tupel. Schema: sch(R × S) = sch(R) ∪ sch(S). Enthält oft unsinnige Kombinationen.',
    icon: 'X'
  },
  {
    title: '∪ Vereinigung',
    description: 'Kombiniert Tupel aus zwei vereinigungskompatiblen Relationen. R ∪ S sammelt alle Tupel aus R und S. Duplikate werden automatisch entfernt. Beide Relationen müssen vereinigungskompatibel sein.',
    icon: 'GitMerge'
  },
  {
    title: '- Differenz',
    description: 'Entfernt Tupel aus R, die auch in S vorkommen. R - S eliminiert gemeinsame Tupel. Beide Relationen müssen vereinigungskompatibel sein. Alternative Notation: R \\ S',
    icon: 'Minus'
  },
  {
    title: '∩ Schnitt',
    description: 'Findet gemeinsame Tupel zweier vereinigungskompatibler Relationen. R ∩ S = R - (R - S). Kein Basisoperator, kann durch Differenz ausgedrückt werden.',
    icon: 'Minus'
  },
  {
    title: '⋈ Natural Join',
    description: 'Kombiniert zwei Relationen über ihre gleichnamigen Attribute. R ⨝ S = π_A₁,...,Aₘ,R.B₁,...,R.Bₖ,C₁,...,Cₙ(σ_R.B₁=S.B₁∧...∧R.Bₖ=S.Bₖ(R × S)). Tupel ohne Partner werden eliminiert.',
    icon: 'Merge'
  },
  {
    title: '⨝_θ Theta-Join',
    description: 'Allgemeiner Join mit beliebigem Prädikat θ. R ⨝_θ S = σ_θ(R × S). Equi-Join bei θ mit nur Gleichheitsvergleichen. Resultierendes Schema: alle Attribute aus R und S.',
    icon: 'GitBranch'
  },
  {
    title: '⟕ Left Outer Join',
    description: 'Behält alle Tupel der linken Relation bei. Partnerlose Tupel werden mit NULL-Werten in den Attributen der rechten Relation ergänzt. L ⟕ R',
    icon: 'ArrowLeft'
  },
  {
    title: '⟖ Right Outer Join',
    description: 'Behält alle Tupel der rechten Relation bei. Partnerlose Tupel werden mit NULL-Werten in den Attributen der linken Relation ergänzt. L ⟖ R',
    icon: 'ArrowRight'
  },
  {
    title: '⟗ Full Outer Join',
    description: 'Behält alle Tupel beider Relationen bei. Kombination aus Left und Right Outer Join. Partnerlose Tupel werden mit NULL-Werten ergänzt. L ⟗ R',
    icon: 'ArrowLeftRight'
  },
  {
    title: '⋉ Semi-Join (links)',
    description: 'Findet Tupel der linken Relation, die Joinpartner in der rechten haben. L ⋉ R = π_L(L ⨝ R). Behält nur Attribute der linken Relation.',
    icon: 'ArrowLeftCircle'
  },
  {
    title: '⋊ Semi-Join (rechts)',
    description: 'Findet Tupel der rechten Relation, die Joinpartner in der linken haben. L ⋊ R = π_R(L ⨝ R) = R ⋉ L. Behält nur Attribute der rechten Relation.',
    icon: 'ArrowRightCircle'
  },
  {
    title: 'γ Gruppierung',
    description: 'Gruppiert Tupel und wendet Aggregatfunktionen an. γ_L;F(R) mit L als Gruppierungsattribute und F als Funktionen (COUNT, SUM, AVG, MIN, MAX). Alternative Symbole: G oder A.',
    icon: 'Layers'
  },
  {
    title: '÷ Division',
    description: 'Findet Tupel, die mit ALLEN Tupeln einer anderen Relation kombiniert werden können. R ÷ S = π_(R-S)(R) - π_(R-S)((π_(R-S)(R) × S) - R). Komplexer Operator für "für alle"-Abfragen.',
    icon: 'Divide'
  },
  {
    title: 'Operatorbaumdarstellung',
    description: 'Alternative Darstellung von RA-Ausdrücken als Baum. Operatoren als Knoten, Relationen als Blätter. Hilft bei der Verständnis der Auswertungsreihenfolge.',
    icon: 'TreePine'
  },
  {
    title: 'Join-Kommutativität',
    description: 'R ⨝ S = S ⨝ R (inhaltlich). Die Reihenfolge der Attribute kann unterschiedlich sein, aber der Inhalt ist gleich. Bei der Anfrageoptimierung werden Joins als kommutativ betrachtet.',
    icon: 'RefreshCw'
  },
  {
    title: 'Einschränkungen der RA',
    description: 'RA kann nicht: Arithmetik ausführen, alle Aggregatfunktionen (nur in γ), transitive Hülle bilden, sortieren, Daten modifizieren. Erweiterte RA behebt diese Einschränkungen.',
    icon: 'AlertTriangle'
  }
];

export const normConcepts: ConceptCard[] = [
  {
    title: 'Funktionale Abhängigkeiten (FD)',
    description: 'Eine FD X → Y bedeutet, dass der Wert von X den Wert von Y eindeutig bestimmt. FDs sind die Grundlage der Normalisierung.',
    icon: 'Key'
  },
  {
    title: '1NF, 2NF, 3NF, BCNF',
    description: '1NF: Alle Attributwerte müssen atomar sein. 2NF: Verhindert partielle Abhängigkeiten von zusammengesetzten Schlüsseln. 3NF: Verhindert transitive Abhängigkeiten. BCNF: Eine strengere 3NF.',
    icon: 'ListOrdered'
  }
];

export const physConcepts: ConceptCard[] = [
  {
    title: 'Dateiorganisation',
    description: 'Tupel einer Tabelle können auf verschiedene Weisen in einer Datei gespeichert werden: unsortiert (Heap), sortiert nach einem Schlüssel (Sequenziell), oder basierend auf einer Hashfunktion (Hash).',
    icon: 'FileText'
  },
  {
    title: 'Indexe',
    description: 'Ein Index ist eine zusätzliche Datenstruktur, die den Zugriff auf Tupel beschleunigt. Er funktioniert wie ein Inhaltsverzeichnis in einem Buch.',
    icon: 'Network'
  },
  {
    title: 'B+-Bäume',
    description: 'Die häufigste Indexstruktur. Es ist ein balancierter Baum, der schnelle Suchen, Einfüge- und Löschoperationen sowie Bereichsabfragen ermöglicht.',
    icon: 'TreePine'
  },
  {
    title: 'Hashing',
    description: 'Eine weitere Index-Technik, bei der eine Hashfunktion die Speicheradresse eines Tupels direkt aus seinem Schlüsselwert berechnet. Extrem schnell für exakte Suchen.',
    icon: 'Hash'
  }
];

export const transConcepts: ConceptCard[] = [
  {
    title: 'ACID-Eigenschaften',
    description: 'Atomicity: Alles oder nichts. Consistency: Hält die DB konsistent. Isolation: Transaktionen stören sich nicht gegenseitig. Durability: Änderungen sind dauerhaft.',
    icon: 'Shield'
  },
  {
    title: 'Schedules & Serialisierbarkeit',
    description: 'Ein Schedule ist eine Abfolge von Operationen mehrerer Transaktionen. Er ist serialisierbar, wenn er äquivalent zu einer seriellen Ausführung ist.',
    icon: 'CheckSquare'
  },
  {
    title: 'Konflikte',
    description: 'Operationen zweier Transaktionen auf demselben Datenobjekt konflikten, wenn mindestens eine ein Schreibzugriff ist (Read-Write, Write-Read, Write-Write).',
    icon: 'Zap'
  },
  {
    title: 'Konflikt-Serialisierbarkeit',
    description: 'Ein Schedule ist konflikt-serialisierbar, wenn sein Konfliktgraph (Knoten=Transaktion, Kante=Konflikt) azyklisch ist.',
    icon: 'GitBranch'
  }
];

export const sqlConcepts: ConceptCard[] = [
  {
    title: 'JOIN-Operationen',
    description: 'INNER JOIN: Nur übereinstimmende Zeilen. LEFT JOIN: Alle Zeilen aus linker Tabelle. RIGHT JOIN: Alle Zeilen aus rechter Tabelle. FULL OUTER JOIN: Alle Zeilen aus beiden Tabellen.',
    icon: 'GitBranch'
  },
  {
    title: 'Aggregationsfunktionen',
    description: 'COUNT(*): Anzahl der Zeilen. SUM(): Summe der Werte. AVG(): Durchschnitt. MAX(): Maximum. MIN(): Minimum. GROUP BY gruppiert die Ergebnisse.',
    icon: 'CheckSquare'
  },
  {
    title: 'WHERE vs HAVING',
    description: 'WHERE: Filtert Zeilen vor der Gruppierung. HAVING: Filtert Gruppen nach der Gruppierung. HAVING kann nur mit GROUP BY verwendet werden.',
    icon: 'Filter'
  },
  {
    title: 'Subqueries',
    description: 'Verschachtelte Abfragen können in SELECT, FROM, WHERE und HAVING verwendet werden. Sie können korreliert (abhängig von äußerer Abfrage) oder unkorreliert sein.',
    icon: 'Network'
  }
];
