<template>
  <div id="app">
    <aside v-if="$store.state.username && ($route.path.includes('/global') || $route.path.includes('/my-circles') || $route.path.includes('/around-me'))">
      <ZoomBar />
    </aside>
    <router-view 
      :class="['view', { full: !$store.state.username || !($route.path.includes('/global') || $route.path.includes('/my-circles') || $route.path.includes('/around-me'))}]" 
    />
    <footer>
      <NavBar />
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
import ZoomBar from '@/components/common/ZoomBar.vue';

export default {
  name: 'App',
  components: {NavBar, ZoomBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setFirstName', user ? user.first_name : null);
      this.$store.commit('setLastName', user ? user.last_name : null);
      this.$store.commit('setEmail', user ? user.email : null);
      this.$store.commit('setUsername', user ? user.username : null);
      this.$store.commit('setBio', user ? user.bio : null);
      this.$store.commit('setDateJoined', user ? user.dateJoined : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};

    
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
}

.view {
  position: absolute;
  height: calc(100vh - 232px);
  width: calc(100% - 160px);
  top: 64px;
  left: 160px;
  overflow-y: scroll;
}

.full {
  width: calc(100% - 24px);
  left: 24px;
}
</style>
