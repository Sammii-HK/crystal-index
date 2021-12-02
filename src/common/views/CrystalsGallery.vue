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

            <!-- <div class="column is-3">

            </div> -->
          </div>

        </div>
      </div>

      <c-image-gallery :images="searchCrystalsResults" />
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CImageGallery from '../components/Organisms/CImageGallery.vue';

export default {
  name: "crystals-gallery",
  data() {
    return {
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
  components: {
    CImageGallery,
  },
}
</script>

<style>

</style>