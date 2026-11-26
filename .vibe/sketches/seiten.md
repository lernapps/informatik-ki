# Skizzen: Seiten und Komponenten (Kapitel 1, Welle 1)

Kapitel `lernen` „KI im Alltag: Lernen aus Beispielen“. Abschnitts-ids auf allen Seiten: `einstieg`, `idee`,
`beispiel`, `ausprobieren` (nur wo Kinder etwas bedienen), `uebung`.

## 0 `lernen/das-brauchst-du` (Sammel-Wiederholung)
- Selbstcheck als Text: „Ich kann Information und Daten unterscheiden …“, „Ich kann Daten in ihrem Zusammenhang
  deuten …“. Ein kurzes Beispiel: Auf einer Tierkarte steht „groß“. Erst zusammen mit „Tier“ wird daraus eine
  Information. Eine Übung (single-choice: Was bedeutet „4“ auf der Karte?).

## 1 `lernen/ki-im-alltag`
- einstieg: Bild Klasse 6b vor der Wandzeitung „KI bei uns“ (SVG ohne Text). Erste Frage: Welches Gerät hört zu und
  antwortet? (single-choice)
- idee: Was KI-Anwendungen tun: erkennen (Sprache, Bilder), vorschlagen (Empfehlungen), übersetzen. Gegenbeispiele:
  Taschenrechner, Wecker, Ampel arbeiten nach festen Regeln. Definition „künstliche Intelligenz“ (Glossar).
- beispiel: Tabelle Anwendung | Was sie erkennt oder vorschlägt.
- uebung: matching (Anwendung → was sie tut), multiple-choice (Wo steckt KI?), true-false (KI ist immer ein Roboter),
  number (Wie viele der 8 Dinge auf der Wandzeitung nutzen KI?). Ausblick: Wie lernt eine KI? → Trainingsbeutel.

## 2 `lernen/regeln-aus-beispielen` (ohne Computer)
- einstieg: Bild des Trainingsbeutels mit Karten (SVG ohne Text) + Tierkarten-Ansicht (Komponente `Tierkarten`, Texte
  als Props). Frage: Hund oder Katze? (single-choice an einer Karte)
- idee: Anleitung Kartenspiel (nummerierte Liste): Karten ausschneiden oder abmalen, 6 Karten in den Beutel, Regel
  suchen, die zu allen passt, neue Karten testen. Begriff „Trainingsdaten“, „Entscheidungsbaum“ (eine Frage, zwei
  Äste). Programmierte Regel gegen gelernte Regel.
- beispiel: Jona findet „spitze Ohren → Katze“; die neue Karte H2 (spitze Ohren, Hund) passt nicht. Selin findet
  „schmale Pupillen → Katze“.
- uebung: true-false (Regel passt zu allen Karten im Beutel?), matching (Karte → was die Regel sagt), ordering
  (Schritte: Beispiele sammeln, Etikett, Regel suchen, an neuen Karten testen), single-choice (programmiert oder
  gelernt?).

## 3 `lernen/maschine-trainieren` (Simulation)
- einstieg: Die Maschine bekommt den Beutel. Sie sucht nicht eine Regel, sie sucht das ähnlichste Beispiel.
- idee: Merkmale zählen: zwei Karten, gleiche Merkmale zählen (Tabelle). Das Beispiel mit den meisten gleichen
  Merkmalen gewinnt. Gleichstand zwischen Hund und Katze → „Ich weiß es nicht“.
- ausprobieren: Komponente `BeutelSimulation`: Kartenreihe mit Knöpfen „In den Beutel“/„Heraus“, Testtier wählen,
  Tabelle mit gleichen Merkmalen je Beutelkarte, Antwort der Maschine. Start: Beutel mit K1 und H1.
- uebung: generated (Wie viele Merkmale stimmen überein?), single-choice (Was sagt die Maschine?), Komponente
  `BeutelAufgabe` (Fülle den Beutel mit höchstens 4 Karten so, dass alle 3 Testtiere richtig erkannt werden),
  true-false (Ohne Katzen im Beutel erkennt die Maschine trotzdem Katzen). Rückblick: Merksatz.

## Komponenten
- `Tierkarten` (Anzeige): zeichnet Karten aus `tiere.yaml` (Merkmale → SVG ohne Text), Etikett und Kartenname als
  Props/Daten in de und en. nojs: Liste der Karten mit Merkmalen.
- `BeutelSimulation` (Anzeige, frei): siehe Seite 3. nojs: beschreibt die Regel und ein durchgerechnetes Beispiel.
- `BeutelAufgabe` (Übung): Aufgabe je Seed = 3 Testtiere; Antwort = gewählte Karten (≤ 4, Testtiere nicht wählbar);
  richtig, wenn der nächste Nachbar jedes Testtier richtig benennt (kein Gleichstand).
- Gemeinsame Logik `Beutel.ts`: `gleicheMerkmale(a, b)`, `klassifiziere(beutel, tier)`.

## Kapitel 2 (9-10, später auf `increment/9-10`)
- `schief/verzerrte-daten`: derselbe Beutel, absichtlich einseitig gefüllt (z. B. nur große Hunde, nur kleine
  Katzen). Die Simulation (`BeutelSimulation` mit Vorgabe `start`) erkennt jeden kleinen Hund als Katze. Die
  Jugendlichen suchen den Fehler in den Daten, nicht im Programm. Fall als Nachrichtenverlauf eines Schulprojekts,
  ohne gezeichnete Kinder.
