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
              :type="`is-${constants.colour[i]}`"
              :is-selected="isSelectedAttr(tagSet, attr)"
              >
                {{attr}}
              </b-tag>

            </a>
          </b-taglist>

          <b-field v-for="(attrType) in fields.input" :key="attrType" :label="attrType">
            <b-input 
            :value="crystal[attrType]"
            @input="handleTextInput(attrType, $event)"
            >
            </b-input>
          </b-field>

          <b-field v-for="(attrType) in fields.textArea" :key="attrType" :label="attrType">
            <b-input 
            :value="crystal[attrType]"
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

          <b-field class="is-centered">
            <b-button @click="checkForm">
              Submit
            </b-button>
          </b-field>

          <div>
            <p v-if="response">
              {{response}}
            </p>
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, index) in errors" :key="`error: ${index}`">{{ error }}</li>
              </ul>
            </p>
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

const requiredFields = [ 'name', 'colour' ]

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
      requiredFields,
      constants: {
        colour,
        chakra,
      },
      errors: [],
      response: null,
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
  methods: {
    ...mapActions({
      // get the action from the store
      getLocations: 'getLocations',
      createCrystal: 'createCrystal',
    }),
    async loadLocations() {
      await this.$store.dispatch("getLocations");
    },
    async createCrystal() {
      await this.$store.dispatch("createCrystal", this.crystal);
      this.successfulResponse()
      window.setTimeout(this.clearForm, 5)
      window.setTimeout(this.clearResponse, 5000)
    },
    selectTag(tagSet, attr) {
      this.crystal[tagSet] =  this.crystal[tagSet] ? this.crystal[tagSet].concat(attr) : [ attr ]
    },
    selectLocation(attr, e) {
      const selectedLocation = this.locations.find(location => location.id === e)
      this.crystal[`${attr}Id`] = selectedLocation.id
    },
    handleTextInput(attrType, input) {
      this.crystal[attrType] = input
    },
    checkForm(e) {
      this.requiredFields.map(field => {
        if (!this.crystal[field]) return this.errors.push(`${field} required.`)
        this.errors = []
        return this.createCrystal()
      })
    },
    isSelectedAttr(tagSet, attr) {
      if (!this.crystal[tagSet]) return
      
      const isSelected = this.crystal[tagSet].includes(attr)
      console.log("isSelected", isSelected);
      
      return isSelected
    },
    successfulResponse() {
      this.response = `Created ${this.crystal.name}`
    },
    clearForm() {
      console.log("🌈🏝🎈 clearForm");
      
      this.crystal = {}
    },
    clearResponse() {
      this.response = null
    },
  },
}
</script>

<style>

</style>