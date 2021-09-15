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
            <b-taglist v-for="(tagSet, tagSetIndex) in attrs.secondary" :key="tagSet" class="mt-3">
              {{tagSet}}:
              <b-tag v-for="(attr, index) in attrs" :key="index">
                <!-- {{crystal.tagSet.attr}} -->
                {{ crystal[attrs.secondary[tagSetIndex]] }}
              </b-tag>
            </b-taglist>
          </div>
          <div class="mt-4">
            <p v-for="attr in attrs.primary" :key="attr" class="mt-6">
              {{attr}}: {{crystal[attr]}}
            </p>
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
  tags: ['colour', 'chakra'],
  locations: ['origin', 'memento'],
  dates: ['createdAt'],
  excluded: ['id', 'name', 'image', 'createdAt', 'updatedAt', 'favouritedBy', 'userId', 'originId', 'locationId'],
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
        const key = config.tags.includes(currentAttr.toLowerCase()) ? 'tags' 
        : config.locations.includes(currentAttr.toLowerCase()) ? 'location' 
        : config.excluded.includes(currentAttr.toLowerCase()) ? 'excluded' 
        : config.dates.includes(currentAttr.toLowerCase()) ? 'dates' 
        : 'primary';
        // if is array, then add attr to array, else make array with attr
        acc[key] = Array.isArray(acc[key]) ? acc[key].concat(currentAttr) : [ currentAttr ]
        
        return acc
      }, {}
      )
    },
  updated() {
    
  },
}
</script>

<style>

</style>