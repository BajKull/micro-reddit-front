<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <SearchBox />
    <SignIn @showPanel="showPanel" />
    <UserPanel
      @showPanel="showPanel"
      v-if="panel && $store.state.user !== 'noUser'"
    />
  </div>
</template>

<script>
import SignIn from "./SignIn";
import UserPanel from "./UserPanel";
import SearchBox from "./SearchBox";

export default {
  data() {
    return {
      panel: false,
    };
  },
  name: "Navbar",
  components: { SignIn, UserPanel, SearchBox },
  methods: {
    showPanel(val) {
      this.panel = val;
    },
  },
  mounted: function() {
    window.addEventListener("mousedown", (e) => {
      const accepted = ["signIn", "userPanel", "userPanelEl"];
      const elClass = e.target.classList[0];
      if (this.panel && !accepted.includes(elClass)) this.showPanel(false);
    });
  },
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  margin: auto;
  width: 60%;
  padding: 10px 0;
  align-items: center;
  position: relative;
  height: 40px;

  a {
    text-decoration: none;
    color: black;
  }
}
</style>
