<template>
  <div class="container">
    <div class="card">
      <img src="../assets/tux.png" alt="Avatar" style="width:100%" />
      <h4>
        {{ `Name: ${this.userInfo.firstName} ${this.userInfo.lastName}` }}
      </h4>
      <h4>{{ `Date of birth: ${this.userInfo.dateOfBirth}` }}</h4>
      <h4>{{ `Email: ${this.userInfo.email}` }}</h4>
      <h4>{{ `Address: ${this.userInfo.address}` }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: []
    };
  },
  methods: {
    async fetchUserInfo() {
      const user = localStorage.getItem('username');
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user
        })
      };
      try {
        const response = await fetch('http://localhost:4000/data', settings);
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
        } else {
          this.userInfo = data;
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.fetchUserInfo();
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 25%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  justify-content: center;
  margin-top: 2px;
  padding: 2px 16px;
}
</style>
