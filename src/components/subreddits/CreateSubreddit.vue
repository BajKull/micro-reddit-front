<template>
  <div class="createSubreddit">
    <h1 class="createSubredditTitle">Create subreddit</h1>
    <form @submit="post" class="mainForm">
      <label for="name">Subreddit name</label>
      <input class="mainInput" v-model="name" type="text" name="name" />
      <label for="description">Subreddit description</label>
      <input class="mainInput" v-model="desc" type="text" name="description" />
      <input type="submit" class="mainSubmit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  name: "CreateSubreddit",
  methods: {
    setError(msg) {
      this.$store.commit("setError", { active: true, msg });
    },
    post(e) {
      e.preventDefault();
      if (this.name.length < 3) {
        this.setError("Subreddit name must be at least 3 characters long.");
        return;
      }
      if (this.name.length > 32) {
        this.setError("Subreddit name can't be longer than 32 characters.");
        return;
      }
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
      this.$store.dispatch("createSubreddit", {
        name: this.name,
        desc: this.desc,
        router: this.$router,
      });
    },
    reRoute() {
      if (this.$store.state.user === "noUser") {
        this.$store.commit("setModal", "signIn");
        this.$router.push("/r");
      }
    },
  },
  mounted: function() {
    this.reRoute();
  },
  updated: function() {
    this.reRoute();
  },
};
</script>

<style lang="scss">
@import "@/scss/_mixins.scss";
.createSubreddit {
  width: 30%;
  min-width: 500px;
  margin: auto;

  @include breakpoint(600px) {
    width: calc(100% - 10px);
    min-width: initial;
  }

  .createSubredditTitle {
    text-align: center;
    margin-bottom: 25px;
    margin-top: 75px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
}
</style>
