<template>
  <div id="app">
    <c-navbar/>
    <router-view />
  </div>
</template>

<script>
import CNavbar from './common/components/CNavBar.vue'
export default {
  name: 'app',
  components: {
    CNavbar,
  },
}
</script>

