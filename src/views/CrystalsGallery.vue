/* eslint-disable */

<template>
  <div class="container">
    <div class="section">
      <div v-for="crystal in crystals" :key="crystal.id">
        {{ crystal.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "crystals-gallery",
  computed: {
    ...mapGetters([
      "crystals"
    ])
  },
  created() {
    this.$store.dispatch("getCrystals");
  },
}
</script>

<style>

</style>