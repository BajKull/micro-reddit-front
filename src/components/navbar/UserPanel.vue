<template>
  <ul class="userPanel">
    <li>
      <router-link class="userPanelEl" to="/profile">Profile</router-link>
    </li>
    <li class="userPanelEl" @click="signOut">Sign out</li>
  </ul>
</template>

<script>
export default {
  name: "UserPanel",
  methods: {
    signOut() {
      this.$emit("showPanel", false);
      this.$store.dispatch("signOut", {
        username: this.$store.state.user.username,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.userPanel {
  position: absolute;
  right: 0;
  top: 60px;
  list-style-type: none;
  width: 150px;
  border-radius: 5px;
  background: white;
  border: 2px solid $gray;
  padding: 5px 0;
  z-index: 100;

  @include breakpoint(600px) {
    right: 10px;
  }

  .userPanelEl {
    display: block;
    text-decoration: none;
    padding: 10px;
    width: calc(100% - 20px);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: darken($gray, 5);
    }

    @include breakpoint(600px) {
      font-size: 0.8em;
    }
  }
}
</style>
