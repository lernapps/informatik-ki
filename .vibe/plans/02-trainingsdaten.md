---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 1 }
---

# Increment: trainingsdaten

<!--
For you, the assistant. One increment of a published app: new competencies, chapters, pages, rounds, questions, or a
correction. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Content method and Retrospective, in the creator's
  language. Delete the comment of a section once the section is filled.
- The first version's decisions stand: archetype, content method, content guide. Never change an earlier plan.
- Work on the branch `increment/<NN>-<short name>`. Until Commit everything is local: push nothing.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Jugendliche der Klassen 9-10 zeigen an einem Beispiel, wie einseitig ausgewählte Trainingsdaten zu systematischen
Fehlern eines lernenden Systems führen, und suchen den Fehler in den Daten, nicht im Programm.

## Key decisions

- Ein Kapitel `schief` mit einer Seite `verzerrte-daten` (Baustein `trainingsdaten`), wie im Auftrag. Keine
  Wiederholungsseite: `maschinelles-lernen` übt die App in Kapitel 1.
- Branch `increment/9-10` (Vorgabe des Orchestrators) statt `increment/<NN>-<name>` der Vorlage.
- Einseitiger Beutel aus den vorhandenen 12 Karten, keine neuen Karten, damit die Übung in Kapitel 1 gleich bleibt:
  Luna, Mimi, Flocke, Minka (kleine Katzen), Bruno, Rex (große Hunde). Durchgerechnet: Krümel und Otto (kleine Hunde)
  werden „Katze“, kein Gleichstand; Waldi, Bella, Sammy, Tiger richtig.
- Fall als Chat der Klasse 9b (Jona, Selin, Mia, alle 14), Textblock mit Zeilen „**Selin:** …“, ohne Zeichnung.
- Echte Folgen in einem Absatz: Buolamwini und Gebru 2018 (Gesichtsanalyse). Keine Bilder von Menschen; Bewertung für
  die Gesellschaft bleibt bei #505.
- `lernapps update` auf tooling 0.20.2 (app-templates 0.24): `BeutelAufgabe` nutzt jetzt `unanswered`.

## Notes

- Kapitel 2 `schief` „Wenn die Daten schief sind“ (9-10): `trainingsdaten` – „Ich kann an einem Beispiel zeigen, wie
  die Auswahl der Trainingsdaten die Ergebnisse eines lernenden Systems beeinflusst, auch durch Verzerrungen.“
  requires `maschinelles-lernen` (in der App, Kapitel 1).
- Quellen:
  - GI-Bildungsstandards 2025, ID-11 (S. 16).
  - BY Realschule IT, Modul 2.7.3: Trainings- und Testdaten, Bias.
  - J. Buolamwini, T. Gebru: Gender Shades, PMLR 81:77-91, 2018, https://proceedings.mlr.press/v81/buolamwini18a.html
    (Abstract gelesen): Die Datensätze IJB-A und Adience bestehen zu 79,6 % und 86,2 % aus Menschen mit heller Haut.
    Die Fehlerquote liegt bei Frauen mit dunkler Haut bei bis zu 34,7 %, bei Männern mit heller Haut bei höchstens
    0,8 %.
- Didaktik: Die Jugendlichen sehen die Fehler (Chat), untersuchen den Beutel, erkennen den Zufall der Auswahl
  (Größe hängt im Beutel mit dem Etikett zusammen) und prüfen in der Simulation, was Ergänzen bewirkt. Fehler, die die
  Rückmeldungen abfangen: „Das Programm ist kaputt“, „Mehr Karten helfen immer“, „Die Maschine weiß, was groß ist“.
