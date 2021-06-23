<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: 'crystals-gallery' }">
        Crystals Gallery
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!isLoggedIn" class="button is-light"  @click="openRegisterComponent">
            Log in
          </a>
          <a v-if="isLoggedIn" class="button is-light"  @click="logout">
            Log Out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'c-navbar',
  methods: {
    openRegisterComponent() {
      this.$buefy.modal.open({
          parent: this,
          component: () => import('@/components/Auth/AuthForm'),
          hasModalCard: true,
      })
    },
    logout() {
      this.$store.dispatch('logOut')
    },
  },
  computed: {
    ...mapGetters([
      "isLoggedIn"
    ]),
  },
  mounted() {
    console.log("this.isLoggedIn", this.isLoggedIn);    
  },
}
</script>

<style>

</style>