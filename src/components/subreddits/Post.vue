<template>
  <div class="postPage">
    <div class="info">
      <router-link class="goBack h1" :to="`/r/${$route.params.id}`"
        >/r/{{ $route.params.id }}</router-link
      >
    </div>
    <div class="content">
      <div class="post">
        <PostOverview :post="post" />
      </div>
      <Comments :comments="post.commentList" />
    </div>
  </div>
</template>

<script>
import PostOverview from "../subreddits/PostOverview";
import Comments from "./Comments";

export default {
  name: "Post",
  computed: {
    post() {
      return this.$store.state.post;
    },
  },
  components: {
    PostOverview,
    Comments,
  },

  beforeMount: function() {
    const { postId } = this.$route.params;
    this.$store.dispatch("getPost", { postId });
  },
};
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_mixins.scss";
.postPage {
  min-height: 100vh;
  width: 100%;
  background-color: $gray;
  padding: 25px 0;

  .info {
    width: 30%;
    min-width: 500px;
    @include breakpoint(600px) {
      width: 100%;
      min-width: initial;
    }
    margin: auto;
    position: relative;
    text-align: center;
  }

  .goBack {
    text-decoration: none;
    color: initial;
  }
  .content {
    padding-top: 50px;
    width: 30%;
    min-width: 500px;
    margin: auto;

    @include breakpoint(600px) {
      width: calc(100% - 10px);
      min-width: initial;
      padding-top: 25px;
    }

    .post {
      .postContent {
        margin-top: 10px;
        line-height: 1.25;
        display: block;
        -webkit-line-clamp: initial;
        -webkit-box-orient: initial;
        overflow: hidden;
        min-height: 30px;
      }
    }
  }
}
</style>
