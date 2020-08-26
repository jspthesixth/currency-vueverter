<template>
  <main>
    <div v-if="loginStatus" id="app">
      <Navbar />
      <router-view />
    </div>
    <div v-else id="app">
      <Login />
    </div>
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
  },
  computed: {
    loginStatus() {
      return this.$store.getters.loginStatus;
    },
  },
  mounted() {
    this.$store.dispatch('setLoginStatus');
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
