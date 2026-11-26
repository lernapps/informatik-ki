<script setup lang="ts">
// The training bag to try out (Beutel.ts): the learner puts animal cards into the bag or takes them out, chooses a new
// animal, and sees how the machine compares it with every card in the bag and which label it gives. Not an exercise:
// it checks nothing. The start bag and the new animal come from the page; a later chapter gives a one-sided bag.
import { computed, ref } from "vue";
import { fuelle, karten, sorteVon, type Tier, vergleiche, WEISS_NICHT } from "./Beutel.ts";
import TierBild from "./TierBild.vue";

const props = defineProps<{
  /** Every card of the data file tiere. */
  tiere: Tier[];
  /** The names of the cards in the bag at the start. */
  start: string[];
  /** The name of the new animal at the start. */
  neu: string;
  /** The names of the two labels. */
  katze: string;
  hund: string;
  /** The heading above the cards, the label of the bag, of the button that puts a card in, and that takes it out. */
  kartenTitel: string;
  beutelTitel: string;
  hinein: string;
  heraus: string;
  /** The text in an empty bag. */
  leer: string;
  /** The label of the choice of the new animal. */
  neuTitel: string;
  /** The column heads of the comparison: card, label, features in common. */
  spalten: string[];
  /** The mark beside the most similar cards, for screen readers and as a second mark besides the bold row. */
  naechste: string;
  /** The machine's answer, with {tier} and {antwort}; when it does not know, with {tier}; for an empty bag. */
  antwort: string;
  weissNicht: string;
  antwortLeer: string;
  /** What the shelter knows about the new animal, with {tier} and {sorte}. */
  wahrheit: string;
  /** Back to the start bag. */
  zuruecksetzen: string;
}>();

const sorte = (t: Tier) => (sorteVon(t) === "katze" ? props.katze : props.hund);

const imBeutel = ref<string[]>([...props.start]);
const neuName = ref(props.neu);
const beutel = computed(() => karten(props.tiere, imBeutel.value));
const neuesTier = computed(() => props.tiere.find((t) => t.name === neuName.value));
const vergleich = computed(() => (neuesTier.value ? vergleiche(beutel.value, neuesTier.value) : undefined));
const satz = computed(() => {
  const tier = neuesTier.value;
  const v = vergleich.value;
  if (!tier || !v) return "";
  if (beutel.value.length === 0) return props.antwortLeer;
  if (v.antwort === WEISS_NICHT) return fuelle(props.weissNicht, { tier: tier.name });
  return fuelle(props.antwort, { tier: tier.name, antwort: v.antwort === "katze" ? props.katze : props.hund });
});

function umschalten(tier: Tier): void {
  if (imBeutel.value.includes(tier.name)) imBeutel.value = imBeutel.value.filter((n) => n !== tier.name);
  else {
    imBeutel.value = [...imBeutel.value, tier.name];
    // the new animal cannot be an example in the bag at the same time: choose the first card outside the bag
    if (tier.name === neuName.value)
      neuName.value = props.tiere.find((t) => !imBeutel.value.includes(t.name))?.name ?? "";
  }
}

function zurueck(): void {
  imBeutel.value = [...props.start];
  neuName.value = props.neu;
}
</script>

<template>
  <div class="beutel-sim">
    <p class="beutel-sim-titel">{{ kartenTitel }}</p>
    <ul class="beutel-sim-karten">
      <li v-for="tier in tiere" :key="tier.name" :class="{ 'beutel-sim-drin': imBeutel.includes(tier.name) }">
        <TierBild v-bind="tier" />
        <span class="beutel-sim-text">
          <span class="beutel-sim-name">{{ tier.name }} · {{ sorte(tier) }}</span>
          <span class="beutel-sim-merkmale">{{ tier.merkmale }}</span>
        </span>
        <button type="button" :aria-pressed="imBeutel.includes(tier.name)" @click="umschalten(tier)">
          {{ imBeutel.includes(tier.name) ? heraus : hinein }}<span class="sr-name"> {{ tier.name }}</span>
        </button>
      </li>
    </ul>

    <div class="beutel-sim-beutel">
      <p class="beutel-sim-titel">{{ beutelTitel }}</p>
      <p v-if="beutel.length === 0">{{ leer }}</p>
      <ul v-else class="beutel-sim-liste">
        <li v-for="tier in beutel" :key="tier.name">{{ tier.name }} ({{ sorte(tier) }})</li>
      </ul>
    </div>

    <label class="beutel-sim-wahl">
      <span>{{ neuTitel }}</span>
      <select v-model="neuName">
        <option v-for="tier in tiere.filter((t) => !imBeutel.includes(t.name))" :key="tier.name" :value="tier.name">
          {{ tier.name }}
        </option>
      </select>
    </label>

    <div v-if="neuesTier" class="beutel-sim-neu">
      <TierBild v-bind="neuesTier" />
      <span>{{ neuesTier.name }}: {{ neuesTier.merkmale }}</span>
    </div>

    <table v-if="vergleich && beutel.length > 0" class="beutel-sim-tabelle">
      <thead>
        <tr>
          <th v-for="s in spalten" :key="s" scope="col">{{ s }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="zeile in vergleich.zeilen"
          :key="zeile.karte.name"
          :class="{ 'beutel-sim-best': zeile.gleich === vergleich.bestes }"
        >
          <th scope="row">
            {{ zeile.karte.name }}<span v-if="zeile.gleich === vergleich.bestes"> ★ {{ naechste }}</span>
          </th>
          <td>{{ sorte(zeile.karte) }}</td>
          <td>{{ zeile.gleich }}</td>
        </tr>
      </tbody>
    </table>

    <p class="beutel-sim-antwort" aria-live="polite">{{ satz }}</p>
    <p v-if="neuesTier">{{ fuelle(wahrheit, { tier: neuesTier.name, sorte: sorte(neuesTier) }) }}</p>
    <p>
      <button type="button" @click="zurueck">{{ zuruecksetzen }}</button>
    </p>
  </div>
</template>

<style scoped>
.beutel-sim-karten {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.beutel-sim-karten li {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  grid-template-areas: "bild text" "knopf knopf";
  gap: 0.25rem 0.75rem;
  align-items: start;
  padding: 0.5rem;
  border: 2px solid var(--page-border);
  border-radius: 0.5rem;
}

/* a card in the bag: a thick accent frame and the pressed button, not colour alone */
.beutel-sim-karten li.beutel-sim-drin {
  border: 4px double var(--page-accent);
}

.beutel-sim-name,
.beutel-sim-titel {
  font-weight: bold;
}

.beutel-sim-merkmale {
  color: var(--page-muted);
  font-size: 0.9em;
}

button {
  min-height: 44px;
}

button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.beutel-sim-beutel {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 2px dashed var(--page-border);
  border-radius: 1rem;
}

.beutel-sim-liste {
  margin: 0;
}

.beutel-sim-wahl {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.75rem;
}

.beutel-sim-wahl select {
  min-height: 44px;
  max-width: 100%;
}

.beutel-sim-neu {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.5rem;
}

.beutel-sim-neu .tier-bild {
  width: 5rem;
}

.beutel-sim-tabelle {
  margin-top: 0.75rem;
  border-collapse: collapse;
}

.beutel-sim-tabelle th,
.beutel-sim-tabelle td {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--page-border);
  text-align: left;
}

.beutel-sim-best {
  font-weight: bold;
}

.beutel-sim-antwort {
  font-weight: bold;
}

.beutel-sim-text {
  display: flex;
  flex-direction: column;
  grid-area: text;
}

li > button {
  grid-area: knopf;
}

.sr-name {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
