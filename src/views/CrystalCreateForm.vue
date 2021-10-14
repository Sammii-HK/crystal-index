/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-10" >

          <b-taglist v-for="(tagSet) in fields.tags" :key="tagSet" class="my-5">
            <span class="mr-3">{{tagSet}}: </span>
            <b-tag
            v-for="(attr, i) in constants[tagSet]" 
            :key="attr" 
            class="mb-0 mt-1 is-clickable is-unselectable"
            :type="`is-${constants.colours[i]} is-light`"
            @click="click"
            >
            <!-- @click="selectTag(constants[tagSet][i])" -->
              {{attr}}
            </b-tag>
          </b-taglist>

          <b-field v-for="(attrType) in fields.input" :key="attrType" :label="attrType">
            <b-input 
            :v-model="attrType"
            >
            </b-input>
          </b-field>

          <b-field v-for="(attrType) in fields.textArea" :key="attrType" :label="attrType">
            <b-input 
            :v-model="attrType"
            type="textarea"
            >
            </b-input>
          </b-field>

          <div class="columns mt-5">
            <b-field 
            v-for="attr in fields.select" 
            :key="attr" 
            :label="fields.select[attr]"
            class="column is-6"
            >
              <b-select
              :v-model="`selected${attr}`"
              :placeholder="`Select ${attr}`"
              expanded
              >
                <option
                v-for="option in constants[attr]"
                :value="option"
                :key="option">
                  {{ option }}
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

const colours = [ 'red', 'pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'brown', 'black', 'white', 'clear' ]
const chakras = [ 'Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral', 'Root', ]

const fields = {
  input: [ "name", "otherNames", ],
  textArea: [ "bio", ],
  tags: [ "colours", "chakras", ],
  select: [ "origin", "memento", ],
}

export default {
  name: "crystal-create-form",
  data() {
    return {
      crystal: {},
      fields,
      constants: {
        colours,
        chakras,
      },
    }
  },
  computed: {
    ...mapGetters([
      "locations",
    ])
  },
  mounted() {
    this.loadLocations()
  },
  methods: {
    ...mapActions({
      // get the action from the store
      getLocations: 'getLocations',
    }),
    async loadLocations() {
      await this.$store.dispatch("getLocations");
    },
    click() {
      console.log("clicked", );
      
    },
    selectTag(event) {
      console.log("event", event);
      return event
    }
  },
}
</script>

<style>

</style>