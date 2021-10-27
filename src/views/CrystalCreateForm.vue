/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-10" >
          <b-taglist v-for="(tagSet) in fields.tags" :key="tagSet" class="my-5">
            <span class="mr-3 has-text-weight-bold">{{tagSet}}: </span>
            <a v-for="(attr, i) in constants[tagSet]" class="mx-2"
            :key="attr" 
            @click="selectTag(tagSet, attr)"
            >
              <b-tag
              class="mb-0 mt-1 is-clickable is-unselectable"
              :type="`is-${constants.colour[i]} is-light`"
              >
                {{attr}}
              </b-tag>

            </a>
          </b-taglist>

          <b-field v-for="(attrType) in fields.input" :key="attrType" :label="attrType">
            <b-input 
            :v-model="attrType"
            @input="handleTextInput(attrType, $event)"
            >
            </b-input>
          </b-field>

          <b-field v-for="(attrType) in fields.textArea" :key="attrType" :label="attrType">
            <b-input 
            :v-model="attrType"
            type="textarea"
            @input="handleTextInput(attrType, $event)"
            >
            </b-input>
          </b-field>

          <div class="columns mt-5">
            <b-field 
            v-for="attr in fields.select" 
            :key="attr" 
            :label="attr"
            class="column is-6"
            >
              <b-select
              :v-model="`${attr}`"
              :placeholder="`Select ${attr}`"
              expanded
              @input="selectLocation(attr, $event)"
              >
                <option
                v-for="location in locations"
                :value="location.id"
                :key="`${attr}: ${location.id}`">
                  {{ location.placeName }}
                </option>
              </b-select>
            </b-field>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const colour = [ 'red', 'pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'brown', 'black', 'white', 'clear' ]
const chakra = [ 'Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral', 'Root', ]

const fields = {
  input: [ "name", "otherNames", ],
  textArea: [ "bio", ],
  tags: [ "colour", "chakra", ],
  select: [ "origin", "memento", ],
}

export default {
  name: "crystal-create-form",
  data() {
    return {
      crystal: {},
      fields,
      constants: {
        colour,
        chakra,
      },
    }
  },
  computed: {
    ...mapGetters([
      "locations",
    ]),
  },
  mounted() {
    this.loadLocations()
    this.crystal.userId = 1
  },
  updated() {
    console.log("this.crystal", this.crystal);
    
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getLocations: 'getLocations',
    }),
    async loadLocations() {
      await this.$store.dispatch("getLocations");
    },
    selectTag(tagSet, attr) {
      this.crystal[tagSet] =  this.crystal[tagSet] ? this.crystal[tagSet].concat(attr) : [ attr ]

      console.log("this.crystal", this.crystal);
      
    },
    selectLocation(attr, e) {
      const selectedLocation = this.locations.find(location => location.id === e)
      this.crystal[`${attr}Id`] = selectedLocation.id
    },
    handleTextInput(attrType, input) {
      this.crystal[attrType] = input
    },
  },
}
</script>

<style>

</style>