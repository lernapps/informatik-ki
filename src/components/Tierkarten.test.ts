import { expect, test } from "vite-plus/test";
import { karten, sorteVon, type Tier } from "./Beutel.ts";

// Tierkarten.vue shows cards by their number in the data file, counted from 1, and their label from sorteVon.
const tier = (name: string, katze: number): Tier => ({
  name,
  katze,
  ohren: katze,
  schnauze: katze,
  groesse: katze,
  pupille: katze,
  merkmale: "",
  fell: 0,
});
const tiere = [tier("Luna", 1), tier("Bruno", 0), tier("Rex", 0)];

test("cards by number, counted from 1, and their labels", () => {
  const gezeigt = [3, 1].map((n) => tiere[n - 1]).filter((t): t is Tier => t !== undefined);
  expect(gezeigt.map((t) => t.name)).toEqual(["Rex", "Luna"]);
  expect(gezeigt.map(sorteVon)).toEqual(["hund", "katze"]);
  expect(karten(tiere, ["Bruno"]).map(sorteVon)).toEqual(["hund"]);
});
