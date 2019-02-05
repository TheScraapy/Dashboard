<template>
  <v-toolbar fixed class="cyan">
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'root'})">
        Rainbow Dashboard
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat @click="navigateTo({name: 'login'})" v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>

      <v-btn flat @click="navigateTo({name: 'register'})" v-if="!$store.state.isUserLoggedIn">
        Register
      </v-btn>

      <v-btn flat @click="logout" v-if="$store.state.isUserLoggedIn">
        Log out
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
