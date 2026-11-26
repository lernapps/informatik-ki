// The logic of BeutelAufgabe.vue: the learner fills the training bag with at most four cards so that the machine
// (Beutel.ts, nearest neighbour) labels three test animals right. Pure functions, which the build tests over fixed
// seeds (the exercise contract). A task is the three test animals, drawn from the data file tiere; they cannot go into
// the bag. An answer is the names of the cards in the bag. Every bag that labels all three right is right: the check
// tests that property, not a model solution. A wrong bag is told which test animal goes wrong and with which card it
// is mixed up, so that guessing does not get far.

import { fuelle, karten, klassifiziere, sorteVon, type Tier, vergleiche, WEISS_NICHT, zufall } from "./Beutel.ts";

/** The most cards the bag may hold. */
export const MAX = 4;

/** The props the logic needs; all texts are the app's, by language. */
export interface Props {
  /** Every card of the data file tiere. */
  tiere: Tier[];
  /** The task, with {max} for the most cards. */
  task: string;
  /** The heading above the test animals. */
  testTitel: string;

  /** The names of the two labels. */
  katze: string;
  hund: string;
  /** The message for an empty bag. */
  leer: string;
  /** The message for a bag with more than {max} cards. */
  zuViele: string;
  /** The message for a bag without a cat, and without a dog; {tier} names a test animal of that kind. */
  keineKatze: string;
  keinHund: string;
  /** A test animal labelled wrong: {tier}, its wrong label {falsch}, the most similar card {karte}, {n} shared features. */
  verwechselt: string;
  /** A test animal the machine does not know: {tier}, a cat {katzeKarte} and a dog {hundKarte} equally similar, {n}. */
  gleichstand: string;
}

/** The three test animals and the cards the learner may put into the bag (all others), so that check needs no props. */
export interface Task {
  testtiere: Tier[];
  karten: Tier[];
}

/** The names of the cards in the bag. */
export type Answer = string[];

/** Every bag of 1 to MAX cards of `liste`, smallest first. */
function beutelAus(liste: readonly Tier[]): Tier[][] {
  const out: Tier[][] = [];
  const add = (start: number, bag: Tier[]) => {
    if (bag.length > 0) out.push(bag);
    if (bag.length === MAX) return;
    for (let i = start; i < liste.length; i++) add(i + 1, [...bag, liste[i] as Tier]);
  };
  add(0, []);
  return out.sort((a, b) => a.length - b.length);
}

/** Whether the bag labels every test animal of the task right. */
function richtig(task: Task, bag: readonly Tier[]): boolean {
  return task.testtiere.every((t) => klassifiziere(bag, t) === sorteVon(t));
}

/** The smallest right bag, or undefined when there is none. */
function loesung(task: Task): Tier[] | undefined {
  return beutelAus(task.karten).find((bag) => richtig(task, bag));
}

/** A mixed card: its features are neither all those of most cats nor all those of most dogs on our cards. */
const gemischt = (t: Tier) => {
  const sum = t.ohren + t.schnauze + t.groesse + t.pupille;
  return sum > 0 && sum < 4;
};

/**
 * Whether the plainest bag fails: the first card of the bag choice with all cat values and the first with all dog
 * values. A task it solves would need no thought about which examples go into the bag.
 */
const knifflig = (task: Task) => {
  const katze = task.karten.find((t) => sorteVon(t) === "katze" && t.ohren + t.schnauze + t.groesse + t.pupille === 4);
  const hund = task.karten.find((t) => sorteVon(t) === "hund" && t.ohren + t.schnauze + t.groesse + t.pupille === 0);
  return katze === undefined || hund === undefined || !richtig(task, [katze, hund]);
};

/** The task of `tiere` with these test animals. */
const aufgabeMit = (tiere: readonly Tier[], tests: readonly Tier[]): Task => ({
  testtiere: [...tests],
  karten: tiere.filter((t) => !tests.includes(t)),
});

