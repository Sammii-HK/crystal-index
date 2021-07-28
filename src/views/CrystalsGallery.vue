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
              >
              <!-- @icon-click="searchIconClick" -->
              </b-input>
            </b-field>

            <div class="column is-3">

            </div>
          </div>

        </div>
      </div>
      <div
      v-for="crystal in crystals" 
      :key="crystal.id"
      class="column is-4"
      >
        {{ crystal.name }}
        <figure class="image" @click="selectedCrystal(crystal.id)">
          <b-image
          :src="crystal.image" 
          :alt="crystal.name"
          ratio="1by1"
          />
        </figure>
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
  methods: {
    selectedCrystal(id) {
      this.$router.push(`/crystals/${id}`)
    },
  },
}
</script>

<style>

</style>