<template>
  <button
    class="mainButton"
    v-if="$store.state.user === null || $store.state.user === 'noUser'"
    @click="signIn"
  >
    Sign in
  </button>
  <button class="mainButton" v-else @click="showPanel">
    {{ $store.state.user.username }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      panel: false,
    };
  },
  name: "SignIn",
  methods: {
    signIn() {
      this.$store.commit("setModal", "signIn");
    },
    showPanel() {
      this.$emit("showPanel", true);
    },
    hidePanel() {
      this.$emit("showPanel", false);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
</style>
