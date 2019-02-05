<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="dashboard-form" autocomplete="off">
            <v-text-field label="Email" v-model="email" />
            <v-text-field label="Password" type="password" v-model="password" aria-autocomplete="new-password" />
            <div class="error" v-html="error" />
            <v-btn class="cyan" @click="register">Register</v-btn>
          </form>
        </div>

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'root'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
