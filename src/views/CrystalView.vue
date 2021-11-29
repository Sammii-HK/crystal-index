/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-1 is-offset-10 is-flex is-align-items-center is-justify-content-flex-end">
          <div v-if="(authUser.id === crystal.userId) || ((crystal.userId === null) && (authUser.id === 1))">
            <b-button label="Edit" @click="updateCrystal" size="is-small" type="is-violet" class="is-pulled-right" />
          </div>
        </div>
        <div class="column" v-if="authUser">
          <div @click="handleFavouriteCrystals">
            <b-icon 
            class="mdi mdi-heart is-clickable" 
            size="is-large"
            :type="{ 'is-red': isFavourited }"
            />
          </div>
        </div>
        <div class="column is-6-desktop is-8-touch" >
          <figure class="image">
            <b-image
            :src="`https://static.crystalindex.co.uk:8443/crystals/${crystal.id}.jpeg`" 
            :alt="crystal.name"
            ratio="1by1"
            />
          </figure>
        </div>
        <div class="column is-4-desktop is-8-touch is-offset-1" >
          <p class="title mt-0 mb-6 is-capitalized">{{ crystal.name }}</p>
          <div>
            <b-taglist v-for="(tagSet, i) in attrs.tags" :key="tagSet" class="mt-3">
              <span class="mr-3">{{tagSet}}: </span>
              <b-tag v-for="attr in crystal[attrs.tags[i]]" :key="attr" class="mb-0 mt-1">
                {{attr}}
              </b-tag>
            </b-taglist>
          </div>
          <div class="mt-4">
            <p v-for="(attr) in attrs.primary" :key="attr" class="mt-6">
              {{attr}}: {{crystal[attr]}}
            </p>
          </div>
          <div class="mt-4">
            <p 
            v-for="(attr) in attrs.locations" 
            :key="attr" 
            class="mt-6">
              {{attr}}: {{crystal[attr].placeName}}
            </p>
          </div>
          <!-- <div class="has-text-bold is-size-4 mt-4 is-pulled-right mt-6">created by: {{crystal.createdBy.username}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import moment from 'moment'

const config = {
  // Attributes to be displayed in different formats
  tags: ['colour', 'chakra'],
  locations: ['origin', 'memento'],
  dates: ['createdAt'],
  primary: ['bio', 'otherNames']
}

export default {
  name: "crystal-view",
  data() {
    return {
      crystalId: null,
      attrs: {},
    }
  },
  ...mapState({
    crystal: state => state.crystalsModule.crystal,
  }),
  watch: {
    crystal: [ 'filterNullAttrs', 'hierarchizeAttributes' ]
  },
  computed: {
    ...mapGetters({
      crystal: "crystalsModule/crystal",
      authUser: "authModule/authUser",
    }),
    isFavourited() {
      return !!(this.crystal.favouritedBy && this.crystal.favouritedBy.find(user => user.id === this.authUser.id));
    },
  },
  mounted() {
    this.crystalId = this.$route.params.id
    this.loadCrystal(this.crystalId)
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getCrystal: 'crystalsModule/getCrystal',
      updateCrystal: 'crystalsModule/updateCrystal',
    }),
    async loadCrystal(id) {
      await this.$store.dispatch("crystalsModule/getCrystal", id);
    },
    // Organise attrs into main attrs and tag attrs
    hierarchizeAttributes() {
      const attrs = Object.keys(this.filteredAttrs)
      
      this.attrs = attrs.reduce((acc, currentAttr) => {
        const key = this.getKey(currentAttr)
        // if is array, then add attr to array, else make array with attr
        acc[key] = Array.isArray(acc[key]) ? acc[key].concat(currentAttr) : [ currentAttr ]
        return acc
      }, {}
      )
    },
    getKey(currentAttr) {
      if (config.tags.includes(currentAttr.toLowerCase())) return 'tags'
      else if (config.primary.includes(currentAttr.toLowerCase())) return 'primary'
      else if (config.locations.includes(currentAttr.toLowerCase())) return 'locations'
      else if (config.dates.includes(currentAttr.toLowerCase())) return 'dates'
      return 'toExclude'
    },
    filterNullAttrs() {
      const obj = this.crystal
      this.filteredAttrs = Object.keys(obj)
      .filter((k) => obj[k] != null)
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
    },
    updateCrystal() {
      this.$router.push(`/crystals/${this.crystal.id}/update`)
    },
    handleFavouriteCrystals() {
      return this.isFavourited ? this.removeFavourite() : this.addFavourite();
    },
    async removeFavourite() {
      await this.$store.dispatch("favouritesModule/removeFavourite", { userId: this.authUser.id, crystalId: this.crystal.id  });
      this.loadCrystal(this.crystal.id)
    },
    async addFavourite() {
      // const token = this.authUser.credentials
      await this.$store.dispatch("favouritesModule/createFavourite", { userId: this.authUser.id, crystalId: this.crystal.id  });
      this.loadCrystal(this.crystal.id)
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
}
</script>

<style>

</style>