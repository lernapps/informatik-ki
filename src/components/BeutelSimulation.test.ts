import { expect, test } from "vite-plus/test";
import { gleicheMerkmale, karten, klassifiziere, type Tier, vergleiche, WEISS_NICHT } from "./Beutel.ts";

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
const luna = tier("Luna", "katze", "1111");
const bruno = tier("Bruno", "hund", "0000");
const kruemel = tier("Krümel", "hund", "1110");
const rex = tier("Rex", "hund", "1000");
const tiger = tier("Tiger", "katze", "1101");

test("the machine counts the features two cards share", () => {
  expect(gleicheMerkmale(luna, luna)).toBe(4);
  expect(gleicheMerkmale(luna, bruno)).toBe(0);
  expect(gleicheMerkmale(luna, kruemel)).toBe(3);
});

test("the label of the most similar card wins: a small dog with pointed ears looks like a cat to a plain bag", () => {
  expect(klassifiziere([luna, bruno], kruemel)).toBe("katze");
  expect(klassifiziere([luna, bruno, kruemel], tier("Neu", "hund", "1110"))).toBe("hund");
  const v = vergleiche([luna, bruno], kruemel);
  expect(v.zeilen.map((z) => z.gleich)).toEqual([3, 1]);
  expect(v.naechste).toEqual([luna]);
});

test("a tie of a cat and a dog, and an empty bag: the machine does not know", () => {
  // Sammy 1100 shares 3 features with Tiger (a cat) and 3 with Rex (a dog)
  expect(klassifiziere([tiger, rex], tier("Sammy", "hund", "1100"))).toBe(WEISS_NICHT);
  expect(klassifiziere([luna, bruno], tier("Mitte", "hund", "1100"))).toBe(WEISS_NICHT);
  expect(klassifiziere([], luna)).toBe(WEISS_NICHT);
});

test("only the bag decides: without a dog in it, every animal is a cat", () => {
  for (const t of [bruno, kruemel, rex]) expect(klassifiziere([luna, tiger], t)).toBe("katze");
});

test("cards by name, in the order asked", () => {
  expect(karten([luna, bruno, rex], ["Rex", "Luna", "Nobody"])).toEqual([rex, luna]);
});
