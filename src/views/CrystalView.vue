/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-6" >
          <figure class="image">
            <b-image
            :src="crystal.image" 
            :alt="crystal.name"
            ratio="1by1"
            />
          </figure>
        </div>
        <div class="column is-4 is-offset-1" >
          <p class="title mt-0 mb-6">{{ crystal.name }}</p>
          <div>
            <b-taglist class="mt-3">
              <b-tag v-for="colour in crystal.colour" :key="colour">
                {{colour}}
              </b-tag>
            </b-taglist>

            <b-taglist class="mt-4">
              <b-tag v-for="chakra in crystal.chakra" :key="chakra">
                {{chakra}}
              </b-tag>
            </b-taglist>

          </div>
          <div class="mt-4">
            <p class="mt-6">{{crystal.bio}}</p>
            <p class="mt-6">Origin: {{crystal.origin.placeName}}</p>
            <p class="mt-6">Memento: {{crystal.memento.placeName}}</p>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const config = {
  // Attributes to be placed in the dropdown list
  secondary: ['colour', 'chakra'],
  excluded: ['id', 'image']
}

export default {
  name: "crystals-view",
  data() {
    return {
      crystalId: null,
      attrs: [],
    }
  },
  computed: {
    ...mapGetters([
      "crystal",
    ])
  },
  mounted() {
    this.crystalId = this.$route.params.id
    this.loadCrystal(this.crystalId)    
    this.attrs = this.hierarchizeAttributes(Object.keys(this.crystal))
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getCrystal: 'getCrystal',
    }),
    async loadCrystal(id) {
      await this.$store.dispatch("getCrystal", id);
    },
    // Organise attrs into main attrs and tag attrs
    hierarchizeAttributes(attrs) {
      return attrs.reduce((acc, currentAttr) => {
        const key = config.secondary.includes(currentAttr.toLowerCase()) ? 'secondary' : 'primary';
        acc[key] = Array.isArray(acc[key]) ? acc[key].concat(currentAttr) : [ currentAttr ]

        return acc
      }, {})
    },
  updated() {
    
  },
}
</script>

<style>

</style>