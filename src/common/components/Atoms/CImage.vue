<template>
  <div>
    <b-image
    :src="getImageSrc"
    :alt="`crystal image ${imageId}`"
    ratio="1by1"
    />
  </div>
</template>

<script>
export default {
  name: 'c-image',
  props: {
    imageId: {
      type: Number,
    }
  },
  computed: {
    getImageSrc() {
      return this.imageId ? `/api/images/${this.imageId}` : '/src/assets/placeholder.png';
    },
  },
}
</script>