- Umfang: nur Technik. Nicht drin: Bewertung, Fairness-Begriffe, Rechtliches (#505).

## Explore

<!--
- All content questions belong here; Plan maps the answers onto the app. Ask; write no code.
- Skip what earlier answers or the app already tell. At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Read the README of the archetype's template (its path is in skill `lernapps-app`): what the app can do now.
      Tell the creator what is new, if it matters for this increment.
- [x] Load the content guide `.agents/skills/app-content/SKILL.md` and read the earlier plans in `.vibe/plans/`: what
      the app teaches, how its content is made, what is open.
- [x] Interview, one topic per question, the creator's words under "Answers": which competencies, chapters or rounds,
      for which school years; hurdles and examples; the amount; any change of look and feel or of terms. No answer:
      ask once more, then write your assumption with "(guess)".
- [x] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [x] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [x] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.
      Creator: Ja, so bauen. increment/9-10 passt. Gender Shades: Zahlen genau wie im Abstract, mit Jahr und Link, neutral formuliert. Den Schluss ziehen die Jugendlichen selbst. Im Browser prüfen, dass eine Änderung des Beutels die alte Rückmeldung entfernt.

### Answers

- Orchestrator (Welle 3): Kapitel 2 „Wenn die Daten schief sind“, Baustein `trainingsdaten`, 9-10; BeutelSimulation mit
  festem, einseitigem Beutel; Fall als Nachrichtenverlauf; Klasse 9b, alle 14; harmloser erfundener Fall, dann ein
  Absatz zu echten Folgen bei Menschen, ohne Bilder; Bewertung in #505.

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [x] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [x] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [x] (skipped: keine neue Komponente: BeutelSimulation mit Prop start; Skizze in .vibe/sketches/seiten.md (Kapitel 2)) Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [x] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Ja, so bauen. increment/9-10 passt. Gender Shades: Zahlen genau wie im Abstract, mit Jahr und Link, neutral formuliert. Den Schluss ziehen die Jugendlichen selbst. Im Browser prüfen, dass eine Änderung des Beutels die alte Rückmeldung entfernt.

### Content method

Seite `schief/verzerrte-daten`, Abschnitte wie im Leitfaden:

- einstieg: Chat (Text) – die Tierheim-Maschine hält kleine Hunde für Katzen; `Tierkarten` zeigt den Beutel mit
  Etiketten; single-choice „Welcher Zusammenhang im Beutel ist Zufall der Auswahl?“ (Größe, nicht Pupillen).
- idee: Erklärung, Definition „Verzerrung (Bias)“, Merke „Fehler in den Daten, nicht im Programm“.
- ausprobieren: `BeutelSimulation` mit `start` = einseitiger Beutel, `neu` = Krümel. Aufträge: Krümel, Otto testen,
  dann einen kleinen Hund ergänzen und neu testen. Keine neue Komponente.
- beispiel: ein Absatz zu Gender Shades mit Link, kein Bild.
- uebung: single-choice (Otto, warum), true-false (Programm schuld?), matching (erfundene Fälle → fehlende Daten),
  ordering (Datenfehler finden), multiple-choice (welche Karten ergänzen). Jede mit `hint`.
- Selbsteinschätzung des Kapitels: matching, ordering, multiple-choice.

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [x] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [x] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [x] Load skill `lernapps-explainer` and the content guide.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Kapitel schief, Seite schief/verzerrte-daten (trainingsdaten), de und en, mit BeutelSimulation (start), Chat, Gender-Shades-Absatz, 5 Übungen; ein Slice, kein Sub-Agent.
<!-- tasks: slices (1 added): one per competency, as written in Plan -->
- [x] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
      Creator: Ja, die nächsten Schritte folgen so: Fachprüfer, Selbsteinschätzung, Inhaltsleitfaden, dann Veröffentlichen. 360 px bitte im selben PR angehen, Kapitel 1 bei 360 px mitprüfen. Tabelle so lassen.
- [x] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [x] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
      as it says. Commit.
- [x] Load skill `lernapps-github`. Push the branch, open the preview pull request and see its checks to green, as it
      says.
- [ ] **Checkpoint:** publish. Show what the increment adds and the preview link. Ask whether it may go online. Stop
      and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: the pull request squash-merged into
      `main`, the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm the new content. Never use a derived address.
- [ ] The app is listed and its entry changes (school years, summary): load skill `lernapps-listing` and write the
      changed entry. Else skip this task.
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it. A push of only `.vibe/` publishes nothing.
- [ ] The entry changed: open the pull request to the catalog as skill `lernapps-listing` says, without asking first,
      and see it to "bestanden". Else skip this task: `npx --no -- lernapps plan skip "entry unchanged"`.
- [ ] **Checkpoint:** list. Tell the creator the result: the pull request and its result, or, when the entry did not
      change, that the catalog takes over the app by itself. Tick it with their reply.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, content guide, messages or answers, and your choice. "None" if none. -->
