import { expect, test } from "vite-plus/test";
import { sorteVon, type Tier } from "./Beutel.ts";
import { check, describe, generate, MAX, mistakes, reason, solution, wrong } from "./BeutelAufgabe.ts";

const WERTE = [
  ["hängende Ohren", "spitze Ohren"],
  ["lange Schnauze", "kurze Schnauze"],
  ["groß", "klein"],
  ["runde Pupillen", "schmale Pupillen"],
];
const tier = (name: string, sorte: string, f: string): Tier => ({
  name,
  katze: sorte === "katze" ? 1 : 0,
  ohren: Number(f[0]),
  schnauze: Number(f[1]),
  groesse: Number(f[2]),
  pupille: Number(f[3]),
  merkmale: WERTE.map((w, i) => w[Number(f[i])]).join(", "),
  fell: 0,
});
// the cards of src/data/tiere.yaml
const tiere = [
  tier("Luna", "katze", "1111"),
  tier("Mimi", "katze", "1111"),
  tier("Tiger", "katze", "1101"),
  tier("Flocke", "katze", "0111"),
  tier("Minka", "katze", "1011"),
  tier("Bruno", "hund", "0000"),
  tier("Rex", "hund", "1000"),
  tier("Krümel", "hund", "1110"),
  tier("Waldi", "hund", "0010"),
  tier("Otto", "hund", "0110"),
  tier("Bella", "hund", "0100"),
  tier("Sammy", "hund", "1100"),
];
const props = {
  tiere,
  task: "Lege höchstens {max} Karten in den Beutel.",
  testTitel: "Testtiere",
  katze: "Katze",
  hund: "Hund",
  leer: "Der Beutel ist leer.",
  zuViele: "Höchstens {max}.",
  keineKatze: "Keine Katze im Beutel, aber {tier} ist eine.",
  keinHund: "Kein Hund im Beutel, aber {tier} ist einer.",
  verwechselt: "{tier} wird {falsch}: am ähnlichsten ist {karte} mit {n} gleichen Merkmalen.",
  gleichstand: "{tier}: {katzeKarte} und {hundKarte} haben je {n} gleiche Merkmale.",
};

test("every task has a cat and a dog to test, keeps them out of the bag, and has a right bag", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(task.testtiere).toHaveLength(3);
    expect(new Set(task.testtiere.map((t) => sorteVon(t))).size).toBe(2);
    expect(task.karten).toHaveLength(9);
    for (const t of task.testtiere) expect(task.karten).not.toContain(t);
    expect(check(task, solution(task))).toBe(true);
    expect(solution(task).length).toBeLessThanOrEqual(MAX);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task, props)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
    expect(generate(seed, props)).toEqual(task);
  }
});

test("any right bag counts, not only the solution; a test animal, a card twice or too many cards do not", () => {
  const task = generate(1, props);
  expect(task.testtiere.map((t) => t.name)).toEqual(["Krümel", "Luna", "Rex"]);
  expect(check(task, ["Tiger", "Sammy"])).toBe(true);
  expect(check(task, ["Tiger", "Sammy", "Bruno"])).toBe(true);
  expect(check(task, ["Mimi", "Sammy"])).toBe(false);
  expect(check(task, ["Mimi", "Bruno"])).toBe(false);
  expect(check(task, ["Luna", "Sammy"])).toBe(false);
  expect(check(task, ["Tiger", "Tiger", "Sammy"])).toBe(false);
  expect(check(task, ["Tiger", "Sammy", "Bruno", "Waldi", "Otto"])).toBe(false);
  expect(check(task, [])).toBe(false);
});

test("a wrong bag is told which test animal goes wrong and with which card it is mixed up", () => {
  const task = generate(1, props);
  expect(reason(task, ["Mimi", "Bruno"], props)).toBe(
    "Krümel wird Katze: am ähnlichsten ist Mimi mit 3 gleichen Merkmalen.",
  );
  expect(reason(task, ["Mimi", "Tiger"], props)).toBe("Kein Hund im Beutel, aber Krümel ist einer.");
  expect(reason(task, ["Bruno", "Sammy"], props)).toBe("Keine Katze im Beutel, aber Luna ist eine.");
  expect(reason(task, ["Tiger", "Sammy"], props)).toBeUndefined();
  expect(reason(task, [], props)).toBe("Der Beutel ist leer.");
});

test("a tie of a cat and a dog is named", () => {
  const task = { testtiere: [tiere[11] as Tier], karten: [tiere[2] as Tier, tiere[6] as Tier] };
  expect(reason(task, ["Tiger", "Rex"], props)).toBe("Sammy: Tiger und Rex haben je 3 gleiche Merkmale.");
});

test("describe states the task and a right bag", () => {
  const task = generate(1, props);
  expect(describe(task, props, "de").task).toBe(
    "Lege höchstens 4 Karten in den Beutel. Testtiere: Krümel (Hund: spitze Ohren, kurze Schnauze, klein, runde Pupillen); " +
      "Luna (Katze: spitze Ohren, kurze Schnauze, klein, schmale Pupillen); Rex (Hund: spitze Ohren, lange Schnauze, groß, runde Pupillen)",
  );
  expect(describe(task, props, "de").solution).toContain("Tiger (Katze), Sammy (Hund)");
});
