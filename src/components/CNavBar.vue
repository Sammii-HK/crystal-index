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
      <b-navbar-item v-if="authUser && authUser.id === 1" href="/crystal-create">
        Create Crystal
      </b-navbar-item>
      <!-- <b-navbar-item href="/profile">
        Profile
      </b-navbar-item> -->
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a v-if="!authUser.id" class="button" type="is-green"  @click="openRegisterComponent">
            Log in
          </a>
          <a v-if="authUser.id" class="button" type="is-indigo"  @click="logOut">
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
      this.$store.dispatch('authModule/logOut');
      this.$router.push('/');
    },
  },
  computed: {
    ...mapGetters({
      authUser: "authModule/authUser",
    }),
  },
}
</script>

<style>

</style>