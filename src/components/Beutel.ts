// The machine of the training bag (Trainingsbeutel): it labels a new animal with the label of the most similar
// example card in the bag (nearest neighbour, k = 1, after Cover and Hart 1967, doi:10.1109/TIT.1967.1053964).
// Similar means: the number of features in which two cards agree. When the most similar cards of the bag carry both
// labels, the machine does not know. Pure functions, shared by BeutelSimulation, BeutelAufgabe and Tierkarten.

/** A card of the data file tiere: features are 1 for the value most cats on our cards have, else 0. */
export interface Tier {
  name: string;
  /** The label: 1 cat, 0 dog. */
  katze: number;
  ohren: number;
  schnauze: number;
  groesse: number;
  pupille: number;
  /** The four features as text, in the order of MERKMALE, in the page's language. */
  merkmale: string;
  /** The number of the fur colour in FELL of TierBild.ts. */
  fell: number;
}

/** The label of a card as the logic names it: "katze" or "hund". */
export const sorteVon = (t: Tier): string => (t.katze === 1 ? "katze" : "hund");

/** The four features, in the order the pages name them. */
export const MERKMALE = ["ohren", "schnauze", "groesse", "pupille"] as const;
export type Merkmal = (typeof MERKMALE)[number];

/** The machine's answer: a label of the bag, or "?" when it does not know (empty bag, or a tie of both labels). */
export type Antwort = string;
export const WEISS_NICHT = "?";

/** How many of the four features two cards share. */
export function gleicheMerkmale(a: Tier, b: Tier): number {
  return MERKMALE.filter((m) => a[m] === b[m]).length;
}

/** The comparison of a new animal with every card of the bag, and the machine's answer. */
export interface Vergleich {
  /** Per card of the bag, in the bag's order: the card and its shared features. */
  zeilen: { karte: Tier; gleich: number }[];
  /** The most shared features of any card in the bag; 0 for an empty bag. */
  bestes: number;
  /** The cards with the most shared features. */
  naechste: Tier[];
  antwort: Antwort;
}

/** Compares `tier` with every card of `beutel` and answers with the label of the most similar ones. */
export function vergleiche(beutel: readonly Tier[], tier: Tier): Vergleich {
  const zeilen = beutel.map((karte) => ({ karte, gleich: gleicheMerkmale(karte, tier) }));
  const bestes = Math.max(0, ...zeilen.map((z) => z.gleich));
  const naechste = zeilen.filter((z) => z.gleich === bestes).map((z) => z.karte);
  const sorten = [...new Set(naechste.map((k) => sorteVon(k)))];
  return { zeilen, bestes, naechste, antwort: sorten.length === 1 ? (sorten[0] ?? WEISS_NICHT) : WEISS_NICHT };
}

/** The machine's answer for `tier` with the cards of `beutel`. */
export const klassifiziere = (beutel: readonly Tier[], tier: Tier): Antwort => vergleiche(beutel, tier).antwort;

/** The cards of `alle` with these names, in the order of `namen`; unknown names are left out. */
export function karten(alle: readonly Tier[], namen: readonly string[]): Tier[] {
  return namen.flatMap((n) => alle.filter((t) => t.name === n));
}

/** A text with {name} placeholders filled in from `werte`. */
export function fuelle(text: string, werte: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (all, key: string) => (key in werte ? String(werte[key]) : all));
}

/** A small seeded random generator (mulberry32), as in ProzentFeld of the template. */
export function zufall(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
