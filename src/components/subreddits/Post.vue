<template>
  <div class="postPage">
    <div class="info">
      <router-link
        class="secondaryButton goBackBtn"
        :to="`/r/${$route.params.id}`"
        >{{ $route.params.id }}</router-link
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
.postPage {
  min-height: 100vh;
  width: 100%;
  background-color: $gray;
  padding: 25px 0;

  .info {
    width: 90%;
    margin: auto;
    position: relative;
    margin-bottom: 50px;
  }

  .goBackBtn {
    position: absolute;
    left: 0;
  }
  .content {
    padding-top: 50px;
    width: calc(30% + 100px);
    margin: auto;

    .post {
      .postContent {
        margin-top: 10px;
        line-height: 1.25;
        display: initial;
        -webkit-line-clamp: initial;
        -webkit-box-orient: initial;
        overflow: hidden;
        min-height: 30px;
      }
    }
  }
}
</style>
