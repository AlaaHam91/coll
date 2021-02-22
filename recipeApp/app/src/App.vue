<template>
  <v-app>
    <v-main>
      <notification />
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import notification from "./components/notification";
export default {
  name: "App",
  components: {
    notification,
  },
  computed: {
    isLogged() {
      return this.$store.getters["auth/isSignedIn"];
    },
  },
};
</script>
<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
