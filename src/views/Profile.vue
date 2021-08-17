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
    ...mapGetters([
      "authUser",
    ])
  },
  mounted() {
    // this.userId = this.$route.params.id
    // this.loadUser(this.userId)
    console.log("this.authUser", this.authUser);
    
  },
  methods: {
    ...mapActions({
      // get the action from the store
      // getUser: 'getUser',
    }),
    // async loadUser(id) {
    //   // await this.$store.dispatch("getUser", id);
    // },
  },
  updated() {
    
  },
}
</script>

<style>

</style>