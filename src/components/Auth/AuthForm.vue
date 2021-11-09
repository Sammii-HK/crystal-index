<template lang="html">
  <div class="modal-card">
    <div class="modal-card-body">

      <Login @success="successfulLogin" />

      <!-- <b-tabs expanded type="is-boxed" destroy-on-hide v-model="openTab">

        <b-tab-item v-bind="tabProps['login']" >
          <Login @success="successfulLogin"/>
        </b-tab-item>

        <b-tab-item v-bind="tabProps['register']" >
          <Register @close="closeModal"/>
        </b-tab-item>
        
      </b-tabs> -->
    </div>
  </div>
</template>

<script>
// import Register from '@/components/Auth/Register'
import Login from '@/components/Auth/Login'
// import ForgotPassword from '@/modules/account/components/Auth/ForgotPassword'
const createTabProps = tabName => ({ 
  [tabName]: { 
    label: tabName,
    value: tabName,
    headerClass: 'is-capitalized has-text-weight-bold',
  } 
})
export default {
  data() {
    return {
      openTab: '',
      tabProps: {
        ...createTabProps('login'),
        ...createTabProps('register'),
      },
    }
  },
  props: { 
    openAsDefault: {
      type: String,
      required: false,
      default: 'login'
    },
  },
  components: { 
    // Register, 
    Login 
  },
  methods: {
    closeModal() {
      this.$parent.close()
    },
    successfulLogin() {
      this.closeModal()
      this.$router.push('/')
    },
  },
  mounted() {
    this.openTab = this.openAsDefault    
  },
}
</script>

<style lang="scss" scoped>
</style>