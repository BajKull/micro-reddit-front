<template>
  <div class="postPage">
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
