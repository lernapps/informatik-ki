import { expect, test } from "vite-plus/test";
import { form } from "./TierBild.ts";

const katze = { ohren: 1, schnauze: 1, groesse: 1, pupille: 1, fell: 0 };
const hund = { ohren: 0, schnauze: 0, groesse: 0, pupille: 0, fell: 5 };

test("each feature changes its own part of the drawing", () => {
  const k = form(katze);
  const h = form(hund);
  expect(k.skala).toBeLessThan(h.skala);
  expect(k.ohren).not.toEqual(h.ohren);
  expect(k.schnauze.ry).toBeLessThan(h.schnauze.ry);
  expect(k.pupille.ry).toBeGreaterThan(k.pupille.rx);
  expect(h.pupille.ry).toBe(h.pupille.rx);
  expect(form({ ...katze, ohren: 0 }).schnauze).toEqual(k.schnauze);
});
