<template>
  <p>{{ crystal.name }}</p>
</template>

<script>
export default {
  name: "crystal-image",
  props: {
    crystal: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style>

</style>