/** The task of `seed`: three test animals, a cat and a dog among them, a mixed one, a plain bag failing, a right bag. */
export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  for (let attempt = 0; attempt < 200; attempt++) {
    const rest = [...props.tiere];
    const drawn: Tier[] = [];
    while (drawn.length < 3 && rest.length > 0) drawn.push(...rest.splice(Math.floor(next() * rest.length), 1));
    const task = aufgabeMit(props.tiere, drawn);
    const sorten = new Set(drawn.map((t) => sorteVon(t)));
    if (sorten.size === 2 && drawn.some(gemischt) && knifflig(task) && loesung(task) !== undefined) return task;
  }
  return aufgabeMit(props.tiere, karten(props.tiere, ["Krümel", "Luna", "Rex"]));
}

/** The cards of the bag, or undefined when a name is unknown, a test animal or twice in the bag. */
function beutel(task: Task, answer: Answer): Tier[] | undefined {
  if (new Set(answer).size !== answer.length) return undefined;
  const bag = answer.map((n) => task.karten.find((t) => t.name === n));
  return bag.every((t) => t !== undefined) ? (bag as Tier[]) : undefined;
}

/** Whether the bag has 1 to MAX allowed cards and labels all three test animals right. */
export function check(task: Task, answer: Answer): boolean {
  const bag = beutel(task, answer);
  return bag !== undefined && bag.length > 0 && bag.length <= MAX && richtig(task, bag);
}

/** A right answer: the smallest right bag. */
export function solution(task: Task): Answer {
  return (loesung(task) ?? []).map((t) => t.name);
}

/** A bag of two cards of one kind only: it labels every test animal of the other kind wrong. */
const einerSorte = (task: Task, sorte: string): Answer =>
  task.karten
    .filter((t) => sorteVon(t) === sorte)
    .slice(0, 2)
    .map((t) => t.name);

/** A wrong answer: only cats in the bag. */
export function wrong(task: Task): Answer {
  return einerSorte(task, "katze");
}

/** The answer of each typical mistake of about.mistakes: only cats, only dogs, a bag that mixes up an animal (none fixed). */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  return [einerSorte(task, "katze"), einerSorte(task, "hund"), undefined];
}

const sorteName = (props: Props, sorte: string) => (sorte === "katze" ? props.katze : props.hund);

/** The message for one test animal the bag labels wrong, or undefined when it labels it right. */
function fehler(tier: Tier, bag: readonly Tier[], props: Props): string | undefined {
  const v = vergleiche(bag, tier);
  if (v.antwort === sorteVon(tier)) return undefined;
  if (!bag.some((t) => sorteVon(t) === sorteVon(tier)))
    return fuelle(sorteVon(tier) === "katze" ? props.keineKatze : props.keinHund, { tier: tier.name });
  if (v.antwort === WEISS_NICHT) {
    const katzeKarte = v.naechste.find((t) => sorteVon(t) === "katze")?.name ?? "";
    const hundKarte = v.naechste.find((t) => sorteVon(t) === "hund")?.name ?? "";
    return fuelle(props.gleichstand, { tier: tier.name, katzeKarte, hundKarte, n: v.bestes });
  }
  return fuelle(props.verwechselt, {
    tier: tier.name,
    falsch: sorteName(props, v.antwort),
    karte: v.naechste[0]?.name ?? "",
    n: v.bestes,
  });
}

/**
 * The app's message for a wrong bag: that it is empty or too full, else every test animal it labels wrong, each with
 * the card it is mixed up with, so that the learner can fix the bag without guessing. A missing kind is named once.
 */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const bag = beutel(task, answer);
  if (bag === undefined) return undefined;
  if (bag.length === 0) return props.leer;
  if (bag.length > MAX) return fuelle(props.zuViele, { max: MAX });
  const meldungen = [...new Set(task.testtiere.map((tier) => fehler(tier, bag, props)))].filter(
    (m): m is string => m !== undefined,
  );
  // a missing kind is said once, for its first test animal
  const ohne = (text: string) => text.split("{tier}")[0] ?? text;
  const gesehen = new Set<string>();
  const eindeutig = meldungen.filter((m) => {
    for (const art of [props.keineKatze, props.keinHund])
      if (m.startsWith(ohne(art))) {
        if (gesehen.has(art)) return false;
        gesehen.add(art);
      }
    return true;
  });
  return eindeutig.length === 0 ? undefined : eindeutig.join(" ");
}

