<template>
  <button
    class="signIn"
    v-if="$store.state.user === null || $store.state.user === 'noUser'"
    @click="signIn"
  >
    Sign in
  </button>
  <button class="signIn" v-else @click="showPanel">
    {{ $store.state.user.nickname }}
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
.signIn {
  background: $main;
  color: white;
  padding: 10px 25px;
  border-radius: 5px;
  border: 0;
  margin-left: auto;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: darken($main, 5);
  }
}
</style>
