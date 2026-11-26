// The drawing of an animal card from its four features: pure geometry for TierBild.vue, without text, so that the
// same drawing serves every language. Ears pointed or floppy, snout short or long, size small or large (the head
// drawn smaller or larger on the card), pupils narrow slits or round. The features, not the drawing, carry the
// meaning: every card also names them in text.

import type { Tier } from "./Beutel.ts";

/** The features of a card the drawing needs. */
export type Merkmale = Pick<Tier, "ohren" | "schnauze" | "groesse" | "pupille" | "fell">;

/** The shapes of one drawing, in the coordinates of a 120 × 120 box. */
export interface Form {
  /** Scale of the head about the centre (60, 64): 1 for a large animal, 0.62 for a small one. */
  skala: number;
  /** The ears: two paths. */
  ohren: string[];
  /** The snout: an ellipse below the eyes, and the nose at its tip. */
  schnauze: { cx: number; cy: number; rx: number; ry: number };
  nase: { cx: number; cy: number };
  /** The pupils: width and height of each ellipse. */
  pupille: { rx: number; ry: number };
  /** The colour of the iris: yellow-green for narrow pupils, brown for round ones. */
  iris: string;
  fell: string;
}

/** Pointed ears: triangles on top of the head. */
const SPITZ = ["M30 46 L36 12 L56 34 Z", "M90 46 L84 12 L64 34 Z"];
/** Floppy ears: long lobes hanging down at the sides of the head. */
const HAENGEND = [
  "M34 36 C14 36 10 70 20 84 C30 90 38 70 40 46 Z",
  "M86 36 C106 36 110 70 100 84 C90 90 82 70 80 46 Z",
];

/** The fur colours of the cards, by the number in the field fell of the data file tiere. */
export const FELL = [
  "#9a9a9a",
  "#e8a15a",
  "#c98b3c",
  "#f2f0ea",
  "#5a4636",
  "#8b5a2b",
  "#6b4a2a",
  "#e3c08d",
  "#7a3e1d",
  "#d9c3a0",
  "#3b3b3b",
  "#f4f1e8",
];

/** The shapes of the card of `tier`. */
export function form(tier: Merkmale): Form {
  const kurz = tier.schnauze === 1;
  const schnauze = kurz ? { cx: 60, cy: 80, rx: 13, ry: 9 } : { cx: 60, cy: 88, rx: 15, ry: 20 };
  return {
    skala: tier.groesse === 1 ? 0.62 : 1,
    ohren: tier.ohren === 1 ? SPITZ : HAENGEND,
    schnauze,
    nase: { cx: 60, cy: kurz ? 76 : 100 },
    pupille: tier.pupille === 1 ? { rx: 2.2, ry: 9 } : { rx: 5.5, ry: 5.5 },
    iris: tier.pupille === 1 ? "#c9c23a" : "#8a5a2b",
    fell: FELL[tier.fell] ?? "#9a9a9a",
  };
}
