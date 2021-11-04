<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="subtitle">The Crystal Index</p>
      </b-navbar-item>
    </template>
    <template #start>
      <!-- <b-navbar-item href="/">
        About
      </b-navbar-item> -->
      <b-navbar-item href="/crystal-create">
        Create Crystal
      </b-navbar-item>
      <!-- <b-navbar-item href="/profile">
        Profile
      </b-navbar-item> -->
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!authUser.id" class="button" type="is-pink"  @click="openRegisterComponent">
            Log in
          </a>
          <a v-if="authUser.id" class="button" type="is-purple"  @click="logOut">
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
    logOut() {
      this.$store.dispatch('logOut')
    },
  },
  computed: {
    ...mapGetters([
      "authUser"
    ]),
  },
}
</script>

<style>

</style>