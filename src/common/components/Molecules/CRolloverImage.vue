<template>
  <figure 
  @click="$emit('click', imageItem.id)"
  class="image is-clickable" 
  @mouseenter="toggleOverlay(imageItem.id, true)"
  @mouseleave="toggleOverlay(imageItem.id, false)"
  >
    <c-image :imageId="imageItem.image && imageItem.image.id" />
    <div v-if="activeCrystal == imageItem.id"
    class="is-overlay is-flex is-align-items-center is-justify-content-center has-background-transparent-white"
    >
      <p class="subtitle">{{ imageItem.name }}</p>
    </div>
  </figure>
</template>

<script>
import CImage from "../Atoms/CImage.vue"

export default {
  name: 'c-rollover-image',
  data() {
    return {
      activeCrystal: null,
    }
  },
  components: {
    CImage,
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