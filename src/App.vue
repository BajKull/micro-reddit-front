<template>
  <Navbar />
  <ModalContainer />
  <Error />
  <router-view />
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import ModalContainer from "@/components/modal/ModalContainer";
import Error from "@/components/modal/Error";

export default {
  name: "App",
  components: {
    Navbar,
    ModalContainer,
    Error,
  },
  beforeMount: function() {
    this.$store.dispatch("initAuth");
  },
};
</script>

<style lang="scss">
@import "@/scss/_animations.scss";
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
}
</style>
