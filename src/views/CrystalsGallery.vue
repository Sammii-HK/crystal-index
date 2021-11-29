/* eslint-disable */

<template>
  <div class="container pt-4">
    <div class="columns is-multiline is-mobile">
      <div class="column is-12">
        <div class="columns is-centered">
          <div class="column is-3">
            <b-field>
              <b-input placeholder="Search..."
              type="search"
              icon="magnify"
              icon-clickable
              @input="searchCrystals"
              :value="searchCrystalInput"
              />
            </b-field>

            <div class="column is-3">

            </div>
          </div>

        </div>
      </div>
      
      <div
      v-for="crystal in searchCrystalsResults" 
      :key="crystal.id"
      class="column is-4"
      >
        <figure 
        class="image is-clickable" 
        @click="selectedCrystal(crystal.id)"
        @mouseenter="toggleOverlay(crystal.id, true)"
        @mouseleave="toggleOverlay(crystal.id, false)"
        >
          <b-image
          :src="`https://static.crystalindex.co.uk:8443/crystals/${crystal.id}.jpeg`"
          :alt="crystal.name"
          ratio="1by1"
          />
          <div v-if="activeCrystal == crystal.id"
          class="is-overlay is-flex is-align-items-center is-justify-content-center has-background-transparent-white"
          >
            <p class="subtitle">{{ crystal.name }}</p>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "crystals-gallery",
  data() {
    return {
      hover: false,
      activeCrystal: null,
      searchCrystalsResults: [],
      searchCrystalInput: null,
    }
  },
  computed: {
    ...mapGetters({
      crystals: "crystalsModule/crystals",
    }),
  },
  created() {
    this.$store.dispatch("crystalsModule/getCrystals");
    this.searchCrystalsResults = this.crystals;
  },
  methods: {
    selectedCrystal(id) {
      this.$router.push(`/crystals/${id}`)
    },
    toggleOverlay(id, hover) {
      hover 
      ? this.activeCrystal = id
      : this.activeCrystal = null;
    },
    searchCrystals(e) {
      let searchValue = this.searchCrystalInput = e
      if (!searchValue) return this.crystals;
      const results = this.crystals.filter(crystal => { 
        return (crystal.name && crystal.name.includes(searchValue)) 
          || (crystal.memento && crystal.memento.placeName.includes(searchValue))
          || (crystal.colour && crystal.colour.includes(searchValue))
          || (crystal.chakra && crystal.chakra.includes(searchValue));
      })
      this.searchCrystalsResults = results;
    },

  },
}
</script>

<style>

</style>