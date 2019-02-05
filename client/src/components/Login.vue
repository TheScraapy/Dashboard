<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Email" v-model="email" />
          <v-text-field label="Password" type="password" v-model="password" />
          <div class="error" v-html="error" />
          <v-btn class="cyan" @click="login">Login</v-btn>
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
    async login () {
      try {
        const response = await AuthenticationService.login({
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
