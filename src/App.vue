<template>
  <Navbar />
  <ModalContainer />
  <Error />
  <Success />
  <Socket />
  <router-view />
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import ModalContainer from "@/components/modal/ModalContainer";
import Error from "@/components/modal/Error";
import Success from "@/components/modal/Success";
import Socket from "@/components/socket/Socket";

export default {
  name: "App",
  components: {
    Navbar,
    ModalContainer,
    Error,
    Success,
    Socket,
  },
  beforeMount: function() {
    this.$store.dispatch("initAuth");
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
@import "@/scss/_animations.scss";
@import "@/scss/_sort.scss";
@import "@/scss/_inputs.scss";
@import "@/scss/_typography.scss";
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
}

button {
  font-weight: 600;
}
</style>
