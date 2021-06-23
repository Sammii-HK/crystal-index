<template>
  <div class="section">
    <b-field label="username">
      <b-input
      model="username"
      type="text"
      />
      <!-- :value="user.username" -->
      <!-- @input="updateUser({ key: 'username', value: $event })" -->
    </b-field>
    <b-field label="password">
      <b-input 
      model="password"
      type="password"
      />
      <!-- :value="user.password" -->
    </b-field>
    <div class="container">
      <b-button>
        Register
      </b-button>
    </div>
  </div>
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