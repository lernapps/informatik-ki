<script setup lang="ts">
// The exercise "fill the bag" for the task of the number seed (BeutelAufgabe.ts): three test animals with their
// labels, and the other cards with a button each to put them into the training bag, at most four. It emits the names of
// the cards in the bag with answer; the explainer draws "Prüfen", checks and gives the feedback. Before "Prüfen" it shows
// nothing of what the machine would answer.
import { computed, ref } from "vue";
import { fuelle, sorteVon, type Tier } from "./Beutel.ts";
import { generate, MAX } from "./BeutelAufgabe.ts";
import TierBild from "./TierBild.vue";

const props = defineProps<{
  /** Every card of the data file tiere. */
  tiere: Tier[];
  /** The task, with {max}. */
  task: string;
  /** The names of the two labels. */
  katze: string;
  hund: string;
  /** The heading above the test animals, and above the cards to choose from. */
  testTitel: string;
  kartenTitel: string;
  /** The buttons that put a card in and take it out. */
  hinein: string;
  heraus: string;
  /** How full the bag is, with {n} and {max}. */
  zaehler: string;
  /** Empties the bag. */
  leeren: string;
  /** The messages of BeutelAufgabe.ts, for "Prüfen". */
  leer: string;
  zuViele: string;
  keineKatze: string;
  keinHund: string;
  verwechselt: string;
  gleichstand: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the bag gives now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [string[] | undefined] }>();

const aufgabe = computed(() => generate(props.seed, props));
const sorte = (t: Tier) => (sorteVon(t) === "katze" ? props.katze : props.hund);
const imBeutel = ref<string[]>([]);
const voll = computed(() => imBeutel.value.length >= MAX);

function senden(): void {
  emit("answer", imBeutel.value.length === 0 ? undefined : [...imBeutel.value]);
}

function umschalten(tier: Tier): void {
  if (imBeutel.value.includes(tier.name)) imBeutel.value = imBeutel.value.filter((n) => n !== tier.name);
  else if (!voll.value) imBeutel.value = [...imBeutel.value, tier.name];
  senden();
}

function leerenKlick(): void {
  imBeutel.value = [];
  senden();
}
</script>

<template>
  <div class="beutel-aufgabe">
    <p>{{ fuelle(task, { max: MAX }) }}</p>
    <p class="beutel-aufgabe-titel">{{ testTitel }}</p>
    <ul class="beutel-aufgabe-tests">
      <li v-for="tier in aufgabe.testtiere" :key="tier.name">
        <TierBild v-bind="tier" />
        <span class="beutel-aufgabe-name">{{ tier.name }} · {{ sorte(tier) }}</span>
        <span class="beutel-aufgabe-merkmale">{{ tier.merkmale }}</span>
      </li>
    </ul>
    <p class="beutel-aufgabe-titel">{{ kartenTitel }}</p>
    <ul class="beutel-aufgabe-karten" :class="{ 'beutel-aufgabe-checked': checked }">
      <li
        v-for="tier in aufgabe.karten"
        :key="tier.name"
        :class="{ 'beutel-aufgabe-drin': imBeutel.includes(tier.name) }"
      >
        <TierBild v-bind="tier" />
        <span class="beutel-aufgabe-name">{{ tier.name }} · {{ sorte(tier) }}</span>
        <span class="beutel-aufgabe-merkmale">{{ tier.merkmale }}</span>
        <button
          type="button"
          :aria-pressed="imBeutel.includes(tier.name)"
          :disabled="voll && !imBeutel.includes(tier.name)"
          @click="umschalten(tier)"
        >
          {{ imBeutel.includes(tier.name) ? heraus : hinein }}<span class="sr-name"> {{ tier.name }}</span>
        </button>
      </li>
    </ul>
    <p aria-live="polite">{{ fuelle(zaehler, { n: imBeutel.length, max: MAX }) }}</p>
    <p>
      <button type="button" @click="leerenKlick">{{ leeren }}</button>
    </p>
  </div>
</template>

<style scoped>
.beutel-aufgabe-tests,
.beutel-aufgabe-karten {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.beutel-aufgabe-tests li,
.beutel-aufgabe-karten li {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  border: 2px solid var(--page-border);
  border-radius: 0.5rem;
}

.beutel-aufgabe-tests li {
  border-style: dashed;
}

/* a card in the bag: a thick accent frame and the pressed button, not colour alone */
.beutel-aufgabe-karten li.beutel-aufgabe-drin {
  border: 4px double var(--page-accent);
}

.beutel-aufgabe-name,
.beutel-aufgabe-titel {
  font-weight: bold;
}

.beutel-aufgabe-merkmale {
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

.sr-name {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
