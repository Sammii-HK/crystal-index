<template lang="html">
  <div class="section">
    <b-field label="name">
      <b-input
      type="text"
      @input="updateCrystal({ key: 'name', value: $event })"
      />
      <!-- :value="crystal.name" -->
    </b-field>
    <b-field label="bio">
      <b-input
      type="text"
      @input="updateCrystal({ key: 'bio', value: $event })"
      />
      <!-- :value="crystal.bio" -->
    </b-field>
    <div class="container">
      <b-button @click="authLogin">
        Submit
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'crystal-form',
  data() {
    return {
      errors: []
    }
  },
  computed: {
    ...mapState({
      crystal: state => state.crystal
    }),
    ...mapGetters([
      // "user",
    ]),
  },
  methods: {
    ...mapActions({
      // get the updateCrystal action from the store
      updateCrystal: 'updateCrystal',
    }),
    async authLogin() {
      // this sends the user data on state as the body of the request
      const crystal = { name: this.crystal.name, bio: this.crystal.bio };
      // custom error handling
      const handler = {
        error: this.failedLogin,
        success: this.userLoggedIn
      }
      await this.$store.dispatch("setAuthenticatedUser", { crystal, handler });
    },
    failedLogin(e) {
      this.addErrorMessage(e.error)
    },
    addErrorMessage(msg) {
      this.errors = Array.from(new Set([ ...this.errors, msg ]))
    },

    // userLoggedIn(e) {
    //   this.$store.dispatch('setAuthenticatedUser', e)
    //   if (this.isLoggedIn) {
    //     this.$emit('success')
    //   } else {
    //     this.addErrorMessage('There was a problem retrieving your details. Please try again.')
    //   }
    // },

  },
}
</script>
