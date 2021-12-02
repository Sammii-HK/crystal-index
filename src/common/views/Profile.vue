/* eslint-disable */

<template>
  <div class="section">
    <div class="container pt-4">
      <c-image-gallery :images="favouritedCrystals" />
    </div>
  </div>
</template>

<script>
import CImageGallery from '../components/Organisms/CImageGallery.vue';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "profile",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authModule/authUser",
      crystals: "crystalsModule/crystals",
      user: "userModule/user",
    }),
    createdCrystals() {
      return this.reduceCrystalIds(this.user.user.createdCrystals)
    },
    favouritedCrystals() {
      const favouriteCrystals = this.reduceCrystalIds(this.user.user.favouriteCrystals)
      return this.crystals.filter(crystal => favouriteCrystals.includes(crystal.id))
    },
  },
  created() {
    this.loadUser()
    this.reduceCrystalIds(this.user.user.createdCrystals)
  },
  methods: {
    ...mapActions({
      // get the action from the store
      // getUser: 'getUser',
    }),
    async loadUser() {
      const token = this.authUser.credentials;
      const id = this.authUser.id;
      await this.$store.dispatch("userModule/getUser", { id, token });
    },
    reduceCrystalIds(crystalType) {
      return crystalType.map(crystal => crystal.id);
    },
  },
  components: {
    CImageGallery, 
  },
}
</script>

<style>

</style>