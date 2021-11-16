/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-10" >
          {{crystal}}
          <b-taglist v-for="(tagSet) in fields.tags" :key="tagSet" class="my-5">
            <span class="mr-3 has-text-weight-bold">{{tagSet}}: </span>
            <a v-for="(attr, i) in constants[tagSet]" class="mx-2"
            :key="attr" 
            @click="selectTag(tagSet, attr)"
            >
              <b-tag
              class="mb-0 mt-1 is-clickable is-unselectable"
              :type="`is-${constants.colour[i]} ${(crystal[tagSet] && crystal[tagSet].includes(attr)) ? '' : 'is-light'}`"
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
              :v-model="crystal[`${attr}Id`]"
              expanded
              @input="selectLocation(attr, $event)"
              >
                <option
                v-for="location in locations"
                :value="location.id"
                :key="`${attr}: ${location.id}`"
                >
                  {{ location.placeName }}
                </option>
              </b-select>
            </b-field>

          </div>

          <b-field class="is-centered">
            <b-button @click="checkForm">
              Save
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
  name: "crystal-update-form",
  data() {
    return {
      fields,
      requiredFields,
      constants: {
        colour,
        chakra,
      },
      errors: [],
      response: null,

      crystalId: null,
      attrs: {},
    }
  },
  computed: {
    ...mapGetters({
      crystal: "crystalsModule/crystal",
      locations: "locationsModule/locations",
      authUser: "authModule/authUser",
    }),
  },
  created() {
    this.crystalId = this.$route.params.id
    this.loadCrystal(this.crystalId)

    this.loadLocations()
    this.crystal.userId = 1
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getLocations: 'locationsModule/getLocations',
      getCrystal: 'crystalsModule/getCrystal',
      updateCrystal: 'crystalsModule/updateCrystal',
    }),
    async loadCrystal(id) {
      await this.$store.dispatch("crystalsModule/getCrystal", id);
    },
    async loadLocations() {
      await this.$store.dispatch("locationsModule/getLocations");
    },
    async updateCrystal() {
      const token = this.authUser.credentials
      // if userId on crystal is undefined, set userId: 1
      if (!this.crystal.userId && (this.authUser.id === 1)) await this.$store.dispatch("crystalsModule/updateCrystal", { ...this.crystal, userId: 1 }, token);
      if (this.authUser.id !== this.crystal.userId) return this.errors.push(`Unauthorised, you do not have access.`)
      await this.$store.dispatch("crystalsModule/updateCrystal", { crystal: this.crystal, token });
      this.successfulResponse()
      
    },
    selectTag(tagSet, attr) {
      if (this.crystal[tagSet]) {
        if (this.crystal[tagSet].includes(attr)) {
          this.removeItemOnce(this.crystal[tagSet], attr)
        } else {
          this.crystal[tagSet] =  this.crystal[tagSet].concat(attr)
        }
      } else {
        this.crystal[tagSet] = [ attr ]
      }
    },
    selectLocation(attr, e) {
      const selectedLocation = this.locations.find(location => location.id === e)
      this.crystal[`${attr}Id`] = selectedLocation.id
    },
    handleTextInput(attrType, input) {
      this.crystal[attrType] = input
    },
    checkForm() {
      this.requiredFields.map(field => {
        if (this.crystal['name'] && this.crystal['colour']) this.updateCrystal()
        if (!this.crystal[field]) this.errors.push(`${field} required.`)
      })
    },
    successfulResponse() {
      this.response = `Updated ${this.crystal.name}`
      window.setTimeout(this.clearResponse, 5000)
    },
    clearResponse() {
      this.response = null
    },
    removeItemOnce(arr, value) {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    },
    // addPlaceholderOption(options) {
    //   const placeholder = { label: `Select ${attr}`, value: -1, disabled}
    //   return { placeholder, ...options }
    // },
  },
}
</script>

<style>

</style>