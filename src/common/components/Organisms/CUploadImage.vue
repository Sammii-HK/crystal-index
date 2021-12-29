
<template>
  <div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script>
// const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
export default {
  name: 'c-upload-image',
  data() {
    return {

    }
  },
  methods: {
    async handleFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      const { type, name } = files[0]

      const image = { file: files[0], type, name };
      this.$emit('change', image);
    },
  },
}
</script>

