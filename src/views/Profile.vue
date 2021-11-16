/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      {{ authUser }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "profile",
  data() {
    return {
      userId: null,
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authModule/authUser",
    })
  },
  created() {
    // this.userId = this.$route.params.id
    // this.loadUser(this.userId)
    console.log("this.authUser", this.authUser);
    
  },
  methods: {
    ...mapActions({
      // get the action from the store
      // getUser: 'getUser',
    }),
  },
  updated() {
    
  },
}
</script>

<style>

</style>