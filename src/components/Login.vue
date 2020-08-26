<template>
  <div class="container">
    <div class="login-form">
      <h3 v-bind:style="{color: 'red'}">{{warningMessage}}</h3>
      <input type="text" name="username" placeholder="Enter your username..." v-model="username" />
      <input
        type="password"
        name="password"
        placeholder="Enter your password..."
        v-model="password"
      />
      <input @click="handleAuthentication" type="submit" value="Log In" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      warningMessage: '',
    };
  },
  methods: {
    async handleAuthentication() {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      };
      try {
        const response = await fetch('http://localhost:4000/signin', settings);
        const data = await response.json();
        if (!response.ok) {
          this.warningMessage = data.message;
        } else {
          localStorage.setItem('appToken', data.token);
          localStorage.setItem('username', this.username);
          this.$store.dispatch('setLoginStatus');
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #35495e;
  height: 100vh;
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
}

input:hover,
.btn:hover {
  opacity: 1;
}
input[type='submit'] {
  background-color: #42b883;
  color: white;
  cursor: pointer;
}
.login-form {
  width: 50%;
  margin: 0 auto;
  margin-top: 6px;
}
</style>
