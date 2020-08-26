<template>
  <header>
    <div class="container">
      <span class="app-name">Currency Vueverter</span>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/live">Live converter</router-link>
        <router-link to="/user">User info</router-link>
        <Logout />
      </nav>
    </div>
  </header>
</template>

<script>
import Logout from './Logout.vue';

export default {
  components: { Logout }
};
</script>

<style scoped>
.container {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.app-name {
  float: left;
  font-size: 25px;
  vertical-align: middle;
  line-height: 50px;
  text-transform: uppercase;
}

header {
  background: #42b883;
  height: 50px;
}

header::after {
  content: '';
  display: table;
  clear: both;
}

nav {
  float: right;
}

nav a {
  display: inline-block;
  margin-left: 60px;
  vertical-align: middle;
  line-height: 50px;
  color: #35495e;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
}

nav a:hover {
  color: #000;
}

nav a::before {
  content: '';
  display: block;
  height: 5px;
  width: 0%;
  background-color: #35495e;
  position: absolute;
  transition: all ease-in-out 300ms;
}

nav a:hover::before {
  width: 100%;
}

nav input {
  margin-left: 60px;
  background: none;
  border: none;
  color: #35495e;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 17px;
}

nav input:focus {
  outline: none;
}
</style>
