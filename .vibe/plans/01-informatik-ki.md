---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: null
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: informatik-ki, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Kinder der Klassen 5-6 finden KI-Anwendungen in ihrem Alltag und trainieren selbst eine Maschine: erst ohne Computer
mit Bildkarten (Hund oder Katze?), dann in einer Simulation mit dem Trainingsbeutel. Sie erklären daran, dass ein
lernendes System seine Regeln aus Beispieldaten bildet, statt dass jemand jede Regel programmiert.

## Key decisions

- Archetyp `explainer`: Der Auftrag (lernapps/apps#493) verlangt einen Explainer im Format 2. Die Kinder brauchen
  Erklärseiten mit Bildern und eine Anleitung für das Kartenspiel, bevor sie üben. Die Simulation ist eine Komponente.
- Strang `informatik/daten`. Beide Bausteine der Welle 1 liegen in diesem Strang, Richtstufe 5-6.
- Welle 1: Kapitel 1 mit Sammel-Wiederholung und 3 Seiten. `maschinelles-lernen` bekommt 2 Seiten: erst ohne
  Computer, dann die Simulation. Kapitel 2 (9-10) ist nur geplant, es kommt später auf `increment/9-10`.
- Verfahren der Simulation (guess, wird mit dem Plan bestätigt): nächster Nachbar über gezählte gleiche Merkmale. Die
  Kinder können es von Hand nachzählen. Die Kartenregel ohne Computer ist ein Entscheidungsbaum mit einer Stufe
  (NRW: „Entscheidungsbaum enaktiv“).
- Sprachen `[de, en]`: Deutsch ist die Ausgangssprache in einfacher Sprache mit „du“. Englisch ist vollständig, in
  Plain English mit „you“.
- Gerüst: `init` lehnt die Sicherheitsprüfung des Auto-Modus ab. Plan und Skills sind deshalb von Hand kopiert, wie
  der Weg ohne `npx` in llms.txt es beschreibt. Gemeldet an den Orchestrator.

## Notes

### Strang und Bausteine

Strang `informatik/daten` (Karte informatik.json, Status `draft`, explainerFocus `strand`). Alle Bausteine sind
Lücken (`practisedBy: []`).

| Kapitel | Seite (Datei) | Baustein | Schritt | requires | opens |
|---|---|---|---|---|---|
| 1 KI im Alltag: Lernen aus Beispielen | `lernen/das-brauchst-du` | recap: information-und-daten, daten-interpretieren | – | – | – |
| 1 | `lernen/ki-im-alltag` | ki-im-alltag | 1 | – | 3 |
| 1 | `lernen/regeln-aus-beispielen` | maschinelles-lernen | 3 | ki-im-alltag, daten-interpretieren | 1 |
| 1 | `lernen/maschine-trainieren` | maschinelles-lernen | 3 | ki-im-alltag, daten-interpretieren | 1 |
| 2 (9-10, später) Wenn die Daten schief sind | `schief/verzerrte-daten` | trainingsdaten | 9-10/1 | maschinelles-lernen | 0 |

Die „Ich kann …“-Sätze stehen wörtlich so in der Karte:

- ki-im-alltag: „Ich kann Beispiele für künstliche Intelligenz aus meinem Alltag nennen, zum Beispiel Empfehlungen,
  Sprach- oder Bilderkennung.“
- maschinelles-lernen: „Ich kann an einem Beispiel erklären, dass ein KI-System aus Beispieldaten Muster lernt, statt
  dass jemand jede Regel programmiert.“
- trainingsdaten: „Ich kann an einem Beispiel zeigen, wie die Auswahl der Trainingsdaten die Ergebnisse eines
  lernenden Systems beeinflusst, auch durch Verzerrungen.“

Wiederholung: `daten-interpretieren` aus #491 steht als Sammel-Wiederholung am Kapitelanfang, mit
`information-und-daten` als Grundlage. Darstellungsformen braucht kein Baustein.

### Quellen (geöffnet und gelesen; Lehrpläne hat ein Hilfsagent gelesen)

- GI: Bildungsstandards Informatik Sek I (Januar 2025), doi:10.18420/rec2025_052, mnu.de-PDF, CC0.
  - Jg. 5-6, S. 19, IS-1: „identifizieren Informatiksysteme aus ihrer persönlichen Lebenswelt“.
  - S. 16, ID-3: „interpretieren Daten, um daraus Information zu gewinnen“.
  - KI kommt in den Standards für 5-6 nicht vor.
  - Jg. 7-10, S. 16, ID-11: „beschreiben den Einfluss der verwendeten Daten bei Anwendung eines Verfahrens des
    maschinellen Lernens“. Passt zu Kapitel 2.
  - Jg. 7-10, S. 17, AL-9: KI-Ansätze an Beispielen beschreiben.
- NRW: Kernlehrplan Informatik Klasse 5 und 6, MSB 2021, Heft 5028.
  - S. 14: KI „bei Empfehlungsdiensten …, bei Assistenzsystemen im Bereich der Sprach- und Bilderkennung“.
  - S. 14: maschinelles Lernen heißt, „aus großen Datenmengen Muster und Gesetzmäßigkeiten abzuleiten“.
  - S. 18: „benennen Anwendungsbeispiele künstlicher Intelligenz aus ihrer Lebenswelt“.
  - S. 18: „stellen das Grundprinzip eines Entscheidungsbaumes enaktiv … dar“.
- Bayern, LehrplanPLUS:
  - Realschule IT, Modul 2.7.3 „Künstliche Intelligenz“: überwachtes Lernen; Trainings- und Testdaten, Bias. Passt zu
    Kapitel 2.
  - Gymnasium 11, Lernbereich 4: k-nächste-Nachbarn, Einfluss der Trainingsdaten.
  - Mittelschule 5/6: kein KI-Thema.
  - **Nicht geprüft:** Gymnasium Natur und Technik 6/7 und Informatik 7, die Seiten leiten auf die Startseite weiter.
- Hessen: Handreichung Schulversuch „Digitale Welt“ (Nov. 2024) enthält kein KI-Thema.
  - **Nicht geprüft:** Entwürfe der Kerncurricula „KI und Digitale Welt“ (HTTP 404).
- Methode:
  - Cover und Hart 1967, „Nearest neighbor pattern classification“, IEEE Trans. Inf. Theory 13(1), S. 21–27,
    doi:10.1109/TIT.1967.1053964. Bibliografie geprüft, Volltext nicht gelesen.
  - AI Unplugged (Lindner, Seegerer, FAU), „Gute-Äffchen-Böse-Äffchen“, CC BY-NC 3.0. Nur als Anregung genutzt; nichts
    übernommen (NC passt nicht zu CC BY 4.0).

### Didaktik

- Leitbild **Trainingsbeutel**: ein Stoffbeutel mit Beispielkarten. Jede Karte zeigt ein gezeichnetes Tier und trägt
  das Etikett Hund oder Katze. Merksatz: „Was in den Beutel kommt, bestimmt, was herauskommt.“
- Geschichte (bis Klasse 6 gezeichnete, erfundene Kinder): Die Klasse 6b (Jona, Selin, Mia, je 11, Aussehen wie in
  `klasse-6b.svg` von informatik-computer) hilft dem Tierheim beim Sortieren von Fundtier-Bildern.
  - S. 1: Wandzeitung „KI bei uns“.
  - S. 2: das Kartenspiel.
  - S. 3: Training der Maschine.
- Tierkarten mit 4 Merkmalen, je zwei Werte, ohne Text im Bild: Ohren (spitz/hängend), Schnauze (kurz/lang), Größe
  (klein/groß), Pupillen (schmal/rund). Hauskatzen haben schmale Pupillen, Hunde runde (vor dem Schreiben zu prüfen).
- Ohne Computer: Die Kinder ziehen Karten aus dem Beutel, suchen eine Regel, die zu allen Beispielen passt, und testen
  sie an neuen Karten.

### Wie die Kinder hinkommen, welcher Fehler abgefangen wird

- ki-im-alltag:
  - Die Kinder sortieren Dinge aus ihrem Tag: KI-Anwendungen (Sprachassistent, Fotos nach Tieren sortieren,
    Video-Empfehlungen, Übersetzer) und fest programmierte Geräte (Taschenrechner, Wecker, Ampel).
  - Merkmal: Die Anwendung erkennt oder schlägt vor, und das hat sie an vielen Beispielen gelernt.
  - Fehler: „Alles mit Computer ist KI“, „KI ist immer ein Roboter“, „KI denkt wie ein Mensch“.
- maschinelles-lernen, S. 2:
  - Die Kinder leiten selbst eine Regel aus Beispielkarten ab und vergleichen: programmierte Regel (ein Mensch schreibt
    sie) gegen gelernte Regel (sie kommt aus den Beispielen).
  - Fehler: „Die Maschine weiß von selbst, was eine Katze ist“, „Jemand hat jede Regel eingetippt“, „Eine Regel, die
    zu den Beispielen passt, stimmt immer“.
- maschinelles-lernen, S. 3:
  - Die Kinder füllen in der Simulation den Beutel und sagen voraus, was die Maschine meldet. Sie zählen dafür die
    gleichen Merkmale.
  - Dann füllen sie den Beutel so, dass alle Testtiere richtig erkannt werden.
  - Fehler: „Ohne Katzen im Beutel erkennt sie trotzdem Katzen“, „Ein einziges Beispiel reicht“, „Die Maschine
    rät“.

### Umfang

- Drin:
  - KI-Beispiele aus dem Alltag, ohne Marken.
  - Überwachtes Lernen am Beispiel Hund/Katze, mit 4 Merkmalen.
  - Nächster Nachbar mit gezählten Merkmalen.
- Pool: 12 bis 16 gezeichnete Tierkarten in `src/data/tiere.yaml`.
- Nicht drin: Chancen und Risiken (#505); Darstellung von Daten (#491); neuronale Netze; Verzerrung (Kapitel 2).
- Sprachen: de und en, je ein vollständiger Seitenbaum.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [ ] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
<!-- archetype: explore -->
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
<!-- archetype: explore-structure -->
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

### Answers

Der Auftrag lernapps/apps#493 und die Antworten des Orchestrators stehen für den Ersteller.

- Goal: Auftrag #493, Kapitel 1: KI-Anwendungen erkennen; erklären, dass ein lernendes System aus Beispieldaten Regeln bildet.
- Learners: Informatik, Klasse 5-6; Vorwissen Daten (#491), wiederholt am Kapitelanfang.
- Model and focus: informatik-computer (#490) als Muster; Schwerpunkt: selbst eine Maschine trainieren.
- Hurdles: siehe Notes, „Welcher Fehler abgefangen wird“.
- Content: ich, aus der Karte und den Quellen.
- Amount: Welle 1 = Kapitel 1 (5-6); Kapitel 2 (9-10) später auf `increment/9-10`.
- Languages: de und en (Nachtrag 1).
- Look and feel: fixed by the archetype.
- Terms: Trainingsbeutel (training bag), Beispiel, Etikett (label), Merkmal (feature), Trainingsdaten (training data), maschinelles Lernen (machine learning).
- Finding the app: Katalogeintrag macht der Orchestrator.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-<archetype>-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
<!-- archetype: plan -->
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

- Seiten und Abschnitte: `.vibe/sketches/seiten.md`. Abschnitts-ids `einstieg`, `idee`, `beispiel`, `ausprobieren`
  (nur mit Bedienelement), `uebung`. Jede Seite beginnt mit einer leichten Frage zur Szene und endet mit einem
  Ausblick auf die nächste Seite.
- Muster:
  - **Zuordnen** (`matching`): Anwendung → was sie erkennt oder vorschlägt (S. 1); Karte → Antwort der Regel (S. 2).
  - **Erkennen** (`multiple-choice`, `number`): Wo steckt KI? Wie viele Dinge der Wandzeitung (S. 1).
  - **Urteilen** (`true-false`): Fehlvorstellung als Satz, der Grund steht in der Rückmeldung (alle Seiten).
  - **Ordnen** (`ordering`): Schritte des Lernens aus Beispielen (S. 2).
  - **Erklären** (`single-choice`): programmierte gegen gelernte Regel, mit Hintergrund in jeder falschen Option
    (S. 2).
  - **Zählen** (`generated`): zwei Karten aus `tiere.yaml`, gleiche Merkmale zählen. Antwort
    `4 - (a.ohren-b.ohren)*(a.ohren-b.ohren) - …` (0/1-Werte). Fehler: „unterschiedliche gezählt“ (4 − Antwort);
    nur bei mindestens 1 Unterschied (S. 3).
  - **Vorhersagen** (`single-choice`): Was sagt die Maschine bei diesem Beutel? (S. 3)
  - **Beutel füllen** (Übungskomponente `BeutelAufgabe`): Es gilt jeder Beutel mit höchstens 4 Karten, der alle 3
    Testtiere richtig benennt. Geprüft wird die Eigenschaft, keine Musterlösung. Rückmeldung je Fehler: keine Katze
    im Beutel, kein Hund im Beutel, Testtier n hat sein ähnlichstes Beispiel bei der falschen Sorte, Gleichstand,
    leerer Beutel (S. 3).
- Daten: `src/data/tiere.yaml`, 12 Karten (K1–K5 Katzen, H1–H7 Hunde). Felder: `id`, `sorte` (hund/katze), `ohren`,
  `schnauze`, `groesse`, `pupille` (0/1), Fell- und Farbwerte für die Zeichnung, Texte der Merkmale in de und en.
  Jede Karte gibt es nur dort.
- Bilder:
  - Eigene SVGs ohne Text: `klasse-6b.svg` (defs kopiert aus informatik-computer, mit Herkunft im Kopf),
    `wandzeitung.svg`, `trainingsbeutel.svg`.
  - Tierkarten zeichnet die Komponente aus den Merkmalen. Texte stehen nur im HTML (Props in de und en).
- Komponenten (warum kein Block reicht: Karten wählen und die Maschine live antworten lassen kann kein Block):
  - `Tierkarten` (Anzeige): Karten aus `tiere.yaml`.
  - `BeutelSimulation` (Anzeige, frei bedienbar): zeigt die Tabelle mit gleichen Merkmalen und die Antwort.
  - `BeutelAufgabe` (Übung): siehe oben.
  - Logik in `Beutel.ts`, getestet in `*.test.ts`. Tastatur: echte Knöpfe, `aria-pressed`, `aria-live` nur für die
    Antwort der freien Simulation.
  - Kann nicht: echte Fotos erkennen, mehr als 4 Merkmale, Gewichte.
- Verfahren: nächster Nachbar (k = 1, Cover & Hart 1967) über die Zahl gleicher Merkmale. Bei Gleichstand zwischen
  Hund und Katze antwortet die Maschine „Ich weiß es nicht“. Für die Kinder: Die Maschine sucht im Beutel das
  ähnlichste Beispiel. Beim Kartenspiel finden die Kinder dagegen eine Regel (Entscheidungsbaum mit einer Frage).
  Gemeinsamer Merksatz: Beide lernen nur aus dem, was im Beutel ist.
- Ein späteres Kapitel (9-10, `schief/`): `BeutelSimulation` mit Prop `start` (fester, einseitiger Beutel). Neue
  Karten nur in `tiere.yaml`.
<!-- archetype: content-method -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype <archetype>`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-<archetype>`.
<!-- archetype: code-start -->
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] Musterseite `lernen/maschine-trainieren` mit `tiere.yaml`, `Beutel.ts`, `Tierkarten`, `BeutelSimulation`,
      `BeutelAufgabe` und Tests, de und en; Entwurfs-PR `work` → `main` für die Vorschau.
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
- [ ] Seite `lernen/regeln-aus-beispielen` (Kartenspiel, Anleitung, Trainingsbeutel-Bild), de und en.
- [ ] Seite `lernen/ki-im-alltag` mit `wandzeitung.svg`, de und en.
- [ ] Sammel-Wiederholung `lernen/das-brauchst-du`, de und en.
- [ ] Zwei Prüfer als Subagenten (Lernende 5-6 in beiden Sprachen; Fachprüfer Informatik/ML), Funde einarbeiten.
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

<!-- archetype: commit-start -->
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
