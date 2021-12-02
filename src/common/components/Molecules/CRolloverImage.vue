<template>
  <!-- @click="imageClicked(imageItem.id)" -->
  <figure 
  @click="$emit('click', imageItem.id)"
  class="image is-clickable" 
  @mouseenter="toggleOverlay(imageItem.id, true)"
  @mouseleave="toggleOverlay(imageItem.id, false)"
  >
    <b-image
    :src="`https://static.crystalindex.co.uk:8443/crystals/${imageItem.id}.jpeg`"
    :alt="imageItem.name"
    ratio="1by1"
    />
    <div v-if="activeCrystal == imageItem.id"
    class="is-overlay is-flex is-align-items-center is-justify-content-center has-background-transparent-white"
    >
      <p class="subtitle">{{ imageItem.name }}</p>
    </div>
  </figure>
</template>

<script>
export default {
  name: 'c-rollover-image',
  data() {
    return {
      activeCrystal: null,
    }
  },
  props: {
    imageItem: Object,
  },
  methods: {
    toggleOverlay(id, hover) {
      hover 
      ? this.activeCrystal = id
      : this.activeCrystal = null;
    },
    imageClicked(id) {
      console.log("imageClicked id", id);
      
      this.$emit('selectItem', id)
    },
  },
}
</script>

<style>

</style>