<template>
  <div class="section">
    <p class="title">The Crystal Index</p>
    <crystals-gallery />
  </div>
</template>

<script>
import CrystalsGallery from './CrystalsGallery.vue';
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    CrystalsGallery
  },
};
</script>
