<template>
  <div class="landing">
    <div class="posts">
      <p v-if="user === 'noUser'" class="landingPersonalized">
        <span @click="signIn" class="mainButton">Sign in</span> to see
        personalized posts!
      </p>
      <PostsOverview />
      <div
        v-if="$store.state.subreddit.length === 0"
        class="landingPersonalized"
      >
        <p>
          There are no posts to show. <br />In order to see more posts join more
          <router-link to="/r" class="mainButton">subreddits</router-link>
        </p>
      </div>
    </div>
    <LandingSubreddits />
  </div>
</template>

<script>
import PostsOverview from "../subreddits/PostsOverview";
import LandingSubreddits from "./LandingSubreddits";
export default {
  name: "Landing",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: { PostsOverview, LandingSubreddits },
  methods: {
    signIn() {
      this.$store.commit("setModal", "signIn");
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.landing {
  background-color: $gray;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 60px);

  .posts {
    width: 30%;
  }

  .landingPersonalized {
    background-color: white;
    width: calc(100% - 100px);
    margin: auto;
    padding: 15px 50px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 25px;

    .mainButton {
      border-radius: 50px;
      padding: 5px 15px;
      margin-right: 5px;
    }
  }
}
</style>
