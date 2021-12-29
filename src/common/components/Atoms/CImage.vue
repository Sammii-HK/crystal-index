<template>
  <b-image
  :src="`/api/images/${imageId}`"
  :alt="`crystal image ${imageId}`"
  ratio="1by1"
  />
</template>

<script>
export default {
  name: 'c-image',
  props: {
    imageId: {
      type: Number,
      required: true,
    }
  },
}
</script>
