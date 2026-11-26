<script setup lang="ts">
// Animal cards of the data file tiere to look at (TierBild.vue for the drawing): a set of them by number, with or
// without their label. Not an exercise. Used for the cards of the card game and its examples.
import { computed } from "vue";
import { sorteVon, type Tier } from "./Beutel.ts";
import TierBild from "./TierBild.vue";

const props = defineProps<{
  /** Every card of the data file tiere. */
  tiere: Tier[];
  /** The cards to show: their numbers in the data file, counted from 1, in the order shown. */
  nummern: number[];
  /** Whether the label shows beside the name. */
  etikett: boolean;
  /** The names of the two labels. */
  katze: string;
  hund: string;
}>();

const karten = computed(() => props.nummern.map((n) => props.tiere[n - 1]).filter((t): t is Tier => t !== undefined));
const sorte = (t: Tier) => (sorteVon(t) === "katze" ? props.katze : props.hund);
</script>

<template>
  <ul class="tierkarten">
    <li v-for="tier in karten" :key="tier.name">
      <TierBild v-bind="tier" />
      <span class="tierkarten-text">
        <span class="tierkarten-name"
          >{{ tier.name }}<template v-if="etikett"> · {{ sorte(tier) }}</template></span
        >
        <span class="tierkarten-merkmale">{{ tier.merkmale }}</span>
      </span>
    </li>
  </ul>
</template>

<style scoped>
.tierkarten {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.tierkarten li {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 0.75rem;
  align-items: start;
  padding: 0.5rem;
  border: 2px solid var(--page-border);
  border-radius: 0.5rem;
}

.tierkarten-text {
  display: flex;
  flex-direction: column;
}

.tierkarten-name {
  font-weight: bold;
}

.tierkarten-merkmale {
  color: var(--page-muted);
  font-size: 0.9em;
}
</style>
