<template lang="html">
  <div class="section">
    <b-field label="username">
      <b-input
      type="text"
      :value="user.username"
      @input="updateUser({ key: 'username', value: $event })"
      />
    </b-field>
    <b-field label="password">
      <b-input
      :value="user.password"
      type="password"
      @input="updateUser({ key: 'password', value: $event })"
      />
    </b-field>
    <div class="container">
      <b-button @click="authLogin">
        Log in
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      errors: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters([
      "user",
      "isLoggedIn"
    ]),
  },
  methods: {
    ...mapActions({
      // get the updateUser action from the store
      updateUser: 'updateUser',
    }),
    async authLogin() {
      // this sends the user data on state as the body of the request
      const user = { username: this.user.username, password: this.user.password };
      // custom error handling
      const handler = {
        error: this.failedLogin,
        success: this.userLoggedIn
      }
      await this.$store.dispatch("setAuthenticatedUser", { user, handler });
    },
    failedLogin(e) {
      this.addErrorMessage(e.error)
    },
    addErrorMessage(msg) {
      this.errors = Array.from(new Set([ ...this.errors, msg ]))
    },

    userLoggedIn(e) {
      this.$store.dispatch('setAuthenticatedUser', e)
      if (this.isLoggedIn) {
        this.$emit('success')
      } else {
        this.addErrorMessage('There was a problem retrieving your details. Please try again.')
      }
    },

  },
}
</script>
