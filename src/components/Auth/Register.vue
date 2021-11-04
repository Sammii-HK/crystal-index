<template>
  <form class="section">
    <b-field label="username">
      <b-input
      model="username"
      type="text"
      />
      <!-- @input="updateUser({ key: 'username', value: $event })" -->
    </b-field>
    <b-field label="password">
      <b-input 
      model="password"
      type="password"
      />
    </b-field>
    <div class="container mt-6 is-flex is-justify-content-center">
      <b-button type="is-blue">
        Register
      </b-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      password: '',
      username: '',
    }
  },
  methods: {
    // register: function () {
    //   let username = this.username
    //   let password = this.password
    //   this.$store.dispatch('register', { username, password })
    //   .then(() => this.$router.push('/'))
    //   .catch(err => console.log(err))
    // }
  }
}
</script>

<style>
</style>