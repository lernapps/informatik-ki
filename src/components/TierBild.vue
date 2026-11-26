<script setup lang="ts">
// The drawing of one animal card (TierBild.ts), without text: decorative, because the card names its features in
// text beside it. Used by Tierkarten, BeutelSimulation and BeutelAufgabe.
import { computed } from "vue";
import { form } from "./TierBild.ts";

const props = defineProps<{
  ohren: number;
  schnauze: number;
  groesse: number;
  pupille: number;
  fell: number;
}>();

const f = computed(() => form(props));
</script>

<template>
  <svg class="tier-bild" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="118" height="118" rx="10" class="tier-bild-grund" />
    <g
      :transform="`translate(60 64) scale(${f.skala}) translate(-60 -64)`"
      stroke="#333"
      stroke-width="2.5"
      stroke-linejoin="round"
    >
      <path v-for="(d, i) in f.ohren" :key="i" :d="d" :fill="f.fell" />
      <ellipse cx="60" cy="62" rx="32" ry="30" :fill="f.fell" />
      <ellipse v-bind="f.schnauze" fill="#f6eee4" />
      <circle cx="47" cy="56" r="7" :fill="f.iris" />
      <circle cx="73" cy="56" r="7" :fill="f.iris" />
      <ellipse cx="47" cy="56" v-bind="f.pupille" fill="#111" stroke="none" />
      <ellipse cx="73" cy="56" v-bind="f.pupille" fill="#111" stroke="none" />
      <ellipse :cx="f.nase.cx" :cy="f.nase.cy" rx="5" ry="3.5" fill="#333" stroke="none" />
    </g>
  </svg>
</template>

<style scoped>
.tier-bild {
  display: block;
  width: 100%;
  max-width: 7rem;
  height: auto;
}

/* the card's ground: light in both modes, so that the drawn colours keep their contrast */
.tier-bild-grund {
  fill: #fbf8f1;
  stroke: #333;
  stroke-width: 2;
}
</style>
