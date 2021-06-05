<template>
  <div class="subredditManage">
    <h1 class="subredditManageTitle">Manage {{ $route.params.id }}</h1>
    <div class="content">
      <form @submit="manage" class="mainForm">
        <label for="description">Subreddit description</label>
        <input
          class="mainInput"
          v-model="desc"
          type="text"
          name="description"
        />
        <input type="submit" class="mainSubmit" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desc: "",
    };
  },
  name: "SubredditManage",
  methods: {
    setError(msg) {
      this.$store.commit("setError", { active: true, msg });
    },
    manage(e) {
      e.preventDefault();
      if (this.desc.length < 10) {
        this.setError(
          "Subreddit description must be at least 10 characters long."
        );
        return;
      }
      if (this.desc.length > 200) {
        this.setError(
          "Subreddit description can't be longer than 200 characters."
        );
        return;
      }
      this.$store.dispatch("subredditEdit", {
        router: this.$router,
        subredditId: this.$route.params.id,
        description: this.desc,
      });
    },
  },
  beforeMount: function() {
    const route = this.$route.params.id;
    if (!this.$store.state.user || this.$store.state.user === "noUser") {
      this.$store.commit("setModal", "signIn");
      this.$router.push(`/r/${route}`);
      return;
    }
    if (!this.$store.state.user.moderator.includes(route)) {
      this.setError("You are not privileged to do that.");
      this.$router.push(`/r/${route}`);
      return;
    }
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.subredditManage {
  .content {
    margin: auto;
    width: 30%;
    min-width: 500px;

    @include breakpoint(600px) {
      width: calc(100% - 10px);
      min-width: initial;
    }
  }
  .subredditManageTitle {
    margin-top: 75px;
    margin-bottom: 25px;
    text-align: center;
  }
}
</style>
