<template>
  <div class="crystal-list">
    <div
    v-for="crystal in crystals"
    :key="crystal.id"
    class="crystal-list--item">
      <CrystalImage :crystal="crystal" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CrystalImage from './CrystalImage'

export default {
  name: "crystal-gallery",
  computed: {
    ...mapGetters([
      'crystals'
    ])
  },
  created() {
    this.$store.dispatch('getCrystals');
  },
  components: {
    CrystalImage,
  }
}
</script>

<style>

</style>