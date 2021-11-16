<template lang="html">
  <form class="section">
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
    <div class="container mt-6 is-flex is-justify-content-center">
      <b-button @click="authLogin" type="is-pink">
        Log in
      </b-button>
      <div v-if="errors">
        {{errors}}
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      errors: null,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    ...mapGetters({
      user: "userModule/user",
      authUser: "authModule/authUser",
    }),
  },
  methods: {
    ...mapActions({
      // get the updateUser action from the store
      updateUser: 'userModule/updateUser',
    }),
    async authLogin() {
      // this sends the user data on state as the body of the request
      const user = { username: this.user.username, password: this.user.password };
      await this.$store.dispatch("authModule/setAuthenticatedUser", { user });

      if (this.authUser.id) {
        this.$emit('success')
      } else this.addErrorMessage('There was a problem retrieving your details. Please try again.')
    },
    failedLogin(e) {
      this.addErrorMessage(e.error)
    },
    addErrorMessage(msg) {
      this.errors = Array.from(new Set([ ...this.errors, msg ]))
    },
  },
}
</script>
