<template>
  <b-image
  :src="dataUrl"
  :alt="image.name"
  ratio="1by1"
  />
</template>

<script>
export default {
  name: 'c-image',
  data() {
    return {
      file: null,
    }
  },
  props: {
    image: {
      type: Object,
      required: true,
    }
  },
  computed: {
    dataUrl() {
      const base64 = arrayBufferToBase64(new Uint8Array(this.image.file.data));
      return `data:${this.image.type};base64,${base64}`
    },
  },
}

function arrayBufferToBase64(bytes) {
    let base64 = '';
    const len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        base64 += String.fromCharCode(bytes[i]);
    }
    return btoa(base64)
}
</script>

<style>

</style>