/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column" >
          <div>
            <b-field v-for="attr in fields.select.tags" :key="attr" :label="fields.select.tags[attr]">
              <b-select
              multiple
              native-size="7"
              :v-model="`selected${attr}`"
              :placeholder="`Select ${attr}`"
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
          <hr />
          {{fields}}
          <!-- <div class="mt-4">
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
          </div> -->
          <!-- <div class="has-text-bold is-size-4 mt-4 is-pulled-right mt-6">created by: {{crystal.createdBy.username}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { constants., chakras } from "../constants";
import moment from 'moment'

const config = {
  // Attributes to be placed in different elements
  toExclude: ['id', 'image', 'createdAt', 'updatedAt', 'favouritedBy', 'userId', 'originId', 'locationId'],
  tags: ['colour', 'chakra'],
  locations: ['origin', 'memento'],
  // primary: ['bio', 'otherNames']
}

const colours = [
  'white', 'red', 'pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'brown', 'clear'
]

const chakras = [ 
  'Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral', 'Root',
]

const fields = {
  input: [
    "name",
    "bio",
    "otherNames",
  ],
  select: {
    locations: [
      "originId",
      "mementoId",
    ],
    tags: [
      "colours",
      "chakras",
    ]
    // tags: {
    //   "colour": constants.,
    //   "chakra": chakras,
    // }
  }
}

// let { colours, chakras } = consts

export default {
  name: "crystal-create-form",
  data() {
    return {
      fields,
      constants: {
        colours,
        chakras,
      },
    }
  },
  mounted() {
    // this.crystalId = this.$route.params.id
    // this.loadCrystal(this.crystalId)
    // this.filteredAttrs = this.filterNullAttrs()
    // this.attrs = this.hierarchizeAttributes()
  },
  methods: {
    // Organise attrs into main attrs and tag attrs
    hierarchizeAttributes() {
      const attrs = Object.keys(this.filteredAttrs)
      
      return attrs.reduce((acc, currentAttr) => {
        console.log("currentAttr", currentAttr);
        
        const key = this.getKey(currentAttr)
        // if is array, then add attr to array, else make array with attr
        acc[key] = Array.isArray(acc[key]) ? acc[key].concat(currentAttr) : [ currentAttr ]
        return acc
      }, {}
      )
    },
    getKey(currentAttr) {
      console.log("currentAttr", currentAttr);
      if (config.tags.includes(currentAttr.toLowerCase())) return 'tags'
      else if (config.locations.includes(currentAttr.toLowerCase())) return 'locations'
      else if (config.primary.includes(currentAttr.toLowerCase())) return 'toExclude'
      return 'primary'
    },
    filterNullAttrs() {
      const obj = this.crystal
      return Object.keys(obj)
      .filter((k) => obj[k] != null)
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
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