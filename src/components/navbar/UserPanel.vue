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
        username: this.$store.state.user.nickname,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
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
  }
}
</style>
