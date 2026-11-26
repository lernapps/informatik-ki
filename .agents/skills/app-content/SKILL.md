---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Wie Maschinen aus Daten lernen“ (lernapps/apps#493, Epic Informatik #509), Strang `informatik/daten`,
Format 2, Sprachen `[de, en]`. Welle 1 ist Kapitel `lernen` (Klasse 5-6). Kapitel 2 (9-10, `schief/`) kommt später
auf dem Branch `increment/9-10`.

## Curriculum

- Lernlandkarte Informatik: https://lernapps.net/apps/map/informatik.json, Strang `daten`. Sie gibt die Reihenfolge
  vor; Lehrpläne dienen nur zur Orientierung.
- GI-Bildungsstandards Informatik Sek I (2025), doi:10.18420/rec2025_052:
  - In Jg. 5-6 kommt KI nicht vor. Am nächsten liegen ID-3 (S. 16) und IS-1 (S. 19).
  - In Jg. 7-10 steht ID-11 (S. 16): „Einfluss der verwendeten Daten bei Anwendung eines Verfahrens des maschinellen
    Lernens“. Das ist Kapitel 2.
- NRW, Kernlehrplan Informatik 5/6 (MSB 2021), S. 14 und 18:
  - „benennen Anwendungsbeispiele künstlicher Intelligenz aus ihrer Lebenswelt“.
  - „stellen das Grundprinzip eines Entscheidungsbaumes enaktiv … dar“. Dazu passt das Kartenspiel.
- Bayern:
  - Realschule IT, Modul 2.7.3: überwachtes Lernen, Trainings- und Testdaten, Bias. Das ist Kapitel 2.
  - Gymnasium 11, Lernbereich 4: k-nächste-Nachbarn.
- Hessen: Die Handreichung „Digitale Welt“ (2024) hat kein KI-Thema. Die Entwürfe „KI und Digitale Welt“ sind nicht
  geprüft (HTTP 404).

## Competencies

Kapitel `lernen` „KI im Alltag: Lernen aus Beispielen“ (5-6), in dieser Reihenfolge:

1. `lernen/das-brauchst-du`: Sammel-Wiederholung
   - `recap: [informatik/information-und-daten, informatik/daten-interpretieren]`, beide aus #491.
   - „Ich kann Information und Daten unterscheiden und erklären, dass Daten erst durch ihre Deutung zu Information
     werden.“
   - „Ich kann Daten in ihrem Zusammenhang deuten, zum Beispiel erkennen, ob die Zahl 21 ein Alter, eine Temperatur
     oder eine Uhrzeit ist.“
2. `lernen/ki-im-alltag` (`ki-im-alltag`): „Ich kann Beispiele für künstliche Intelligenz aus meinem Alltag nennen,
   zum Beispiel Empfehlungen, Sprach- oder Bilderkennung.“
3. `lernen/regeln-aus-beispielen` (`maschinelles-lernen`, ohne Computer) und
4. `lernen/maschine-trainieren` (`maschinelles-lernen`, Simulation): „Ich kann an einem Beispiel erklären, dass ein
   KI-System aus Beispieldaten Muster lernt, statt dass jemand jede Regel programmiert.“

Kapitel 2 (geplant): `schief/verzerrte-daten` (`trainingsdaten`): „Ich kann an einem Beispiel zeigen, wie die Auswahl
der Trainingsdaten die Ergebnisse eines lernenden Systems beeinflusst, auch durch Verzerrungen.“

Übungen je Seite (Ids):

- `das-brauchst-du`: `was-heisst-vier`.
- `ki-im-alltag`: `lautsprecher`, `was-die-ki-tut` (matching), `wo-steckt-ki`, `ki-nur-roboter`,
  `wie-viele-mit-ki` (number).
- `regeln-aus-beispielen`: `was-alle-katzen-haben`, `jonas-regel-passt`, `was-jonas-regel-sagt` (matching),
  `schritte-lernen` (ordering), `programmiert-oder-gelernt`.
- `maschine-trainieren`: `wer-ist-aehnlicher`, `gleiche-merkmale-zaehlen` (generated), `was-sagt-die-maschine`,
  die Komponente `BeutelAufgabe`, `nur-katzen-im-beutel`.

## Content structure

- Die Abschnitts-ids sind auf allen Seiten gleich:
  - `einstieg`: Szene und eine leichte erste Frage.
  - `idee`: die Erklärung, mit Tabelle oder Bild.
  - `ausprobieren`: nur wo Kinder etwas bedienen.
  - `uebung`: mindestens 4 Übungen, vom Erkennen zum Anwenden.
  - `rueckblick`: nur auf der letzten Seite des Kapitels.
- Die Titel sagen, was der Abschnitt tut.
- Jede Seite nennt am Anfang, was die Kinder danach können, und am Ende, was als Nächstes kommt.
- Länge: höchstens 350 Wörter zum Lesen und höchstens 4 Textblöcke in Folge.
- Geschichte: Die Klasse 6b hilft dem Tierheim, Bilder von Fundtieren nach Hund und Katze zu sortieren.
  - Jona (11): kurze rotblonde Haare #c8642a, Haut #f3d2b3, grüner Kapuzenpulli #2e8b57.
  - Selin (11): lange dunkelbraune Haare mit Pferdeschwanz #3b2314, Haut #d9a27a, orange Jacke #e07b24.
  - Mia (11): schwarze Locken #222, runde Brille, Haut #8d5a3b, lila Jacke #7b4fb8.
  - Die Zeichnungen stammen aus `lernapps/informatik-computer`, `src/images/klasse-6b.svg`. Nicht ändern.
- Die Kinder werden auf `ki-im-alltag` vorgestellt („sind 11 und gehen in die Klasse 6b“, die Klasse hilft dem
  Tierheim). Bilder mit Kindern nennen sie in der Bildunterschrift von links nach rechts.
- Die Seiten der Geschichte:
  - Wiederholung: ein Zettel im Tierheim („klein“, Waldis Karte).
  - `ki-im-alltag`: Mia baut die Wandzeitung „KI bei uns“ (`wandzeitung.svg`, Marker A–F).
  - `regeln-aus-beispielen`: Mia leitet das Kartenspiel. Jona findet „spitze Ohren → Katze“, Mia zeigt Rex, Selin
    findet „schmale Pupillen → Katze“.
  - `maschine-trainieren`: Die Maschine bekommt den Beutel. Der Rückblick endet beim Tierheim.
- Jede Seite endet mit einem Satz, der die nächste Seite ankündigt. Die Seite danach nennt die Seite davor.
- Leitbild **Trainingsbeutel** (en „training bag“): ein Stoffbeutel mit Tierkarten, jede ein Beispiel mit Etikett
  Hund oder Katze. Merksatz: „Was in den Beutel kommt, bestimmt, was herauskommt.“ (en: „What goes into the bag
  decides what comes out.“)

## Terminology

- Deutsch in einfacher Sprache mit „du“, kurze Sätze. Englisch in Plain English mit „you“.
- Englische Fachwörter wie im Computing curriculum England: machine learning, training data, artificial intelligence
  (AI), label, feature.
- Glossar (`definition`):
  - künstliche Intelligenz (`ki-im-alltag`)
  - Merkmal, Etikett (vor der Spielanleitung), Trainingsdaten, Entscheidungsbaum (`regeln-aus-beispielen`)
  - nächster Nachbar, maschinelles Lernen (`maschine-trainieren`)
- Die beiden Wege bekommen für Kinder klar verschiedene Namen:
  - Beim Kartenspiel **finden die Kinder eine Regel** (Entscheidungsbaum mit einer Frage).
  - Die Maschine **sucht das ähnlichste Beispiel** (nächster Nachbar).
  - Gemeinsam ist: Beide lernen nur aus dem, was im Beutel ist.
- „Ich weiß es nicht“ (en „I don't know“): die Antwort der Maschine, wenn die ähnlichste Katze und der ähnlichste
  Hund gleich ähnlich sind. Nicht „eine Katze und ein Hund sind gleich ähnlich“.
- KI gegen Nicht-KI: Es zählt, woher die Regeln kommen. Taschenrechner und Wecker hat ein Mensch **programmiert**
  (jede Regel als Befehl aufgeschrieben). KI-Anwendungen haben ihr Können meist aus Beispielen gelernt. Immer das
  Wort „programmiert“, nicht „feste Regeln“ oder „aufgeschrieben“ allein.
- Was die Maschine lernt: „Sie finden Muster in Beispieldaten“ (nicht „Sie bilden Regeln“). Manche machen daraus
  eine Regel, andere vergleichen mit ähnlichen Beispielen. Programmiert ist nur, wie die Maschine vergleicht.
- Englisch: „data“ im Singular („data … becomes“). Die Tiernamen bleiben deutsch; die Wiederholungsseite sagt einmal,
  wie man „Krümel“ spricht (KREW-mel) und dass es „crumb“ heißt.
- Produktnamen nur als Gattung: Sprachassistent, Bilderkennung, Empfehlungen, Übersetzer. Keine Marken.
- Merkmale heißen immer gleich, in dieser Reihenfolge:
  - de: Ohren (spitz/hängend), Schnauze (kurz/lang), Größe (klein/groß), Pupillen (schmal/rund).
  - en: ears (pointed/floppy), snout (short/long), size (small/big), pupils (narrow/round).
- Keine Aussage über alle Hunde oder Katzen. Es heißt immer „auf unseren Karten“. Belegt ist nur, dass Hauskatzen
  Schlitzpupillen haben (Banks et al. 2015).
- In Texten mit Platzhaltern steht das Etikett nie hinter einem Artikel. Richtig: „Die Maschine sagt über {tier}:
  {antwort}.“ Falsch: „ein {sorte}“, das ergibt „ein Katze“.

## Exercise patterns

- **Zuordnen** (`matching`):
  - S. 1: Anwendung → was sie erkennt oder vorschlägt.
  - S. 2: Karte → Antwort der Regel.
  - Distraktoren aus Geräten mit festen Regeln.
- **Erkennen** (`multiple-choice`, `number`), S. 1: Wo steckt KI? Wie viele Dinge der Wandzeitung nutzen KI?
- **Urteilen** (`true-false`): eine Fehlvorstellung als Satz, der Grund steht in `explanation`. Beispiel:
  `nur-katzen-im-beutel`.
- **Ordnen** (`ordering`), S. 2: die Schritte des Lernens aus Beispielen.
- **Erklären** (`single-choice`): Jede falsche Option sagt in `info`, warum sie nicht passt. Beispiel:
  `was-sagt-die-maschine`, wo „Hund“ falsch ist, weil die Maschine das Etikett des neuen Tiers nicht kennt.
- **Zählen** (`generated`), Beispiel `gleiche-merkmale-zaehlen`:
  - Zwei Karten aus `tiere.yaml` (`a`, `b`, je `pick: 1`).
  - Antwort `4 − Σ (a.m − b.m)²`.
  - Fehler „verschiedene gezählt“ = Σ (a.m − b.m)². Ausgeschlossen mit `where … != 2`, damit Fehler und Antwort nie
    gleich sind.
- **Beutel füllen** (Komponente `BeutelAufgabe`, auf `maschine-trainieren`): Je Seed gibt es 3 Testtiere, darunter
  eine Katze, ein Hund und eine Karte mit gemischten Merkmalen.
  - Der einfachste Beutel (Katze 1111 + Hund 0000) darf die Aufgabe nicht lösen.
  - Mindestens zwei verschiedene Beutel lösen sie, keiner mit nur einer Karte (geprüft in `BeutelAufgabe.test.ts`).
  - Richtig ist jeder Beutel mit 1 bis 4 Karten, in dem der nächste Nachbar alle 3 Testtiere richtig benennt.
  - Die Rückmeldung nennt **jedes** falsch erkannte Testtier, die falsche Antwort und die Karte, mit der es verwechselt
    wird. Bei Gleichstand nennt sie beide Karten. Fehlt eine Sorte im Beutel, sagt sie das einmal.
  - Unter den Karten stehen der Beutelinhalt und „Der Beutel ist voll“. Die Aufgabe verweist auf „Ausprobieren“.
- **Hinweise:** `true-false`, `matching` und `ordering` haben ein `hint`, sonst zeigt die Runtime nur eine allgemeine
  Meldung.
- **Anzeigen:** `Tierkarten` (Karten nach Nummer in `tiere.yaml`, mit oder ohne Etikett) und `BeutelSimulation`
  (frei bedienbar; das neue Tier kann nicht in den Beutel, an seiner Karte steht „ist gerade das neue Tier“).

## Figures

- Eigene SVGs ohne Text im Bild, CC-BY-4.0, `source: eigene Zeichnung / own drawing`:
  - `src/images/beutel-szene.svg`: Jona, Mia, der Trainingsbeutel und Selin (auf `regeln-aus-beispielen` und
    `maschine-trainieren`).
  - `src/images/wandzeitung.svg`: Mia vor einer Pinnwand mit sechs Bildzeichen; Marker und Namen A–F setzt die Seite
    (`labelled-figure`).
- Der Trainingsbeutel steht als `<g id="trainingsbeutel">` in `beutel-szene.svg`. Andere Explainer (#505) dürfen ihn
  mit Herkunft kopieren.
  - Stoffbeutel petrol #3a8fa3, Kordel #1f5e6b, gelber Pfoten-Aufnäher #f4c542.
  - Oben ragen zwei Tierkarten heraus.
- Tierkarten zeichnet `TierBild.vue` (Geometrie in `TierBild.ts`) aus den vier Merkmalen; Hintergrund #fbf8f1, Umriss
  #333.
  - Ohren: spitze Dreiecke oder hängende Lappen.
  - Schnauze: kurz oder lang.
  - Größe: Der Kopf ist bei kleinen Tieren auf 72 % verkleinert.
  - Pupillen: schmale Schlitze in gelbgrüner Iris oder runde Pupillen in brauner Iris.
  - Fellfarbe aus `fell`.
  - Die Zeichnung ist dekorativ (`aria-hidden`). Name, Etikett und Merkmale stehen als Text neben jeder Karte.
- Komponenten nutzen für Flächen und Text nur die Variablen der Seite. Die Karte im Beutel ist doppelt markiert:
  Doppelrahmen in `--page-accent` und `aria-pressed`.

## Sources

- Die Lernlandkarte und die Lehrpläne stehen oben unter „Curriculum“.
- Verfahren: T. Cover, P. Hart, „Nearest neighbor pattern classification“, IEEE Trans. Inf. Theory 13(1), 1967,
  S. 21–27, doi:10.1109/TIT.1967.1053964. Geprüft ist nur die Bibliografie.
- Pupillen: M. S. Banks et al., „Why do animal eyes have pupils of different shapes?“, Science Advances 1(7), 2015,
  e1500391, doi:10.1126/sciadv.1500391. Volltext über Europe PMC gelesen: „vertical-slit pupil of the domestic cat“.
  Runde Hundepupillen sind dort nicht ausdrücklich belegt; die Texte sagen deshalb „auf unseren Karten“.
- AI Unplugged (Lindner, Seegerer, FAU), Lizenz CC BY-NC 3.0, nur als Anregung. Nichts übernommen.

## Adding a chapter or round

1. Den Baustein auf der Karte lesen (`requires`). Was von außerhalb nötig ist, kommt auf eine Sammel-Wiederholung am
   Kapitelanfang.
2. Den Ordner `src/<kapitel>/` mit `chapter.yaml` anlegen und das Kapitel in `chapters` von `src/app.yaml` eintragen.
3. Jede Seite bekommt `competencies: [<id>]`, die Abschnitte `einstieg`/`idee`/`ausprobieren`/`uebung` und Texte als
   Map `{ de, en }`.
4. Neue Tierkarten nur in `src/data/tiere.yaml`. Zahlen und Text `merkmale` müssen übereinstimmen.
   `BeutelAufgabe.test.ts` hat eine Kopie der 12 Karten, die mitgeändert werden muss.
5. Kapitel 2 (9-10):
   - `BeutelSimulation` mit `start` (ein absichtlich einseitiger Beutel) und `neu`.
   - Der Fall läuft als Nachrichtenverlauf eines Schulprojekts, ohne gezeichnete Kinder.
   - Die Jugendlichen suchen den Fehler in den Daten, nicht im Programm.
6. `npx vp check --fix`, `npx --no -- lernapps check`, dann committen.

## Rules learned from mistakes

- Kein Artikel vor einem eingesetzten Etikett. Der erste Entwurf ergab „ist eine Hund“.
- Ein Begriff wird vor seiner ersten Verwendung erklärt (Merkmal und Etikett standen erst nach der Spielanleitung).
- Text mit „: “ in YAML immer in Anführungszeichen (zweimal brach der Build).
- KI nicht über „feste Regeln, immer dasselbe“ abgrenzen: Auch eine trainierte KI antwortet gleich. Fachprüfung.
