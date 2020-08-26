<template>
  <input @click="handleLogOut" type="submit" value="Log Out" />
</template>

<script>
export default {
  methods: {
    handleLogOut() {
      localStorage.removeItem('appToken');
      localStorage.removeItem('username');
      this.$store.dispatch('setLoginStatus');
      window.location.href = '/';
    }
  }
};
</script>
