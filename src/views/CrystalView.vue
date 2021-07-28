/* eslint-disable */

<template>
  <div class="container pt-4">
    <p class="title mt-4 mb-6">{{ crystal.name }}</p>
    <div class="columns is-multiline is-mobile is-centered">
      <div class="column is-4" >
        <figure class="image">
          <b-image
          :src="crystal.image" 
          :alt="crystal.name"
          ratio="1by1"
          />
        </figure>
        <div class="container mt-6">
          <p>{{crystal.colour}}</p>
          <p>{{crystal.chakra}}</p>

        </div>
      </div>
      <div class="column is-4 is-offset-1" >
        <p>{{crystal.bio}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "crystals-view",
  data() {
    return {
      crystalId: null,
    }
  },
  computed: {
    ...mapGetters([
      "crystal"
    ])
  },
  mounted() {
    this.crystalId = this.$route.params.id
    this.loadCrystal()
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getCrystal: 'getCrystal',
    }),
    loadCrystal() {
      this.$store.dispatch("getCrystal", this.crystalId);
    },
  },
  updated() {
    
  },
}
</script>

<style>

</style>