/** The test animals as text: name, label and features. */
const testText = (task: Task, props: Props) =>
  task.testtiere.map((t) => `${t.name} (${sorteName(props, sorteVon(t))}: ${t.merkmale})`).join("; ");

/** The task as a learner sees it, with its test animals, and a right bag. */
export function describe(task: Task, props: Props, lang: string): { task: string; solution: string } {
  const inBag = (loesung(task) ?? []).map((t) => `${t.name} (${sorteName(props, sorteVon(t))})`).join(", ");
  const solution =
    lang === "en"
      ? `For example the bag ${inBag}: with it the machine names all three test animals correctly.`
      : `Zum Beispiel der Beutel ${inBag}: Damit benennt die Maschine alle drei Testtiere richtig.`;
  return { task: `${template(props, lang).replace("{testtiere}", testText(task, props))}`, solution };
}

/** The task once, with {testtiere} for the three test animals. */
export function template(props: Props, _lang: string): string {
  return `${fuelle(props.task, { max: MAX })} ${props.testTitel}: {testtiere}`;
}

/** What sets a task: the three test animals with their labels and features. */
export function params(task: Task, props: Props, _lang: string): Record<string, string> {
  return { testtiere: testText(task, props) };
}

/** A bag as text. */
export function show(answer: Answer, _task?: Task, _props?: Props, lang?: string): string {
  if (answer.length === 0) return lang === "en" ? "empty bag" : "leerer Beutel";
  return (lang === "en" ? "bag: " : "Beutel: ") + answer.join(", ");
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Drei Testtiere aus dem Tierheim sind gegeben. Das Kind legt höchstens 4 der anderen Tierkarten in den Trainingsbeutel und drückt „Prüfen“. Die Maschine sucht für jedes Testtier die Karte im Beutel mit den meisten gleichen Merkmalen (Ohren, Schnauze, Größe, Pupille) und gibt ihr Etikett.",
    en: "Three test animals from the animal shelter are given. The child puts at most 4 of the other animal cards into the training bag and presses “Check”. For each test animal the machine looks for the card in the bag with the most features in common (ears, snout, size, pupils) and gives its label.",
  },
  answer: {
    de: "Die Karten im Beutel; welche es sind, ist egal, solange die Maschine alle drei Testtiere richtig benennt.",
    en: "The cards in the bag; which ones does not matter, as long as the machine names all three test animals correctly.",
  },
  correct: {
    de: "Richtig, wenn 1 bis 4 Karten im Beutel sind und die Maschine jedes Testtier richtig als Hund oder Katze erkennt, ohne Gleichstand.",
    en: "Right if the bag holds 1 to 4 cards and the machine labels every test animal correctly as a dog or a cat, with no tie.",
  },
  mistakes: [
    {
      de: "Nur Katzen im Beutel: Die Maschine kann dann nur „Katze“ sagen.",
      en: "Only cats in the bag: then the machine can only say “cat”.",
    },
    {
      de: "Nur Hunde im Beutel: Die Maschine kann dann nur „Hund“ sagen.",
      en: "Only dogs in the bag: then the machine can only say “dog”.",
    },
    {
      de: "Ein Testtier ähnelt am meisten einer Karte der anderen Sorte, oder einer Katze und einem Hund gleich stark.",
      en: "A test animal is most similar to a card of the other kind, or equally similar to a cat and a dog.",
    },
  ],
};
